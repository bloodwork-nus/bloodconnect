import React from "react";
import { StyleSheet, View, Dimensions, Platform } from "react-native";
import { useSelector } from "react-redux";

import Colors from "../constants/colors";
import Dimens from '../constants/dimens';

import BloodRequestGlyph from "../../assets/icons/blood.svg";
import PlasmaRequestGlyph from "../../assets/icons/plasma.svg";
import PlateletsRequestGlyph from "../../assets/icons/platelets.svg";

import FontText from "../components/FontText";
import MainButton from "../components/MainButton";
import MainColorButton from "./MainColorButton";
import MainOutlineButton from "./MainOutlineButton";

import * as Requests from "../../utils/requests";
import * as Authentication from "../../utils/auth";

import { getRequestById } from "../store/requests";

export default (props) => {
    const { navigation, requestId } = props;

    const request = useSelector(getRequestById(requestId));

    const {
        bloodType,
        contactName,
        contactNumber,
        description,
        isEmergency,
        location: { locationName, locationAddress, latitudeLongitude: { latitude, longitude } },
        numberOfUnits
    } = request.payload;

    const renderRequestTypeIcon = () => {
        switch (request.requestType) {
            case Requests.Constants.RequestTypes.BLOOD:
                return <View style={styles.requestTypeGlyph}><BloodRequestGlyph fill={Colors.reddishPurple} /></View>;
            case Requests.Constants.RequestTypes.PLASMA:
                return <View style={styles.requestTypeGlyph}><PlasmaRequestGlyph fill={Colors.reddishPurple} /></View>;
            case Requests.Constants.RequestTypes.PLATELETS:
                return <View style={styles.requestTypeGlyph}><PlateletsRequestGlyph fill={Colors.reddishPurple} /></View>;
        };
    }

    const numberOfDonors = request.donors ? Object.values(request.donors).length : 0;

    return (
        <View style={styles.container}><View style={styles.locationCard}>
            <View style={styles.requestTypeBadge}>
                {renderRequestTypeIcon()}
                <FontText flavor="semibold" size={14} color={Colors.reddishPurple} style={{ textTransform: "capitalize" }}>{request.requestType} request</FontText>
            </View>

            <FontText flavor="medium" size={19} color={Colors.darkBlue} style={{marginBottom: Platform.OS === "ios" ? 3 : 0}}>{locationName}</FontText>
            <FontText size={13} color={Colors.lightGrey3} numberOfLines={1} style={{marginBottom: Platform.OS === "ios" ? 7 : 5}}>{locationAddress}</FontText>

            {description ? 
                <FontText size={16} color={Colors.darkBlue}>{description}</FontText>
            : null}

            <View style={styles.badges}>
                <FontText flavor="bold" size={30} color={Colors.darkBlue}>{Requests.Constants.BloodTypesLabel[bloodType].short}</FontText>

                {isEmergency ?
                    <FontText flavor="bold" size={15} color={Colors.red}>EMERGENCY</FontText>
                : null}
            </View>

            <FontText flavor="semibold" color={Colors.darkBlue} size={15} style->Compatible donors</FontText>
            <FontText color={Colors.darkBlue} size={17} style={{ marginBottom: 15, marginTop: 5 }}>
                {Requests.Constants.DonorCompatibility[bloodType].map((bloodTypeId) => Requests.Constants.BloodTypesLabel[bloodTypeId].value).reduce((a, b) => a + "  |  " + b)}
            </FontText>
            
            {request.requester === Authentication.getCurrentUserUid() ?
                numberOfDonors > 0 ? 
                    <MainColorButton
                        shadow={false}
                        color={Colors.blue}
                        textColor={Colors.white}
                        caption={`View ${numberOfDonors} donor${numberOfDonors > 1 ? "s" : ""}`}
                        height={35}
                        onPress={() => navigation.navigate("ViewDonors", {
                            requestId: requestId,
                            locationName: locationName,
                            locationAddress: locationAddress,
                            bloodType: bloodType,
                            isEmergency: isEmergency,
                            dateCreated: request.dateCreated
                        })}
                    />
                :
                    <MainOutlineButton
                        shadow={false}
                        color={Colors.darkBlue}
                        textColor={Colors.blue}
                        caption="Manage request"
                        height={35}
                        onPress={() => navigation.navigate("Requests")}
                    />
            :
                <MainButton
                    shadow={false}
                    caption="Donate"
                    height={35}
                    onPress={() => navigation.navigate("Donate", { requestId, requestBloodType: bloodType })}
                />
            }
        </View></View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        alignSelf: "center",
        bottom: Dimens.bottomBarHeight + Dimens.bottomSheetHeaderHeight + 30,
        elevation: 0
    },

    locationCard: {
        width: Dimensions.get("window").width - (Dimens.bottomSheetPaddingHorizontal * 2),
        zIndex: 10,
        backgroundColor: Colors.white,
        borderRadius: 20,
        paddingHorizontal: 23,
        paddingTop: 10,
        paddingBottom: 15,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,

        elevation: 10,
    },

    badges: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },

    requestTypeBadge: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginBottom: 15
    },

    requestTypeGlyph: {
        width: 23,
        height: 23,
        marginRight: 10
    }
});