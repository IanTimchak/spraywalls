// features/auth/components/SignUpForm.tsx
import { useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './authFormStyles';

import type { TextInput as TextInputType } from 'react-native';
import type { SignUpError } from '../types';

//email validation
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function emailTest(email: string, signUpError: SignUpError | null) {
    if (signUpError?.field === 'email' && signUpError.kind === 'email-already-registered') {
        return {
            label: signUpError.message,
            met: false,
        };
    }

    if (email.trim().length === 0) {
        return {
            label: 'Email is required',
            met: false,
        };
    }

    return {
        label: 'Please enter a valid email format (user@email.com)',
        met: emailRegex.test(email),
    };
}

//password validation
function getPasswordRequirements(password: string) {
    return [
        { id: 'length', label: 'At least 8 characters', met: password.length >= 8 },
        { id: 'uppercase', label: 'One uppercase letter', met: /[A-Z]/.test(password) },
        { id: 'lowercase', label: 'One lowercase letter', met: /[a-z]/.test(password) },
        { id: 'number', label: 'One number', met: /\d/.test(password) },
    ];
}

type Props = {
    loading: boolean;
    email: string;
    onEmailChange: (email: string) => void;
    onSignUp: (email: string, password: string) => void | Promise<void>;
    signUpError: SignUpError | null;
};

export default function SignUpForm({
    loading,
    email,
    onEmailChange,
    onSignUp,
    signUpError,
}: Props) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // field checking
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [submitAttempted, setSubmitAttempted] = useState(false);

    // re-focus refs
    const emailInputRef = useRef<TextInputType>(null);
    const passwordInputRef = useRef<TextInputType>(null);

    const emailValidation = emailTest(email, signUpError);
    const emailIsValid = emailValidation.met;

    const passwordRequirements = getPasswordRequirements(password);
    const passwordIsValid = passwordRequirements.every((requirement) => requirement.met);

    const showEmailError =
        (emailTouched || submitAttempted || signUpError?.field === 'email') && !emailIsValid;
    const showPasswordRequirements = passwordTouched || submitAttempted;
    const showPasswordError = showPasswordRequirements && !passwordIsValid;

    function handleSignUpPress() {
        setSubmitAttempted(true);

        // focus on mistake
        if (!emailIsValid) {
            setEmailTouched(true);
            emailInputRef.current?.focus();
            return;
        }

        if (!passwordIsValid) {
            setPasswordTouched(true);
            passwordInputRef.current?.focus();
            return;
        }

        onSignUp(email, password);
    }

    return (
        <View>
            {/* Email and Password Inputs */}
            <View style={[styles.verticallySpaced, styles.mt30]}>
                <Text style={showEmailError ? signupStyles.dangerLabel : styles.label}>Email</Text>
                <TextInput
                    ref={emailInputRef}
                    onChangeText={(text) => onEmailChange(text)}
                    onBlur={() => setEmailTouched(true)} // only prompts after using field
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize="none"
                    autoComplete="email"
                    style={showEmailError ? signupStyles.dangerInput : styles.input}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
            </View>
            {showEmailError && (
                <Text style={signupStyles.requirementUnmet}>{emailValidation.label}</Text>
            )}

            {/* Password Input */}
            <View style={styles.verticallySpaced}>
                <Text style={showPasswordError ? signupStyles.dangerLabel : styles.label}>
                    Password
                </Text>
                <View
                    style={
                        showPasswordError
                            ? signupStyles.dangerPasswordFieldWrapper
                            : styles.passwordFieldWrapper
                    }
                >
                    <TextInput
                        ref={passwordInputRef}
                        onChangeText={(text) => setPassword(text)}
                        onBlur={() => setPasswordTouched(true)}
                        value={password}
                        secureTextEntry={!showPassword}
                        placeholder="Password"
                        autoCapitalize="none"
                        autoComplete="new-password"
                        textContentType="newPassword"
                        style={styles.passwordInput}
                    />
                    {password.length > 0 && (
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
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
            {showPasswordRequirements && (
                <View style={signupStyles.requirements}>
                    <Text style={signupStyles.requirementInstruction}>
                        Your password must meet the following requirements:{' '}
                    </Text>
                    {passwordRequirements.map((requirement) => (
                        <Text
                            key={requirement.id}
                            style={
                                requirement.met
                                    ? signupStyles.requirementMet
                                    : signupStyles.requirementUnmet
                            }
                        >
                            {requirement.met ? '✓' : '•'} {requirement.label}
                        </Text>
                    ))}
                </View>
            )}

            {/* Sign Up Button */}
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={() => handleSignUpPress()}
                    disabled={loading}
                    accessibilityLabel="Sign up button"
                    accessibilityRole="button"
                    accessibilityState={{ disabled: loading }}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" size="small" />
                    ) : (
                        <Text style={styles.buttonText}>Sign up</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const signupStyles = StyleSheet.create({
    dangerLabel: {
        ...styles.label,
        color: '#d64242',
    },
    dangerInput: {
        ...styles.input,
        borderColor: '#d64242',
    },
    dangerPasswordFieldWrapper: {
        ...styles.passwordFieldWrapper,
        borderColor: '#d64242',
    },
    requirements: {
        marginTop: 8,
        gap: 4,
    },
    requirementMet: {
        color: '#0F766E',
        fontSize: 14,
    },
    requirementUnmet: {
        color: '#d64242',
        fontSize: 14,
    },
    requirementInstruction: {
        ...styles.label,
        fontSize: 14,
        fontWeight: 'normal',
    },
});
