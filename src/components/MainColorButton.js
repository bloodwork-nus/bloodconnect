import React from 'react';
import { StyleSheet, View } from "react-native";

import Dimens from '../constants/dimens';

import Button from "./Button";

export default function MainWhiteButton(props) {
    const styles = StyleSheet.create({
        button: {
            backgroundColor: props.color
        }
    });

    return (
        <Button
            shadow={true}
            textColor={props.textColor}
            textSize={Dimens.mainButtonTextSize}
            caption={props.caption}
            onPress={() => {}}
            imageLeft={props.imageLeft}
            imageRight={props.imageRight}
            renderContainer={() => (
                <View style={{...styles.button, ...props.style}} />
            )}
            touchableProps={{
                style: props.style
            }}
            height={props.height ? props.height : Dimens.mainButtonHeight}
            borderRadius={props.height ? props.height / 2 : Dimens.mainButtonHeight / 2}
        />
    );
}