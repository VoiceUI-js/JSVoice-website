'use client';

import React, { useState } from 'react';
import { LayoutTemplate, Move, Eye, Code, Copy, Check, Sliders, Box, Layers, Palette, Monitor } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type HUDPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';

export default function DevHUDPage() {
    const [position, setPosition] = useState<HUDPosition>('bottom-right');
    const [theme, setTheme] = useState<'default' | 'minimal' | 'cyber'>('default');
    const [blurAmount, setBlurAmount] = useState(12);
    const [scale, setScale] = useState(1);
    const [isActive, setIsActive] = useState(true); // Simulation state
    const [isCopied, setIsCopied] = useState(false);

    // Generate Code
    const generatedCode = `
// VoiceHUD.tsx
import { motion } from 'framer-motion';

export const VoiceHUD = ({ isListening }: { isListening: boolean }) => {
  if (!isListening) return null;

  return (
    <div className="fixed ${position.replace('-', '-')} z-50 m-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: ${scale} }}
        className="backdrop-blur-[${blurAmount}px] bg-black/60 border border-white/10 rounded-full px-6 py-3 flex items-center gap-3 shadow-2xl"
      >
        <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        <span className="text-sm font-medium text-white tracking-wide">Listening...</span>
      </motion.div>
    </div>
  );
};
`.trim();

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">

            {/* LEFT: Configuration */}
            <div className="space-y-6">

                {/* Position Control */}
                <div className="glass-strong rounded-xl p-6 border border-white/10 relative overflow-hidden bg-black/40">
                    <div className="flex items-center space-x-2 mb-6">
                        <Move className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Screen Anchor</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-3 aspect-video bg-white/5 rounded-lg p-4 relative border border-white/5">
                        {/* Screen Representation */}
                        <div className="absolute inset-4 border border-white/10 rounded opacity-20 pointer-events-none" />

                        {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map((pos) => (
                            <button
                                key={pos}
                                onClick={() => setPosition(pos)}
                                className={cn(
                                    "w-full h-full rounded transition-all flex items-center justify-center",
                                    position === pos
                                        ? "bg-primary text-white shadow-[0_0_15px_rgba(204,85,0,0.4)] scale-110 z-10"
                                        : "bg-white/5 hover:bg-white/10 text-white/20 hover:text-white"
                                )}
                            >
                                <div className={cn("w-2 h-2 rounded-full", position === pos ? "bg-white" : "bg-current")} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Appearance Tuner */}
                <div className="glass-strong rounded-xl p-6 border border-white/10 relative overflow-hidden bg-black/40">
                    <div className="flex items-center space-x-2 mb-6">
                        <Palette className="w-4 h-4 text-blue-400" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Visual Tuner</h3>
                    </div>

                    <div className="space-y-6">
                        {/* Blur Slider */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                                <span className="uppercase">Backdrop Blur</span>
                                <span>{blurAmount}px</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="40"
                                value={blurAmount}
                                onChange={(e) => setBlurAmount(Number(e.target.value))}
                                className="w-full appearance-none h-1 bg-white/10 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                            />
                        </div>

                        {/* Scale Slider */}
                        <div className="space-y-3">
                            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                                <span className="uppercase">HUD Scale</span>
                                <span>{scale}x</span>
                            </div>
                            <input
                                type="range"
                                min="0.5" max="1.5" step="0.1"
                                value={scale}
                                onChange={(e) => setScale(Number(e.target.value))}
                                className="w-full appearance-none h-1 bg-white/10 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400 cursor-pointer hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                            />
                        </div>

                        {/* Simulation Toggle */}
                        <div className="flex items-center justify-between p-3 rounded bg-white/5 border border-white/5">
                            <span className="text-xs text-white">Simulate Active State</span>
                            <button
                                onClick={() => setIsActive(!isActive)}
                                className={cn(
                                    "w-10 h-5 rounded-full relative transition-colors",
                                    isActive ? "bg-green-500" : "bg-white/20"
                                )}
                            >
                                <div className={cn(
                                    "absolute top-1 w-3 h-3 rounded-full bg-white transition-all shadow-sm",
                                    isActive ? "left-6" : "left-1"
                                )} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* RIGHT: Live Preview & Code */}
            <div className="lg:col-span-2 flex flex-col gap-6">

                {/* Preview Window (Fake Desktop) */}
                <div className="glass-strong rounded-xl border border-white/10 relative overflow-hidden min-h-[400px] flex flex-col shadow-2xl bg-black">
                    {/* Window Header */}
                    <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 space-x-2">
                        <div className="flex space-x-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                        </div>
                        <div className="flex-1 text-center text-[10px] text-white/20 font-mono">App Simulation Endpoint</div>
                    </div>

                    {/* Window Content */}
                    <div className="flex-1 relative bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

                        {/* Mock App UI */}
                        <div className="relative z-0 p-12 opacity-50 pointer-events-none">
                            <div className="w-32 h-8 bg-white/10 rounded mb-8" />
                            <div className="grid grid-cols-3 gap-6">
                                <div className="h-32 bg-white/5 rounded" />
                                <div className="h-32 bg-white/5 rounded" />
                                <div className="h-32 bg-white/5 rounded" />
                            </div>
                        </div>

                        {/* THE ACTUAL HUD PREVIEW */}
                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    className={cn(
                                        "absolute m-8 flex items-center gap-4 px-6 py-3 rounded-full border border-white/10 text-white shadow-2xl backdrop-blur-md transition-all duration-300",
                                        // Dynamic Positioning
                                        position.includes('top') ? 'top-0' : 'bottom-0',
                                        position.includes('left') ? 'left-0' :
                                            position.includes('right') ? 'right-0' : 'left-1/2 -translate-x-1/2'
                                    )}
                                    style={{
                                        backdropFilter: `blur(${blurAmount}px)`,
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        scale: scale
                                    }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#cc5500]" />
                                    <span className="text-sm font-medium tracking-wide">Listening...</span>
                                    <div className="h-4 w-px bg-white/10 mx-2" />
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: [4, 12, 4] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                                                className="w-1 bg-white/50 rounded-full"
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                </div>

                {/* Code Export */}
                <div className="glass-strong rounded-xl border border-white/10 flex-1 flex flex-col overflow-hidden relative group bg-black/40">
                    <div className="p-3 border-b border-white/10 flex items-center justify-between bg-white/5">
                        <div className="flex items-center space-x-2">
                            <Code className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs font-medium text-white">VoiceHUD.tsx</span>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors text-[10px] font-medium text-white border border-white/10"
                        >
                            {isCopied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                            {isCopied ? "COPIED" : "COPY COMPONENT"}
                        </button>
                    </div>

                    <div className="flex-1 p-6 font-mono text-xs overflow-auto text-blue-300">
                        <pre className="whitespace-pre-wrap leading-relaxed">{generatedCode}</pre>
                    </div>
                </div>

            </div>
        </div>
    );
}
