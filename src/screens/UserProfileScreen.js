import React from "react";
import { StyleSheet, View, StatusBar, TouchableOpacity, SectionList, TouchableHighlight } from "react-native";
import { MaterialIcons as MaterialIcon, MaterialCommunityIcons as MaterialCommunityIcon } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";
import Constants from "expo-constants";
import { CommonActions } from "@react-navigation/native";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';
import Strings from '../constants/strings';

import FontText from "../components/FontText";

import * as Authentication from "../../utils/auth";

const renderListItem = ({ item, index, section, separators }) => (
    <TouchableHighlight
        activeOpacity={0.95}
        underlayColor={Colors.black}
        onPress={() => requestAnimationFrame(item.onPress)}
    ><View style={styles.menuItem}>
        <FontText size={17} color={item.color || Colors.black} numberOfLines={1}>{item.label}</FontText>
    </View></TouchableHighlight>
);

const renderListSectionHeader = ({ section: { title } }) => (
    <FontText flavor="semibold" size={15} style={styles.listSectionHeader}>{title}</FontText>
);

export default (props) => {
    const { navigation, route: { params } } = props;

    const settings = [
        {
            title: "Donations and requests",
            data: [
                {
                    id: "manageRequests",
                    label: "Manage requests",
                    onPress: () => navigation.navigate("Requests")
                }
            ]
        },
        {
            title: "Account preferences",
            data: [
                {
                    id: "changeName",
                    label: "Change user name",
                    onPress: () => {}
                },
                {
                    id: "changePassword",
                    label: "Change password",
                    onPress: () => {}
                },
                {
                    id: "changeEmailAddress",
                    label: "Change email address",
                    onPress: () => {}
                },
                {
                    id: "changePhoneNumber",
                    label: "Change phone number",
                    onPress: () => {}
                }
            ]
        },
        {
            title: "Danger zone!",
            data: [
                {
                    id: "signOut",
                    label: "Sign out",
                    color: Colors.red,
                    onPress: () => Authentication.signOut()
                        .then(() => navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Login" }] })))
                        .catch((error) => alert(`UserProfileScreen.js: ${error}`))
                },
                {
                    id: "deleteAccount",
                    label: "Delete my account",
                    color: Colors.red,
                    onPress: () => {}
                }
            ]
        }
    ];

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={"rgba(0,0,0,0)"} barStyle="dark-content" translucent={true} />

            <SectionList
                sections={settings}
                renderItem={renderListItem}
                renderSectionHeader={renderListSectionHeader}
                ItemSeparatorComponent={({ highlighted, leadingItem }) => (
                    <View style={styles.menuItemSeparator}>
                        <View style={{ backgroundColor: Colors.white, width: 30, height: 1 }} />
                    </View>
                )}
                ListFooterComponent={
                    <View style={{ height: 100 }}>
                        <FontText flavor="medium" size={14} style={styles.listSectionHeader} color={Colors.grey4}>
                            {`${Constants.manifest.name} version ${Constants.manifest.version}`}
                        </FontText>
                    </View>
                }
                style={styles.content}
                ListHeaderComponent={({ highlighted, leadingItem }) => (
                    <View style={styles.userProfile}>
                        <TouchableOpacity onPress={() => requestAnimationFrame(() => navigation.goBack())} style={{ marginBottom: 10 }}>
                            <MaterialIcon name="arrow-back" size={Dimens.glyphSize} color={Colors.blue} style={{ marginRight: 10, marginLeft: -5 }}/>
                        </TouchableOpacity>

                        <FontText flavor="semibold" size={Dimens.heading1} color={Colors.darkBlue}>{Authentication.getCurrentUser().displayName}</FontText>
                        
                        <FontText size={17} color={Colors.darkBlue} style={{ marginBottom: 10 }}>{Authentication.getCurrentUser().email}</FontText>
                        {Authentication.getCurrentUser().emailVerified ? 
                            <View style={styles.badge}>
                                <MaterialCommunityIcon name="check-circle-outline" size={25} color={Colors.green} />
                                <FontText flavor="medium" size={15} color={Colors.green} style={{ marginLeft: 5 }}>Verified</FontText>
                            </View>
                        :
                            <TouchableRipple borderless={true} onPress={() => {}}><View style={styles.badge}>
                                <MaterialCommunityIcon name="alert-circle-outline" size={25} color={Colors.yellow} />
                                <FontText flavor="medium" size={15} color={Colors.yellow} style={{ marginLeft: 5 }}>Verify email</FontText>
                            </View></TouchableRipple>
                        }
                    </View>
                )}
                
            />
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
        paddingTop: 40,
        paddingBottom: 100
    },

    badge: {
        flexDirection: "row",
        alignItems: "center"
    },

    menuItemSeparator: {
        height: 1,
        backgroundColor: Colors.offGrey2
    },

    listSectionHeader: {
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 30
    },

    menuItem: {
        height: 50,
        backgroundColor: Colors.white,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 30
    },

    userProfile: {
        paddingHorizontal: Dimens.screenPaddingHorizontal,
        paddingBottom: 20
    }
});