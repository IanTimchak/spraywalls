// features/auth/components/AuthModeSwitch.stories.tsx

import type { Meta, StoryObj } from '@storybook/react-vite';

import AuthModeSwitch from './AuthModeSwitch';

const meta = {
    title: 'Components/AuthModeSwitch',
    component: AuthModeSwitch,
    args: {
        mode: 'signIn',
        onModeChange: () => {},
    },
} satisfies Meta<typeof AuthModeSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const signIn: Story = {};
export const signUp: Story = {
    args: {
        mode: 'signUp',
    },
};
