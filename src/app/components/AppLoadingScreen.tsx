// src/app/components/AppLoadingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

type Props = { imageSrc: ImageSourcePropType };
// I built the image source as a prop because the storybook and expo expect different formats
// for the imported image. expo needed require but vite needed url.

// expo source
// <AppLoadingScreen imageSrc={require('../../../../assets/android-icon-monochrome-spraywalls-v2.png')} />

export default function AppLoadingScreen({ imageSrc }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.frame}>
                <View style={styles.bracketLayer} pointerEvents="none">
                    <View style={[styles.corner, styles.topLeft]} />
                    <View style={[styles.corner, styles.topRight]} />
                    <View style={[styles.corner, styles.bottomLeft]} />
                    <View style={[styles.corner, styles.bottomRight]} />
                </View>
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
const screenInset = 22;
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
        width: 100,
        height: 100,
    },
    activityIndicator: {
        marginTop: 50,
    },
    bracketLayer: {
        ...StyleSheet.absoluteFillObject,
    },
    corner: {
        position: 'absolute',
        width: bracketSize,
        height: bracketSize,
        borderColor: '#5d6c77',
    },
    topLeft: {
        top: 0,
        left: 0,
        borderTopWidth: bracketWidth,
        borderLeftWidth: bracketWidth,
        borderTopLeftRadius: bracketRadius,
    },
    topRight: {
        top: 0,
        right: 0,
        borderTopWidth: bracketWidth,
        borderRightWidth: bracketWidth,
        borderTopRightRadius: bracketRadius,
    },
    bottomLeft: {
        bottom: 0,
        left: 0,
        borderBottomWidth: bracketWidth,
        borderLeftWidth: bracketWidth,
        borderBottomLeftRadius: bracketRadius,
    },
    bottomRight: {
        bottom: 0,
        right: 0,
        borderBottomWidth: bracketWidth,
        borderRightWidth: bracketWidth,
        borderBottomRightRadius: bracketRadius,
    },
});
