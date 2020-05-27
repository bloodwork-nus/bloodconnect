import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from "react-native";

import SemiBoldText from './SemiBoldText';
import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

export default function MainOutlineButton(props) {
    const [pressed, setPressed] = useState(false);

    return (
        <TouchableHighlight
            style={props.buttonStyle}
            activeOpacity={1}
            underlayColor={"rgba(0,0,0,0)"}
            onShowUnderlay={() => setPressed(true)}
            onHideUnderlay={() => setPressed(false)}
            onPress={props.onPress}
        >
            <View
                style={{
                    ...styles.button,
                    ...(pressed ? styles.buttonPressed : styles.buttonNotPressed)
                }}
            >
                {props.imageLeft ? <View style={{...styles.image, marginRight: Dimens.mainButtonImageMargin}}>{props.imageLeft}</View> : null}
                <SemiBoldText color={Colors.darkBlue} size={Dimens.mainButtonTextSize}>{props.caption}</SemiBoldText>
                {props.imageRight ? <View style={{...styles.image, marginLeft: Dimens.mainButtonImageMargin}}>{props.imageRight}</View> : null}
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0)",
        alignItems: "center",
        justifyContent: "center",
        borderColor: Colors.darkBlue,
        borderWidth: Dimens.mainOutlinedButtonBorderWidth,
        borderRadius: Dimens.mainButtonHeight / 2,
        height: Dimens.mainButtonHeight,
        paddingHorizontal: Dimens.mainButtonPaddingHorizontal,
        paddingVertical: Dimens.mainButtonPaddingVertical
    },

    buttonNotPressed: {
        backgroundColor: "rgba(0,0,0,0)"
    },

    buttonPressed: {
        backgroundColor: "rgba(0,0,0,0.1)"
    },
    
    image: {
        width: Dimens.mainButtonImageSize,
        height: Dimens.mainButtonImageSize,
        justifyContent: "center",
        alignItems: "center"
    }
});