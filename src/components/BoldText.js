import React from 'react';
import { Text } from "react-native";

export default function BoldText(props) {
    return (
        <Text {...props}
            style={{
                fontFamily: "inter-bold",
                fontSize: props.size,
                color: props.color,
                ...props.style
            }}
        >
            {props.children}
        </Text>
    );
}