import React from 'react';
import { StyleSheet, TextInput, View } from "react-native";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

export default function TextBox(props) {
    return (
        <TextInput
            placeholderTextColor={Colors.grey2}
            multiline={false}
            selectionColor={Colors.grey1}
            {...props}
            style={{...styles.textInput, ...props.style}}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        fontFamily: "inter-medium",
        fontSize: Dimens.textBoxTextSize,
        color: Colors.darkBlue,
        backgroundColor: Colors.lightGrey,
        paddingVertical: Dimens.textBoxPaddingVertical,
        paddingHorizontal: Dimens.textBoxPaddingHorizontal,
        borderRadius: Dimens.textBoxBorderRadius
    }
});