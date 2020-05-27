import React from 'react';
import { StyleSheet, TextInput, View } from "react-native";

import Colors from '../constants/colors';

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
        fontSize: 17,
        color: Colors.darkBlue,
        backgroundColor: Colors.lightGrey,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10
    }
});