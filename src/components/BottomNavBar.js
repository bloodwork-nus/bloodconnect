import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { BoxShadow } from "react-native-shadow";

import Colors from "../constants/colors";
import Dimens from "../constants/dimens";

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
    const {
        renderRightButton,
        renderLeftButton
    } = props;

    return (
        <BoxShadow setting={bottomBarShadowSettings}><View style={styles.bar}>
            {renderRightButton ? renderRightButton() : null}
            {renderLeftButton ? renderLeftButton() : null}
        </View></BoxShadow>
    );
}