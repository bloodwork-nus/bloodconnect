import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import IntroScreen from './src/screens/IntroScreen';
import LoginScreen from './src/screens/LoginScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import firebase from "./utils/firebase";

const fetchFonts = () => {
    return Font.loadAsync({
        "inter": require("./assets/fonts/Inter-Regular.otf"),
        "inter-bold": require("./assets/fonts/Inter-Bold.otf"),
        "inter-semibold": require("./assets/fonts/Inter-SemiBold.otf"),
        "inter-medium": require("./assets/fonts/Inter-Medium.otf")
    });
};

const Stack = createStackNavigator();

export default function App() {
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    if (!assetsLoaded) {
        // TODO: Modify AppLoading screen
        return <AppLoading startAsync={fetchFonts} onFinish={() => setAssetsLoaded(true)} />
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Intro" headerMode="none">
                <Stack.Screen name="Intro" component={IntroScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
                <Stack.Screen name="Explore" component={ExploreScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    
});
