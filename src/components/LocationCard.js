import React from "react";
import { StyleSheet, View, Dimensions, Platform } from "react-native";

import Colors from "../constants/colors";
import Dimens from '../constants/dimens';

import FontText from "../components/FontText";
import MainButton from "../components/MainButton";

export default (props) => {
    const { navigation, request, requestId } = props;

    const {
        bloodType,
        contactName,
        contactNumber,
        description,
        isEmergency,
        location: { locationName, locationAddress, latitudeLongitude: { latitude, longitude } },
        numberOfUnits
    } = request.payload;

    return (
        <View style={styles.container}><View style={styles.locationCard}>
            <FontText flavor="medium" size={19} color={Colors.darkBlue} style={{marginBottom: Platform.OS === "ios" ? 3 : 0}}>{locationName}</FontText>
            <FontText size={13} color={Colors.lightGrey3} numberOfLines={1} style={{marginBottom: Platform.OS === "ios" ? 7 : 5}}>{locationAddress}</FontText>

            {description ? 
                <FontText size={16} color={Colors.darkBlue}>{description}</FontText>
            : null}

            <View style={styles.badges}>
                <FontText flavor="bold" size={30} color={Colors.darkBlue}>{bloodType}</FontText>

                {isEmergency ?
                    <FontText flavor="bold" size={15} color={Colors.red}>EMERGENCY</FontText>
                : null}
            </View>

            <MainButton
                shadow={false}
                caption="Donate"
                height={35}
                onPress={() => navigation.navigate("Donate", { requestId })}
            />
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
        paddingVertical: 0,
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
    }
});