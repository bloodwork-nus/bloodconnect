import React, { useState, useEffect } from "react";
import { StyleSheet, View, SectionList, TouchableHighlight, TouchableOpacity } from "react-native";
import moment from "moment";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';
import Strings from '../constants/strings';

import GenericSubScreen from "./GenericSubScreen";
import FontText from "../components/FontText";
import MainOutlineButton from "../components/MainOutlineButton";

import * as Requests from "../../utils/requests";
import * as Authentication from "../../utils/auth";
import MainButton from "../components/MainButton";

import { getMyRequests } from "../store/requests";

export default (props) => {
    const requests = useSelector(getMyRequests(Authentication.getCurrentUserUid()));

    const sectionedRequests = () => {
        const openRequests = Object.values(requests).filter((request) => request.status === Requests.Constants.Status.OPEN);
        const pastRequests = Object.values(requests).filter((request) => request.status !== Requests.Constants.Status.OPEN);
        let requestsToDisplay = [];

        if (openRequests.length > 0) requestsToDisplay.push({
            title: "Active requests",
            data: openRequests
        });

        if (pastRequests.length > 0) requestsToDisplay.push({
            title: "Past requests",
            data: pastRequests
        });

        return requestsToDisplay;
    }

    const renderSectionHeader = ({ section: { title } }) => (
        <FontText flavor="semibold" size={15} style={styles.listSectionHeader} color={Colors.darkBlue}>{title}</FontText>
    );

    const renderRequestItem = ({ item, index, section, separators }) => {
        let finalBloodType = item.payload.bloodType;
        if (finalBloodType === "Any blood groups") finalBloodType = "Any";
        if (finalBloodType === "Other (specify in description)") finalBloodType = "Other";

        return (
            <TouchableHighlight
                activeOpacity={0.95}
                underlayColor={Colors.black}
                onPress={() => requestAnimationFrame(() => {})}
            ><View style={styles.requestItem}>
                <FontText flavor="medium" color={Colors.darkBlue} size={17} numberOfLines={1} >{item.payload.location.locationName}</FontText>
                <FontText color={Colors.lightGrey3} size={15}>{item.payload.location.locationAddress}</FontText>

                <View style={styles.badges}>
                    <FontText flavor="bold" size={25} color={Colors.darkBlue}>{finalBloodType}</FontText>

                    {item.payload.isEmergency ?
                        <FontText flavor="bold" size={15} color={item.status === Requests.Constants.Status.OPEN ? Colors.red : Colors.grey2}>EMERGENCY</FontText>
                    : null}
                </View>
                
                {item.status === Requests.Constants.Status.CANCELLED ? 
                    <FontText flavor="bold" size={15} color={Colors.red} style={{ marginBottom: 10 }}>CANCELLED</FontText>
                : null}

                {item.status === Requests.Constants.Status.COMPLETED ? 
                    <FontText flavor="bold" size={15} color={Colors.green} style={{ marginBottom: 10 }}>COMPLETED</FontText>
                : null}

                <FontText flavor="medium" color={Colors.grey2} size={16}>Made on {moment(item.dateCreated).format("ddd MMM D, YYYY, hh:mm A")}</FontText>

                {item.status === Requests.Constants.Status.COMPLETED ?
                    <FontText flavor="medium" color={Colors.grey2} size={16} style={{ marginTop: 10 }}>
                        Completed on {moment(item.dateCompleted).format("ddd MMM D, YYYY, hh:mm A")} with {item.donor.contactName} ({item.donor.contactNumber}) as the donor.
                    </FontText>
                : null}

                {item.status === Requests.Constants.Status.OPEN && item.donors ? 
                    <FontText flavor="medium" color={Colors.blue} size={16} numberOfLines={1} align="center" style={{ marginTop: 10 }}>{Object.values(item.donors).length} donor{Object.values(item.donors).length > 1 ? "s" : ""}</FontText>
                : null}

                <View style={styles.requestOptions}>
                    {item.status === Requests.Constants.Status.OPEN && item.donors ? 
                        <Button
                            color={Colors.blue}
                            mode="contained"
                            onPress={() => props.navigation.navigate("ViewDonors", {
                                requestId: item.id,
                                locationName: item.payload.location.locationName,
                                locationAddress: item.payload.location.locationAddress,
                                bloodType: item.payload.bloodType,
                                isEmergency: item.payload.isEmergency,
                                dateCreated: item.dateCreated
                            })}
                            style={{ marginBottom: 10, borderRadius: 100 }}
                            labelStyle={{ fontFamily: "inter-semibold" }}
                        >View donors</Button>
                    : null}

                    {item.status === Requests.Constants.Status.OPEN ? 
                        <Button
                            color={Colors.red}
                            mode="outlined"
                            onPress={() => Requests.closeRequest(item.id)}
                            style={{ borderRadius: 100 }}
                            labelStyle={{ fontFamily: "inter-semibold" }}
                        >Close request</Button>
                    : null}

                    {item.status !== Requests.Constants.Status.OPEN ?
                        <Button
                            color={Colors.red}
                            mode="outlined"
                            onPress={() => Requests.deleteRequest(item.id)}
                            style={{ borderRadius: 100 }}
                            labelStyle={{ fontFamily: "inter-semibold" }}
                        >Delete request</Button>
                    : null}
                </View>
            </View></TouchableHighlight>
        );
    };

    return (
        <GenericSubScreen>
            <SectionList
                sections={sectionedRequests()}
                renderItem={renderRequestItem}
                renderSectionHeader={renderSectionHeader}
                ItemSeparatorComponent={({ highlighted, leadingItem }) => (
                    <View style={styles.listItemSeparator}>
                        <View style={{ backgroundColor: Colors.white, width: 30, height: 1 }} />
                    </View>
                )}
                ListHeaderComponent={({ highlighted, leadingItem }) => (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => requestAnimationFrame(() => props.navigation.goBack())}>
                            <Icon name="arrow-back" size={Dimens.glyphSize} color={Colors.blue} style={{ marginRight: 10, marginLeft: -5 }}/>
                        </TouchableOpacity>

                        <FontText flavor="semibold" size={Dimens.heading1} color={Colors.darkBlue}>{Strings.myRequests}</FontText>
                    </View>
                )}
                ListEmptyComponent={
                    <View style={styles.noRequestsMessage}>
                        <FontText flavor="medium" color={Colors.darkBlue} size={20}>
                            You have not made any requests.
                        </FontText>

                        <MainButton
                            caption="Make a request"
                            onPress={() => {}}
                            style={{ marginTop: 20}}
                        />
                    </View>
                }
            />
        </GenericSubScreen>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: Dimens.screenPaddingHorizontal,
        paddingTop: 70,
        paddingBottom: 20,
        flexDirection: "row",
        alignItems: "center"
    },

    listSectionHeader: {
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 30
    },

    listItemSeparator: {
        height: 10,
        backgroundColor: Colors.offGrey
    },

    requestItem: {
        paddingVertical: 15,
        backgroundColor: Colors.white,
        paddingHorizontal: 30,
        justifyContent: "center"
    },

    badges: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10
    },

    requestOptions: {
        marginTop: 10
    },

    noRequestsMessage: {
        paddingHorizontal: Dimens.screenPaddingHorizontal,
        paddingBottom: 20
    }
});