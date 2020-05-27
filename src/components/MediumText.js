import React from 'react';
import { Text } from "react-native";

export default function MediumText(props) {
    return (
        <Text {...props}
            style={{
                fontFamily: "inter-medium",
                fontSize: props.size,
                color: props.color,
                ...props.style
            }}
        >
            {props.children}
        </Text>
    );
}