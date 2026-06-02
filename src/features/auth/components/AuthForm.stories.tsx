import type { Meta, StoryObj } from '@storybook/react-vite';

import AuthForm from './AuthForm';

const iconUrl = new URL('../../../../assets/icon-set-v2/app-icon-256.png', import.meta.url).href;
const googleIconUrl = new URL('../../../../assets/auth/google-logo.png', import.meta.url).href;

const meta = {
    title: 'Components/AuthForm',
    component: AuthForm,
    args: {
        loading: false,
        onSignIn: () => {},
        onSignUp: () => {},
        onForgotPassword: () => {},
        onModeChange: () => {},
        mode: 'signIn',
        logoSource: { uri: iconUrl },
        googleIconSource: { uri: googleIconUrl },
    },
} satisfies Meta<typeof AuthForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LoadingSignIn: Story = {
    args: {
        loading: true,
        mode: 'signIn',
    },
};

export const LoadingSignUp: Story = {
    args: {
        loading: true,
        mode: 'signUp',
    },
};

export const SignUpMode: Story = {
    args: {
        mode: 'signUp',
        loading: false,
    },
};

export const SignInMode: Story = {
    args: {
        mode: 'signIn',
        loading: false,
    },
};
