import type { Meta, StoryObj } from '@storybook/react-vite';

import AuthForm from './AuthForm';

const meta = {
    title: 'Components/AuthForm',
    component: AuthForm,
    args: {
        loading: false,
        onSignIn: () => {},
        onSignUp: () => {},
    },
} satisfies Meta<typeof AuthForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
    args: {
        loading: true,
    },
};
