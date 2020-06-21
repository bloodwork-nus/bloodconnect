import React, { useEffect } from "react";
import { StyleSheet, View, TouchableWithoutFeedback, Platform, BackHandler } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";

import Colors from "../constants/colors";

export default (props) => {
    const {
        height,
        visible,
        onClose,
        renderContent
    } = props;

    let modalRef;
    let fade = new Animated.Value(Platform.OS === "ios" ? 0 : 1);

    useEffect(() => {
        modalRef.snapTo(visible ? 0 : 1);
    });

    BackHandler.addEventListener("hardwareBackPress", () => {props.onClose(); return true;});

    return (<>
        {visible ? 
            <TouchableWithoutFeedback onPress={() => modalRef.snapTo(1)}>
                <Animated.View style={{
                    width: "100%",
                    height: "100%",
                    opacity: Animated.sub(0.7, fade),
                    backgroundColor: Colors.black,
                    position: "absolute"
                }} />
            </TouchableWithoutFeedback>
        : null}

        <BottomSheet
            ref={ref => modalRef = ref}
            initialSnap={1}
            snapPoints={[height, 0]}
            renderHeader={() => <View />}
            renderContent={renderContent}
            borderRadius={30}
            callbackNode={fade}
            onCloseEnd={onClose}
            enabledContentGestureInteraction={false}
        />
    </>);
}