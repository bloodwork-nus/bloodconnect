import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { TouchableRipple } from "react-native-paper";

import Dimens from "../constants/dimens";

import FontText from "./FontText";
import MainOutlineButton from "./MainOutlineButton";

export default (props) => {
    const {
        value,
        increment,
        onChangeValue,
        color
    } = props;

    return (
        <View style={styles.numeric}>
            <TouchableRipple
                borderless
                onPress={() => requestAnimationFrame(() => onChangeValue(value - (increment || 1)))}
                style={{ borderRadius: 100 }}
            >
                <MaterialIcon name="remove" color={color} size={Dimens.glyphSize} />
            </TouchableRipple>

            <FontText flavor="bold" size={24}>{value}</FontText>

            <TouchableRipple
                borderless
                onPress={() => requestAnimationFrame(() => onChangeValue(value + (increment || 1)))}
                style={{ borderRadius: 100 }}
            >
                <MaterialIcon name="add" color={color} size={Dimens.glyphSize} />
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