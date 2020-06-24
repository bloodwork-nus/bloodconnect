import React, { useState } from "react";
import { BackHandler } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

import Colors from "../constants/colors";
import Dimens from "../constants/dimens";
import Strings from "../constants/strings";

import GenericSubScreen from "./GenericSubScreen";
import NewRequestScreen from "./NewRequestScreen";
import SelectLocationScreen from "./SelectLocationScreen";
import ReviewRequestScreen from "./ReviewRequestScreen";
import BottomNavBar from "../components/BottomNavBar";
import MainWhiteButton from "../components/MainWhiteButton";
import MainColorButton from "../components/MainColorButton";

import * as Requests from "../../utils/requests";

export default (props) => {
    const { navigation, route } = props;

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
        <ReviewRequestScreen jump={jump} values={{
            requestType,
            bloodType,
            numberOfUnits,
            contactName,
            contactNumber,
            description,
            isEmergency,
            locationName,
            locationAddress
        }} />
    ];
    
    const numberOfSteps = steps.length;

    const nextStep = () => setCurrentStep(currentStep >= numberOfSteps ? numberOfSteps : currentStep + 1);
    const previousStep = () => setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);
    const isLastStep = () => currentStep === numberOfSteps

    const validateAndNextStep = () => {
        switch (currentStep) {
            case 1:
                if (requestType === "") { alert("Select a request type"); break; }
                if (bloodType === "") { alert("Select a blood type"); break; }
                if (contactName === "") { alert("Specify a contact name"); break; } 
                if (contactNumber === "") { alert("Specify a contact number"); break; }
                nextStep(); break;
            case 2:
                if (locationName === "") { alert("Select a location"); break; }
                if (locationAddress === "") { alert("Select a location"); break; }
                if (latitudeLongitude === "") { alert("Select a location"); break; }
                nextStep(); break;
        }
    }

    const submitRequest = () => {
        Requests.newRequest({
            dateCreated: Date.now(),
            status: Requests.Constants.Status.OPEN,
            requestType,
            payload: {
                bloodType,
                numberOfUnits,
                contactName,
                contactNumber,
                description,
                isEmergency,
                location: {
                    locationName,
                    locationAddress,
                    latitudeLongitude
                }
            }
        });
    }

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
                        onPress={() => navigation.goBack()}
                    />
                )}
                renderLeftButton={() => (
                    <MainColorButton
                        caption={isLastStep() ? Strings.submit : Strings.next}
                        color={Colors.blue}
                        textColor={Colors.white}
                        {...isLastStep() ? null : { imageRight: <MaterialIcon name="arrow-forward" color={Colors.white} size={Dimens.glyphSize} /> }}
                        onPress={isLastStep() ? submitRequest : validateAndNextStep}
                    />
                )}
            />
        </GenericSubScreen>
    );
}