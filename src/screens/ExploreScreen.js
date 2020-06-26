import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, StatusBar, ActivityIndicator, Platform } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import BoldText from "../components/BoldText";
import BottomBar from '../components/BottomBar';
import BottomSheet from 'reanimated-bottom-sheet';
import Dimens from '../constants/dimens';
import TextBox from "../components/TextBox";
import Strings from '../constants/strings';
import Colors from "../constants/colors";
import RoundWhiteButton from "../components/RoundWhiteButton";
import MainWhiteButton from "../components/MainWhiteButton";
import MediumText from '../components/MediumText';
import RegularText from '../components/RegularText';
import FontText from "../components/FontText";
import LocationCard from '../components/LocationCard';

import firebase from "../../utils/firebase";
import * as Authentication from "../../utils/auth";

export default function ExploreScreen(props) {
    const { navigation, route: { params } } = props;
    // TODO: Set branch statements for actions for a Guest account

    const [isBottomSheetOpened, setIsBottomSheetOpened] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [requestToShow, setRequestToShow] = useState();
    const [bottomBarSelectedButton, setBottomBarSelectedButton] = useState("explore");
    const [requests, setRequests] = useState({ });
    const [loadingLocation, setLoadingLocation] = useState(false);

    useEffect(() => {
        firebase.database().ref("requests").on("value", (snapshot) => {
            setRequests(snapshot.val());
        });
    }, []);

    let mapViewRef = useRef(null);
    let bottomSheetRef;

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

        setCurrentLocation(region);
        mapViewRef.current.animateToRegion(region);
        setLoadingLocation(false);
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
                onPress={() => {bottomSheetRef.snapTo(2); setRequestToShow(requestItem); mapViewRef.current.animateToRegion({
                    latitude: latitude - 0.01, longitude: longitude,latitudeDelta: 0.02,
                    longitudeDelta: 0.03
                })}}
            >
                <Icon name="location-on" color={Colors.red} size={Dimens.glyphSize} />
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
            location
        } = requestItem.payload;

        let emergency = isEmergency ? <Icon name="priority-high" color={Colors.red} size={Dimens.glyphSize} /> : null;
        // let venueTypeIcon;

        // switch (item.venueType) {
        //     case "hospital":
        //         venueTypeIcon = <Icon name="local-hospital" color={Colors.blue} size={Dimens.glyphSize} />
        //         break;
        //     case "bloodbank":
        //         venueTypeIcon = <Icon name="home" color={Colors.red} size={Dimens.glyphSize} />
        //         break;
        //     case "institution":
        //         venueTypeIcon = <CommunityIcon name="office-building" color={Colors.grey4} size={Dimens.glyphSize} />
        //         break;
        //     case "event":
        //         venueTypeIcon = <Icon name="event" color={Colors.yellow} size={Dimens.glyphSize} />
        //         break;
        // };

        // let distance;

        // if (item.distance > 1000) {
        //     distance = (item.distance / 1000) + "km";
        // } else {
        //     distance = item.distance + "m";
        // }

        let renderedBloodType = bloodType;
        if (bloodType === "Any blood groups") renderedBloodType = "Any";
        if (bloodType === "Others (specify in description)") renderedBloodType = "*";

        return (
            <TouchableOpacity onPress={() => {}}><View style={styles.requestItem}>
                <View style={styles.requestItemBloodType}>
                    <BoldText color={Colors.darkBlue} size={25}>{renderedBloodType}</BoldText>
                </View>

                <View style={styles.requestItemDetails}>
                    <MediumText color={Colors.darkBlue} size={16} numberOfLines={1} >{location.locationName}</MediumText>
                    <RegularText color={Colors.lightGrey3} size={14}>{location.locationAddress}</RegularText>
                </View>

                <View style={styles.requestItemIcons}>
                    {emergency}
                    {/* {venueTypeIcon} */}
                </View>
            </View></TouchableOpacity>
        );
    };

    const radius = isBottomSheetOpened ? 0 : Dimens.bottomSheetBorderRadius;

    const renderHeader = () => {
        return (
            <View style={{
                ...styles.bottomSheetHeader,
                borderTopLeftRadius: radius,
                borderTopRightRadius: radius
            }}>
                <View style={styles.bottomSheetHandle} />
                <TextBox
                    placeholder={Strings.searchAnythingHere}
                    style={{width: "100%"}}
                    onTouchEnd={() => bottomSheetRef.snapTo(0)}
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
                    data={Object.keys(requests)}
                    ItemSeparatorComponent={({ highlighted, leadingItem }) => <View style={styles.requestsListSeparator} />}
                    bounces={true}
                    ListEmptyComponent={<MediumText style={{textAlign: "center"}} color={Colors.grey2} size={17}>{Strings.noRequests}</MediumText>}
                    ListFooterComponent={<View />}
                    ListFooterComponentStyle={{height: Dimens.bottomBarHeight + 50}}
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
                onPanDrag={() => bottomSheetRef.snapTo(2)}
                moveOnMarkerPress={false}
            >{Object.keys(requests).map(renderMarker)}</MapView>

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
                <MainWhiteButton
                    caption={params && params.isGuest ? "Guest" : Authentication.getCurrentUserName().split(" ")[0]}
                    style={styles.userButton}
                    imageRight={<Icon name="person-outline" color={Colors.darkBlue} size={Dimens.glyphSize} />}
                    onPress={() => navigation.navigate("UserProfile")}
                    height={40}
                />
            </SafeAreaView>

            {requestToShow ? <LocationCard request={requestToShow} /> : null}

            <BottomSheet
                snapPoints={[
                    Dimensions.get("window").height, 
                    Dimens.bottomBarHeight + 240, 
                    Dimens.bottomBarHeight + Dimens.bottomSheetHeaderHeight
                ]}
                initialSnap={1}
                renderHeader={renderHeader}
                renderContent={renderContent}
                ref={ref => bottomSheetRef = ref}
                onOpenEnd={() => setBottomBarSelectedButton("requests")}
                onCloseStart={() => setBottomBarSelectedButton("explore")}
            />
            
            <BottomBar
                selected={bottomBarSelectedButton}
                onExplore={() => {
                    setBottomBarSelectedButton("explore");
                    bottomSheetRef.snapTo(1);
                }}
                onRequests={() => {
                    setBottomBarSelectedButton("requests");
                    bottomSheetRef.snapTo(0);
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
    }
});