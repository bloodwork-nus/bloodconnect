import React from 'react';
import { Text, StyleSheet } from "react-native";

const font = "inter";

export default (props) => {
    const styles = StyleSheet.create({
        text: {
            color: props.color,
            textAlign: props.align,
            fontFamily: font + (props.flavor ? `-${props.flavor}` : ""),
            fontSize: props.size,
            fontStyle: props.style
        }
    });

    return (
        <Text {...props} style={{...styles.text, ...props.style}}>
            {props.children}
        </Text>  
    );
}