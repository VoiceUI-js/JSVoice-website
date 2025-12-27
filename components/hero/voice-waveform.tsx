'use client';

import { useEffect, useRef, useState } from 'react';

interface VoiceWaveformProps {
    isListening?: boolean;
}

export function VoiceWaveform({ isListening = false }: VoiceWaveformProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>();
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const barCount = 32;
        const bars = Array(barCount).fill(0).map(() => Math.random() * 0.5 + 0.2);

        const animate = () => {
            if (!ctx || !canvas) return;

            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;
            const barWidth = width / barCount;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Update bars
            bars.forEach((bar, index) => {
                if (isListening && dataArrayRef.current && analyserRef.current) {
                    // Use real audio data
                    const value = dataArrayRef.current[index * Math.floor(dataArrayRef.current.length / barCount)] / 255;
                    bars[index] = value * 0.8 + bars[index] * 0.2; // Smooth transition
                } else {
                    // Simulate waveform
                    bars[index] += (Math.random() - 0.5) * 0.1;
                    bars[index] = Math.max(0.1, Math.min(1, bars[index]));
                }

                const barHeight = bars[index] * height * 0.8;
                const x = index * barWidth;
                const y = (height - barHeight) / 2;

                // Create gradient for bar
                const gradient = ctx.createLinearGradient(x, y, x, y + barHeight);
                gradient.addColorStop(0, '#FF8A3D');
                gradient.addColorStop(0.5, '#E67300');
                gradient.addColorStop(1, '#CC5500');

                // Draw bar
                ctx.fillStyle = gradient;
                ctx.fillRect(x + barWidth * 0.2, y, barWidth * 0.6, barHeight);

                // Add glow
                ctx.shadowBlur = 10;
                ctx.shadowColor = 'rgba(204, 85, 0, 0.5)';
            });

            // Reset shadow
            ctx.shadowBlur = 0;

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isListening]);

    // Initialize audio context when listening starts
    useEffect(() => {
        if (isListening && !audioContextRef.current) {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    audioContextRef.current = new AudioContext();
                    analyserRef.current = audioContextRef.current.createAnalyser();
                    analyserRef.current.fftSize = 256;

                    const source = audioContextRef.current.createMediaStreamSource(stream);
                    source.connect(analyserRef.current);

                    const bufferLength = analyserRef.current.frequencyBinCount;
                    dataArrayRef.current = new Uint8Array(bufferLength);

                    const updateData = () => {
                        if (analyserRef.current && dataArrayRef.current) {
                            analyserRef.current.getByteFrequencyData(dataArrayRef.current);
                        }
                        if (isListening) {
                            requestAnimationFrame(updateData);
                        }
                    };
                    updateData();
                })
                .catch((err) => {
                    console.error('Error accessing microphone:', err);
                });
        }

        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
        };
    }, [isListening]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
