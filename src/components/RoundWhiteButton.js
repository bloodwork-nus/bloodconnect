import React from 'react';
import { StyleSheet, View } from "react-native";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import Button from "./Button";

export default function RoundWhiteButton(props) {
    return (
        <Button
            shadow={true}
            height={Dimens.roundButtonSize}
            borderRadius={Dimens.roundButtonSize / 2}
            onPress={props.onPress}
            image={<View style={styles.image}>{props.image}</View>}
            renderContainer={() => (
                <View style={styles.button} />
            )}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.white,
        width: Dimens.roundButtonSize
    },
    
    image: {
        width: Dimens.roundButtonSize,
        height: Dimens.roundButtonSize,
        justifyContent: "center",
        alignItems: "center"
    }
});