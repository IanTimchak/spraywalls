// features/auth/components/AuthForm.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './authFormStyles';
import AuthModeSwitch from './AuthModeSwitch';
import OAuthButton from './OAuthButton';
import SignUpForm from './SignUpForm';
import LogInForm from './LogInForm';

// Feature flag behavior
import { featureFlags } from '../../../config/featureFlags';

import type { ImageSourcePropType } from 'react-native';

type Props = {
    loading: boolean;
    onSignIn: (email: string, password: string) => void | Promise<void>;
    onSignUp: (email: string, password: string) => void | Promise<void>;
    onGoogleSignIn?: () => void | Promise<void>;
    onGoogleSignUp?: () => void | Promise<void>;
    onForgotPassword: () => void | Promise<void>;
    onModeChange: (mode: 'signIn' | 'signUp') => void;
    mode: 'signIn' | 'signUp';
    logoSource: ImageSourcePropType;
    googleIconSource: ImageSourcePropType;
};

export default function AuthForm({
    loading,
    onSignIn,
    onSignUp,
    onGoogleSignIn,
    onGoogleSignUp,
    onForgotPassword,
    onModeChange,
    mode,
    logoSource,
    googleIconSource,
}: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    //clears password field when transitioning mode
    useEffect(() => {
        setPassword('');
        setShowPassword(false);
    }, [mode]);

    return (
        <View style={styles.container}>
            <View style={styles.frame}>
                <View style={styles.content}>
                    {/* Logo and Mode Switch */}
                    <Image source={logoSource} style={[styles.logo, styles.mt30]} />
                    <View style={[styles.verticallySpaced, styles.mt30]}>
                        <AuthModeSwitch mode={mode} onModeChange={onModeChange} />
                    </View>

                    {/* Form Components */}
                    {mode === 'signIn' ? (
                        <LogInForm
                            loading={loading}
                            onSignIn={onSignIn}
                            onForgotPassword={onForgotPassword}
                        />
                    ) : (
                        <SignUpForm loading={loading} onSignUp={onSignUp} />
                    )}

                    {/* Future OAuth Providers */}
                    {featureFlags.googleAuth && (
                        <View style={styles.orDivider}>
                            <View style={styles.orLine} />
                            <Text style={styles.orText}>OR</Text>
                            <View style={styles.orLine} />
                        </View>
                    )}

                    {featureFlags.googleAuth && (
                        <OAuthButton
                            provider="Google"
                            mode={mode}
                            loading={loading}
                            onPress={() => {
                                mode === 'signIn' ? onGoogleSignIn?.() : onGoogleSignUp?.();
                            }}
                            iconSource={googleIconSource}
                        />
                    )}
                </View>
            </View>
        </View>
    );
}
