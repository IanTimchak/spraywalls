import type { StorybookConfig } from '@storybook/react-vite';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const storybookDir = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx|js|jsx)'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    viteFinal: async (viteConfig) => {
        viteConfig.resolve ??= {};
        viteConfig.resolve.alias = {
            ...(viteConfig.resolve.alias as Record<string, string>),
            'react-native': 'react-native-web',
            '@expo/vector-icons': resolve(storybookDir, './mocks/expoVectorIcons.tsx'),
        };

        viteConfig.define = {
            ...viteConfig.define,
            'process.env.EXPO_PUBLIC_APP_NAME': JSON.stringify(
                process.env.EXPO_PUBLIC_APP_NAME ?? 'React Native Template',
            ),
            'process.env.EXPO_PUBLIC_APP_ENV': JSON.stringify(
                process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
            ),
            'process.env.EXPO_PUBLIC_SUPABASE_URL': JSON.stringify(
                process.env.EXPO_PUBLIC_SUPABASE_URL ?? 'https://example.supabase.co',
            ),
            'process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(
                process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? 'test-publishable-key',
            ),
            'process.env.EXPO_PUBLIC_FEATURE_GOOGLE_AUTH': JSON.stringify(
                process.env.EXPO_PUBLIC_FEATURE_GOOGLE_AUTH ?? 'false',
            ),
            'process.env.EXPO_PUBLIC_FEATURE_PASSWORD_RECOVERY': JSON.stringify(
                process.env.EXPO_PUBLIC_FEATURE_PASSWORD_RECOVERY ?? 'false',
            ),
        };

        return viteConfig;
    },
};

export default config;
