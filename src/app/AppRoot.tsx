// src/app/AppRoot.tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appConfig } from '../config/appConfig';
import { colors, spacing } from '../shared/theme';

// features
import { AuthScreen } from '../features/auth/screens/AuthScreen';
import { useAppStartup } from './hooks/useAppStartup';
import { HomeScreen } from '../features/home/HomeScreen';
import AppLoadingScreen from './components/AppLoadingScreen';

export function AppRoot() {
    const startup = useAppStartup();
    const auth = startup.auth;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            {startup.status === 'starting' ? (
                <AppLoadingScreen
                    imageSrc={require('../../assets/android-icon-monochrome-spraywalls-v2.png')}
                />
            ) : startup.status === 'error' ? (
                <Text>{auth.error}</Text>
            ) : auth.status === 'signed-in' ? (
                <>
                    <HomeScreen appName={appConfig.name} />
                    {auth.claims && <Text>Signed in user: {auth.claims.sub}</Text>}
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
