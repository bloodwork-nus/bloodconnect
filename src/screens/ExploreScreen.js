import React from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import ShadowView from "react-native-shadow-view";
import MapView from "react-native-maps";

import BottomBar from '../components/BottomBar';
import BottomSheet from 'reanimated-bottom-sheet';
import Dimens from '../constants/dimens';
import TextBox from "../components/TextBox";
import Strings from '../constants/strings';
import Colors from "../constants/colors";
import RoundButton from "../components/RoundButton";

export default function ExploreScreen(props) {
    const renderHeader = () => {
        return (
            <ShadowView style={styles.shadow}><View style={styles.bottomSheetHeader}>
                <View style={styles.bottomSheetHandle} />
                <TextBox
                    placeholder={Strings.searchAnythingHere}
                    style={{width: "100%"}}
                />
            </View></ShadowView>
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
            

            <BottomSheet
                snapPoints={[
                    "100%", 
                    Dimens.bottomBarHeight + 200, 
                    Dimens.bottomBarHeight + Dimens.bottomSheetHeaderHeight
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
        height: "100%"
    }
});