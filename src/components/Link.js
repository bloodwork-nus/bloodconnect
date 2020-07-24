import React from 'react';
import { StyleSheet, TouchableHighlight, View } from "react-native";

import Colors from '../constants/colors';

import FontText from "./FontText";

export default function Link(props) {
    return (
        <TouchableHighlight onPress={props.onPress}>
            <View style={{...styles.link, ...props.style}}>
                <FontText flavor="medium" color={Colors.blue} size={props.size}>{props.caption}</FontText>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    link: {
        alignSelf: "flex-start"
    }
});