import type { Meta, StoryObj } from '@storybook/react-vite';

import SignUpForm from './SignUpForm';

const meta = {
    title: 'Components/Auth/SignUpForm',
    component: SignUpForm,
    args: {
        loading: false,
        onSignUp: () => {},
    },
} satisfies Meta<typeof SignUpForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
    args: {
        loading: true,
    },
};
