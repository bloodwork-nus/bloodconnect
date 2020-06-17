import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, ScrollView, Keyboard } from "react-native";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import BottomNavBar from '../components/BottomNavBar';
import FontText from "../components/FontText";
import Question from "../components/Question";
import TextBox from "../components/TextBox";
import MainOutlineButton from "../components/MainOutlineButton";

export default (props) => {
    const [showBottomBar, setShowBottomBar] = useState(true);

    useEffect(() => {
        Keyboard.addListener("keyboardWillShow", () => setShowBottomBar(false));
        Keyboard.addListener("keyboardWillHide", () => setShowBottomBar(true));

        return () => {
            Keyboard.removeListener("keyboardWillShow", () => setShowBottomBar(false));
            Keyboard.removeListener("keyboardWillHide", () => setShowBottomBar(true));
        };
    });

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={"rgba(0,0,0,0)"} barStyle="dark-content" translucent={true} />

            <ScrollView contentContainerStyle={styles.content}>
                <FontText flavor="semibold" size={Dimens.heading1} color={Colors.darkBlue}>Fill your particulars</FontText>

                <Question prompt="What's your blood type?" content={() => (
                    <MainOutlineButton caption="Choose" onPress={() => {}} color={Colors.reddishPurple} />
                )} style={{marginVertical: 20}} />

                <Question prompt="What's your name?" content={() => (<>
                    <TextBox 
                        placeholder="Contact name"
                        style={{backgroundColor: Colors.offGrey2}}
                    />
                </>)} style={{marginBottom: 20}} />

                <Question prompt="How can the donee contact you?" content={() => (<>
                    <TextBox 
                        placeholder="Contact number"
                        style={{backgroundColor: Colors.offGrey2}}
                    />
                </>)} style={{marginBottom: 20}} />
            </ScrollView>

            {showBottomBar ? <BottomNavBar /> : null}
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.offGrey,
        position: "relative"
    },

    content: {
        backgroundColor: Colors.offGrey,
        paddingHorizontal: Dimens.screenPaddingHorizontal,
        paddingTop: 70,
        paddingBottom: 100
    },
});