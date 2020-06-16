import React, { useState } from 'react';
import { TouchableHighlight, View, StyleSheet } from "react-native";

import Dimens from "../constants/dimens";

import FontText from "./FontText";

export default (props) => {
    const {
        renderContainer,
        caption,
        textColor,
        textSize,
        imageLeft,
        imageRight,
        onPress,
        shadow,
        pressedStyle,
        notPressedStyle,
        touchableProps
    } = props;

    const [pressed, setPressed] = useState(false);

    const renderButtonImage = (image, position) => (
        <View style={{
            ...styles.image,
            marginLeft: position === "right" ? Dimens.mainButtonImageMargin : 0,
            marginRight: position === "left" ? Dimens.mainButtonImageMargin : 0
        }}>
            {image}
        </View>
    );

    const renderButtonContent = () => {
        const container = renderContainer();
        const clonedProps = {
            style: {
                ...styles.button,
                ...container.props.style,
                ...(pressed ? pressedStyle : notPressedStyle),
            }
        };

        return React.cloneElement(container, clonedProps, <>
            {imageLeft ? renderButtonImage(imageLeft, "left") : null}
    
            <FontText flavor="semibold" color={textColor} size={textSize}>
                {caption}
            </FontText>

            {imageRight ? renderButtonImage(imageRight, "right") : null}
        </>);
    };

    const styleProps = {
        ...(shadow ? (pressed ? styles.buttonPressed : styles.buttonNotPressed) : null),
        ...styles.touchable,
        ...(touchableProps && touchableProps.style ? touchableProps.style : null)
    };

    return (
        <TouchableHighlight
            onPress={() => requestAnimationFrame(onPress)}
            onShowUnderlay={() => setPressed(true)}
            onHideUnderlay={() => setPressed(false)}
            {...touchableProps}
            style={styleProps}
        >
            {renderButtonContent()}
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    image: {
        width: Dimens.mainButtonImageSize,
        height: Dimens.mainButtonImageSize,
        justifyContent: "center",
        alignItems: "center"
    },

    button: {
        flexDirection: "row",
        height: Dimens.mainButtonHeight,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Dimens.mainButtonPaddingHorizontal,
        borderRadius: Dimens.mainButtonHeight / 2
    },

    touchable: {
        borderRadius: Dimens.mainButtonHeight / 2
    },

    buttonNotPressed: {
        top: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5.46,
        elevation: 9
    },

    buttonPressed: {
        top: Dimens.mainButtonPressedNudgeDistance
    },
});