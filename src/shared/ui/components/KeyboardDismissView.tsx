import { PropsWithChildren } from 'react';
import { Keyboard, Platform, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

export default function KeyboardDismissView({ children }: PropsWithChildren) {
    if (Platform.OS === 'web') {
        return <View style={styles.container}>{children}</View>;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>{children}</View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
