'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useGlobalVoice } from '@/components/providers/global-voice-provider';
import { Search, Hash, Zap, Clock, Command, Play, Activity, Sparkles, AlertTriangle, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type CommandItem = {
    command: string;
    originalPhrase: string;
    callback?: Function;
};

// Simple deviation calc for demo purposes
const calculateSimilarity = (s1: string, s2: string) => {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    const longerLength = longer.length;
    if (longerLength === 0) return 1.0;

    // Very basic inclusion/distance proxy
    if (longer.includes(shorter)) return 0.9;

    // Match common chars
    let match = 0;
    for (let i = 0; i < shorter.length; i++) {
        if (longer.includes(shorter[i])) match++;
    }
    return match / longerLength;
}

export default function DevInspectorPage() {
    const { voice, lastCommand } = useGlobalVoice();
    const [commands, setCommands] = useState<CommandItem[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCommand, setSelectedCommand] = useState<CommandItem | null>(null);
    const [testPhrase, setTestPhrase] = useState('');

    // Load Commands
    useEffect(() => {
        if (voice) {
            const cmds = (voice.commands || []).map((c: any) => ({
                command: c.command || 'unknown',
                originalPhrase: c.command || 'unknown',
                callback: c.callback
            }));

            // Dedupe
            const unique = cmds.filter((v: any, i: number, a: any[]) => a.findIndex((t: any) => t.command === v.command) === i);
            setCommands(unique);
        }
    }, [voice]);

    // Derived: Test Score
    const testScore = useMemo(() => {
        if (!selectedCommand || !testPhrase) return 0;
        return calculateSimilarity(selectedCommand.command.toLowerCase(), testPhrase.toLowerCase());
    }, [selectedCommand, testPhrase]);

    // Derived: Conflicts
    const conflicts = useMemo(() => {
        if (!selectedCommand) return [];
        return commands.filter(c =>
            c.command !== selectedCommand.command &&
            calculateSimilarity(c.command, selectedCommand.command) > 0.8
        );
    }, [selectedCommand, commands]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">

            {/* LEFT: Command Registry */}
            <div className="glass-strong rounded-xl border border-white/10 flex flex-col overflow-hidden bg-black/40">
                <div className="p-4 border-b border-white/10 bg-white/5">
                    <div className="flex items-center space-x-2 mb-3">
                        <Hash className="w-4 h-4 text-primary" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Registry Index</h3>
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/50">{commands.length}</span>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-white transition-colors" />
                        <input
                            type="text"
                            placeholder="Filter registry..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all focus:bg-white/5"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-white/10">
                    {commands.filter(c => c.command.includes(searchQuery)).map((cmd) => (
                        <button
                            key={cmd.command}
                            onClick={() => setSelectedCommand(cmd)}
                            className={cn(
                                "w-full text-left px-3 py-3 rounded-lg text-sm transition-all flex items-center justify-between group border border-transparent",
                                selectedCommand?.command === cmd.command
                                    ? "bg-primary/10 text-white border-primary/20 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-white hover:border-white/5"
                            )}
                        >
                            <div className="flex items-center space-x-3">
                                <div className={cn("w-1.5 h-1.5 rounded-full", selectedCommand?.command === cmd.command ? "bg-primary" : "bg-white/20")} />
                                <span className="font-mono truncate max-w-[150px]">{cmd.command}</span>
                            </div>
                            <Command className="w-3 h-3 opacity-0 group-hover:opacity-50 transition-opacity" />
                        </button>
                    ))}
                </div>
            </div>

            {/* RIGHT: Inspector Details */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                {selectedCommand ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-strong rounded-xl border border-white/10 p-0 flex flex-col h-full relative overflow-hidden bg-black/40"
                    >
                        {/* Header */}
                        <div className="p-8 pb-0 relative z-10">
                            <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-3xl rounded-full pointer-events-none" />

                            <div className="flex items-start justify-between mb-2">
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <div className="px-2 py-0.5 rounded bg-primary/20 border border-primary/20 text-[10px] font-bold text-primary uppercase">Active Node</div>
                                        {conflicts.length > 0 && (
                                            <div className="px-2 py-0.5 rounded bg-yellow-500/20 border border-yellow-500/20 text-[10px] font-bold text-yellow-500 uppercase flex items-center gap-1">
                                                <AlertTriangle className="w-3 h-3" />
                                                {conflicts.length} Conflict{conflicts.length > 1 ? 's' : ''}
                                            </div>
                                        )}
                                    </div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight">"{selectedCommand.command}"</h2>
                                </div>
                            </div>
                            <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mt-6 mb-6" />
                        </div>

                        {/* Interactive Validator */}
                        <div className="px-8 grid grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <Sparkles className="w-3 h-3" />
                                    Match Simulation
                                </h4>
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={testPhrase}
                                        onChange={e => setTestPhrase(e.target.value)}
                                        placeholder="Type phrase to test match..."
                                        className="w-full bg-black/60 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-primary/50 focus:outline-none transition-colors font-mono"
                                    />
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className={cn("h-full", testScore > 0.8 ? "bg-green-500" : testScore > 0.5 ? "bg-yellow-500" : "bg-red-500")}
                                            animate={{ width: `${testScore * 100}%` }}
                                        />
                                    </div>
                                    <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                                        <span>CONFIDENCE</span>
                                        <span className={cn(testScore > 0.8 ? "text-green-400" : "text-white/50")}>{(testScore * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <Thermometer className="w-3 h-3" />
                                    Heuristics
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 rounded bg-white/5 border border-white/5">
                                        <div className="text-[10px] text-muted-foreground mb-1">Length</div>
                                        <div className="font-mono text-sm text-white">{selectedCommand.command.length} chars</div>
                                    </div>
                                    <div className="p-3 rounded bg-white/5 border border-white/5">
                                        <div className="text-[10px] text-muted-foreground mb-1">Complexity</div>
                                        <div className="font-mono text-sm text-white">{selectedCommand.command.split(' ').length} words</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Conflict Warning Area */}
                        {conflicts.length > 0 && (
                            <div className="mx-8 mt-6 p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                                <h4 className="text-xs font-bold text-yellow-500 uppercase mb-2 flex items-center gap-2">
                                    <AlertTriangle className="w-3 h-3" />
                                    Phonetic Clashes Detected
                                </h4>
                                <div className="space-y-1">
                                    {conflicts.map(c => (
                                        <div key={c.command} className="text-xs text-white/70 font-mono pl-5 relative">
                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-px bg-yellow-500/50" />
                                            Conflicts with "{c.command}"
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Execution Timeline */}
                        <div className="mt-auto bg-black/20 border-t border-white/5 p-6 relative">
                            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">Logic Flow</h4>
                            <div className="flex items-center justify-between relative px-4">
                                <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 -z-10" />

                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white/20 ring-4 ring-black" />
                                    <span className="text-[10px] text-muted-foreground">Input</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white/20 ring-4 ring-black" />
                                    <span className="text-[10px] text-muted-foreground">Wake</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary ring-4 ring-black shadow-[0_0_10px_rgba(204,85,0,0.5)]" />
                                    <span className="text-[10px] text-primary font-bold">Match</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-white/20 ring-4 ring-black" />
                                    <span className="text-[10px] text-muted-foreground">Callback</span>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                ) : (
                    <div className="glass-strong rounded-xl border border-white/10 flex flex-col items-center justify-center p-12 text-center h-full bg-black/40">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/5 animate-pulse">
                            <Zap className="w-8 h-8 text-white/20" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Select Command Node</h3>
                        <p className="text-muted-foreground max-w-sm text-sm">
                            Inspector is standing by. Select a command from the registry to analyze phonetic signatures and conflicts.
                        </p>
                    </div>
                )}
            </div>

        </div>
    );
}
