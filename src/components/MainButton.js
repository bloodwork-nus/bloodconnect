import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import SemiBoldText from './SemiBoldText';
import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

export default function MainButton(props) {
    const [pressed, setPressed] = useState(false);

    return (
        <TouchableHighlight
            style={{
                ...(pressed ? styles.buttonPressed : styles.buttonNotPressed),
                ...(pressed ? Dimens.mainButtonBoxShadowPressed : Dimens.mainButtonBoxShadow),
                ...props.style
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
                {props.imageLeft ? <View style={{...styles.image, marginRight: Dimens.mainButtonImageMargin}}>{props.imageLeft}</View> : null}
                <SemiBoldText color={Colors.white} size={Dimens.mainButtonTextSize}>{props.caption}</SemiBoldText>
                {props.imageRight ? <View style={{...styles.image, marginLeft: Dimens.mainButtonImageMargin}}>{props.imageRight}</View> : null}
            </LinearGradient>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        paddingVertical: Dimens.mainButtonPaddingVertical,
        paddingHorizontal: Dimens.mainButtonPaddingHorizontal,
        alignItems: "center",
        justifyContent: "center",
        height: Dimens.mainButtonHeight,
        borderRadius: Dimens.mainButtonHeight / 2
    },

    buttonNotPressed: {
        top: 0
    },

    buttonPressed: {
        top: Dimens.mainButtonPressedNudgeDistance
    },
    
    image: {
        width: Dimens.mainButtonImageSize,
        height: Dimens.mainButtonImageSize,
        justifyContent: "center",
        alignItems: "center"
    }
});