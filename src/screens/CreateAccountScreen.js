import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Dimensions, KeyboardAvoidingView, ScrollView } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";

import Strings from "../constants/strings";
import Colors from "../constants/colors";
import Dimens from "../constants/dimens";

import BiWavesWithLogo from "../components/BiWavesWithLogo";
import TextBox from '../components/TextBox';
import PasswordTextBox from '../components/PasswordTextBox';
import MainButton from '../components/MainButton';
import MainOutlineButton from '../components/MainOutlineButton';
import FontText from "../components/FontText";

import firebase from "../../utils/firebase";

export default function CreateAccountScreen(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(({ user }) => {
                if (user) {
                    user.updateProfile({ displayName: name })
                        .then(() => {
                            user.sendEmailVerification();
                            props.navigation.navigate("Explore", { userName: user.displayName, isVerified: user.emailVerified });
                        });
                }
            })
            .catch(error => alert(`CreateAccountScreen.js: ${error}`));
    };

    return (
        <KeyboardAvoidingView><ScrollView bounces={false}><View style={styles.screen}>
            <StatusBar backgroundColor={"rgba(0,0,0,0)"} barStyle="light-content" translucent={true} />
            <BiWavesWithLogo />

            <View style={styles.contents}>
                <View style={styles.topControls}>
                    <FontText flavor="semibold" style={styles.heading} color={Colors.darkBlue} size={Dimens.heading1}>{Strings.createANewAccount}</FontText>
                    <TextBox
                        placeholder={Strings.fullName}
                        autoCompleteType="name"
                        autoCapitalize="words"
                        style={{marginBottom: Dimens.bodyMarginVertical}}
                        returnKeyType="next"
                        onChangeText={nameInput => setName(nameInput)}
                    />
                    <TextBox
                        placeholder={Strings.email}
                        autoCompleteType="email"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        style={{marginBottom: Dimens.bodyMarginVertical}}
                        returnKeyType="next"
                        onChangeText={emailInput => setEmail(emailInput)}
                    />
                    <PasswordTextBox
                        onChangeText={passwordInput => setPassword(passwordInput)}
                    />

                    <View style={styles.inputControls}>                        
                        <MainButton
                            caption={Strings.joinUs}
                            onPress={handleSignUp}
                            imageRight={<Icon name="arrow-forward" color={Colors.white} size={Dimens.glyphSize} />}
                        />
                    </View>
                </View>

                <View style={styles.bottomControls}>                    
                    <MainOutlineButton
                        caption={Strings.logIntoYourAccount} onPress={() => props.navigation.navigate("Login")}
                        imageLeft={<Icon name="arrow-back" color={Colors.darkBlue} size={Dimens.glyphSize} />}
                    />
                </View>
            </View>
        </View></ScrollView></KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        height: Dimensions.get("window").height,
        backgroundColor: Colors.white
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

    inputControls: {
        marginTop: Dimens.bodyMarginVertical,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },

    bottomControls: {
        flex: 0.3,
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: Dimens.screenBottomPadding
    }
});