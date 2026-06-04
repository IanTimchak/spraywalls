// features/auth/hooks/useSignUpWithEmail.ts
import { useState } from 'react';
import { signUpWithEmail } from '../api/authApi';
import { SignUpError } from '../types';

type EmailSignUpResult =
    | { status: 'signed-in'; userId: string; email: string }
    | { status: 'verification-required'; email: string }
    | { status: 'error'; error: SignUpError };

// error helper
function getSignUpError(error: { code?: string; message: string }): SignUpError {
    switch (error.code) {
        case 'email_exists':
        case 'user_already_exists':
            return {
                kind: 'email-already-registered',
                field: 'email',
                message: 'This email is already registered with an account.',
            };

        case 'weak_password':
            return {
                kind: 'weak-password',
                field: 'form',
                message: error.message,
            };

        default:
            return {
                kind: 'unknown',
                field: 'form',
                message: error.message,
            };
    }
}

export function useSignUpWithEmail() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<SignUpError | null>(null);
    const [notice, setNotice] = useState<string | null>(null);

    async function signUp(email: string, password: string): Promise<EmailSignUpResult> {
        setLoading(true);
        setError(null);
        setNotice(null);

        try {
            const {
                data, // Supabase returns session and user data here
                error,
            } = await signUpWithEmail(email, password);

            // Handle known Supabase errors (e.g., email already in use, weak password)
            if (error) {
                const signUpError = getSignUpError(error);

                setError(signUpError);
                return { status: 'error', error: signUpError };
            }

            // If there is a session but no user, that's unexpected and we should handle it as an error
            if (!data.user) {
                const signUpError: SignUpError = {
                    kind: 'unknown',
                    field: 'form',
                    message: 'Sign-up succeeded, but no user was returned.',
                };

                setError(signUpError);

                return {
                    status: 'error',
                    error: signUpError,
                };
            }

            // If there isn't a session then the user needs to verify their email before signing in
            // With email confirmations enabled, Supabase may return an obfuscated user
            // for existing confirmed accounts instead of an error. In that setup, keep this
            // notice neutral rather than trying to detect duplicate signups client-side.
            if (!data.session) {
                setNotice(
                    'If this email can be registered, verification instructions will be sent. If you already have an account, sign in or reset your password.',
                );
                return { status: 'verification-required', email };
            }

            // Use user info for the return
            // Supabase may return the email in the user object, but if not we can use the email from the input
            return { status: 'signed-in', userId: data.user.id, email: data.user.email ?? email };
        } catch (error) {
            // Handle unexpected errors (e.g., network issues)
            const signUpError: SignUpError = {
                kind: 'unknown',
                field: 'form',
                message: error instanceof Error ? error.message : 'An unknown error occurred',
            };

            setError(signUpError);

            return {
                status: 'error',
                error: signUpError,
            };
        } finally {
            setLoading(false);
        }
    }

    function clearError() {
        setError(null);
    }

    return {
        signUp,
        loading,
        error,
        notice,
        clearError,
    };
}
