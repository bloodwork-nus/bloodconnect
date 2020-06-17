import React, { useState, useEffect } from 'react';
import { View, StyleSheet, StatusBar, ScrollView, Keyboard } from "react-native";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import BottomNavBar from '../components/BottomNavBar';
import FontText from "../components/FontText";
import Blobs from '../components/Blobs';
import Question from "../components/Question";
import MainOutlineButton from "../components/MainOutlineButton";
import TextBox from "../components/TextBox";
import CheckBox from '../components/CheckBox';

const requestTypes = { blood: 1, platelets: 2, plasma: 3 };

export default (props) => {
    const [requestType, setRequestType] = useState(null);
    const [description, setDescription] = useState("");
    const [useYourName, setUseYourName] = useState(false);
    const [isEmergency, setIsEmergency] = useState(false);
    const [showBottomBar, setShowBottomBar] = useState(true);

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
                    <MainOutlineButton caption="Choose" onPress={() => {}} />
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
                </>)} style={{marginBottom: 20}} />

                <Question prompt="Propose an appointment time" content={() => (
                    <MainOutlineButton caption="Thu Jun 22, 2020, 09:52" onPress={() => {}} />
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
    }
});