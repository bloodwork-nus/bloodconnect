import React from "react";
import { StyleSheet, ScrollView } from "react-native";

import GenericSubScreen from "./GenericSubScreen";

export default (props) => {
    return (
        <GenericSubScreen>
            <ScrollView contentContainerStyle={styles.content}>
                {props.children}
            </ScrollView>
        </GenericSubScreen>
    );
}
const styles = StyleSheet.create({
    content: {
        backgroundColor: Colors.offGrey,
        paddingHorizontal: Dimens.screenPaddingHorizontal,
        paddingTop: 70,
        paddingBottom: 100
    },
});