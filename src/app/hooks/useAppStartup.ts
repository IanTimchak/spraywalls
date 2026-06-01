// src/app/hooks/useAppStartup.ts
import { useState, useEffect } from 'react';
import { useAuthSession } from '../../features/auth/hooks/useAuthSession';

type StartupTaskStatus = 'loading' | 'ready' | 'error';

type StartupState = {
    status: 'starting' | 'ready' | 'error';
    tasks: {
        auth: StartupTaskStatus;
        // assets: StartupTaskStatus;
        // settings: StartupTaskStatus;
    };
};

export function useAppStartup() {
    const auth = useAuthSession();

    const [startup, setStartup] = useState<StartupState>({
        status: 'starting',
        tasks: {
            auth: 'loading',
            // assets: 'loading',
            // settings: 'loading',
        },
    });

    useEffect(() => {
        const tasks: StartupState['tasks'] = {
            auth:
                auth.status === 'checking'
                    ? 'loading'
                    : auth.status === 'error'
                      ? 'error'
                      : 'ready',
            // assets: 'ready', // Placeholder for asset loading status
            // settings: 'ready', // Placeholder for settings loading status
        };

        const hasError = Object.values(tasks).some((taskStatus) => taskStatus === 'error');

        const isReady = Object.values(tasks).every((taskStatus) => taskStatus === 'ready');

        setStartup({
            status: hasError ? 'error' : isReady ? 'ready' : 'starting',
            tasks,
        });
    }, [auth.status]);

    return {
        ...startup,
        auth,
    };
}
