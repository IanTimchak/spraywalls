// features/auth/hooks/useSignUpWithEmail.ts
import { useState } from 'react';
import { signUpWithEmail } from '../api/authApi';

type EmailSignUpResult =
    | { status: 'signed-in'; userId: string; email: string }
    | { status: 'verification-required'; email: string }
    | { status: 'error'; message: string };

export function useSignUpWithEmail() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
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
                setError(error.message);
                return { status: 'error', message: error.message };
            }

            // If there isn't a session then the user needs to verify their email before signing in
            if (!data.session) {
                setNotice('Please check your inbox for email verification!');
                return { status: 'verification-required', email };
            }

            // If there is a session but no user, that's unexpected and we should handle it as an error
            if (!data.user) {
                const message = 'Sign-up succeeded, but no user was returned.';
                setError(message);

                return {
                    status: 'error',
                    message,
                };
            }

            // Use user info for the return
            // Supabase may return the email in the user object, but if not we can use the email from the input
            return { status: 'signed-in', userId: data.user.id, email: data.user.email ?? email };
        } catch (error) {
            // Handle unexpected errors (e.g., network issues)
            const errorMessage =
                error instanceof Error ? error.message : 'An unknown error occurred';
            setError(errorMessage);

            return {
                status: 'error',
                message: errorMessage,
            };
        } finally {
            setLoading(false);
        }
    }

    return {
        signUp,
        loading,
        error,
        notice,
    };
}
