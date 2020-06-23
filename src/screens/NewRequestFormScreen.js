import React, { useState } from "react";
import { StyleSheet, BackHandler } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import Colors from "../constants/colors";
import Dimens from "../constants/dimens";
import Strings from "../constants/strings";

import GenericSubScreen from "./GenericSubScreen";
import NewRequestScreen from "./NewRequestScreen";
import SelectLocationScreen from "./SelectLocationScreen";
import ReviewRequestScreen from "./ReviewRequestScreen";
import CompletedRequestScreen from "./CompletedRequestScreen";
import BottomNavBar from "../components/BottomNavBar";
import MainWhiteButton from "../components/MainWhiteButton";
import MainColorButton from "../components/MainColorButton";

export default (props) => {
    const [currentStep, setCurrentStep] = useState(1);

    const [requestType, setRequestType] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [numberOfUnits, setNumberOfUnits] = useState(1);
    const [contactName, setContactName] = useState("");
    const [useYourName, setUseYourName] = useState(false);
    const [contactNumber, setContactNumber] = useState("");
    const [description, setDescription] = useState("");
    const [isEmergency, setIsEmergency] = useState(false);
    const [locationName, setLocationName] = useState("");
    const [locationAddress, setLocationAddress] = useState("");
    const [latitudeLongitude, setLatitudeLongitude] = useState("");

    const handleChange = (variable) => (value) => {
        switch (variable) {
            case "requestType": setRequestType(value); break;
            case "bloodType": setBloodType(value); break;
            case "numberOfUnits": setNumberOfUnits(value); break;
            case "contactName": setContactName(value); break;
            case "useYourName": setUseYourName(value); break;
            case "contactNumber": setContactNumber(value); break;
            case "description": setDescription(value); break;
            case "isEmergency": setIsEmergency(value); break;
            case "locationName": setLocationName(value); break;
            case "locationAddress": setLocationAddress(value); break;
            case "latitudeLongitude": setLatitudeLongitude(value); break;
        }
    }

    const jump = (stepIndex) => setCurrentStep(stepIndex);

    const steps = [
        <NewRequestScreen handleChange={handleChange} values={{
            requestType,
            bloodType,
            numberOfUnits,
            contactName,
            useYourName,
            contactNumber,
            description,
            isEmergency,
        }} />,
        <SelectLocationScreen handleChange={handleChange} values={{
            locationName,
            locationAddress,
            latitudeLongitude
        }} />,
        <ReviewRequestScreen handleChange={handleChange} jump={jump} values={{
            requestType,
            bloodType,
            numberOfUnits,
            contactName,
            contactNumber,
            description,
            isEmergency,
            locationName,
            locationAddress
        }} />,
        <CompletedRequestScreen handleChange={handleChange} />
    ];
    
    const numberOfSteps = steps.length;

    const nextStep = () => setCurrentStep(currentStep >= numberOfSteps ? numberOfSteps : currentStep + 1);
    const previousStep = () => setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);

    BackHandler.addEventListener("hardwareBackPress", () => {
        previousStep();
        return true;
    });

    const step = () => steps[currentStep - 1];

    return (
        <GenericSubScreen>
            {step()}

            <BottomNavBar
                renderRightButton={() => (
                    <MainWhiteButton
                        shadow={false}
                        caption={Strings.cancel}
                        onPress={() => {}}
                    />
                )}
                renderLeftButton={() => (
                    <MainColorButton
                        caption={Strings.next}
                        color={Colors.blue}
                        textColor={Colors.white}
                        imageRight={<MaterialIcon name="arrow-forward" color={Colors.white} size={Dimens.glyphSize} />}
                        onPress={nextStep}
                    />
                )}
            />
        </GenericSubScreen>
    );
}

const styles = StyleSheet.create({
    form: {
        
    }
});