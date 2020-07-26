import React from "react";
import { StyleSheet, TouchableHighlight, Text } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';
import Strings from '../constants/strings';

import GenericSubScreen from "./GenericSubScreen";
import FontText from "../components/FontText";
import MainOutlineButton from "../components/MainOutlineButton";

export default (props) => {
    const { navigation, route: { params: { configureScreen } } } = props;    

    return (
        <GenericSubScreen style={styles.screen}>
            <Icon name="check-circle" color={Colors.green} size={70} />

            <FontText
                flavor="semibold"
                color={Colors.darkBlue}
                size={Dimens.heading1}
                align="center"
                style={{ marginTop: 20 }}
            >{configureScreen.heading}</FontText>

            <FontText
                color={Colors.darkBlue}
                size={Dimens.body1}
                align="center"
                style={{ marginTop: 5 }}
            >{configureScreen.subtitle}</FontText>

            <MainOutlineButton
                caption={configureScreen.backButton} 
                onPress={() => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Explore"}]}))}
                style={{ marginTop: 20 }}
                color={configureScreen.color}
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