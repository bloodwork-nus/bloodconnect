import React from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView, StatusBar, Text } from "react-native";
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
        return (
            <View style={styles.bottomSheetContent}>
                
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

            <View style={styles.mapOverlayContents}><SafeAreaView>
                <View style={styles.userButtonContainer}>
                    <RoundWhiteButton
                        style={styles.myLocationButton}
                        image={<Icon name="my-location" color={Colors.darkBlue} size={Dimens.glyphSize} />}
                        onPress={() => alert("hello")}
                    />

                    <MainWhiteButton
                        caption="Phillmont"
                        style={styles.userButton}
                        buttonStyle={styles.userButton}
                        imageRight={<Icon name="person-outline" color={Colors.darkBlue} size={Dimens.glyphSize} />}
                        onPress={() => {}}
                    />
                </View>
            </SafeAreaView></View>

            <BottomSheet
                snapPoints={[
                    Dimensions.get("window").height, 
                    Dimens.bottomBarHeight + 200, 
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
        justifyContent: "space-between",
        marginTop: 10
    },

    mapOverlayContents: {
        flex: 1,
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight : 0,
        paddingHorizontal: Dimens.bottomSheetPaddingHorizontal
    },

    bottomSheetContent: {
        height: "100%",
        backgroundColor: Colors.white,
        justifyContent: "center",
        alignItems: "center"
    }
});