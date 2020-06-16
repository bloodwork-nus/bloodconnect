import React from 'react';
import { StyleSheet, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import Button from "./Button";

export default function RoundButton(props) {
    return (
        <Button
            shadow={true}
            height={Dimens.roundButtonSize}
            borderRadius={Dimens.roundButtonSize / 2}
            onPress={() => {}}
            image={<View style={styles.image}>{props.image}</View>}
            renderContainer={() => (
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={[Colors.pink, Colors.reddishPurple]}
                    style={styles.button}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        width: Dimens.roundButtonSize
    },
    
    image: {
        width: Dimens.roundButtonSize,
        height: Dimens.roundButtonSize,
        justifyContent: "center",
        alignItems: "center"
    }
});