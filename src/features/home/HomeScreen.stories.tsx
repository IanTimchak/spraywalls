import type { Meta, StoryObj } from '@storybook/react-vite';

import { HomeScreen } from './HomeScreen';

const meta = {
    title: 'Screens/HomeScreen',
    component: HomeScreen,
    args: {
        appName: 'React Native Template',
    },
} satisfies Meta<typeof HomeScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
