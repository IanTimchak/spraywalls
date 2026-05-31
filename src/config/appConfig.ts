export const appConfig = {
    name: process.env.EXPO_PUBLIC_APP_NAME ?? 'React Native Template',
    environment: process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
} as const;
