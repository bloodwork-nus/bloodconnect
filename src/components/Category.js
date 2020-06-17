import React from "react";
import { StyleSheet, View } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { TouchableRipple } from "react-native-paper";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import FontText from "../components/FontText";

export default (props) => {
    const {
        title,
        content,
        edit,
        editButtonColor,
        onEdit
    } = props;

    return (
        <View style={{...styles.category, ...props.style}}>
            <FontText flavor="semibold" size={16} color={Colors.darkBlue} style={{marginBottom: 10}}>{title}</FontText>
            <View style={styles.contentContainer}>
                <View style={styles.content}>
                    {content()}
                </View>

                {edit ? 
                    <View style={styles.edit}>
                        <TouchableRipple onPress={onEdit} borderless={true} style={styles.touchable}>
                            <MaterialIcon name="create" color={editButtonColor || Colors.blue} size={20} />
                        </TouchableRipple>
                    </View>
                : null}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    category: {
        width: "100%"
    },

    contentContainer: {
        backgroundColor: Colors.white,
        marginHorizontal: -Dimens.screenPaddingHorizontal,
        paddingHorizontal: Dimens.screenPaddingHorizontal,
        flexDirection: "row",
        paddingVertical: 15
    },

    content: {
        flex: 1
    },

    touchable: {
        width: 25,
        height: 25,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center"
    }
});