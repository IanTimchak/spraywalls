import type { StorybookConfig } from '@storybook/react-vite';

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
        };

        return viteConfig;
    },
};

export default config;
