import type { Meta, StoryObj } from '@storybook/react-vite';

import AppLoadingScreen from './AppLoadingScreen';

const iconUrl = new URL(
    '../../../assets/android-icon-monochrome-spraywalls-v2.png',
    import.meta.url,
).href;

const meta = {
    title: 'Components/AppLoadingScreen',
    component: AppLoadingScreen,
    args: {
        imageSrc: { uri: iconUrl },
    },
} satisfies Meta<typeof AppLoadingScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
