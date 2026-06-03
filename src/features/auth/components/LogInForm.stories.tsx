import type { Meta, StoryObj } from '@storybook/react-vite';

import LogInForm from './LogInForm';

const meta = {
    title: 'Components/Auth/LogInForm',
    component: LogInForm,
    args: {
        loading: false,
        onSignIn: () => {},
        onForgotPassword: () => {},
    },
} satisfies Meta<typeof LogInForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
    args: {
        loading: true,
    },
};
