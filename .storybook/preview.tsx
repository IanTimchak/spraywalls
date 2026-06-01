import type { Preview } from '@storybook/react-vite';
import { View } from 'react-native';

const preview: Preview = {
    decorators: [
        (Story) => (
            <View style={{ flex: 1, minHeight: '100%', backgroundColor: '#F7F8FA' }}>
                <Story />
            </View>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
        backgrounds: {
            default: 'app',
            values: [
                { name: 'app', value: '#F7F8FA' },
                { name: 'surface', value: '#FFFFFF' },
                { name: 'dark', value: '#111827' },
            ],
        },
        viewport: {
            options: {
                web: {
                    name: 'Web',
                    styles: {
                        width: '100%',
                        height: '100%',
                    },
                },
                iphoneSE: {
                    name: 'iOS - iPhone SE',
                    styles: {
                        width: '375px',
                        height: '667px',
                    },
                },
                iphone15: {
                    name: 'iOS - iPhone 15',
                    styles: {
                        width: '393px',
                        height: '852px',
                    },
                },
                iphone15ProMax: {
                    name: 'iOS - iPhone 15 Pro Max',
                    styles: {
                        width: '430px',
                        height: '932px',
                    },
                },
            },
        },
    },
    initialGlobals: {
        viewport: {
            value: 'iphone15',
            isRotated: false,
        },
    },
};

export default preview;
