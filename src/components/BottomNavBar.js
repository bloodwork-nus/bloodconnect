import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { BoxShadow } from "react-native-shadow";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import Colors from "../constants/colors";
import Dimens from "../constants/dimens";

import MainButton from "./MainButton";
import MainColorButton from "./MainColorButton";
import MainWhiteButton from "./MainWhiteButton";

const bottomBarWidth = Dimensions.get("window").width;
const bottomBarHeight = 80;

const styles = StyleSheet.create({
    bar: {
        width: bottomBarWidth,
        height: bottomBarHeight,
        backgroundColor: Colors.white,
        position: "absolute",
        bottom: 0,
        shadowColor: Colors.black,
        shadowOffset: {
            x: 0,
            y: 0
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Dimens.screenPaddingHorizontal
    },
});

const bottomBarShadowSettings = {
	width: bottomBarWidth,
	height: bottomBarHeight,
	color: Colors.black,
	border: 100,
	radius: 0,
	opacity: 0.1,
	x: 0,
    y: 70,
    style: {...styles.bar}
};

export default (props) => {
    return (
        <BoxShadow setting={bottomBarShadowSettings}><View style={styles.bar}>
            <MainWhiteButton
                caption="Cancel"
                onPress={() => {}}
            />

            <MainColorButton
                caption="Next"
                color={Colors.blue}
                textColor={Colors.white}
                imageRight={<MaterialIcon name="arrow-forward" color={Colors.white} size={Dimens.glyphSize} />}
                onPress={() => {}}
            />
        </View></BoxShadow>
    );
}