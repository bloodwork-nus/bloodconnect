import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from "react-native";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

export default function RoundWhiteButton(props) {
    const [pressed, setPressed] = useState(false);

    return (
        <TouchableHighlight
            style={{
                ...(pressed ? styles.buttonPressed : styles.buttonNotPressed),
                ...(pressed ? Dimens.mainButtonBoxShadowPressed : Dimens.mainButtonBoxShadow),
                ...(props.style)
            }}
            activeOpacity={1}
            underlayColor={"rgba(0,0,0,0)"}
            onShowUnderlay={() => setPressed(true)}
            onHideUnderlay={() => setPressed(false)}
            onPress={props.onPress}
        >
            <View
                style={{
                    ...styles.button,
                    ...(pressed ? Dimens.mainButtonBoxShadowPressed : Dimens.mainButtonBoxShadow)
                }}
            >
                <View style={styles.image}>{props.image}</View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: Dimens.roundButtonSize,
        height: Dimens.roundButtonSize,
        borderRadius: Dimens.roundButtonSize / 2
    },

    buttonNotPressed: {
        top: 0
    },

    buttonPressed: {
        top: Dimens.mainButtonPressedNudgeDistance
    },
    
    image: {
        width: Dimens.roundButtonSize,
        height: Dimens.roundButtonSize,
        justifyContent: "center",
        alignItems: "center"
    }
});