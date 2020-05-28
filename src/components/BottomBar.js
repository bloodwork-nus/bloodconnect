import React from 'react';
import { StyleSheet, View, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';
import RoundButton from './RoundButton';
import Strings from '../constants/strings';
import BottomBarButton from './BottomBarButton';

export default function BottomBar(props) {
    return (
        <View style={styles.bottomBar}>
            <View style={styles.backgroundGreyContainer}>
                <View style={styles.backgroundFragment} />
                <View style={{flex: 1}}/>
                <View style={styles.backgroundFragment} />
            </View>

            <Image source={require("../../assets/bottombar-bg.png")} style={styles.barBackground} resizeMode="contain" />

            <View style={styles.contentsContainer}>
                <View style={{...styles.contents, justifyContent: "flex-start"}}>
                    <BottomBarButton
                        image={<Icon name="location-on" color={Colors.darkBlue} size={Dimens.glyphSize} style={{marginLeft: -5}}/>}
                        caption={Strings.explore}
                        isOnPage={true}
                        onPress={() => {}}
                    />
                </View>

                <View style={{...styles.contents, justifyContent: "flex-end"}}>
                    <BottomBarButton
                        image={<Icon name="format-list-bulleted" color={Colors.darkBlue} size={Dimens.glyphSize} />}
                        caption={Strings.requests}
                        isOnPage={false}
                        onPress={() => {}}
                    />
                </View>
            </View>

            <View style={styles.primaryButtonContainer}>
                <RoundButton
                    style={styles.primaryButton}
                    image={<Icon name="add" color={Colors.white} size={Dimens.roundButtonImageSize} />} 
                    onPress={() => {}}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: "row",
        width: "100%",
        height: Dimens.bottomBarHeight,
        justifyContent: "center",
        position: "absolute",
        bottom: 0,
        zIndex: 999
    },

    backgroundGreyContainer: {
        width: "100%",
        flexDirection: "row",
        width: "100%",
        height: "100%",
        position: "absolute"
    },

    backgroundFragment: {
        flex: 1,
        backgroundColor: Colors.grey3
    },

    primaryButtonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        position: "absolute",
        alignSelf: "center",
        bottom: Dimens.bottomBarPrimaryButtonMarginBottom
    },

    barBackground: {
        height: "100%",
        position: "absolute",
        bottom: 0
    },

    contentsContainer: {
        flexDirection: "row",
        width: "100%",
        height: "100%",
        paddingHorizontal: Dimens.bottomBarPaddingHorizontal,
        paddingVertical: Dimens.bottomBarPaddingVertical
    },

    contents: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    }
});