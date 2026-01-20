'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import JSVoice from 'jsvoice'; // Import directly from jsvoice package
import { useToast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';
import { useSoundEffects } from '@/components/hooks/use-sound-fx';
import { useVoiceStateMachine } from '@/components/hooks/use-voice-state-machine';
import { useVisualModes } from '@/components/hooks/use-visual-modes';

interface VoiceContextType {
    voice: any;
    isListening: boolean;
    voiceStatus: 'idle' | 'listening' | 'processing' | 'active';
    lastCommand: string;
    transcript: string;
    toggleListening: () => void;
    matrixMode: boolean;
    setMatrixMode: (val: boolean) => void;
    ghostMode: boolean;
    setGhostMode: (val: boolean) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

interface VoiceContextType {
    voice: any;
    isListening: boolean;
    voiceStatus: 'idle' | 'listening' | 'processing' | 'active';
    lastCommand: string;
    transcript: string;
    toggleListening: () => void;
    matrixMode: boolean;
    setMatrixMode: (val: boolean) => void;
    setGhostMode: (val: boolean) => void;
    startAmplitude: (cb: (data: number[]) => void) => void;
    stopAmplitude: () => void;
    emulateCommand: (text: string) => void;
}

export function GlobalVoiceProvider({ children }: { children: React.ReactNode }) {
    const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'processing' | 'active'>('idle');
    const [lastCommand, setLastCommand] = useState<string>('');
    const [transcript, setTranscript] = useState<string>('');
    const [matrixMode, setMatrixMode] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);
    const [ghostMode, setGhostMode] = useState(false);
    const voiceRef = useRef<any>(null);
    const { toast } = useToast();
    const router = useRouter();

    // Manage Visual Side Effects via Hook
    useVisualModes({ matrixMode, isLightMode, ghostMode });

    const { playSound } = useSoundEffects();
    const { state: machineState, transition } = useVoiceStateMachine();

    useEffect(() => {
        // Suppress recurring library logs globally
        const originalError = console.error;
        console.error = (...args: any[]) => {
            const str = args.join(' ').toLowerCase();
            if (str.includes('[jsvoice]') && (str.includes('no-speech') || str.includes('aborted') || str.includes('network'))) {
                return;
            }
            originalError.apply(console, args);
        };

        if (typeof window !== 'undefined' && !('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn("[JSVoice] Speech Recognition not supported in this browser.");
            toast("Voice control not supported in this browser. Please use Chrome or Edge.", "error");
            return;
        }

        if (voiceRef.current) return;

        const voice = new JSVoice({
            wakeWord: 'hello voice',
            wakeWordTimeout: 7000,
            continuous: true,
            autoRestart: true,
            onWakeWordDetected: () => {
                setVoiceStatus('listening');
                toast("System Link Active.", "info");
                playSound('wake');
                // Switch to latched mode (disable wake word requirement)
                // This allows the user to issue multiple commands freely
                if (voice && voice.setOption) {
                    voice.setOption('wakeWord', null);
                }
                transition('WAKE');
                setLastCommand('');
                // Greeting removed per user request
            },
            onCommandRecognized: (phrase: string) => {
                setLastCommand(phrase);
            },
            onError: (err: any) => {
                const errorMsg = (typeof err === 'string' ? err : err?.error || err?.message || err?.info || '').toLowerCase();
                if (
                    errorMsg.includes('aborted') ||
                    errorMsg.includes('no-speech') ||
                    errorMsg.includes('network') ||
                    errorMsg === ''
                ) return;
                originalError("[JSVoice] Technical Entry:", err);
            }
        } as any);

        // Explicitly disable internal library debugging
        (voice as any).debug = false;

        (voice as any).onResult = (text: string) => {
            setTranscript(text);
        };

        // Scroll Control
        voice.addCommand('scroll down', () => {
            window.scrollBy({ top: 700, behavior: 'smooth' });
            playSound('scroll');
        });

        voice.addCommand('scroll up', () => {
            window.scrollBy({ top: -700, behavior: 'smooth' });
            playSound('scroll');
        });

        voice.addCommand('scroll to top', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            playSound('scroll');
        });

        voice.addCommand('scroll to bottom', () => {
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
            playSound('scroll');
        });

        voice.addCommand('stop listening', () => {
            setVoiceStatus('idle');
            // Re-enable wake word requirement
            if (voiceRef.current && voiceRef.current.setOption) {
                voiceRef.current.setOption('wakeWord', 'hello voice');
            }
            toast("Node Dormant.", "info");
            playSound('nav');
            transition('SLEEP');
        });

        // Site Effects
        voice.addCommand('matrix mode', () => {
            setMatrixMode(true);
            playSound('fx');
            voice.speak('Simulation adjusted.');
        });

        voice.addCommand('matrix off', () => {
            setMatrixMode(false);
            playSound('fx');
            voice.speak('Matrix simulation disabled.');
        });

        voice.addCommand('light mode', () => {
            setIsLightMode(true);
            setMatrixMode(false);
            playSound('success');
            voice.speak('Light theme activated.');
        });

        voice.addCommand('dark mode', () => {
            setIsLightMode(false);
            setMatrixMode(false);
            playSound('success');
            voice.speak('Dark theme activated.');
        });

        voice.addCommand('ghost mode', () => {
            setGhostMode(true);
            playSound('fx');
            voice.speak('Phase shift complete.');
        });

        voice.addCommand('normal mode', () => {
            setMatrixMode(false);
            setGhostMode(false);
            playSound('success');
            voice.speak('Reality restored.');
        });

        // Navigation Aliases
        const navPlayground = () => {
            playSound('nav');
            router.push('/playground');
        };
        voice.addCommand('go to playground', navPlayground);
        voice.addCommand('open playground', navPlayground);
        voice.addCommand('show playground', navPlayground);

        const navDocs = () => {
            playSound('nav');
            router.push('/docs');
        };
        voice.addCommand('go to docs', navDocs);
        voice.addCommand('open docs', navDocs);
        voice.addCommand('show documentation', navDocs);

        voice.addCommand('zoom in', () => {
            const currentZoom = parseFloat(document.body.style.zoom || '1');
            document.body.style.zoom = (currentZoom + 0.1).toString();
            playSound('success');
        });

        voice.addCommand('zoom out', () => {
            const currentZoom = parseFloat(document.body.style.zoom || '1');
            document.body.style.zoom = (currentZoom - 0.1).toString();
            playSound('success');
        });

        voice.addCommand('reset zoom', () => {
            document.body.style.zoom = '1';
            playSound('nav');
        });

        voice.addCommand('system diagnostics', () => {
            playSound('fx');
            voice.speak('Diagnostics initiated. Core temperature nominal. Neural link bandwidth at maximum. All systems functional.');
        });

        voice.addCommand('go home', () => {
            playSound('nav');
            router.push('/');
        });

        voice.addCommand('reload system', () => {
            playSound('fx');
            voice.speak('Reinitializing core.');
            setTimeout(() => window.location.reload(), 1200);
        });

        voiceRef.current = voice;

        try {
            voice.start();
        } catch (e) {
            console.log("Mic access pending.");
        }

        return () => {
            if (voiceRef.current) voiceRef.current.stop();
        };
    }, [router, toast]);

    const toggleListening = () => {
        if (!voiceRef.current) return;
        if (voiceStatus === 'listening' || voiceStatus === 'active') {
            voiceRef.current.stop();
            setVoiceStatus('idle');
        } else {
            voiceRef.current.start();
            setVoiceStatus('listening');
        }
    };

    const emulateCommand = (input: string) => {
        if (!voiceRef.current) return;
        const cmdText = input.toLowerCase().trim();
        setTranscript(cmdText);
        setLastCommand(cmdText);

        // Try to find match in strict commands
        const commands = voiceRef.current.commands;
        if (commands && Array.isArray(commands)) {
            const match = commands.find((c: any) => c.command === cmdText || cmdText.includes(c.command));
            if (match && typeof match.callback === 'function') {
                match.callback();
                playFx('success');
                return;
            }
        }
        // If the library was object-based
        if (commands && typeof commands === 'object' && !Array.isArray(commands)) {
            if (commands[cmdText]) {
                commands[cmdText]();
                playFx('success');
                return;
            }
        }
    };

    const audioContextRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const rafRef = useRef<number | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startAmplitude = (cb: (data: number[]) => void) => {
        // Try library first
        if (voiceRef.current && typeof voiceRef.current.startAmplitude === 'function') {
            voiceRef.current.startAmplitude(cb, { mode: 'bars', barCount: 20 });
            return;
        }

        // Fallback: Manual Audio Visualization
        const initVisualizer = async () => {
            try {
                if (!audioContextRef.current) {
                    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
                }
                const ctx = audioContextRef.current;

                // Ensure context is running (it can start suspended)
                if (ctx.state === 'suspended') {
                    await ctx.resume();
                }

                // If we already have a stream from the voice engine, we should try to reuse it if exposed,
                // but usually the native engine hides the stream. We must get a new one or handle errors.
                if (!streamRef.current || !streamRef.current.active) {
                    streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
                }

                // Cleaning up old connections if called repeatedly
                if (sourceRef.current) {
                    try { sourceRef.current.disconnect(); } catch (e) { }
                }

                const source = ctx.createMediaStreamSource(streamRef.current);
                const analyser = ctx.createAnalyser();
                analyser.fftSize = 64;
                analyser.smoothingTimeConstant = 0.8;
                source.connect(analyser);

                sourceRef.current = source;
                analyserRef.current = analyser;

                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);

                const renderFrame = () => {
                    if (!analyserRef.current) return;
                    analyserRef.current.getByteFrequencyData(dataArray);
                    // Map first 20 bins to output
                    const bars: number[] = [];
                    // Using a subset of bins for better visual representation of speech range
                    for (let i = 0; i < 20; i++) {
                        const val = dataArray[i] || 0;
                        bars.push(val / 255);
                    }
                    cb(bars);
                    rafRef.current = requestAnimationFrame(renderFrame);
                };
                renderFrame();
            } catch (err) {
                console.warn("[GlobalVoiceProvider] Visualization fallback failed:", err);
            }
        };

        // Delay slightly to avoid conflict with mic activation
        initVisualizer();
    };

    const stopAmplitude = () => {
        // Try library first
        if (voiceRef.current && typeof voiceRef.current.stopAmplitude === 'function') {
            voiceRef.current.stopAmplitude();
            return;
        }

        // Fallback Cleanup
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        // We do NOT stop the stream here because it might be shared or needed for the recognition
        // We only disconnect the analyser
        if (sourceRef.current) {
            try { sourceRef.current.disconnect(); } catch (e) { }
            sourceRef.current = null;
        }
        if (analyserRef.current) {
            try { analyserRef.current.disconnect(); } catch (e) { }
            analyserRef.current = null;
        }
    };

    // Internal helper for FX
    const playFx = (type: 'success' | 'error' | 'nav') => {
        // Use the hook's player if available
        playSound(type);
    }

    return (
        <VoiceContext.Provider value={{
            voice: voiceRef.current,
            isListening: voiceStatus === 'listening' || voiceStatus === 'active',
            voiceStatus,
            lastCommand,
            transcript,
            toggleListening,
            matrixMode,
            setMatrixMode,
            ghostMode,
            setGhostMode,
            startAmplitude,
            stopAmplitude,
            emulateCommand
        }}>
            {children}
        </VoiceContext.Provider>
    );
}

export function useGlobalVoice() {
    const context = useContext(VoiceContext);
    if (!context) {
        throw new Error("useGlobalVoice must be used within GlobalVoiceProvider");
    }
    return context;
}
