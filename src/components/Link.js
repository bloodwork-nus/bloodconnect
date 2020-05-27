import React from 'react';
import { StyleSheet, TouchableHighlight, View } from "react-native";

import MediumText from "./MediumText";
import Colors from '../constants/colors';

export default function Link(props) {
    return (
        <TouchableHighlight onPress={props.onPress}>
            <View style={{...styles.link, ...props.style}}>
                <MediumText color={Colors.blue} size={props.size}>{props.caption}</MediumText>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    link: {
        alignSelf: "flex-start"
    }
});