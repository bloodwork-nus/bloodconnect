import React from "react";
import { StyleSheet, View } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import FontText from "../components/FontText";

export default (props) => {
    const {
        prompt,
        content,
        info
    } = props;

    const showInfo = () => {
        alert(info);
    }

    return (
        <View style={{...styles.question, ...props.style}}>
            <View style={styles.prompt}>
                <FontText flavor="medium" size={17} color={Colors.darkBlue}>{prompt}</FontText>

                {info ? 
                    <TouchableRipple onPress={showInfo} borderless={true} style={styles.touchable}>
                        <Icon name="info" size={23} color={Colors.grey2} />
                    </TouchableRipple>
                : null}
            </View>

            <View style={styles.content}>
                {content()}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    question: {
        width: "100%"
    },

    prompt: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        justifyContent: "space-between"
    },

    touchable: {
        width: 25,
        height: 25,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 10
    }
});