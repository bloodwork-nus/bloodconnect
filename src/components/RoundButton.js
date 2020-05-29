import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

export default function RoundButton(props) {
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
            <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={[Colors.pink, Colors.reddishPurple]}
                style={{
                    ...styles.button,
                    ...(pressed ? Dimens.mainButtonBoxShadowPressed : Dimens.mainButtonBoxShadow)
                }}
            >
                <View style={styles.image}>{props.image}</View>
            </LinearGradient>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
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