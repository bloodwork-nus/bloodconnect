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
        image,
        imageLeft,
        imageRight,
        onPress,
        shadow,
        pressedStyle,
        notPressedStyle,
        touchableProps,
        height,
        borderRadius,
        flavor
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
                height,
                borderRadius,
                ...container.props.style,
                ...(pressed ? pressedStyle : notPressedStyle),
            }
        };

        return React.cloneElement(container, clonedProps, <>
            {imageLeft ? renderButtonImage(imageLeft, "left") : null}
    
            {caption ? <FontText flavor={flavor || "semibold"} color={textColor} size={textSize}>{caption}</FontText> : null}

            {image ? image : null}

            {imageRight ? renderButtonImage(imageRight, "right") : null}
        </>);
    };

    const styleProps = {
        ...(shadow ? (pressed ? styles.buttonPressed : styles.buttonNotPressed) : null),
        height,
        borderRadius,
        ...(touchableProps && touchableProps.style ? touchableProps.style : null)
    };

    return (
        <TouchableHighlight
            onPress={onPress}
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
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Dimens.mainButtonPaddingHorizontal,
        
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