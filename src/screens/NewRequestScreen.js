import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, FlatList, KeyboardAvoidingView, Keyboard } from "react-native";
import { TouchableRipple } from 'react-native-paper';

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';
import Strings from '../constants/strings';

import FontText from "../components/FontText";
import Blobs from '../components/Blobs';
import Question from "../components/Question";
import MainOutlineButton from "../components/MainOutlineButton";
import TextBox from "../components/TextBox";
import CheckBox from '../components/CheckBox';
import BottomSheetModal from '../components/BottomSheetModal';
import NumericUpDown from "../components/NumericUpDown";

import { Constants } from "../../utils/requests";

export default (props) => {
    const {
        requestType,
        bloodType,
        numberOfUnits,
        contactName,
        useYourName,
        contactNumber,
        description,
        isEmergency
    } = props.values;

    const [isBloodTypeModalVisible, setIsBloodTypeModalVisible] = useState(false);

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={"rgba(0,0,0,0)"} barStyle="dark-content" translucent={true} />

            <KeyboardAvoidingView behavior="height"><ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="always">
                <FontText flavor="semibold" size={Dimens.heading1} color={Colors.darkBlue}>{Strings.makeARequest}</FontText>
                <Blobs
                    color={Colors.blue}
                    active={requestType}
                    onBlobPress={props.handleChange("requestType")}
                    style={{marginVertical: 20}}
                    blobs={[
                        {
                            id: Constants.RequestTypes.BLOOD,
                            caption: Strings.blood
                        },
                        {
                            id: Constants.RequestTypes.PLATELETS,
                            caption: Strings.platelets
                        },
                        {
                            id: Constants.RequestTypes.PLASMA,
                            caption: Strings.plasma
                        }
                    ]}
                />

                <Question prompt={Strings.forWhichBloodType} content={() => (
                    <MainOutlineButton
                        caption={bloodType.value || Strings.choose}
                        color={Colors.blue}
                        onPress={() => { Keyboard.dismiss(); setIsBloodTypeModalVisible(true); }}
                        {...bloodType ? {flavor: "bold"} : null}
                    />
                )} style={{marginBottom: 20}} />

                <Question prompt={Strings.howManyUnits} content={() => (
                    <NumericUpDown
                        value={numberOfUnits}
                        color={Colors.blue}
                        onChangeValue={props.handleChange("numberOfUnits")}
                        minimum={1}
                        maximum={20}
                    />
                )} style={{marginBottom: 20}} />

                <Question prompt={Strings.howCanDonorContact} content={() => (<>
                    <TextBox 
                        placeholder={Strings.contactName}
                        style={{backgroundColor: Colors.offGrey2, marginBottom: 15}}
                        onChangeText={props.handleChange("contactName")}
                        value={contactName}
                        autoCapitalize="words"
                    />

                    <TextBox
                        placeholder={Strings.contactNumber}
                        style={{backgroundColor: Colors.offGrey2}}
                        onChangeText={props.handleChange("contactNumber")}
                        value={contactNumber}
                        keyboardType="phone-pad"
                    />
                </>)} style={{marginBottom: 20}} info={Strings.contactDisclaimer} />

                {/* <Question prompt="Propose an appointment time" content={() => (
                    <MainOutlineButton
                        caption={appointmentTime ? moment(appointmentTime).format("ddd MMM D, YYYY, h:mm A") : "Pick a time"}
                        onPress={() => setIsAppointmentModalVisible(true)}
                        color={Colors.blue}
                        {...appointmentTime ? {flavor: "bold"} : null}
                    />
                )} style={{marginBottom: 20}} /> */}

                <Question prompt={Strings.anythingDonorShouldKnow} content={() => (<>
                    <TextBox 
                        placeholder={Strings.shareStory}
                        style={{height: 100, backgroundColor: Colors.offGrey2}}
                        multiline={true}
                        textAlignVertical="top"
                        maxLength={95}
                        onChangeText={props.handleChange("description")}
                        value={description}
                    />

                    <FontText color={Colors.grey2} size={15} align="right" style={{marginVertical: 10}}>{95 - description.length} {Strings.charactersAllowed}</FontText>

                    <CheckBox
                        color={Colors.red}
                        caption={Strings.thisIsAnEmergency}
                        flavor="semibold"
                        textColor={Colors.red}
                        checkedState={props.values.isEmergency}
                        onPress={() => props.handleChange("isEmergency")(!isEmergency)}
                        justifyContent="flex-start"
                        description={Strings.emergencyDescription}
                    />
                </>)} />
            </ScrollView></KeyboardAvoidingView>

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
                            data={Constants.BloodTypes}
                            renderItem={({ item }) => (
                                <TouchableRipple
                                    style={{ alignItems: "flex-start", paddingVertical: 10, paddingHorizontal: Dimens.screenPaddingHorizontal }}
                                    onPress={() => requestAnimationFrame(() => {
                                        setIsBloodTypeModalVisible(false);
                                        props.handleChange("bloodType")(item)
                                    })}
                                >
                                    <FontText flavor="medium" size={20} color={Colors.darkBlue}>{item.value}</FontText>
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

    bloodTypeModal: {
        height: "100%",
        backgroundColor: Colors.white,
        paddingTop: 30
    }
});