import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableHighlight, View } from "react-native";

import SemiBoldText from './SemiBoldText';
import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

export default function MainOutlineButton(props) {
    const [pressed, setPressed] = useState(false);
    const [isObjectCreated, setIsObjectCreated] = useState(false);
    const height = useRef(0);

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
                    ...pressed ? styles.buttonPressed : styles.buttonNotPressed,
                    borderRadius: height.current === 0 ? Dimens.mainButtonBorderRadius : (height.current / 2)
                }}
                onLayout={event => {
                    if (!isObjectCreated) {
                        setIsObjectCreated(true);
                        height.current = event.nativeEvent.layout.height;
                    }
                }}
            >
                {props.imageLeft ? <View style={{...styles.image, marginRight: 10}}>{props.imageLeft}</View> : <View />}
                <SemiBoldText color={Colors.darkBlue} size={Dimens.mainButtonTextSize}>{props.caption}</SemiBoldText>
                {props.imageRight ? <View style={{...styles.image, marginLeft: 10}}>{props.imageRight}</View> : <View />}
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