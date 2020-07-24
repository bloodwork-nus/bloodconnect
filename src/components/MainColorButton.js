import React from 'react';
import { StyleSheet, View } from "react-native";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import Button from "./Button";

export default (props) => {
    const {
        shadow,
        textColor,
        caption,
        onPress,
        imageLeft,
        imageRight,
        height,
        color
    } = props;

    const styles = StyleSheet.create({
        button: {
            backgroundColor: color
        }
    });

    return (
        <Button
            shadow={shadow === false ? false : true}
            textColor={textColor || Colors.darkBlue}
            textSize={Dimens.mainButtonTextSize}
            caption={caption}
            onPress={onPress}
            imageLeft={imageLeft}
            imageRight={imageRight}
            renderContainer={() => (
                <View style={{...styles.button, ...props.style}} />
            )}
            touchableProps={{
                style: props.style
            }}
            height={height ? height : Dimens.mainButtonHeight}
            borderRadius={height ? height / 2 : Dimens.mainButtonHeight / 2}
        />
    );
}