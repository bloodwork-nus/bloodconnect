import React from 'react';
import { StyleSheet, TextInput, View } from "react-native";

import Colors from '../constants/colors';

export default function TextBox(props) {
    return (
        <View style={{...styles.textbox, ...props.fieldStyle}}>
            <TextInput
                style={styles.textInput}
                placeholderTextColor={Colors.grey2}
                multiline={false}
                selectionColor={Colors.grey1}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textbox: {
        backgroundColor: Colors.lightGrey,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10
    },

    textInput: {
        fontFamily: "inter-medium",
        fontSize: 17,
        color: Colors.darkBlue
    }
});