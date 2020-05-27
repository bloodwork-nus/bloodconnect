import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableWithoutFeedback } from "react-native";

import Colors from '../constants/colors';
import Icon from "react-native-vector-icons/MaterialIcons";

export default function PasswordTextBox(props) {
    const [showPassword, setShowPassword] = useState(false);

    const renderButton = () => {
        return showPassword ? <Icon name="visibility" color={Colors.grey2} size={30} /> : <Icon name="visibility-off" color={Colors.grey2} size={30} />;
    }

    const toggleShowPasswordHandler = () => {
        setShowPassword(!showPassword);
    }

    return (
        <View style={styles.textBox}>
            <TextInput
                placeholder="Password"
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
        borderRadius: 10,
        paddingRight: 20
    },

    textInput: {
        flex: 1,
        fontFamily: "monospaced",
        fontSize: 17,
        color: Colors.darkBlue,
        paddingVertical: 12,
        paddingLeft: 20,
        paddingRight: 5
        
    }
});