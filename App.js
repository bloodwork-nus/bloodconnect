import React, { useState } from 'react';
import { YellowBox } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

import IntroScreen from './src/screens/IntroScreen';
import LoginScreen from './src/screens/LoginScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import NewRequestFormScreen from "./src/screens/NewRequestFormScreen";
import DonateScreen from './src/screens/DonateScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import CompletedFormScreen from './src/screens/CompletedFormScreen';
import RequestsScreen from "./src/screens/RequestsScreen";
import ViewDonorsScreen from "./src/screens/ViewDonorsScreen";
import MainScreen from "./src/screens/MainScreen";

import firebase from "./utils/firebase";
import * as Authentication from "./utils/auth";

import configureStore from "./src/store/configureStore";

const fetchFonts = () => {
    return Font.loadAsync({
        "inter": require("./assets/fonts/Inter-Regular.otf"),
        "inter-bold": require("./assets/fonts/Inter-Bold.otf"),
        "inter-semibold": require("./assets/fonts/Inter-SemiBold.otf"),
        "inter-medium": require("./assets/fonts/Inter-Medium.otf")
    });
};

const Stack = createStackNavigator();

const { store, persistor } = configureStore();

const reactReduxFirebaseConfig = {
    firebase,
    config: {
        userProfile: "users"
    },
    dispatch: store.dispatch
};

// Unfixable "bug" since Firebase uses long setTimeout (see https://github.com/facebook/react-native/issues/12981)
YellowBox.ignoreWarnings(["Setting a timer for a long period of"]);

export default function App() {
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    if (!assetsLoaded) {
        // TODO: Modify AppLoading screen
        return <AppLoading startAsync={fetchFonts} onFinish={() => setAssetsLoaded(true)} />
    }

    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider {...reactReduxFirebaseConfig}>
                <PersistGate loading={null} persistor={persistor}>

                <NavigationContainer>
                    <Stack.Navigator initialRouteName={"Main"} headerMode="none">
                        <Stack.Screen name="Main" component={MainScreen} />
                        <Stack.Screen name="Intro" component={IntroScreen} />
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
                        <Stack.Screen name="Explore" component={ExploreScreen} />
                        <Stack.Screen name="NewRequestForm" component={NewRequestFormScreen} />
                        <Stack.Screen name="Donate" component={DonateScreen} />
                        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
                        <Stack.Screen name="CompletedForm" component={CompletedFormScreen} />
                        <Stack.Screen name="Requests" component={RequestsScreen} />
                        <Stack.Screen name="ViewDonors" component={ViewDonorsScreen} />
                    </Stack.Navigator>
                </NavigationContainer>

                </PersistGate>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
}