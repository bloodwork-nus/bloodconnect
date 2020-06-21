import React from "react";
import { View, StatusBar } from "react-native";

import Colors from '../constants/colors';

export default (props) => {
    const {
        statusBarContentsMode,
        statusBarBackgroundColor,
        renderStatusBar,
        backgroundColor
    } = props;

    return (
        <View style={{
            flex: 1,
            backgroundColor: backgroundColor || Colors.offGrey,
            position: "relative"
        }}>
            {renderStatusBar 
                ? renderStatusBar() 
                : <StatusBar
                    backgroundColor={statusBarBackgroundColor || "rgba(0,0,0,0)"}
                    barStyle={statusBarContentsMode || "dark-content"}
                    translucent={true}
                  />
            }

            {props.children}
        </View>
    );
}