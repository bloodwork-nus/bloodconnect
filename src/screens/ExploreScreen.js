import React from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, StatusBar, Text, TouchableHighlight, Platform } from "react-native";
import ShadowView from "react-native-shadow-view";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import BoldText from "../components/BoldText";
import BottomBar from '../components/BottomBar';
import BottomSheet from 'reanimated-bottom-sheet';
import Dimens from '../constants/dimens';
import TextBox from "../components/TextBox";
import Strings from '../constants/strings';
import Colors from "../constants/colors";
import RoundWhiteButton from "../components/RoundWhiteButton";
import MainWhiteButton from "../components/MainWhiteButton";
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import MediumText from '../components/MediumText';
import RegularText from '../components/RegularText';
import firebase from "../../utils/firebase";

import sampleRequests from "../constants/sampleRequests";

export default function ExploreScreen(props) {
    const { userName, isVerified } = props.route.params;

    if (!isVerified) {
        alert("You are not verified! Please verify your email address.");
    }

    const handleLogout = () => {
        firebase.auth().signOut();
        props.navigation.navigate("Login");
    };

    const renderListItem = ({ item, index, separators }) => {
        let emergency = item.isEmergency ? <Icon name="priority-high" color={Colors.red} size={Dimens.glyphSize} /> : null;
        let venueTypeIcon;

        switch (item.venueType) {
            case "hospital":
                venueTypeIcon = <Icon name="local-hospital" color={Colors.blue} size={Dimens.glyphSize} />
                break;
            case "bloodbank":
                venueTypeIcon = <Icon name="home" color={Colors.red} size={Dimens.glyphSize} />
                break;
            case "institution":
                venueTypeIcon = <CommunityIcon name="office-building" color={Colors.grey4} size={Dimens.glyphSize} />
                break;
            case "event":
                venueTypeIcon = <Icon name="event" color={Colors.yellow} size={Dimens.glyphSize} />
                break;
        };

        let distance;

        if (item.distance > 1000) {
            distance = (item.distance / 1000) + "km";
        } else {
            distance = item.distance + "m";
        }

        return (
            <TouchableOpacity onPress={() => alert(item.address)}><View style={styles.requestItem}>
                <View style={styles.requestItemBloodType}>
                    <BoldText color={Colors.darkBlue} size={25}>{item.bloodType}</BoldText>
                </View>

                <View style={styles.requestItemDetails}>
                    <MediumText color={Colors.darkBlue} size={16} numberOfLines={1} >{item.venue}</MediumText>
                    <RegularText color={Colors.lightGrey3} size={14}>{distance}</RegularText>
                </View>

                <View style={styles.requestItemIcons}>
                    {emergency}
                    {venueTypeIcon}
                </View>
            </View></TouchableOpacity>
        );
    };

    const renderHeader = () => {
        return (
            <View style={styles.bottomSheetHeader}>
                <View style={styles.bottomSheetHandle} />
                <TextBox
                    placeholder={Strings.searchAnythingHere}
                    style={{width: "100%"}}
                />
            </View>
        );
    };

    const renderContent = () => {
        sampleRequests.sort((a, b) => a.distance - b.distance);

        return (
            <View style={styles.bottomSheetContent}>
                <FlatList
                    keyExtractor={item => item.key.toString()}
                    renderItem={renderListItem}
                    data={sampleRequests}
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
                initialRegion={{
                    latitude: 1.297532,
                    longitude: 103.777176,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />

            <SafeAreaView style={{...styles.mapTopOverlay, left: Dimens.bottomSheetPaddingHorizontal}}>
                <RoundWhiteButton
                    image={<Icon name="my-location" color={Colors.darkBlue} size={Dimens.glyphSize} />}
                    onPress={() => alert("hello")}
                />
            </SafeAreaView>

            <SafeAreaView style={{...styles.mapTopOverlay, right: Dimens.bottomSheetPaddingHorizontal}}>
                <MainWhiteButton
                    caption={userName}
                    style={styles.userButton}
                    buttonStyle={styles.userButton}
                    imageRight={<Icon name="person-outline" color={Colors.darkBlue} size={Dimens.glyphSize} />}
                    onPress={handleLogout}
                />
            </SafeAreaView>

            <BottomSheet
                snapPoints={[
                    Dimensions.get("window").height, 
                    Dimens.bottomBarHeight + 240, 
                    Dimens.bottomBarHeight + Dimens.bottomSheetHeaderHeight
                ]}
                initialSnap={1}
                renderHeader={renderHeader}
                renderContent={renderContent}
                enabledContentTapInteraction={true}
            />
            
            <BottomBar />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.white
    },

    bottomSheetHeader: {
        width: "100%",
        alignItems: "center",
        backgroundColor: Colors.white,
        height: Dimens.bottomSheetHeaderHeight,
        borderTopLeftRadius: Dimens.bottomSheetBorderRadius,
        borderTopRightRadius: Dimens.bottomSheetBorderRadius,
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
        maxWidth: 140,
        height: 40
    },

    mapTopOverlay: {
        top: 10 + (StatusBar.currentHeight ? StatusBar.currentHeight : 20),
        position: "absolute"
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
        width: 40,
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
    }
});