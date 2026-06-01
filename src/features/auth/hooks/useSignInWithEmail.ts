// features/auth/hooks/useSignInWithEmail.ts
import { useState } from 'react';
import { signInWithEmail } from '../api/authApi';

export function useSignInWithEmail() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function signIn(email: string, password: string) {
        setLoading(true);
        setError(null);

        try {
            // Call the sign-in API function here
            const { error } = await signInWithEmail(email, password);

            if (error) {
                // Supabase responded with a known auth failure
                setError(error.message);
                return false;
            }

            return true; // Sign-in successful
        } catch (error) {
            // Typically a network error or unexpected issue
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            return false;
        } finally {
            setLoading(false);
        }
    }

    return {
        signIn,
        loading,
        error,
    };
}
