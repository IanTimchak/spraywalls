import { PropsWithChildren } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { spacing } from '../theme';

export function Screen({ children }: PropsWithChildren) {
    return (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
            {children}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
        paddingBottom: spacing.xl,
    },
});
