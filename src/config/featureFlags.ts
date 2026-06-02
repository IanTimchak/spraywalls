export const featureFlags = {
    googleAuth: process.env.EXPO_PUBLIC_FEATURE_GOOGLE_AUTH === 'true',
    passwordRecovery: process.env.EXPO_PUBLIC_FEATURE_PASSWORD_RECOVERY === 'true',
} as const;
