import React from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";

import GenericSubScreen from "./GenericSubScreen";

export default (props) => {
    const {
        isKeyboardAvoiding
    } = props;

    return (
        <GenericSubScreen>
            <KeyboardAvoidingView behaviour="height" enabled={isKeyboardAvoiding === false ? false : true}>
                <ScrollView contentContainerStyle={styles.content}>
                    {props.children}
                </ScrollView>
            </KeyboardAvoidingView>
        </GenericSubScreen>
    );
}
const styles = StyleSheet.create({
    content: {
        backgroundColor: Colors.offGrey,
        paddingHorizontal: Dimens.screenPaddingHorizontal,
        paddingTop: 70,
        paddingBottom: 100
    },
});