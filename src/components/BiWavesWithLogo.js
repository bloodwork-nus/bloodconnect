import React from 'react';
import { View, StyleSheet, Image, StatusBar } from "react-native";

import BiWaves from "../../assets/biwaves.svg";
import WhiteLogo from "../../assets/logo-white.svg";

export default function LoginScreen(props) {
    return (
        <View {...props} style={{...styles.header, ...props.style}}>
            <Image source={require("../../assets/biwaves.png")} style={styles.biwaves} />
            
            <View style={styles.logo}><WhiteLogo width={"100%"} height={"100%"} /></View>
        </View>
    );
}

//<View style={styles.biwaves}><BiWaves width={"100%"} height={"100%"} /></View>

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        width: "100%",
        height: "39.5%",
        minHeight: 300
    },

    biwaves: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },

    logo: {
        width: "50%",
        flex: 0.2,
        marginTop: StatusBar.currentHeight + 5,
        marginLeft: 35
    }
});