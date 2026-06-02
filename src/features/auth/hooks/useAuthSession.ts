// features/auth/hooks/useAuthSession.ts
import { useEffect, useState } from 'react';
import { getAuthClaims, onAuthStateChange } from '../api/authApi';
import { JwtPayload } from '@supabase/supabase-js';

type AuthStatus = 'checking' | 'signed-in' | 'signed-out' | 'error';

type AuthSession = {
    status: AuthStatus;
    claims: JwtPayload | null;
    error: string | null;
};

export function useAuthSession(): AuthSession {
    const [authSession, setAuthSession] = useState<AuthSession>({
        status: 'checking',
        claims: null,
        error: null,
    });

    useEffect(() => {
        async function refreshAuthClaims() {
            // debug delay
            //await new Promise((resolve) => setTimeout(resolve, 2500));

            const { data, error } = await getAuthClaims();

            if (error) {
                setAuthSession({
                    status: 'error',
                    claims: null,
                    error: error.message,
                });
                return;
            }

            const claims = data?.claims ?? null;

            setAuthSession({
                status: claims ? 'signed-in' : 'signed-out',
                claims,
                error: null,
            });
        }

        refreshAuthClaims();

        const {
            data: { subscription },
        } = onAuthStateChange(() => {
            refreshAuthClaims();
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return authSession;
}
