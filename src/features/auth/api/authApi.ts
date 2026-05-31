// features/auth/authApi.ts
// This file contains the API functions for authentication using Supabase. Feature api files are coordinated
// by hooks, which get called from the UI components, which get staged in the screens.
import { supabase } from '../../../shared/api/supabase';

export async function signInWithEmail(email: string, password: string) {
    return supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });
}

export async function signUpWithEmail(email: string, password: string) {
    return supabase.auth.signUp({
        email: email,
        password: password,
    });
}

export async function signOut() {
    return supabase.auth.signOut();
}

export async function getAuthClaims() {
    return supabase.auth.getClaims();
}

export function onAuthStateChange(callback: () => void) {
    return supabase.auth.onAuthStateChange(callback);
}
