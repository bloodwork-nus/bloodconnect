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
                    <SemiBoldText style={styles.heading} color={Colors.darkBlue} size={Dimens.heading1}>{Strings.logIntoYourAccount}</SemiBoldText>
                    <TextBox
                        placeholder={Strings.email}
                        autoCompleteType="email"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{marginBottom: Dimens.bodyMarginVertical}}
                        returnKeyType="next"
                    />
                    <PasswordTextBox />

                    <View style={styles.loginControls}>
                        <Link 
                            caption={Strings.forgotPassword}
                            size={Dimens.linkTextSize}
                            onPress={() => {}}
                            style={styles.forgotPasswordLink}
                        />
                        
                        <MainButton
                            caption={Strings.logIn}
                            onPress={() => {}}
                            imageRight={<Icon name="arrow-forward" color={Colors.white} size={Dimens.glyphSize} />}
                        />
                    </View>
                </View>

                <View style={styles.bottomControls}>
                    <MainOutlineButton
                        caption={Strings.signInWithGoogle}
                        onPress={() => {}}
                        buttonStyle={{marginBottom: Dimens.bodyMarginVertical}}
                        imageLeft={<GoogleLogo width={"100%"} height={"100%"} />}
                    />
                    
                    <MainOutlineButton caption={Strings.createANewAccount} onPress={() => {}} />
                </View>
            </View>
        </View></ScrollView></KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: Dimensions.get("window").height
    },

    contents: {
        flex: 1,
        paddingHorizontal: Dimens.screenPaddingHorizontal,
        flexDirection: "column",
    },

    heading: {
        marginHorizontal: Dimens.headingNudgeHorizontal,
        marginBottom: Dimens.bodyMarginVertical
    },

    topControls: {
        paddingTop: Dimens.biWavesMarginCompensation,
        flex: 1
    },

    loginControls: {
        marginTop: Dimens.bodyMarginVertical,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },

    forgotPasswordLink: {
        marginHorizontal: Dimens.headingNudgeHorizontal,
    },

    bottomControls: {
        flex: 0.3,
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: Dimens.screenBottomPadding
    }
});