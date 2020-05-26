import React from 'react';
import { Text } from "react-native";

export default function SemiBoldText(props) {
    return (
        <Text {...props}
            style={{
                fontFamily: "inter-semibold",
                fontSize: props.size,
                color: props.color,
                ...props.style
            }}
        >
            {props.children}
        </Text>
    );
}