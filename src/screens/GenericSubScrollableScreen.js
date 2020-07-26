import React from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView } from "react-native";

import Colors from "../constants/colors";
import Dimens from "../constants/dimens";

import GenericSubScreen from "./GenericSubScreen";

export default (props) => {
    const {
        isKeyboardAvoiding,
        renderOutsideScrollViewTop,
        renderOutsideScrollViewBottom
    } = props;

    return (
        <GenericSubScreen>
            {renderOutsideScrollViewTop ? renderOutsideScrollViewTop() : null}

            <KeyboardAvoidingView behaviour="height" enabled={isKeyboardAvoiding === false ? false : true}>
                <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="always">
                    {props.children}
                </ScrollView>
            </KeyboardAvoidingView>

            {renderOutsideScrollViewBottom ? renderOutsideScrollViewBottom() : null}
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