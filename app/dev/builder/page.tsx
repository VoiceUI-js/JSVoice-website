'use client';

import React, { useState, useEffect } from 'react';
import { Mic, Navigation, MessageSquare, Code, Copy, Check, ArrowRight, Zap, Play, FileJson, FileCode, Wand2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type ActionType = 'speak' | 'navigate' | 'function';
type Language = 'javascript' | 'typescript';

const TEMPLATES = [
    { label: 'Navigation Command', trigger: 'go to settings', type: 'navigate' as ActionType, value: '/settings' },
    { label: 'Voice Feedback', trigger: 'who are you', type: 'speak' as ActionType, value: 'I am JSVoice, your assistant.' },
    { label: 'Theme Toggle', trigger: 'toggle theme', type: 'function' as ActionType, value: '  // Toggle Theme Logic\n  const nextTheme = theme === "dark" ? "light" : "dark";\n  setTheme(nextTheme);\n  voice.speak(`Switched to ${nextTheme} mode`);' },
    { label: 'Scroll Control', trigger: 'scroll down', type: 'function' as ActionType, value: '  window.scrollBy({ top: 500, behavior: "smooth" });' },
];

export default function DevBuilderPage() {
    // State
    const [commandPhrase, setCommandPhrase] = useState('activate turbo mode');
    const [actionType, setActionType] = useState<ActionType>('speak');
    const [actionValue, setActionValue] = useState('Turbo mode activated. Systems nominal.');
    const [language, setLanguage] = useState<Language>('typescript');
    const [isCopied, setIsCopied] = useState(false);

    // Derived State
    const [generatedCode, setGeneratedCode] = useState('');

    useEffect(() => {
        let code = '';

        // TS Import
        if (language === 'typescript') {
            code += `// component.tsx\n`;
        }

        code += `voice.addCommand('${commandPhrase}', () => {\n`;

        if (actionType === 'speak') {
            code += `  // Voice Feedback\n  voice.speak('${actionValue}');\n`;
        } else if (actionType === 'navigate') {
            code += `  // Navigation\n  router.push('${actionValue}');\n`;
        } else {
            code += actionValue.includes('\n') ? actionValue : `  ${actionValue}\n`;
        }

        code += `});`;
        setGeneratedCode(code);
    }, [commandPhrase, actionType, actionValue, language]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const applyTemplate = (template: typeof TEMPLATES[0]) => {
        setCommandPhrase(template.trigger);
        setActionType(template.type);
        setActionValue(template.value);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">

            {/* LEFT: Configuration Panel */}
            <div className="space-y-6">

                {/* Header / Templates */}
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-bold text-white tracking-tight">Command Builder</h2>
                    <div className="flex space-x-2">
                        {TEMPLATES.map((t, i) => (
                            <button
                                key={i}
                                onClick={() => applyTemplate(t)}
                                className="text-[10px] px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-muted-foreground hover:text-primary transition-colors"
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Step 1: Trigger */}
                <div className="glass-strong rounded-xl p-6 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary group-hover:bg-primary/80 transition-colors" />
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Mic className="w-24 h-24 text-white" />
                    </div>

                    <div className="flex items-center space-x-3 mb-6 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-[0_0_15px_rgba(204,85,0,0.3)]">
                            <span className="font-bold text-sm">1</span>
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Define Trigger</h3>
                    </div>

                    <div className="space-y-2 relative z-10">
                        <label className="text-xs text-muted-foreground uppercase font-mono">Voice Phrase</label>
                        <input
                            type="text"
                            value={commandPhrase}
                            onChange={(e) => setCommandPhrase(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 text-xl font-medium tracking-tight transition-all focus:bg-white/5"
                            placeholder="e.g. 'open settings'"
                        />
                    </div>
                </div>

                {/* Step 2: Action */}
                <div className="glass-strong rounded-xl p-6 border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 group-hover:bg-blue-400 transition-colors" />

                    <div className="flex items-center space-x-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                            <span className="font-bold text-sm">2</span>
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Choose Logic</h3>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <button
                            onClick={() => { setActionType('speak'); if (!actionValue) setActionValue('Hello!'); }}
                            className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-300 relative overflow-hidden",
                                actionType === 'speak'
                                    ? "bg-blue-500/10 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                    : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10"
                            )}
                        >
                            <MessageSquare className="w-5 h-5 mb-2" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Speak</span>
                        </button>
                        <button
                            onClick={() => { setActionType('navigate'); if (actionValue.includes(' ')) setActionValue('/dashboard'); }}
                            className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-300",
                                actionType === 'navigate'
                                    ? "bg-blue-500/10 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                    : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10"
                            )}
                        >
                            <Navigation className="w-5 h-5 mb-2" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Navigate</span>
                        </button>
                        <button
                            onClick={() => { setActionType('function'); }}
                            className={cn(
                                "flex flex-col items-center justify-center p-4 rounded-lg border transition-all duration-300",
                                actionType === 'function'
                                    ? "bg-blue-500/10 border-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                                    : "bg-white/5 border-transparent text-muted-foreground hover:bg-white/10"
                            )}
                        >
                            <Code className="w-5 h-5 mb-2" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Function</span>
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-muted-foreground uppercase font-mono">
                            {actionType === 'speak' ? 'Response Text' : actionType === 'navigate' ? 'Route Path' : 'Function Body'}
                        </label>

                        {actionType === 'function' ? (
                            <div className="relative">
                                <textarea
                                    value={actionValue}
                                    onChange={(e) => setActionValue(e.target.value)}
                                    className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-4 text-sm font-mono text-blue-300 focus:outline-none focus:border-blue-500/50 resize-none leading-relaxed"
                                    spellCheck={false}
                                />
                                <div className="absolute right-2 bottom-2 text-[10px] text-white/20 font-mono">JS/TS</div>
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={actionValue}
                                onChange={(e) => setActionValue(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-4 text-white placeholder:text-muted-foreground focus:outline-none focus:border-blue-500/50 transition-all focus:bg-white/5"
                            />
                        )}
                    </div>
                </div>

            </div>

            {/* RIGHT: Preview & Code */}
            <div className="flex flex-col gap-6">

                {/* Visual Flow Animation */}
                <div className="glass-strong rounded-xl p-8 border border-white/10 flex items-center justify-between relative overflow-hidden min-h-[160px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5 opacity-50" />

                    <div className="z-10 text-center group">
                        <div className="w-16 h-16 rounded-full bg-black/40 border border-primary/50 flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(204,85,0,0.3)] group-hover:scale-110 transition-transform duration-500">
                            <Mic className="w-6 h-6 text-primary" />
                        </div>
                        <div className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                            <p className="text-[10px] font-mono text-primary truncate max-w-[100px]">"{commandPhrase}"</p>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center z-10 mx-4">
                        <div className="relative w-full h-0.5 bg-white/10">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-blue-500 w-1/3"
                                animate={{ left: ['0%', '100%'], opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </div>
                    </div>

                    <div className="z-10 text-center group">
                        <div className="w-16 h-16 rounded-full bg-black/40 border border-blue-500/50 flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform duration-500">
                            {actionType === 'speak' && <MessageSquare className="w-6 h-6 text-blue-500" />}
                            {actionType === 'navigate' && <Navigation className="w-6 h-6 text-blue-500" />}
                            {actionType === 'function' && <Code className="w-6 h-6 text-blue-500" />}
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                            <p className="text-[10px] font-mono text-blue-500 capitalize">{actionType}</p>
                        </div>
                    </div>
                </div>

                {/* Code Editor */}
                <div className="glass-strong rounded-xl border border-white/10 flex-1 flex flex-col overflow-hidden relative group bg-black/40">
                    <div className="p-3 border-b border-white/10 flex items-center justify-between bg-white/5">
                        <div className="flex items-center space-x-2">
                            <div className="flex bg-black/50 rounded p-1">
                                <button
                                    onClick={() => setLanguage('javascript')}
                                    className={cn("px-2 py-1 rounded text-[10px] transition-colors", language === 'javascript' ? "bg-yellow-500/20 text-yellow-500" : "text-muted-foreground hover:text-white")}
                                >
                                    JS
                                </button>
                                <button
                                    onClick={() => setLanguage('typescript')}
                                    className={cn("px-2 py-1 rounded text-[10px] transition-colors", language === 'typescript' ? "bg-blue-500/20 text-blue-400" : "text-muted-foreground hover:text-white")}
                                >
                                    TS
                                </button>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground">Generated Output</span>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 transition-colors text-[10px] font-medium text-white border border-white/10 hover:border-white/20"
                        >
                            {isCopied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                            {isCopied ? "COPIED" : "COPY"}
                        </button>
                    </div>

                    <div className="flex-1 p-6 font-mono text-sm overflow-auto text-blue-300 relative">
                        <pre className="whitespace-pre-wrap leading-relaxed">{generatedCode}</pre>
                    </div>

                    {/* Hint */}
                    <div className="p-3 bg-white/5 border-t border-white/10">
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-mono">
                            <Wand2 className="w-3 h-3 text-primary" />
                            <p>Pro Tip: Functions execute in the browser context. Keep them pure.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
