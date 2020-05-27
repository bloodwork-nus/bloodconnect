import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IntroScreen from './src/screens/IntroScreen';
import * as Font from "expo-font";
import { AppLoading } from "expo";
import LoginScreen from './src/screens/LoginScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';

const fetchFonts = () => {
    return Font.loadAsync({
        "inter": require("./assets/fonts/Inter-Regular.otf"),
        "inter-bold": require("./assets/fonts/Inter-Bold.otf"),
        "inter-semibold": require("./assets/fonts/Inter-SemiBold.otf"),
        "inter-medium": require("./assets/fonts/Inter-Medium.otf")
    });
};

export default function App() {
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    if (!assetsLoaded) {
        // TODO: Modify AppLoading screen
        return <AppLoading startAsync={fetchFonts} onFinish={() => setAssetsLoaded(true)} />
    }

    return (
        <CreateAccountScreen />
    );
}

const styles = StyleSheet.create({
    
});
