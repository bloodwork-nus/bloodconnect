import React, { useState } from "react";
import { StyleSheet, View, FlatList, Keyboard } from "react-native";
import { TouchableRipple } from "react-native-paper";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';
import Strings from "../constants/strings";

import GenericSubScrollableScreen from "./GenericSubScrollableScreen";
import BottomNavBar from '../components/BottomNavBar';
import FontText from "../components/FontText";
import Question from "../components/Question";
import TextBox from "../components/TextBox";
import MainOutlineButton from "../components/MainOutlineButton";
import MainColorButton from "../components/MainColorButton";
import MainButton from "../components/MainButton";
import BottomSheetModal from "../components/BottomSheetModal";

import * as Requests from "../../utils/requests";
import * as Authentication from "../../utils/auth";

export default (props) => {
    const { navigation, route: { params: { requestId, requestBloodType } } } = props;

    const [bloodType, setBloodType] = useState("");
    const [contactName, setContactName] = useState(Authentication.getCurrentUserName());
    const [contactNumber, setContactNumber] = useState("");

    const [isBloodTypeModalVisible, setIsBloodTypeModalVisible] = useState(false);

    const submitDonation = () => {
        if (bloodType === "") return alert("Select a blood type");
        if (contactName === "") return alert("Specify a contact name");
        if (contactNumber === "") return alert("Specify a contact number");

        Requests.donateToRequest(requestId, {
            donor: Authentication.getCurrentUserUid(),
            requestId,
            dateCreated: Date.now(),
            payload: {
                bloodType,
                contactName,
                contactNumber
            }
        }, (error) => {
            if (error) {
                alert("An error has occurred! " + error);
                console.log(error);
            } else {
                navigation.navigate("CompletedForm", {
                    configureScreen: {
                        heading: Strings.thanks,
                        subtitle: Strings.donationMadeText,
                        color: Colors.reddishPurple,
                        backButton: Strings.returnHome
                    }
                });
            }
        }, () => {
            navigation.navigate("CompletedForm", {
                configureScreen: {
                    heading: Strings.whoops,
                    subtitle: Strings.requestWasCompleted,
                    color: Colors.yellow,
                    backButton: Strings.returnHome,
                    icon: "error",
                    iconColor: Colors.yellow
                }
            });
        });
    }

    return (
        <GenericSubScrollableScreen
            renderOutsideScrollViewBottom={() => (<>
                <BottomSheetModal
                    height={400}
                    visible={isBloodTypeModalVisible}
                    onClose={() => setIsBloodTypeModalVisible(false)}
                    renderContent={() => (
                        <View style={styles.bloodTypeModal}>
                            <FontText
                                flavor="semibold"
                                size={20}
                                color={Colors.darkBlue}
                                style={{paddingHorizontal: Dimens.screenPaddingHorizontal}}
                            >{Strings.chooseBloodType}</FontText>

                            <FlatList
                                data={Requests.Constants.DonorCompatibility[requestBloodType]}
                                keyExtractor={(item) => item.toString()}
                                renderItem={({ item }) => (
                                    <TouchableRipple
                                        style={{ alignItems: "flex-start", paddingVertical: 10, paddingHorizontal: Dimens.screenPaddingHorizontal }}
                                        onPress={() => requestAnimationFrame(() => {
                                            setIsBloodTypeModalVisible(false);
                                            setBloodType(item)
                                        })}
                                    >
                                        <FontText flavor="medium" size={20} color={Colors.darkBlue}>{Requests.Constants.BloodTypesLabel[item].value}</FontText>
                                    </TouchableRipple>
                                )}
                                ListFooterComponent={<View />}
                                ListFooterComponentStyle={{ height: 100 }}
                                ListHeaderComponent={<View />}
                                ListHeaderComponentStyle={{ height: 10 }}
                            />
                        </View>
                    )}
                />

                <BottomNavBar
                    renderRightButton={() => (
                        <MainColorButton
                            color={Colors.white}
                            shadow={false}
                            caption={Strings.cancel}
                            onPress={() => navigation.goBack()}
                        />
                    )}
                    renderLeftButton={() => (
                        <MainButton
                            caption={Strings.submit}
                            textColor={Colors.white}
                            onPress={submitDonation}
                        />
                    )}
                />
            </>)}
        >
            <FontText flavor="semibold" size={Dimens.heading1} color={Colors.darkBlue}>{Strings.fillYourParticulars}</FontText>

            <Question prompt={Strings.whatsYourBloodType} content={() => (
                    <MainOutlineButton
                        caption={bloodType ? Requests.Constants.BloodTypesLabel[bloodType].value : Strings.choose}
                        color={Colors.reddishPurple}
                        onPress={() => { Keyboard.dismiss(); setIsBloodTypeModalVisible(true); }}
                        {...bloodType ? {flavor: "bold"} : null}
                    />
                )} style={{marginVertical: 20}} />

            <Question prompt={Strings.whatsYourName} content={() => (<>
                <TextBox 
                    placeholder={Strings.contactName}
                    style={{backgroundColor: Colors.offGrey2}}
                    onChangeText={setContactName}
                    autoCapitalize="words"
                    value={contactName}
                />
            </>)} style={{marginBottom: 20}} />

            <Question prompt={Strings.howCanRequesterContact} content={() => (<>
                <TextBox 
                    placeholder={Strings.contactNumber}
                    style={{backgroundColor: Colors.offGrey2}}
                    onChangeText={setContactNumber}
                    keyboardType="phone-pad"
                    value={contactNumber}
                />
            </>)} style={{marginBottom: 20}} />
        </GenericSubScrollableScreen>
    );
}
const styles = StyleSheet.create({
    bloodTypeModal: {
        height: "100%",
        backgroundColor: Colors.white,
        paddingTop: 30
    }
});