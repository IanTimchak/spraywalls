// features/auth/components/AuthForm.tsx
import React, { useEffect, useState } from 'react';
import AuthModeSwitch from './AuthModeSwitch';
import OAuthButton from './OAuthButton';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
                    <View
                        style={[
                            styles.verticallySpaced,
                            mode === 'signIn' ? styles.mt20 : styles.mt20,
                        ]}
                    >
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

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    frame: {
        flex: 1,
        position: 'relative',
    },
    content: {
        flex: 1,
        paddingHorizontal: 12,
    },

    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },

    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
    },

    mt30: {
        marginTop: 30,
    },
    mt20: {
        marginTop: 20,
    },
    mt10: {
        marginTop: 10,
    },

    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#86939e',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#86939e',
        borderRadius: 4,
        padding: 12,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#646464',
        borderRadius: 6,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 48,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    passwordFieldWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#86939e',
        borderRadius: 4,
    },
    passwordInput: {
        flex: 1,
        padding: 12,
        fontSize: 18,
    },
    passwordToggle: {
        padding: 12,
    },
    forgotPassword: {
        marginTop: 20,
        alignSelf: 'center',
    },
    forgotPasswordText: {
        color: '#646464',
        fontSize: 14,
    },

    orDivider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#86939e',
    },
    orText: {
        marginHorizontal: 8,
        color: '#86939e',
        fontSize: 14,
    },
});
