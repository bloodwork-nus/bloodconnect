import React from "react";
import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableRipple } from "react-native-paper";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import FontText from "../components/FontText";

import * as Authentication from "../../utils/auth";

export default (props) => {
    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={"rgba(0,0,0,0)"} barStyle="dark-content" translucent={true} />

            <ScrollView contentContainerStyle={styles.content}>
                <FontText flavor="semibold" size={Dimens.heading1} color={Colors.darkBlue}>{Authentication.getCurrentUser().displayName}</FontText>
                <FontText size={17} color={Colors.darkBlue} style={{marginBottom: 10}}>{Authentication.getCurrentUser().email}</FontText>
                {Authentication.getCurrentUser().emailVerified ? 
                    <View style={styles.badge}>
                        <MaterialCommunityIcon name="check-circle-outline" size={25} color={Colors.green} />
                        <FontText flavor="medium" size={15} color={Colors.green} style={{marginLeft: 5}}>Verified</FontText>
                    </View>
                :
                    <TouchableRipple borderless={true} onPress={() => {}}><View style={styles.badge}>
                        <MaterialCommunityIcon name="alert-circle-outline" size={25} color={Colors.yellow} />
                        <FontText flavor="medium" size={15} color={Colors.yellow} style={{marginLeft: 5}}>Verify email</FontText>
                    </View></TouchableRipple>
                }
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.offGrey,
        position: "relative"
    },

    content: {
        backgroundColor: Colors.offGrey,
        paddingHorizontal: Dimens.screenPaddingHorizontal,
        paddingTop: 70,
        paddingBottom: 100
    },

    badge: {
        flexDirection: "row",
        alignItems: "center"
    }
});