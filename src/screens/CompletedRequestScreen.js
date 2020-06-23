import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';
import Strings from '../constants/strings';

import GenericSubScreen from "./GenericSubScreen";
import FontText from "../components/FontText";
import MainOutlineButton from "../components/MainOutlineButton";

export default (props) => {
    return (
        <GenericSubScreen style={styles.screen}>
            <MaterialIcon name="check-circle" color={Colors.green} size={70} />

            <FontText
                flavor="semibold"
                color={Colors.darkBlue}
                size={Dimens.heading1}
                align="center"
                style={{ marginTop: 20 }}
            >{Strings.allDone}</FontText>

            <FontText
                color={Colors.darkBlue}
                size={Dimens.body1}
                align="center"
                style={{ marginTop: 5 }}
            >{Strings.requestMadeText}</FontText>

            <MainOutlineButton
                caption="Return home" 
                onPress={() => {}}
                style={{ marginTop: 20 }}
                color={Colors.blue}
                imageLeft={<MaterialIcon name="arrow-back" size={Dimens.glyphSize} color={Colors.blue} />}
            />
        </GenericSubScreen>
    );
}
const styles = StyleSheet.create({
    screen: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 60
    }
});