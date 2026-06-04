// features/auth/components/AuthForm.tsx
import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';

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
    const [email, setEmail] = useState(''); // preserve email between forms for UX

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
                            email={email}
                            onEmailChange={setEmail}
                            onSignIn={onSignIn}
                            onForgotPassword={onForgotPassword}
                        />
                    ) : (
                        <SignUpForm
                            loading={loading}
                            email={email}
                            onEmailChange={setEmail}
                            onSignUp={onSignUp}
                        />
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
