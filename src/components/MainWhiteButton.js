import React from 'react';
import { StyleSheet, View } from "react-native";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import Button from "./Button";

export default function MainWhiteButton(props) {
    return (
        <Button
            shadow={true}
            textColor={Colors.darkBlue}
            textSize={Dimens.mainButtonTextSize}
            caption={props.caption}
            onPress={props.onPress}
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

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.white
    }
});