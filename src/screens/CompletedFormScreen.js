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
    const { navigation, route: { params: { configureScreen } } } = props;    

    return (
        <GenericSubScreen style={styles.screen}>
            <MaterialIcon name="check-circle" color={Colors.green} size={70} />

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
                onPress={() => navigation.navigate("Explore")}
                style={{ marginTop: 20 }}
                color={configureScreen.color}
                imageLeft={<MaterialIcon name="arrow-back" size={Dimens.glyphSize} color={configureScreen.color} />}
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