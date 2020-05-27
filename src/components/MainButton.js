import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import SemiBoldText from './SemiBoldText';
import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

export default function MainButton(props) {
    const [pressed, setPressed] = useState(false);
    const [height, setHeight] = useState(0);

    return (
        <TouchableHighlight
            style={
                pressed ? styles.buttonPressed : styles.buttonNotPressed
            }
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
                    ...(pressed ? Dimens.mainButtonBoxShadowPressed : Dimens.mainButtonBoxShadow),
                    borderRadius: height === 0 ? Dimens.mainButtonBorderRadius : (height / 2)
                }}
                onLayout={event => setHeight(event.nativeEvent.layout.height)}
            >
                <SemiBoldText color={Colors.white} size={Dimens.mainButtonTextSize}>{props.caption}</SemiBoldText>
            </LinearGradient>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.reddishPurple,
        paddingVertical: Dimens.mainButtonPaddingVertical,
        paddingHorizontal: Dimens.mainButtonPaddingHorizontal,
        alignItems: "center",
        ...Dimens.mainButtonBoxShadow
    },

    buttonNotPressed: {
        top: 0
    },

    buttonPressed: {
        top: 4
    }
});