import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../constants/colors';
import Dimens from '../constants/dimens';

import Button from "./Button";

export default function MainButton(props) {
    return (
        <Button
            shadow={true}
            textColor={Colors.white}
            textSize={Dimens.mainButtonTextSize}
            caption={props.caption}
            onPress={() => {}}
            imageLeft={props.imageLeft}
            imageRight={props.imageRight}
            renderContainer={() => (
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={[Colors.pink, Colors.reddishPurple]}
                />
            )}
        />
    );
}