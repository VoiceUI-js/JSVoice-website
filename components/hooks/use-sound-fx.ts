import { useCallback, useRef } from 'react';

type SoundType = 'wake' | 'success' | 'nav' | 'scroll' | 'fx' | 'error';

export function useSoundEffects() {
    // Cache AudioContext to prevent persistent re-creation
    const audioContextRef = useRef<AudioContext | null>(null);

    const playSound = useCallback((type: SoundType = 'wake') => {
        try {
            // Lazy initialization
            if (!audioContextRef.current) {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (AudioContextClass) {
                    audioContextRef.current = new AudioContextClass();
                }
            }

            const ctx = audioContextRef.current;
            if (!ctx) return;

            // Ensure context is running (browser autoplay policy)
            if (ctx.state === 'suspended') {
                ctx.resume().catch(() => { });
            }

            const masterGain = ctx.createGain();
            masterGain.connect(ctx.destination);
            masterGain.gain.setValueAtTime(0, ctx.currentTime);
            masterGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);

            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter(); // Use BiquadFilterNode

            osc.connect(filter);
            filter.connect(masterGain);

            switch (type) {
                case 'wake':
                    // Sweeping robotic "Up" sound
                    osc.type = 'sawtooth';
                    filter.type = 'lowpass';
                    osc.frequency.setValueAtTime(100, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2);
                    filter.frequency.setValueAtTime(200, ctx.currentTime);
                    filter.frequency.exponentialRampToValueAtTime(4000, ctx.currentTime + 0.2);
                    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.4);
                    break;
                case 'nav':
                    // Digital blip-blop
                    osc.type = 'square';
                    osc.frequency.setValueAtTime(400, ctx.currentTime);
                    osc.frequency.setValueAtTime(600, ctx.currentTime + 0.05);
                    osc.frequency.setValueAtTime(850, ctx.currentTime + 0.1);
                    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.2);
                    break;
                case 'scroll':
                    // Mechanical whoosh
                    osc.type = 'sine';
                    filter.type = 'bandpass';
                    filter.Q.value = 15;
                    osc.frequency.setValueAtTime(150, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.3);
                    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.35);
                    break;
                case 'fx':
                    // Deep matrix space descend
                    osc.type = 'sawtooth';
                    filter.type = 'lowpass';
                    osc.frequency.setValueAtTime(1200, ctx.currentTime);
                    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.8);
                    filter.frequency.setValueAtTime(2000, ctx.currentTime);
                    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.8);
                    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
                    osc.start();
                    osc.stop(ctx.currentTime + 1.2);
                    break;
                case 'error':
                    // Negative buzz
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(150, ctx.currentTime);
                    osc.frequency.linearRampToValueAtTime(100, ctx.currentTime + 0.3);
                    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.3);
                    break;
                default:
                    // Short robotic confirmation
                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(900, ctx.currentTime);
                    osc.frequency.setValueAtTime(1800, ctx.currentTime + 0.05);
                    masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                    osc.start();
                    osc.stop(ctx.currentTime + 0.15);
                    break;
            }
        } catch (e) {
            console.error("Audio FX Error:", e);
        }
    }, []);

    return { playSound };
}
