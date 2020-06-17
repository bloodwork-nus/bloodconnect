import React from "react";
import { StyleSheet, View, ToastAndroid } from "react-native";
import { Checkbox } from "react-native-paper";

import Dimens from "../constants/dimens";
import Colors from "../constants/colors";

import FontText from "./FontText";

export default (props) => {
    const {
        color,
        flavor,
        caption,
        textColor,
        description,
        checkedState,
        onPress,
        justifyContent
    } = props;

    const styles = StyleSheet.create({
        text: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent
        }
    });

    return (
        <View style={{...styles.checkbox, ...props.style}}>
            <View style={styles.text}>
                <Checkbox.Android
                    color={color}
                    status={checkedState ? "checked" : "unchecked"}
                    onPress={onPress}
                />

                <FontText
                    {...flavor ? {flavor} : null}
                    size={Dimens.mainButtonTextSize}
                    color={textColor || Colors.darkBlue}
                    onPress={onPress}
                >
                    {caption}
                </FontText>
            </View>

            
            {description ? 
                <FontText
                    size={Dimens.mainButtonTextSize}
                    color={Colors.grey2}
                    size={14}
                    style={{marginLeft: 36}}
                    onPress={onPress}
                >{description}</FontText>
            : null}
        </View>
    );
}
