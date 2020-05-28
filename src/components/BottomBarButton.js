import React from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native";

import Colors from "../constants/colors";
import MediumText from "./MediumText";

export default function BottomBarButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            {props.isOnPage ?
                <View style={styles.button}>
                    <View style={{justifyContent: "center", marginRight: 5}}>{props.image}</View>
                    <View style={{justifyContent: "center"}}><MediumText color={Colors.darkBlue} size={15}>{props.caption}</MediumText></View>
                </View>
                :
                props.image
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 45,
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: Colors.lightGrey2,
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center"
    }
});