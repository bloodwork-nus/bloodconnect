import React, { useState, useEffect } from "react";
import { BackHandler } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";

import Colors from "../constants/colors";
import Dimens from "../constants/dimens";
import Strings from "../constants/strings";

import GenericSubScreen from "./GenericSubScreen";
import NewRequestScreen from "./NewRequestScreen";
import SelectLocationScreen from "./SelectLocationScreen";
import ReviewRequestScreen from "./ReviewRequestScreen";
import BottomNavBar from "../components/BottomNavBar";
import MainColorButton from "../components/MainColorButton";

import * as Requests from "../../utils/requests";
import * as Authentication from "../../utils/auth";

export default (props) => {
    const { navigation, route } = props;

    const [currentStep, setCurrentStep] = useState(1);

    const [requestType, setRequestType] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [numberOfUnits, setNumberOfUnits] = useState(1);
    const [contactName, setContactName] = useState(Authentication.getCurrentUserName);
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
                if (bloodType.id === "OTHER" && description === "") { alert("Please specify your blood group in the description"); break; }
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
            requester: Authentication.getCurrentUserUid(),
            dateCreated: Date.now(),
            status: Requests.Constants.Status.OPEN,
            requestType,
            payload: {
                bloodType: bloodType.id,
                numberOfUnits,
                contactName,
                contactNumber,
                description: description.trim(),
                isEmergency,
                location: {
                    locationName,
                    locationAddress,
                    latitudeLongitude
                }
            }
        }, (error) => {
            if (error) {
                alert("An error has occurred! " + error);
                console.log(error);
            } else {
                navigation.navigate("CompletedForm", {
                    configureScreen: {
                        heading: Strings.allDone,
                        subtitle: Strings.requestMadeText,
                        color: Colors.blue,
                        backButton: Strings.returnHome
                    }
                });
            }
        });
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
            previousStep();
            return true;
        });

        return () => backHandler.remove();
    }, []);

    const step = () => steps[currentStep - 1];

    return (
        <GenericSubScreen>
            {step()}

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
                    <MainColorButton
                        caption={isLastStep() ? Strings.submit : Strings.next}
                        color={Colors.blue}
                        textColor={Colors.white}
                        {...isLastStep() ? null : { imageRight: <Icon name="arrow-forward" color={Colors.white} size={Dimens.glyphSize} /> }}
                        onPress={isLastStep() ? submitRequest : validateAndNextStep}
                    />
                )}
            />
        </GenericSubScreen>
    );
}