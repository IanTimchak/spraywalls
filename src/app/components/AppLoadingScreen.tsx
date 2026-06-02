// src/app/components/AppLoadingScreen.tsx
import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { CornerFrame } from '../../shared/ui/components/CornerFrame';

type Props = { imageSrc: ImageSourcePropType };
// I built the image source as a prop because the storybook and expo expect different formats
// for the imported image. expo needed require but vite needed url.

// expo source
// <AppLoadingScreen imageSrc={require('../../../../assets/android-icon-monochrome-spraywalls-v2.png')} />

export default function AppLoadingScreen({ imageSrc }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.frame}>
                <CornerFrame
                    color="#5d6c77"
                    size={bracketSize}
                    width={bracketWidth}
                    radius={bracketRadius}
                />
                <View style={styles.content}>
                    <Image style={styles.splashImage} source={imageSrc} />
                    <ActivityIndicator
                        size="large"
                        color="#5d6c77"
                        style={styles.activityIndicator}
                    />
                </View>
            </View>
        </View>
    );
}

// Stylistic corner frames
const screenInset = 10;
const bracketSize = 30;
const bracketWidth = 3;
const bracketRadius = 12;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: screenInset,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    frame: {
        flex: 1,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    splashImage: {
        width: 120,
        height: 120,
    },
    activityIndicator: {
        marginTop: 50,
    },
});
