// features/auth/components/AuthForm.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './authFormStyles';
import AuthModeSwitch from './AuthModeSwitch';
import OAuthButton from './OAuthButton';

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

                    {/* Email and Password Inputs */}
                    <View style={[styles.verticallySpaced, styles.mt30]}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            placeholder="email@address.com"
                            autoCapitalize="none"
                            autoComplete="email"
                            style={styles.input}
                            keyboardType="email-address"
                            textContentType="emailAddress"
                        />
                    </View>

                    {/* Password Input */}
                    <View style={styles.verticallySpaced}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.passwordFieldWrapper}>
                            <TextInput
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                                secureTextEntry={!showPassword}
                                placeholder="Password"
                                autoCapitalize="none"
                                autoComplete={
                                    mode === 'signIn' ? 'current-password' : 'new-password'
                                }
                                textContentType={mode === 'signIn' ? 'password' : 'newPassword'}
                                style={styles.passwordInput}
                            />
                            {password.length > 0 && (
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                    accessibilityLabel={
                                        showPassword ? 'Hide password' : 'Show password'
                                    }
                                    accessibilityRole="button"
                                >
                                    <Ionicons
                                        name={showPassword ? 'eye-off' : 'eye'}
                                        size={20}
                                        color="#000000"
                                        style={styles.passwordToggle}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Forgot Password Link */}
                    {mode === 'signIn' && featureFlags.passwordRecovery && (
                        <View style={styles.forgotPassword}>
                            <TouchableOpacity onPress={onForgotPassword}>
                                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Sign In / Sign Up Button */}
                    <View style={[styles.verticallySpaced, styles.mt20]}>
                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={() =>
                                mode === 'signIn'
                                    ? onSignIn(email, password)
                                    : onSignUp(email, password)
                            }
                            disabled={loading}
                            accessibilityLabel={
                                mode === 'signIn' ? 'Sign in button' : 'Sign up button'
                            }
                            accessibilityRole="button"
                            accessibilityState={{ disabled: loading }}
                        >
                            {loading ? (
                                <ActivityIndicator color="#ffffff" size="small" />
                            ) : (
                                <Text style={styles.buttonText}>
                                    {mode === 'signIn' ? 'Sign in' : 'Sign up'}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

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
