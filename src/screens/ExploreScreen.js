import React from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, StatusBar } from "react-native";
import ShadowView from "react-native-shadow-view";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialIcons";

import BottomBar from '../components/BottomBar';
import BottomSheet from 'reanimated-bottom-sheet';
import Dimens from '../constants/dimens';
import TextBox from "../components/TextBox";
import Strings from '../constants/strings';
import Colors from "../constants/colors";
import RoundWhiteButton from "../components/RoundWhiteButton";
import MainWhiteButton from "../components/MainWhiteButton";

export default function ExploreScreen(props) {
    const renderHeader = () => {
        return (
            <View style={{alignItems: "flex-end"}}>
                <RoundWhiteButton
                    style={styles.myLocationButton}
                    image={<Icon name="my-location" color={Colors.darkBlue} size={Dimens.glyphSize} />}
                    onPress={() => {}}
                />

                <ShadowView style={styles.shadow}><View style={styles.bottomSheetHeader}>
                    <View style={styles.bottomSheetHandle} />
                    <TextBox
                        placeholder={Strings.searchAnythingHere}
                        style={{width: "100%"}}
                    />
                </View></ShadowView>
            </View>
        );
    };

    const renderContent = () => {
        return (
            <View style={{backgroundColor: Colors.white, height: "100%"}}>

            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <MapView
                style={styles.map}
                initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
            />

            <SafeAreaView><View style={styles.mapOverlayContents}>
                <View style={styles.userButtonContainer}>
                    <MainWhiteButton
                        caption="Phillmont"
                        style={styles.userButton}
                        buttonStyle={styles.userButton}
                        imageRight={<Icon name="person-outline" color={Colors.darkBlue} size={Dimens.glyphSize} />}
                        onPress={() => {}}
                    />
                </View>
            </View></SafeAreaView>

            <BottomSheet
                snapPoints={[
                    Dimensions.get("window").height + Dimens.roundButtonSize + Dimens.bottomSheetPaddingHorizontal, 
                    Dimens.bottomBarHeight + 200 + Dimens.roundButtonSize + Dimens.bottomSheetPaddingHorizontal, 
                    Dimens.bottomBarHeight + Dimens.bottomSheetHeaderHeight + Dimens.roundButtonSize + Dimens.bottomSheetPaddingHorizontal
                ]}
                initialSnap={1}
                renderHeader={renderHeader}
                renderContent={renderContent}
            />

            <BottomBar />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "white"
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
        position: "absolute"
    },

    myLocationButton: {
        marginBottom: Dimens.bottomSheetPaddingHorizontal,
        marginRight: Dimens.bottomSheetPaddingHorizontal
    },

    userButton: {
        width: 140,
        height: 40
    },

    userButtonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10
    },

    mapOverlayContents: {
        flex: 1,
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
        paddingHorizontal: Dimens.bottomSheetPaddingHorizontal
    }
});