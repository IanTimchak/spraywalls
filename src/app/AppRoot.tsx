// src/app/AppRoot.tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appConfig } from '../config/appConfig';
import { colors, spacing } from '../shared/theme';

// features
import { AuthScreen } from '../features/auth/screens/AuthScreen';
import { useAuthSession } from '../features/auth/hooks/useAuthSession';
import { HomeScreen } from '../features/home/HomeScreen';

export function AppRoot() {
    const { claims, isSignedIn } = useAuthSession();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {isSignedIn ? (
                <>
                    <HomeScreen appName={appConfig.name} />
                    {claims && <Text>Signed in user: {claims.sub}</Text>}
                </>
            ) : (
                <AuthScreen />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.lg,
    },
});
