import React from 'react';
import { View, StyleSheet, Image, StatusBar, SafeAreaView, Dimensions } from "react-native";

import Dimens from "../constants/dimens";
import BiWaves from "../../assets/biwaves.svg";
import WhiteLogo from "../../assets/logo-white.svg";

export default function LoginScreen(props) {
    return (
        <SafeAreaView {...props} style={{...styles.header, ...props.style}}>
            <Image source={require("../../assets/biwaves.png")} style={styles.biwaves} />
            
            <View style={styles.logo}><WhiteLogo width={"100%"} height={"100%"} /></View>
        </SafeAreaView>
    );
}

//<View style={styles.biwaves}><BiWaves width={"100%"} height={"100%"} /></View>

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        width: "100%",
        height: Dimens.biWavesHeightPercentage,
        minHeight: Dimens.biWavesMinimumHeight
    },

    biwaves: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },

    logo: {
        width: "50%",
        flex: 0.2,
        marginTop: StatusBar.currentHeight ? StatusBar.currentHeight + Dimens.headingNudgeHorizontal : 0,
        marginLeft: Dimens.biWavesLogoMarginLeft
    }
});