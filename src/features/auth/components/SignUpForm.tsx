// features/auth/components/SignUpForm.tsx
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './authFormStyles';

type Props = {
    loading: boolean;
    email: string;
    onEmailChange: (email: string) => void;
    onSignUp: (email: string, password: string) => void | Promise<void>;
};

export default function SignUpForm({ loading, email, onEmailChange, onSignUp }: Props) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View>
            {/* Email and Password Inputs */}
            <View style={[styles.verticallySpaced, styles.mt30]}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    onChangeText={(text) => onEmailChange(text)}
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

            {/* Sign Up Button */}
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={() => onSignUp(email, password)}
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
