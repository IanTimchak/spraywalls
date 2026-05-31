// features/screens/TestCombinedScreen.tsx
// Screens have three jobs:
// 1. call the hooks
// 2. define handler functions
// 3. render the component with props
// Screen is allowed to decide presentation behavior
import { useSignInWithEmail } from '../hooks/useSignInWithEmail';
import { useSignUpWithEmail } from '../hooks/useSignUpWithEmail';
import AuthForm from '../components/AuthForm';
import { Alert } from 'react-native';
import { useEffect } from 'react';

export function AuthScreen() {
    const signIn = useSignInWithEmail();
    const signUp = useSignUpWithEmail();

    async function handleSignIn(email: string, password: string) {
        await signIn.signIn(email, password);
    }

    async function handleSignUp(email: string, password: string) {
        await signUp.signUp(email, password);
    }

    // Show an alert if there is an error or notice from either hook
    useEffect(() => {
        if (signIn.error) {
            Alert.alert('Sign In Error', signIn.error);
        }
    }, [signIn.error]);

    useEffect(() => {
        if (signUp.error) {
            Alert.alert('Sign Up Error', signUp.error);
        }
    }, [signUp.error]);

    useEffect(() => {
        if (signUp.notice) {
            Alert.alert('Sign Up Notice', signUp.notice);
        }
    }, [signUp.notice]);

    return (
        <AuthForm
            loading={signIn.loading || signUp.loading}
            onSignIn={handleSignIn}
            onSignUp={handleSignUp}
        />
    );
}
