import React, { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator, Platform } from "react-native";
import { CommonActions } from "@react-navigation/native";

import BloodConnectIcon from "../../assets/icon.svg";

import Colors from "../constants/colors";

import FontText from "../components/FontText";

import firebase from "../../utils/firebase";

const randomLoadingTexts = [
    "Making you an eggbread",
    "Searching for cure to COVID-19",
    "Loading your authentication state"
];

export default (props) => {
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Explore"}]}));
            } else {
                props.navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Intro"}]}));
            }
        });

        return () => { unsubscribe(); };
    }, []);

    return (
        <View style={styles.screen}>
            <BloodConnectIcon width={100} height={100} style={{ marginBottom: 200 }} />

            <ActivityIndicator size={Platform.OS === "android" ? 50 : "large"} color={Colors.darkBlue}/>

            <FontText flavor="medium" color={Colors.darkBlue} size={17} align="center" style={styles.loadingText}>
                {randomLoadingTexts[Math.floor(Math.random() * randomLoadingTexts.length)]}
            </FontText>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    icon: {
        width: 30,
        height: 30,
        backgroundColor: "red"
    },

    loadingText: {
        marginTop: 30,
        paddingHorizontal: 40
    }
});