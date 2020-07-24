import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { TouchableRipple } from "react-native-paper";

import Colors from "../constants/colors";
import Dimens from "../constants/dimens";

import FontText from "./FontText";
import MainOutlineButton from "./MainOutlineButton";

export default (props) => {
    const {
        value,
        increment,
        onChangeValue,
        color,
        minimum,
        maximum
    } = props;

    const decreaseButtonEnabled = value > minimum;
    const increaseButtonEnabled = value < maximum;

    return (
        <View style={styles.numeric}>
            <TouchableRipple
                borderless
                onPress={() => requestAnimationFrame(() => onChangeValue(value - (increment || 1)))}
                style={{ borderRadius: 100 }}
                disabled={!decreaseButtonEnabled}
            >
                <MaterialIcon name="remove" color={decreaseButtonEnabled ? color : Colors.grey1} size={Dimens.glyphSize} />
            </TouchableRipple>

            <FontText flavor="bold" size={24}>{value}</FontText>

            <TouchableRipple
                borderless
                onPress={() => requestAnimationFrame(() => onChangeValue(value + (increment || 1)))}
                style={{ borderRadius: 100 }}
                disabled={!increaseButtonEnabled}
            >
                <MaterialIcon name="add" color={increaseButtonEnabled ? color : Colors.grey1} size={Dimens.glyphSize} />
            </TouchableRipple>
        </View>
    );
}

const styles = StyleSheet.create({
    numeric: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
});