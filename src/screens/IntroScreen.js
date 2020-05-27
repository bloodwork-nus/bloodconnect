import React from 'react';
import { View, StyleSheet, Image, Text } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';

import Strings from "../constants/strings";
import Colors from "../constants/colors";
import Dimens from "../constants/dimens";
import EmergencyCarriageImage from "../../assets/images/bc-emergency-carriage.svg";
import GirlBrowsingImage from "../../assets/images/bc-girl-browsing.svg";
import GirlDonatingImage from "../../assets/images/bc-girl-donating.svg";
import SemiBoldText from "../components/SemiBoldText";
import MediumText from "../components/MediumText";
import MainButton from '../components/MainButton';
import MainOutlineButton from '../components/MainOutlineButton';

export default function IntroScreen(props) {
    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                {item.image}
                <SemiBoldText style={styles.title} color={Colors.darkBlue} size={Dimens.heading1}>{item.title}</SemiBoldText>
                <MediumText color={Colors.darkBlue} size={Dimens.body1}>{item.description}</MediumText>
            </View>
        );
    };

    return (
        <View style={styles.screen}>
            <View style={styles.introSlider}><AppIntroSlider
                keyExtractor={item => item.key.toString()}
                renderItem={renderItem}
                data={slides}
                activeDotStyle={{backgroundColor: Colors.blue, marginHorizontal: Dimens.slideDotMarginHorizontal}}
                dotStyle={{backgroundColor: Colors.grey1, marginHorizontal: Dimens.slideDotMarginHorizontal}}
                showDoneButton={false}
                showNextButton={false}
            /></View>
        
            <MainOutlineButton caption={Strings.startConnecting} onPress={() => {}} />
            <MainButton caption={Strings.startConnecting} onPress={() => {}} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: Dimens.screenPaddingVertical
    },

    slide: {
        width: "100%",
        height: "100%",
        paddingTop: Dimens.slidePaddingTop,
        paddingBottom: Dimens.slidePaddingBottom,
        paddingHorizontal: Dimens.slidePaddingHorizontal
    },

    title: {
        marginBottom: Dimens.headingMarginBottom
    },

    image: {
        height: "55%",
        marginBottom: Dimens.imageMarginBottom
    },

    introSlider: {
        width: "100%",
        height: "90%"
    }
});

const slides = [
    {
        key: 1,
        image: <View style={styles.image}><EmergencyCarriageImage /></View>,
        title: Strings.introTitle1,
        description: Strings.introDescription1
    },
    {
        key: 2,
        image: <View style={styles.image}><GirlBrowsingImage /></View>,
        title: Strings.introTitle2,
        description: Strings.introDescription2
    },
    {
        key: 3,
        image: <View style={styles.image}><GirlDonatingImage /></View>,
        title: Strings.introTitle3,
        description: Strings.introDescription3
    }
];