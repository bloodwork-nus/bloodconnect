import React from 'react';
import { View, StyleSheet, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Strings from "../constants/strings";
import Colors from "../constants/colors";
import Dimens from "../constants/dimens";
import BiWavesWithLogo from "../components/BiWavesWithLogo";
import SemiBoldText from '../components/SemiBoldText';
import TextBox from '../components/TextBox';
import PasswordTextBox from '../components/PasswordTextBox';
import Link from '../components/Link';
import MainButton from '../components/MainButton';
import MainOutlineButton from '../components/MainOutlineButton';
import GoogleLogo from "../../assets/icons/google.svg";

export default function LoginScreen(props) {
    return (
        <KeyboardAvoidingView behavior="height"><ScrollView><View style={styles.screen}>
            <StatusBar backgroundColor={"rgba(0,0,0,0)"} barStyle="light-content" translucent={true} />
            <BiWavesWithLogo />

            <View style={styles.contents}>
                <View style={styles.topControls}>
                    <SemiBoldText style={styles.heading} color={Colors.darkBlue} size={25}>{Strings.logIntoYourAccount}</SemiBoldText>
                    <TextBox
                        placeholder="Email"
                        autoCompleteType="email"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{marginBottom: 15}}
                        returnKeyType="next"
                    />
                    <PasswordTextBox />

                    <View style={styles.loginControls}>
                        <Link caption="Forgot password?" size={15} onPress={() => {}} style={styles.forgotPasswordLink}/>
                        <MainButton caption="Log in" onPress={() => {}} imageRight={<Icon name="arrow-forward" color={Colors.white} size={30} />}/>
                    </View>
                </View>

                <View style={styles.bottomControls}>
                    <MainOutlineButton
                        caption="Sign in with Google"
                        onPress={() => {}}
                        buttonStyle={{marginBottom: 15}}
                        imageLeft={<GoogleLogo width={"100%"} height={"100%"} />}
                    />
                    
                    <MainOutlineButton caption="Create a new account" onPress={() => {}} />
                </View>
            </View>
        </View></ScrollView></KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: Dimensions.get("screen").height
    },

    contents: {
        flex: 1,
        paddingHorizontal: 30,
        flexDirection: "column",
    },

    heading: {
        marginHorizontal: 5,
        marginBottom: 15
    },

    topControls: {
        paddingTop: "70%",
        flex: 1
    },

    loginControls: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    forgotPasswordLink: {
        marginHorizontal: 5,
    },

    bottomControls: {
        flex: 0.3,
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: 30
    }
});