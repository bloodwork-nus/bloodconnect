import React from "react";
import { StyleSheet, View, StatusBar, ScrollView } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';
import Strings from '../constants/strings';

import BottomNavBar from '../components/BottomNavBar';
import FontText from "../components/FontText";
import Category from "../components/Category";

export default (props) => {
    const {
        requestType,
        bloodType,
        numberOfUnits,
        contactName,
        contactNumber,
        description,
        isEmergency,
        locationName,
        locationAddress
    } = props.values;

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={"rgba(0,0,0,0)"} barStyle="dark-content" translucent={true} />
            
            <ScrollView contentContainerStyle={styles.content}>
                <FontText flavor="semibold" size={Dimens.heading1} color={Colors.darkBlue}>{Strings.reviewYourRequest}</FontText>

                <Category
                    title={Strings.requestDetails}
                    edit={true}
                    style={{marginTop: 20}}
                    onEdit={() => requestAnimationFrame(() => props.jump(1))}
                    content={() => (<>
                        <FontText size={16} color={Colors.darkBlue}>{Strings.requestingFor}</FontText>
                        <FontText flavor="semibold" size={18} color={Colors.darkBlue} style={{marginBottom: 15}}>{requestType}</FontText>
                        
                        <FontText size={16} color={Colors.darkBlue}>{Strings.bloodType}</FontText>
                        <FontText flavor="semibold" size={18} color={Colors.darkBlue} style={{marginBottom: 15}}>{bloodType}</FontText>

                        <FontText size={16} color={Colors.darkBlue}>{Strings.numberOfUnits}</FontText>
                        <FontText flavor="semibold" size={18} color={Colors.darkBlue}>{numberOfUnits}</FontText>
                    </>)}
                />
                
                <Category
                    title={Strings.contactDetails}
                    edit={true}
                    style={{marginTop: 20}}
                    onEdit={() => requestAnimationFrame(() => props.jump(1))}
                    content={() => (<>
                        <FontText flavor="semibold" size={18} color={Colors.darkBlue} style={{marginBottom: 5}}>{contactName}</FontText>
                        <FontText flavor="medium" size={18} color={Colors.darkBlue}>{contactNumber}</FontText>
                    </>)}
                />
                
                <Category
                    title={Strings.appointmentDetails}
                    edit={true}
                    style={{marginTop: 20}}
                    onEdit={() => requestAnimationFrame(() => props.jump(2))}
                    content={() => (<>
                        <FontText flavor="semibold" size={18} color={Colors.darkBlue}>{locationName}</FontText>
                        <FontText flavor="medium" size={14} color={Colors.darkBlue}>{locationAddress}</FontText>
                        
                        {/* <View style={styles.appointmentTime}>
                            <MaterialIcon name="schedule" size={Dimens.glyphSize} color={Colors.yellow} />
                            <FontText flavor="semibold" size={17} color={Colors.yellow} style={{marginLeft: 10}}>{request.appointmentTime}</FontText>
                        </View> */}
                    </>)}
                />
                
                {description || isEmergency ?
                    <Category
                        title={Strings.additionalDetails}
                        edit={true}
                        style={{marginTop: 20}}
                        onEdit={() => requestAnimationFrame(() => props.jump(1))}
                        content={() => (<>
                            {description ? <FontText size={17} color={Colors.darkBlue} style={{marginBottom: 10}}>{description.trim()}</FontText> : null}
                            {isEmergency ?
                                <View style={styles.emergencyBadge}>
                                    <MaterialIcon name="priority-high" size={Dimens.glyphSize} color={Colors.red} />
                                    <FontText flavor="semibold" size={17} color={Colors.red}>{Strings.thisIsAnEmergency}</FontText>
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