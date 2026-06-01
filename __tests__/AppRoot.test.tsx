import { render, screen } from '@testing-library/react-native';
import type { JwtPayload } from '@supabase/supabase-js';

import { AppRoot } from '../src/app/AppRoot';
import { useAppStartup } from '../src/app/hooks/useAppStartup';
import { appConfig } from '../src/config/appConfig';

jest.mock('../src/app/hooks/useAppStartup', () => ({
    useAppStartup: jest.fn(),
}));

jest.mock('../src/app/components/AppLoadingScreen', () => ({
    __esModule: true,
    default: () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { Text } = require('react-native');

        return <Text>Startup loading</Text>;
    },
}));

jest.mock('../src/features/auth/screens/AuthScreen', () => ({
    AuthScreen: () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { Text } = require('react-native');

        return <Text>Auth screen</Text>;
    },
}));

jest.mock('../src/features/home/HomeScreen', () => ({
    HomeScreen: ({ appName }: { appName: string }) => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const { Text } = require('react-native');

        return <Text>Home screen: {appName}</Text>;
    },
}));

const mockUseAppStartup = jest.mocked(useAppStartup);
const signedInClaims = { sub: 'user-123' } as JwtPayload;

describe('AppRoot', () => {
    beforeEach(() => {
        mockUseAppStartup.mockReset();
    });

    it('renders the startup loading screen while app startup is still running', () => {
        mockUseAppStartup.mockReturnValue({
            status: 'starting',
            tasks: {
                auth: 'loading',
            },
            auth: {
                status: 'checking',
                claims: null,
                error: null,
            },
        });

        render(<AppRoot />);

        expect(screen.getByText('Startup loading')).toBeTruthy();
    });

    it('renders the auth screen after startup is ready when the user is signed out', () => {
        mockUseAppStartup.mockReturnValue({
            status: 'ready',
            tasks: {
                auth: 'ready',
            },
            auth: {
                status: 'signed-out',
                claims: null,
                error: null,
            },
        });

        render(<AppRoot />);

        expect(screen.getByText('Auth screen')).toBeTruthy();
    });

    it('renders the home screen after startup is ready when the user is signed in', () => {
        mockUseAppStartup.mockReturnValue({
            status: 'ready',
            tasks: {
                auth: 'ready',
            },
            auth: {
                status: 'signed-in',
                claims: signedInClaims,
                error: null,
            },
        });

        render(<AppRoot />);

        expect(screen.getByText(`Home screen: ${appConfig.name}`)).toBeTruthy();
        expect(screen.getByText('Signed in user: user-123')).toBeTruthy();
    });

    it('renders the startup error message when startup fails', () => {
        mockUseAppStartup.mockReturnValue({
            status: 'error',
            tasks: {
                auth: 'error',
            },
            auth: {
                status: 'error',
                claims: null,
                error: 'Unable to check auth session',
            },
        });

        render(<AppRoot />);

        expect(screen.getByText('Unable to check auth session')).toBeTruthy();
    });
});
