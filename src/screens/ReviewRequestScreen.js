import React from "react";
import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import BottomNavBar from '../components/BottomNavBar';
import FontText from "../components/FontText";
import Category from "../components/Category";

export default (props) => {
    const request = {
        requestType: "Blood",
        bloodType: "AB",
        units: 5,
        contactName: "Phillmont Muktar",
        contactNumber: "9641 3313",
        venue: "Alexandria Hospital",
        venueAddress: "25 Upper Hill Rd, City Hall, Singapore 100101",
        appointmentTime: "Thu Jun 22, 2020, 09:52",
        description: "Requires blood transfusion fast. Can fetch if willing to donate.",
        isEmergency: true
    }

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={"rgba(0,0,0,0)"} barStyle="dark-content" translucent={true} />
            
            <ScrollView contentContainerStyle={styles.content}>
                <FontText flavor="semibold" size={Dimens.heading1} color={Colors.darkBlue}>Review your request</FontText>

                <Category
                    title="Request details"
                    edit={true}
                    style={{marginTop: 20}}
                    onEdit={() => {}}
                    content={() => (<>
                        <FontText size={16} color={Colors.darkBlue}>Requesting for</FontText>
                        <FontText flavor="semibold" size={18} color={Colors.darkBlue} style={{marginBottom: 15}}>{request.requestType}</FontText>
                        
                        <FontText size={16} color={Colors.darkBlue}>Blood type</FontText>
                        <FontText flavor="semibold" size={18} color={Colors.darkBlue} style={{marginBottom: 15}}>{request.bloodType}</FontText>

                        <FontText size={16} color={Colors.darkBlue}>Number of units</FontText>
                        <FontText flavor="semibold" size={18} color={Colors.darkBlue}>{request.units}</FontText>
                    </>)}
                />
                
                <Category
                    title="Contact details"
                    edit={true}
                    style={{marginTop: 20}}
                    onEdit={() => {}}
                    content={() => (<>
                        <FontText flavor="semibold" size={18} color={Colors.darkBlue} style={{marginBottom: 5}}>{request.contactName}</FontText>
                        <FontText flavor="medium" size={18} color={Colors.darkBlue}>{request.contactNumber}</FontText>
                    </>)}
                />
                
                <Category
                    title="Appointment details"
                    edit={true}
                    style={{marginTop: 20}}
                    onEdit={() => {}}
                    content={() => (<>
                        <FontText flavor="semibold" size={18} color={Colors.darkBlue}>{request.venue}</FontText>
                        <FontText flavor="medium" size={14} color={Colors.darkBlue}>{request.venueAddress}</FontText>
                        
                        <View style={styles.appointmentTime}>
                            <MaterialIcon name="schedule" size={Dimens.glyphSize} color={Colors.yellow} />
                            <FontText flavor="semibold" size={17} color={Colors.yellow} style={{marginLeft: 10}}>{request.appointmentTime}</FontText>
                        </View>
                    </>)}
                />
                
                {request.description || request.isEmergency ?
                    <Category
                        title="Additional details"
                        edit={true}
                        style={{marginTop: 20}}
                        onEdit={() => {}}
                        content={() => (<>
                            {request.description ? <FontText size={17} color={Colors.darkBlue} style={{marginBottom: 10}}>{request.description}</FontText> : null}
                            {request.isEmergency ?
                                <View style={styles.emergencyBadge}>
                                    <MaterialIcon name="priority-high" size={Dimens.glyphSize} color={Colors.red} />
                                    <FontText flavor="semibold" size={17} color={Colors.red}>This is an emergency</FontText>
                                </View>
                            : null}
                        </>)}
                    />
                : null}
                
            </ScrollView>

            <BottomNavBar />
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

    appointmentTime: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },

    emergencyBadge: {
        flexDirection: "row",
        alignItems: "center"
    }
});