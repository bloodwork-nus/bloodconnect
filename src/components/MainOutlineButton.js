import React from 'react';
import { View, StyleSheet } from "react-native";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import Button from "./Button";

export default function MainOutlineButton(props) {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: "rgba(0,0,0,0)",
            borderColor: props.color || Colors.darkBlue,
            borderWidth: Dimens.mainOutlinedButtonBorderWidth
        }
    });

    return (
        <Button
            textColor={props.color || Colors.darkBlue}
            textSize={Dimens.mainButtonTextSize}
            height={Dimens.mainButtonHeight}
            borderRadius={Dimens.mainButtonHeight / 2}
            flavor={props.flavor}
            caption={props.caption}
            onPress={props.onPress}
            imageLeft={props.imageLeft}
            imageRight={props.imageRight}
            renderContainer={() => (
                <View style={styles.button} />)
            }
            touchableProps={{
                underlayColor: "rgba(0,0,0,0)",
                style: props.style
            }}
            pressedStyle={{backgroundColor: "rgba(0,0,0,0.1)"}}
            notPressedStyle={{backgroundColor: "rgba(0,0,0,0)"}}
        />
    );
}