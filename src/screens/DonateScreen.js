import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
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
import MainWhiteButton from "../components/MainWhiteButton";
import MainButton from "../components/MainButton";
import BottomSheetModal from "../components/BottomSheetModal";

export default (props) => {
    const [bloodType, setBloodType] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactNumber, setContactNumber] = useState("");

    const [isBloodTypeModalVisible, setIsBloodTypeModalVisible] = useState(false);

    const submitDonation = () => {
        if (bloodType === "") return alert("Select a blood type");
        if (contactName === "") return alert("Specify a contact name");
        if (contactNumber === "") return alert("Specify a contact number");


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
                                data={[
                                    { id: "ap", label: "A+" },
                                    { id: "am", label: "A-" },
                                    { id: "bp", label: "B+" },
                                    { id: "bm", label: "B-" },
                                    { id: "abp", label: "AB+" },
                                    { id: "abm", label: "AB-" },
                                    { id: "op", label: "O+" },
                                    { id: "om", label: "O-" }
                                ]}
                                renderItem={({ item }) => (
                                    <TouchableRipple
                                        style={{ alignItems: "flex-start", paddingVertical: 10, paddingHorizontal: Dimens.screenPaddingHorizontal }}
                                        onPress={() => requestAnimationFrame(() => {
                                            setIsBloodTypeModalVisible(false);
                                            setBloodType(item.label)
                                        })}
                                    >
                                        <FontText flavor="medium" size={20} color={Colors.darkBlue}>{item.label}</FontText>
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
                        <MainWhiteButton
                            shadow={false}
                            caption={Strings.cancel}
                            onPress={() => {}}
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
                        caption={bloodType || Strings.choose}
                        color={Colors.reddishPurple}
                        onPress={() => setIsBloodTypeModalVisible(true)}
                        {...bloodType ? {flavor: "bold"} : null}
                    />
                )} style={{marginVertical: 20}} />

            <Question prompt={Strings.whatsYourName} content={() => (<>
                <TextBox 
                    placeholder={Strings.contactName}
                    style={{backgroundColor: Colors.offGrey2}}
                    onChangeText={setContactName}
                    autoCapitalize="words"
                />
            </>)} style={{marginBottom: 20}} />

            <Question prompt={Strings.howCanRequesterContact} content={() => (<>
                <TextBox 
                    placeholder={Strings.contactNumber}
                    style={{backgroundColor: Colors.offGrey2}}
                    onChangeText={setContactNumber}
                    keyboardType="phone-pad"
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