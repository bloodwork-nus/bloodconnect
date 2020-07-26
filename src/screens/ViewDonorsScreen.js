import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, TouchableOpacity, View } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import moment from "moment";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';
import Strings from '../constants/strings';

import GenericSubScreen from "./GenericSubScreen";
import FontText from "../components/FontText";

import firebase from "../../utils/firebase";
import * as Requests from "../../utils/requests";

export default (props) => {
    const { navigation, route: { params } } = props;

    const [donors, setDonors] = useState([]);

    useEffect(() => {
        const requestDonorsRef = firebase.database().ref(`requests/${params.requestId}/donors`);
        
        requestDonorsRef.on("value", (snapshot) => {
            const snapshotValue = snapshot.val();
            if (snapshotValue !== null) {
                const donorIds = Object.values(snapshotValue);
                firebase.database().ref("donations").once("value").then((snapshot) => {
                    const donations = snapshot.val();
                    setDonors(donorIds.map((donorId) => donations[donorId]));
                });
            }
        });

        return () => requestDonorsRef.off("value");
    }, []);

    const renderDonorItem = ({ item, index, separators }) => (
        <View style={styles.donorItem}>
            <View style={{ flexDirection: "row" }}>
                <FontText flavor="bold" size={25} color={Colors.darkBlue} style={{ width: 65 }}>{item.payload.bloodType}</FontText>

                <View>
                    <FontText flavor="medium" color={Colors.darkBlue} size={17} numberOfLines={1} >{item.payload.contactName}</FontText>
                    <FontText color={Colors.lightGrey3} size={15}>{item.payload.contactNumber}</FontText>
                </View>
            </View>

            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => { Requests.completeRequest(params.requestId, item.payload.contactName, item.payload.contactNumber); navigation.goBack(); }}>
                    <Icon name="check" color={Colors.green} size={Dimens.glyphSize} style={{ marginRight: 20 }} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL(`tel://${item.payload.contactNumber}`)}>
                    <Icon name="call" color={Colors.blue} size={Dimens.glyphSize} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <GenericSubScreen>
            <FlatList
                keyExtractor={(item) => item.dateCreated.toString()} // temporary
                data={donors}
                renderItem={renderDonorItem}
                ListHeaderComponent={
                    <View style={styles.header}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => requestAnimationFrame(() => navigation.goBack())}>
                                <Icon name="arrow-back" size={Dimens.glyphSize} color={Colors.blue} style={{ marginRight: 10, marginLeft: -5 }}/>
                            </TouchableOpacity>

                            <FontText flavor="semibold" size={Dimens.heading1} color={Colors.darkBlue}>Donors</FontText>
                        </View>

                        <View style={styles.requestDetails}>
                            <FontText flavor="medium" color={Colors.darkBlue} size={17} numberOfLines={1} >{params.locationName}</FontText>
                            <FontText color={Colors.lightGrey3} size={15}>{params.locationAddress}</FontText>

                            <View style={styles.badges}>
                                <FontText flavor="bold" size={25} color={Colors.darkBlue}>{params.bloodType}</FontText>

                                {params.isEmergency ?
                                    <FontText flavor="bold" size={15} color={Colors.red}>EMERGENCY</FontText>
                                : null}
                            </View>

                            <FontText flavor="medium" color={Colors.grey2} size={16} numberOfLines={1} >Made on {moment(params.dateCreated).format("ddd MMM D, YYYY, hh:mm A")}</FontText>
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.noDonationsMessage}>
                        <FontText flavor="medium" color={Colors.darkBlue} size={20}>
                            You have no donors yet.
                        </FontText>
                    </View>
                }
                ItemSeparatorComponent={({ highlighted, leadingItem }) => (
                    <View style={styles.listItemSeparator}>
                        <View style={{ backgroundColor: Colors.white, width: 30, height: 1 }} />
                    </View>
                )}
            />
        </GenericSubScreen>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: Dimens.screenPaddingHorizontal,
        paddingTop: 70,
        paddingBottom: 20
    },

    noDonationsMessage: {
        paddingHorizontal: Dimens.screenPaddingHorizontal,
        paddingBottom: 20
    },

    donorItem: {
        paddingVertical: 15,
        backgroundColor: Colors.white,
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between"
    },

    listItemSeparator: {
        height: 10,
        backgroundColor: Colors.offGrey
    },

    badges: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10
    },

    requestDetails: {
        marginTop: 20
    }
});