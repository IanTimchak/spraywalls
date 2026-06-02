// features/auth/components/AuthModeSwitch.tsx
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

type Props = {
    mode: 'signIn' | 'signUp';
    onModeChange: (mode: 'signIn' | 'signUp') => void;
};

export default function AuthModeSwitch({ mode, onModeChange }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => onModeChange('signIn')} style={styles.tabContainer}>
                <View style={styles.buttonUnit}>
                    <Text style={[styles.text, mode === 'signIn' && styles.activeText]}>
                        Sign in
                    </Text>
                    <View style={mode === 'signIn' ? styles.tabBar : undefined} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onModeChange('signUp')} style={styles.tabContainer}>
                <View style={styles.buttonUnit}>
                    <Text style={[styles.text, mode === 'signUp' && styles.activeText]}>
                        Sign up
                    </Text>
                    <View style={mode === 'signUp' ? styles.tabBar : undefined} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    text: {
        fontSize: 18,
        color: '#888',
        marginHorizontal: 20,
    },
    activeText: {
        color: '#000',
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
    },
    tabBar: {
        justifyContent: 'center',
        width: '100%',
        padding: 0,
        marginTop: 8,
        height: 2,
        borderRadius: 999,
        backgroundColor: '#000',
    },
    buttonUnit: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 0,
    },
});
