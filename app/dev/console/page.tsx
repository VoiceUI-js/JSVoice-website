'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useGlobalVoice } from '@/components/providers/global-voice-provider';
import { Mic, MicOff, Activity, Radio, Terminal, Send, Cpu, Zap, Search, Filter, Trash2, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function DevConsolePage() {
    const { isListening, voiceStatus, lastCommand, transcript, startAmplitude, stopAmplitude, emulateCommand } = useGlobalVoice();
    const [logs, setLogs] = useState<{ id: string; time: string; type: 'info' | 'success' | 'warning' | 'error'; message: string, meta?: string }[]>([]);
    const [cmdInput, setCmdInput] = useState('');
    const [logFilter, setLogFilter] = useState<'all' | 'error' | 'command'>('all');

    // Metrics State
    const [latency, setLatency] = useState(0);
    const [memory, setMemory] = useState(0);

    // Canvas Ref for Advanced Visualizer
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Initial Log
    useEffect(() => {
        addLog('info', 'Console session initialized', 'CORE.INIT');
    }, []);

    // Simulated Metrics Ticker
    useEffect(() => {
        const interval = setInterval(() => {
            setLatency(Math.floor(Math.random() * 15) + (isListening ? 12 : 4));
            setMemory(Math.floor(Math.random() * 5) + 32);
        }, 2000);
        return () => clearInterval(interval);
    }, [isListening]);

    // Initialize amplitude monitoring & Canvas Rendering
    useEffect(() => {
        let animationId: number;

        if (isListening) {
            addLog('info', 'Audio stream capture started', 'AUDIO.STREAM');

            startAmplitude((data) => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const width = canvas.width;
                const height = canvas.height;
                const centerY = height / 2;

                ctx.clearRect(0, 0, width, height);

                // Holographic Guideline
                ctx.beginPath();
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.moveTo(0, centerY);
                ctx.lineTo(width, centerY);
                ctx.stroke();

                // Draw Waveform
                ctx.beginPath();
                // Gradient for the wave
                const gradient = ctx.createLinearGradient(0, 0, width, 0);
                gradient.addColorStop(0, '#CC5500');
                gradient.addColorStop(0.5, '#FF8A3D');
                gradient.addColorStop(1, '#CC5500');

                ctx.strokeStyle = gradient;
                ctx.lineWidth = 2;
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#CC5500';

                const sliceWidth = width / data.length;
                let x = 0;

                ctx.moveTo(0, centerY);

                // Mirror effect
                for (let i = 0; i < data.length; i++) {
                    const v = data[i] * 1.5; // Gain
                    const y = centerY - (v * centerY * 0.8);

                    // Smooth curve
                    const xc = x + (sliceWidth / 2);
                    const yc = y;

                    ctx.lineTo(x, y);

                    x += sliceWidth;
                }

                // Draw bottom half (mirrored)
                for (let i = data.length - 1; i >= 0; i--) {
                    const v = data[i] * 1.5;
                    const y = centerY + (v * centerY * 0.8);
                    ctx.lineTo(x, y);
                    x -= sliceWidth;
                }

                ctx.stroke();

                // Active particles
                if (Math.random() > 0.9) {
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
                }

            });
        } else {
            addLog('warning', 'Voice engine suspended', 'CORE.SUSPEND');
            stopAmplitude();
        }

        return () => {
            stopAmplitude();
            if (animationId) cancelAnimationFrame(animationId);
        };
    }, [isListening]);

    // Event Listeners for logs
    useEffect(() => {
        if (lastCommand) {
            addLog('success', `Executed: "${lastCommand}"`, 'CMD.MATCH');
        }
    }, [lastCommand]);

    useEffect(() => {
        if (voiceStatus) {
            // addLog('info', `State transition: ${voiceStatus.toUpperCase()}`, 'STATE.CHANGE');
        }
    }, [voiceStatus]);

    const addLog = (type: 'info' | 'success' | 'warning' | 'error', message: string, meta?: string) => {
        setLogs(prev => [
            {
                id: Math.random().toString(36).substring(7),
                time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                type,
                message,
                meta
            },
            ...prev.slice(0, 99)
        ]);
    };

    const handleCommandSubmit = () => {
        if (cmdInput.trim()) {
            addLog('info', `Emulating input: "${cmdInput}"`, 'DEV.EMULATE');
            emulateCommand(cmdInput);
            setCmdInput('');
        }
    };

    const filteredLogs = useMemo(() => {
        if (logFilter === 'all') return logs;
        if (logFilter === 'error') return logs.filter(l => l.type === 'error' || l.type === 'warning');
        if (logFilter === 'command') return logs.filter(l => l.type === 'success');
        return logs;
    }, [logs, logFilter]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full font-sans">

            {/* LEFT COLUMN: Vitals & Visualizer (4 cols) */}
            <div className="lg:col-span-4 space-y-6 flex flex-col">

                {/* Status Cockpit */}
                <div className="glass-strong rounded-xl border border-white/10 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    {/* Header */}
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
                        <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-primary" />
                            <h3 className="text-xs font-bold text-white tracking-widest uppercase">Engine Vitals</h3>
                        </div>
                        <div className="flex items-center space-x-1.5">
                            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isListening ? "bg-green-500" : "bg-red-500")} />
                            <span className={cn("text-[10px] font-mono font-bold uppercase", isListening ? "text-green-500" : "text-red-500")}>
                                {isListening ? 'ONLINE' : 'OFFLINE'}
                            </span>
                        </div>
                    </div>

                    {/* Main Visualizer */}
                    <div className="h-48 relative bg-black/60 flex items-center justify-center overflow-hidden">
                        {isListening ? (
                            <canvas ref={canvasRef} width={400} height={200} className="w-full h-full opacity-90" />
                        ) : (
                            <div className="text-center">
                                <MicOff className="w-8 h-8 text-white/10 mx-auto mb-2" />
                                <p className="text-xs text-white/20 font-mono">SIGNAL LOST</p>
                            </div>
                        )}

                        {/* Overlay Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 bg-black/20">
                        <div className="p-3 flex items-center space-x-3">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <div>
                                <div className="text-[10px] text-muted-foreground uppercase">Latency</div>
                                <div className="text-sm font-mono font-bold text-white">{isListening ? `${latency}ms` : '-'}</div>
                            </div>
                        </div>
                        <div className="p-3 flex items-center space-x-3">
                            <Cpu className="w-4 h-4 text-purple-400" />
                            <div>
                                <div className="text-[10px] text-muted-foreground uppercase">Heap Size</div>
                                <div className="text-sm font-mono font-bold text-white">{memory}MB</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Transcript Card */}
                <div className={cn(
                    "glass-strong rounded-xl border border-white/10 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all duration-300",
                    isListening ? "shadow-[0_0_30px_rgba(204,85,0,0.15)] bg-black/40" : "bg-black/20"
                )}>
                    {isListening && <div className="absolute top-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />}

                    <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Transcript Buffer</h3>

                    <div className="min-h-[80px] flex items-center justify-center w-full">
                        <p className={cn(
                            "text-xl md:text-2xl font-medium tracking-tight transition-all duration-200",
                            transcript ? "text-white blur-none scale-100" : "text-white/10 blur-[2px] scale-95"
                        )}>
                            {transcript || "Waiting for signal..."}
                        </p>
                    </div>

                    {/* Last Match Pill */}
                    <AnimatePresence>
                        {lastCommand && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="mt-4 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-3 h-3" />
                                <span>MATCH_FOUND: {lastCommand}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Headless Command Input (Styled) */}
                <div className="glass-strong rounded-xl border border-white/10 p-1 relative group bg-black/40">
                    <div className="flex items-center">
                        <div className="p-3 text-muted-foreground group-focus-within:text-primary transition-colors">
                            <Terminal className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={cmdInput}
                            onChange={(e) => setCmdInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCommandSubmit()}
                            placeholder="Type command to simulate..."
                            className="bg-transparent border-none text-sm text-white placeholder:text-muted-foreground/50 w-full focus:outline-none font-mono"
                        />
                        <button
                            onClick={handleCommandSubmit}
                            className="p-2 m-1 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-all disabled:opacity-50"
                            disabled={!cmdInput.trim()}
                        >
                            <Send className="w-3 h-3" />
                        </button>
                    </div>
                </div>

            </div>

            {/* RIGHT COLUMN: Advanced Logs (8 cols) */}
            <div className="lg:col-span-8 flex flex-col h-full min-h-[500px]">
                <div className="glass-strong rounded-xl border border-white/10 flex flex-col h-full bg-black/40 overflow-hidden shadow-2xl">

                    {/* Log Toolbar */}
                    <div className="p-2 border-b border-white/10 flex items-center justify-between bg-white/5">
                        <div className="flex items-center space-x-1">
                            {(['all', 'command', 'error'] as const).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setLogFilter(tab)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize",
                                        logFilter === tab
                                            ? "bg-white/10 text-white shadow-sm border border-white/10"
                                            : "text-muted-foreground hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center space-x-2">
                            <div className="bg-black/50 rounded-md px-2 py-1.5 flex items-center space-x-2 border border-white/5">
                                <Search className="w-3 h-3 text-muted-foreground" />
                                <input type="text" placeholder="Filter stream..." className="bg-transparent border-none text-[10px] text-white w-24 focus:outline-none" />
                            </div>
                            <button
                                onClick={() => setLogs([])}
                                className="p-1.5 rounded-md text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                title="Clear Logs"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    {/* Log Stream */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-1 font-mono text-sm scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <AnimatePresence initial={false}>
                            {filteredLogs.map((log) => (
                                <motion.div
                                    key={log.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={cn(
                                        "relative flex items-start space-x-3 py-2 px-3 rounded border border-transparent hover:border-white/5 hover:bg-white/5 transition-colors group",
                                        log.type === 'error' && "bg-red-500/5 border-red-500/10",
                                        log.type === 'success' && "bg-green-500/5 border-green-500/10",
                                        log.type === 'warning' && "bg-yellow-500/5 border-yellow-500/10",
                                    )}
                                >
                                    <div className="shrink-0 pt-0.5">
                                        {log.type === 'info' && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                                        {log.type === 'success' && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                                        {log.type === 'warning' && <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />}
                                        {log.type === 'error' && <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase tracking-wider",
                                                log.type === 'error' ? "text-red-400" :
                                                    log.type === 'success' ? "text-green-400" :
                                                        log.type === 'warning' ? "text-yellow-400" : "text-blue-400"
                                            )}>
                                                {log.meta || log.type}
                                            </span>
                                            <span className="text-[10px] text-white/20 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                                {log.time}
                                            </span>
                                        </div>
                                        <p className="text-white/80 break-words leading-relaxed text-xs">
                                            {log.message}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {filteredLogs.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                                <Terminal className="w-12 h-12 mb-4 opacity-20" />
                                <p className="text-xs uppercase tracking-widest">No signals derived</p>
                            </div>
                        )}
                    </div>

                    {/* Log Filter Info */}
                    <div className="p-1 px-3 border-t border-white/10 bg-black/60 flex justify-between items-center text-[10px] text-white/30 font-mono">
                        <span>FILTER: {logFilter.toUpperCase()}</span>
                        <span>COUNT: {filteredLogs.length}</span>
                    </div>

                </div>
            </div>

        </div>
    );
}
