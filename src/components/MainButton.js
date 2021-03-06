import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import Button from "./Button";

export default function MainButton(props) {
    return (
        <Button
            shadow={props.shadow === false ? false : true}
            textColor={Colors.white}
            textSize={Dimens.mainButtonTextSize}
            height={Dimens.mainButtonHeight}
            borderRadius={Dimens.mainButtonHeight / 2}
            caption={props.caption}
            onPress={props.onPress}
            imageLeft={props.imageLeft}
            imageRight={props.imageRight}
            renderContainer={() => (
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={[Colors.pink, Colors.reddishPurple]}
                />
            )}
            touchableProps={{
                style: props.style
            }}
            height={props.height ? props.height : Dimens.mainButtonHeight}
            borderRadius={props.height ? props.height / 2 : Dimens.mainButtonHeight / 2}
        />
    );
}