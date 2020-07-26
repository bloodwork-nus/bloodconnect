import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, StatusBar, ActivityIndicator, Platform, Keyboard, BackHandler } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import * as Location from "expo-location";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { useFocusEffect } from "@react-navigation/native";

import BloodRequestGlyph from "../../assets/icons/blood.svg";
import PlasmaRequestGlyph from "../../assets/icons/plasma.svg";
import PlateletsRequestGlyph from "../../assets/icons/platelets.svg";

import BottomBar from '../components/BottomBar';
import BottomSheet from 'reanimated-bottom-sheet';
import Dimens from '../constants/dimens';
import TextBox from "../components/TextBox";
import Strings from '../constants/strings';
import Colors from "../constants/colors";
import RoundWhiteButton from "../components/RoundWhiteButton";
import MainColorButton from "../components/MainColorButton";
import FontText from "../components/FontText";
import LocationCard from '../components/LocationCard';

import firebase from "../../utils/firebase";
import * as Authentication from "../../utils/auth";
import * as Requests from "../../utils/requests";

Notifications.setNotificationHandler({
    handleNotification: async() => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false
    })
});

const registerForPushNotificationsAsync = async () => {
    let pushToken;
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    if (finalStatus !== "granted") {
        return;
    }

    pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    firebase.database().ref(`users/${Authentication.getCurrentUserUid()}`).set({ pushToken });

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250]
        });
    }
}

export default function ExploreScreen(props) {
    const { navigation, route: { params } } = props;
    // TODO: Set branch statements for actions for a Guest account

    const [hasPermission, setHasPermission] = useState(null);
    const [requestToShow, setRequestToShow] = useState();
    const [bottomBarSelectedButton, setBottomBarSelectedButton] = useState("explore");
    const [requests, setRequests] = useState({ });
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [requestIdToDonate, setRequestIdToDonate] = useState("");
    const [searchKeywords, setSearchKeywords] = useState("");
    const [searchWaiting, setSearchWaiting] = useState(null);
    const [loadingRequests, setLoadingRequests] = useState(true);

    useEffect(() => {
        const requestsRef = firebase.database().ref("requests");
        
        requestsRef.on("value", (snapshot) => {
            setRequests(snapshot.val());
            setLoadingRequests(false);
        });

        return () => requestsRef.off("value");
    }, []);

    useEffect(() => {
        registerForPushNotificationsAsync();
    });

    useFocusEffect(React.useCallback(() => {
        const onBackPress = () => { BackHandler.exitApp(); return true; };
        BackHandler.addEventListener("hardwareBackPress", onBackPress);
        return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }), []);

    let mapViewRef = useRef(null);
    let bottomSheetRef = useRef(null);

    const maximiseBottomSheet = () => bottomSheetRef.current.snapTo(0);
    const restoreBottomSheet = () => bottomSheetRef.current.snapTo(1);
    const minimiseBottomSheet = () => bottomSheetRef.current.snapTo(2);

    const askForPermission = async () => {
        const { status } = await Location.requestPermissionsAsync();
        setHasPermission(status === "granted");
    }

    const getCurrentLocation = async () => {
        setLoadingLocation(true);

        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
        const region = {
            latitude: location.coords.latitude - 0.01,
            longitude: location.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.03
        };

        mapViewRef.current.animateToRegion(region);
        setLoadingLocation(false);
    }

    const openRequestDetails = (requestId, requestItem, latitude, longitude) => {
        Keyboard.dismiss();
        minimiseBottomSheet();
        setRequestToShow(requestItem);
        setRequestIdToDonate(requestId);
        mapViewRef.current.animateToRegion({
            latitude: latitude - 0.01,
            longitude: longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.03
        })
    }

    useEffect(() => { askForPermission(); });

    const renderMarker = (id) => {
        const requestItem = requests[id];
        const {
            bloodType,
            contactName,
            contactNumber,
            description,
            isEmergency,
            location: { locationName, locationAddress, latitudeLongitude: { latitude, longitude } },
            numberOfUnits
        } = requestItem.payload;

        return (
            <Marker
                key={id}
                coordinate={{latitude: latitude, longitude: longitude}}
                onPress={() => openRequestDetails(id, requestItem, latitude, longitude)}
            >
                <Icon name="location-on" color={requestToShow === requestItem ? Colors.blue : Colors.red} size={Dimens.glyphSize} />
                <Callout tooltip={true} style={styles.callout}>
                    <FontText flavor="medium" color={Colors.blue} size={15} numberOfLines={1}>{locationName}</FontText>
                </Callout>
            </Marker>
        )
    }

    const handleLogout = () => {
        Authentication.signOut();
        navigation.navigate("Login");
    };

    const renderListItem = ({ item, index, separators }) => {
        const requestItem = requests[item];
        const {
            bloodType,
            isEmergency,
            location: { locationName, locationAddress, latitudeLongitude: { latitude, longitude } }
        } = requestItem.payload;

        let emergency = isEmergency ? <Icon name="priority-high" color={Colors.red} size={Dimens.glyphSize} /> : null;
        let requestTypeIcon;

        switch (requestItem.requestType) {
            case Requests.Constants.RequestTypes.BLOOD:
                requestTypeIcon = <View style={styles.requestTypeGlyph}><BloodRequestGlyph fill={Colors.grey2} /></View>
                break;
            case Requests.Constants.RequestTypes.PLASMA:
                requestTypeIcon = <View style={styles.requestTypeGlyph}><PlasmaRequestGlyph fill={Colors.grey2} /></View>
                break;
            case Requests.Constants.RequestTypes.PLATELETS:
                requestTypeIcon = <View style={styles.requestTypeGlyph}><PlateletsRequestGlyph fill={Colors.grey2} /></View>
                break;
        };

        // let distance;

        // if (item.distance > 1000) {
        //     distance = (item.distance / 1000) + "km";
        // } else {
        //     distance = item.distance + "m";
        // }

        let renderedBloodType = bloodType;
        if (bloodType === "Any blood groups") renderedBloodType = "Any";
        if (bloodType === "Other (specify in description)") renderedBloodType = "*";

        const numberOfDonors = requestItem.donors ? Object.values(requestItem.donors).length : 0;

        return (
            <TouchableOpacity onPress={() => openRequestDetails(item, requestItem, latitude, longitude)}><View style={styles.requestItem}>
                <View style={styles.requestItemBloodType}>
                    <FontText flavor="bold" color={Colors.darkBlue} size={23}>{renderedBloodType}</FontText>
                </View>

                <View style={styles.requestItemDetails}>
                    <FontText flavor="medium" color={Colors.darkBlue} size={16} numberOfLines={1} >{locationName}</FontText>
                    <FontText color={Colors.lightGrey3} size={14}>{locationAddress}</FontText>
                    {requestItem.requester === Authentication.getCurrentUserUid() ?
                        <FontText flavor="medium" color={Colors.blue} size={14}>
                            {numberOfDonors > 0 ? `You have ${numberOfDonors > 1 ? numberOfDonors + " potential donors!" : "a potential donor!"}` : "Tap to view your request."}
                        </FontText>
                    : null}
                </View>

                <View style={styles.requestItemIcons}>
                    {emergency}
                    {requestTypeIcon}
                </View>
            </View></TouchableOpacity>
        );
    };

    const getRequestsList = () => {
        if (requests) {
            const keys = Object.keys(requests).filter((id) => requests[id].status === Requests.Constants.Status.OPEN);

            if (searchKeywords === "") {
                return keys.sort((a, b) => {
                    const request1 = requests[a];
                    const request2 = requests[b];

                    if (request1.payload.isEmergency && !request2.payload.isEmergency) {
                        return -1;
                    } else if (request2.payload.isEmergency && !request1.payload.isEmergency) {
                        return 1;
                    } else {
                        return request2.dateCreated - request1.dateCreated;
                    }
                });
            } else {
                const keyword = searchKeywords.toLowerCase();
                const results = new Set();

                keys.forEach((id) => requests[id].payload.bloodType.toLowerCase().includes(keyword) ? results.add(id) : null);
                keys.forEach((id) => requests[id].requestType.toLowerCase().includes(keyword) ? results.add(id) : null);
                keys.forEach((id) => requests[id].payload.location.locationName.toLowerCase().includes(keyword) || 
                    requests[id].payload.location.locationAddress.toLowerCase().includes(keyword) ? results.add(id) : null);
                
                return Array.from(results);
            }
        } else {
            return [];
        }
    }

    const renderHeader = () => {
        return (
            <View style={styles.bottomSheetHeader}>
                <View style={styles.bottomSheetHandle} />
                <TextBox
                    placeholder={Strings.searchAnythingHere}
                    style={{width: "100%"}}
                    onTouchEnd={maximiseBottomSheet}
                    onChangeText={(text) => {
                        if (searchWaiting) clearTimeout(searchWaiting);
                        setSearchWaiting(setTimeout(() => {
                            setSearchWaiting(null);
                            setSearchKeywords(text);
                        }, 200));
                    }}
                />
            </View>
        );
    };

    const renderContent = () => {
        // sampleRequests.sort((a, b) => a.distance - b.distance);

        return (
            <View style={styles.bottomSheetContent}>
                <FlatList
                    keyExtractor={id => id.toString()}
                    renderItem={renderListItem}
                    data={getRequestsList()}
                    ItemSeparatorComponent={({ highlighted, leadingItem }) => <View style={styles.requestsListSeparator} />}
                    bounces={true}
                    ListEmptyComponent={loadingRequests ?
                        <>
                            <ActivityIndicator size="large" color={Colors.darkBlue} style={{ marginTop: 10 }} />
                            <FontText flavor="medium" align="center" color={Colors.darkBlue} size={17} style={{ marginTop: 15 }}>Fetching requests</FontText>
                        </>
                        :
                        <FontText flavor="medium" align="center" color={Colors.grey2} size={17}>{Strings.noRequests}</FontText>
                    }
                    ListFooterComponent={<View />}
                    ListFooterComponentStyle={{height: Dimens.bottomBarHeight + 50}}
                    onScroll={maximiseBottomSheet}
                />
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={"rgba(0,0,0,0)"} barStyle="dark-content" translucent={true} />
            
            <MapView
                style={styles.map}
                showsCompass={false}
                showsUserLocation={true}
                ref={mapViewRef}
                onPress={({ nativeEvent }) => {
                    // iOS' nativeEvent action has marker-press, Android doesn't trigger
                    if (nativeEvent.action !== "marker-press") setRequestToShow(null);
                }}
                onPanDrag={minimiseBottomSheet}
                moveOnMarkerPress={false}
                initialRegion={{
                    latitude: 1.3421 - 0.05,
                    longitude: 103.8198,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2
                }}
            >{requests ? Object.keys(requests).map(renderMarker) : null}</MapView>

            <SafeAreaView style={{...styles.mapTopOverlay, left: Dimens.bottomSheetPaddingHorizontal}}>
                <RoundWhiteButton
                    image={
                        loadingLocation
                        ? <ActivityIndicator size={Dimens.glyphSize} color={Colors.blue} />
                        : <Icon name="my-location" color={Colors.darkBlue} size={Dimens.glyphSize} />
                    }
                    onPress={getCurrentLocation}
                />
            </SafeAreaView>

            <SafeAreaView style={{...styles.mapTopOverlay, right: Dimens.bottomSheetPaddingHorizontal}}>
                <MainColorButton
                    color={Colors.white}
                    caption={params && params.isGuest ? "Guest" : Authentication.getCurrentUserName().split(" ")[0]}
                    style={styles.userButton}
                    imageRight={<Icon name="person-outline" color={Colors.darkBlue} size={Dimens.glyphSize} />}
                    onPress={() => navigation.navigate("UserProfile")}
                    height={40}
                />
            </SafeAreaView>

            {requestToShow ? <LocationCard request={requestToShow} requestId={requestIdToDonate} navigation={navigation} /> : null}

            <BottomSheet
                snapPoints={[
                    Dimensions.get("window").height, 
                    Dimens.bottomBarHeight + 240, 
                    Dimens.bottomBarHeight + Dimens.bottomSheetHeaderHeight
                ]}
                initialSnap={1}
                renderHeader={renderHeader}
                renderContent={renderContent}
                ref={bottomSheetRef}
            />
            
            <BottomBar
                selected={bottomBarSelectedButton}
                onExplore={() => {
                    setBottomBarSelectedButton("explore");
                    restoreBottomSheet();
                }}
                onRequests={() => {
                    setBottomBarSelectedButton("requests");
                    maximiseBottomSheet();
                }}
                onPrimaryButtonPress={() => navigation.navigate("NewRequestForm")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white,
        position: "relative",
        minHeight: Dimensions.get("window").height
    },

    bottomSheetHeader: {
        width: "100%",
        alignItems: "center",
        backgroundColor: Colors.white,
        height: Dimens.bottomSheetHeaderHeight,
        paddingTop: 15,
        paddingHorizontal: Dimens.bottomSheetPaddingHorizontal,
        position: "relative",
        borderTopRightRadius: Dimens.bottomSheetBorderRadius,
        borderTopLeftRadius: Dimens.bottomSheetBorderRadius,
        ...Dimens.bottomSheetHeaderShadowStyle
    },

    bottomSheetHandle: {
        backgroundColor: Colors.grey3,
        height: 5,
        width: 60,
        borderRadius: 200,
        marginBottom: 15
    },

    shadow: {
        width: Dimensions.get("window").width,
        height: Dimens.bottomSheetHeaderHeight,
        ...Dimens.bottomSheetHeaderShadowStyle,
        borderRadius: Dimens.bottomSheetBorderRadius
    },

    map: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: -1
    },

    userButton: {
        maxWidth: 140
    },

    mapTopOverlay: {
        top: 10 + (StatusBar.currentHeight ? StatusBar.currentHeight : 20),
        position: "absolute",
        zIndex: 10
    },

    bottomSheetContent: {
        height: "100%",
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 35
    },

    requestItem: {
        width: Dimensions.get("window").width - 70,
        flexDirection: "row",
        //backgroundColor: "black"
    },
    
    requestItemBloodType: {
        width: 50,
        flexDirection: "row",
        justifyContent: "flex-start",
        //backgroundColor: "red",
        marginRight: 10
    },

    requestItemDetails: {
        flex: 1,
        flexDirection: "column",
        //backgroundColor: "blue"
    },

    requestItemIcons: {
        flexDirection: "row",
        justifyContent: "flex-end",
        //backgroundColor: "green",
        marginLeft: 10
    },
    
    requestsListSeparator: {
        backgroundColor: Colors.grey3,
        width: "100%",
        height: 1,
        marginVertical: 10
    },

    callout: {
        backgroundColor: "white",
        flexDirection: "row",
        width: 200,
        paddingVertical: 5,
        paddingHorizontal: 20,
        justifyContent: "center",
        borderRadius: 100,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        
        elevation: 9,
    },

    requestTypeGlyph: {
        width: Dimens.glyphSize,
        height: Dimens.glyphSize
    }
});