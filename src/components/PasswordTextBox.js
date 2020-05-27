import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback, Dimensions } from "react-native";

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';
import Icon from "react-native-vector-icons/MaterialIcons";
import Strings from '../constants/strings';

export default function PasswordTextBox(props) {
    const [showPassword, setShowPassword] = useState(false);

    const renderButton = () => {
        return showPassword ? 
            <Icon name="visibility" color={Colors.grey2} size={Dimens.glyphSize} /> : 
            <Icon name="visibility-off" color={Colors.grey2} size={Dimens.glyphSize} />;
    }

    const toggleShowPasswordHandler = () => {
        setShowPassword(!showPassword);
    }

    return (
        <View style={styles.textBox}>
            <TextInput
                placeholder={Strings.password}
                autoCompleteType="password"
                secureTextEntry={!showPassword}
                autoCorrect={false}
                placeholderTextColor={Colors.grey2}
                multiline={false}
                selectionColor={Colors.grey1}
                {...props}
                style={{...styles.textInput, ...props.style}}
            />
            
            <TouchableWithoutFeedback onPress={toggleShowPasswordHandler}>
                {renderButton()}
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    textBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.lightGrey,
        borderRadius: Dimens.textBoxBorderRadius,
        paddingRight: Dimens.textBoxPaddingHorizontal
    },

    textInput: {
        flex: 1,
        fontFamily: "inter-medium",
        fontSize: Dimens.textBoxTextSize,
        color: Colors.darkBlue,
        paddingVertical: Dimens.textBoxPaddingVertical,
        paddingLeft: Dimens.textBoxPaddingHorizontal,
        paddingRight: Dimens.textBoxButtonImageMargin
    }
});