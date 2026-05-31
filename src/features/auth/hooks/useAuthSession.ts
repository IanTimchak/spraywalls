// features/auth/hooks/useAuthSession.ts
import { useEffect, useState } from 'react';
import { getAuthClaims, onAuthStateChange } from '../api/authApi';
import { JwtPayload } from '@supabase/supabase-js';

export function useAuthSession() {
    const [claims, setClaims] = useState<JwtPayload | null>(null);

    useEffect(() => {
        // Get initial auth claims when the hook mounts
        getAuthClaims().then(({ data }) => {
            setClaims(data?.claims ?? null);
        });

        const {
            data: { subscription },
        } = onAuthStateChange(() => {
            getAuthClaims().then(({ data }) => {
                setClaims(data?.claims ?? null);
            });
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return {
        claims,
        isSignedIn: Boolean(claims),
    };
}
