import { useState, useCallback } from 'react';

type VoiceState = 'IDLE' | 'WAKE_DETECTED' | 'LISTENING_LATENT' | 'PROCESSING' | 'EXECUTING' | 'DORMANT';

export function useVoiceStateMachine() {
    const [state, setState] = useState<VoiceState>('IDLE');

    const transition = useCallback((event: 'WAKE' | 'SLEEP' | 'START_CMD' | 'END_CMD' | 'ERROR') => {
        setState(current => {
            switch (current) {
                case 'IDLE':
                case 'DORMANT':
                    if (event === 'WAKE') return 'WAKE_DETECTED';
                    return current;
                case 'WAKE_DETECTED':
                    // Auto-transition to latent listening after wake
                    return 'LISTENING_LATENT';
                case 'LISTENING_LATENT':
                    if (event === 'START_CMD') return 'PROCESSING';
                    if (event === 'SLEEP') return 'DORMANT';
                    return current;
                case 'PROCESSING':
                    if (event === 'END_CMD') return 'EXECUTING';
                    if (event === 'ERROR') return 'LISTENING_LATENT';
                    return current;
                case 'EXECUTING':
                    // Return to latent listening state after execution
                    return 'LISTENING_LATENT';
                default:
                    return 'IDLE';
            }
        });
    }, []);

    const setDirectState = useCallback((newState: VoiceState) => setState(newState), []);

    return { state, transition, setDirectState };
}
