// features/auth/components/OAuthButton.tsx
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

type Props = {
    provider: 'Google' | 'Apple';
    mode: 'signIn' | 'signUp';
    loading: boolean;
    onPress: () => void | Promise<void>;
    iconSource: ImageSourcePropType;
};

export default function OAuthButton({ provider, mode, loading, onPress, iconSource }: Props) {
    return (
        <TouchableOpacity
            style={styles.OAuthButton}
            onPress={onPress}
            disabled={loading}
            accessibilityRole="button"
            accessibilityState={{ disabled: loading }}
            accessibilityLabel={
                mode === 'signIn'
                    ? `Continue with ${provider} button`
                    : `Sign up with ${provider} button`
            }
        >
            <View style={styles.OAuthButtonContent}>
                <Image source={iconSource} style={{ width: 28, height: 28 }} />
                <View style={styles.OAuthButtonContentSpacer} />
                <Text style={styles.OAuthButtonText}>
                    {mode === 'signIn' ? `Continue with ${provider}` : `Sign up with ${provider}`}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    OAuthButton: {
        backgroundColor: '#ffffff',
        borderRadius: 6,
        borderColor: '#364049',
        borderWidth: 1,
        padding: 12,
        alignItems: 'center',
    },
    OAuthButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    OAuthButtonText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '600',
    },
    OAuthButtonContentSpacer: {
        width: 8,
    },
});
