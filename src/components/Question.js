import React from "react";
import { StyleSheet, View } from "react-native";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import FontText from "../components/FontText";

export default (props) => {
    const {
        prompt,
        content
    } = props;

    return (
        <View style={{...styles.question, ...props.style}}>
            <FontText flavor="medium" size={17} color={Colors.darkBlue} style={{marginBottom: 10}}>{prompt}</FontText>
            <View style={styles.content}>
                {content()}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    question: {
        width: "100%"
    }
});