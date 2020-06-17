import React from 'react';
import { StyleSheet, View, TouchableHighlight } from "react-native";

import Colors from "../constants/colors";
import Dimens from "../constants/dimens";

import FontText from "./FontText";

const activeShadow = {
    shadowColor: Colors.black,
    shadowOffset: {
        width: 0,
        height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 9.51,
    elevation: 15
};

export default (props) => {
    const {
        color,
        blobs,
        active,
        onBlobPress
    } = props;

    const renderBlob = (item) => {
        const activeColor = item.id === active ? color : Colors.darkBlue;
        const touchableStyle = {
            flex: (1 / blobs.length) - (blobs.length === 1 ? 0 : 0.03),
            borderRadius: 15,
            ...(item.id === active ? activeShadow : null)
        };

        return (
            <TouchableHighlight
                key={item.id}
                style={touchableStyle}
                onPress={() => requestAnimationFrame(() => onBlobPress(item.id))}
            ><View style={styles.blob}>
                <FontText flavor="semibold" color={activeColor} size={Dimens.mainButtonTextSize}>{item.caption}</FontText>
            </View></TouchableHighlight>
        );
    };

    return (
        <View style={{...styles.blobs, ...props.style}}>
            {blobs.map(renderBlob)}
        </View>
    );
}

const styles = StyleSheet.create({
    blobs: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    blob: {
        height: 65,
        backgroundColor: Colors.white,
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center"
    }
});