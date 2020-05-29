import React from 'react';
import { Text } from "react-native";

export default function RegularText(props) {
    return (
        <Text {...props}
            style={{
                fontFamily: "inter",
                fontSize: props.size,
                color: props.color,
                ...props.style
            }}
        >
            {props.children}
        </Text>
    );
}