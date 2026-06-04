// features/screens/TestCombinedScreen.tsx
// Screens have three jobs:
// 1. call the hooks
// 2. define handler functions
// 3. render the component with props
// Screen is allowed to decide presentation behavior
import { useSignInWithEmail } from '../hooks/useSignInWithEmail';
import { useSignUpWithEmail } from '../hooks/useSignUpWithEmail';
import AuthForm from '../components/AuthForm';
import KeyboardDismissView from '../../../shared/ui/components/KeyboardDismissView';
import { Alert } from 'react-native';
import { useState, useEffect } from 'react';

export function AuthScreen() {
    const signIn = useSignInWithEmail();
    const signUp = useSignUpWithEmail();

    async function handleSignIn(email: string, password: string) {
        await signIn.signIn(email, password);
    }

    async function handleSignUp(email: string, password: string) {
        await signUp.signUp(email, password);
    }

    // mode hooks
    const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');

    function handleModeChange(newMode: 'signIn' | 'signUp') {
        setMode(newMode);
    }

    // Handle if there is an error or notice from either hook
    useEffect(() => {
        if (signIn.error) {
            Alert.alert('Sign In Error', signIn.error);
        }
    }, [signIn.error]);

    // useEffect(() => {
    //     if (signUp.error) {
    //         Alert.alert('Sign Up Error', signUp.error);
    //     }
    // }, [signUp.error]);
    useEffect(() => {
        if (signUp.error?.field === 'form') {
            Alert.alert('Sign Up Error', signUp.error.message);
        }
    }, [signUp.error]);

    useEffect(() => {
        if (signUp.notice) {
            Alert.alert('Sign Up Notice', signUp.notice);
        }
    }, [signUp.notice]);

    return (
        <KeyboardDismissView>
            <AuthForm
                loading={signIn.loading || signUp.loading}
                onSignIn={handleSignIn}
                onSignUp={handleSignUp}
                onGoogleSignIn={() =>
                    //TODO: implement google sign in flow
                    Alert.alert('Google Sign In', 'Google sign in flow not implemented yet.')
                }
                onGoogleSignUp={() =>
                    //TODO: implement google sign up flow
                    Alert.alert('Google Sign Up', 'Google sign up flow not implemented yet.')
                }
                onForgotPassword={() =>
                    Alert.alert('Forgot Password', 'Forgot password flow not implemented yet.')
                }
                onModeChange={handleModeChange}
                mode={mode}
                logoSource={require('../../../../assets/icon-set-v2/app-icon-256.png')}
                googleIconSource={require('../../../../assets/auth/google-logo.png')}
                signUpError={signUp.error}
                onClearSignUpError={signUp.clearError}
            />
        </KeyboardDismissView>
    );
}
