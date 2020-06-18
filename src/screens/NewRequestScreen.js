import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, Keyboard, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import BottomNavBar from '../components/BottomNavBar';
import FontText from "../components/FontText";
import Blobs from '../components/Blobs';
import Question from "../components/Question";
import MainOutlineButton from "../components/MainOutlineButton";
import TextBox from "../components/TextBox";
import CheckBox from '../components/CheckBox';
import BottomSheetModal from '../components/BottomSheetModal';

const requestTypes = { blood: 1, platelets: 2, plasma: 3 };

export default (props) => {
    const [requestType, setRequestType] = useState(null);
    const [appointmentTime, setAppointmentTime] = useState();
    const [description, setDescription] = useState("");
    const [useYourName, setUseYourName] = useState(false);
    const [isEmergency, setIsEmergency] = useState(false);
    const [showBottomBar, setShowBottomBar] = useState(true);

    const [isBloodTypeModalVisible, setIsBloodTypeModalVisible] = useState(false);
    const [isAppointmentModalVisible, setIsAppointmentModalVisible] = useState(false);

    useEffect(() => {
        Keyboard.addListener("keyboardWillShow", () => setShowBottomBar(false));
        Keyboard.addListener("keyboardWillHide", () => setShowBottomBar(true));

        return () => {
            Keyboard.removeListener("keyboardWillShow", () => setShowBottomBar(false));
            Keyboard.removeListener("keyboardWillHide", () => setShowBottomBar(true));
        };
    });

    return (
        <View style={styles.screen}>
            <StatusBar backgroundColor={"rgba(0,0,0,0)"} barStyle="dark-content" translucent={true} />

            <ScrollView contentContainerStyle={styles.content}>
                <FontText flavor="semibold" size={Dimens.heading1} color={Colors.darkBlue}>Make a request for...</FontText>
                <Blobs
                    color={Colors.blue}
                    active={requestType}
                    onBlobPress={setRequestType}
                    style={{marginVertical: 20}}
                    blobs={[
                        {
                            id: requestTypes.blood,
                            caption: "Blood"
                        },
                        {
                            id: requestTypes.platelets,
                            caption: "Platelets"
                        },
                        {
                            id: requestTypes.plasma,
                            caption: "Plasma"
                        }
                    ]}
                />

                <Question prompt="For which blood type?" content={() => (
                    <MainOutlineButton caption="Choose" onPress={() => {}} color={Colors.blue} onPress={() => setIsBloodTypeModalVisible(true)} />
                )} style={{marginBottom: 20}} />

                <Question prompt="How much units are required?" content={() => (
                    <></>
                )} style={{marginBottom: 20}} />

                <Question prompt="How can the donor contact you?" content={() => (<>
                    <TextBox 
                        placeholder="Contact name"
                        style={{backgroundColor: Colors.offGrey2}}
                    />

                    <CheckBox
                        color={Colors.blue}
                        caption="Use your name"
                        textColor={Colors.darkBlue}
                        checkedState={useYourName}
                        onPress={() => setUseYourName(!useYourName)}
                        justifyContent="flex-end"
                        style={{marginVertical: 5}}
                    />

                    <TextBox
                        disabled={true}
                        placeholder="Contact number"
                        style={{backgroundColor: Colors.offGrey2}}
                    />
                </>)} style={{marginBottom: 20}} info="This information is..." />

                <Question prompt="Propose an appointment time" content={() => (
                    <MainOutlineButton
                        caption={appointmentTime ? moment(appointmentTime).format("ddd MMM D, YYYY, h:mm A") : "Pick a time"}
                        onPress={() => setIsAppointmentModalVisible(true)}
                        color={Colors.blue}
                        {...appointmentTime ? {flavor: "bold"} : null}
                    />
                )} style={{marginBottom: 20}} />

                <Question prompt="Anything the donors should know?" content={() => (<>
                    <TextBox 
                        placeholder="Share a story?"
                        style={{height: 100, backgroundColor: Colors.offGrey2}}
                        multiline={true}
                        textAlignVertical="top"
                        maxLength={95}
                        onChangeText={setDescription}
                    />

                    <FontText color={Colors.grey2} size={15} align="right" style={{marginVertical: 10}}>{95 - description.length} characters allowed</FontText>

                    <CheckBox
                        color={Colors.red}
                        caption="This is an emergency"
                        flavor="semibold"
                        textColor={Colors.red}
                        checkedState={isEmergency}
                        onPress={() => setIsEmergency(!isEmergency)}
                        justifyContent="flex-start"
                        description="BloodConnect will prioritise this request to help find donors faster. Please be responsible and only tick if you need donation urgently."
                    />
                </>)} />
            </ScrollView>

            {showBottomBar ? <BottomNavBar /> : null}

            {Platform.OS === "ios" ? 
                <BottomSheetModal
                    height={300}
                    visible={isAppointmentModalVisible}
                    onClose={() => setIsAppointmentModalVisible(false)}
                    renderContent={() => (
                        <View style={styles.appointmentTimeModal}>
                            <FontText flavor="semibold" size={20} color={Colors.darkBlue} style={{paddingHorizontal: Dimens.screenPaddingHorizontal}}>Propose an appointment time</FontText>
                            <DateTimePicker
                                value={appointmentTime || new Date()}
                                mode="datetime"
                                onChange={(event, date) => setAppointmentTime(date)}
                            />
                        </View>
                    )}
                />
            : null}

            <BottomSheetModal
                height={400}
                visible={isBloodTypeModalVisible}
                onClose={() => setIsBloodTypeModalVisible(false)}
                renderContent={() => (
                    <View style={styles.bloodTypeModal}>

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

    appointmentTimeModal: {
        height: "100%",
        backgroundColor: Colors.white,
        paddingTop: 30
    },

    bloodTypeModal: {
        height: "100%",
        backgroundColor: Colors.white
    }
});