'use client';

import { useState, useEffect } from 'react';
import { Search, X, FileText, Code, Lightbulb } from 'lucide-react';

interface SearchResult {
    title: string;
    description: string;
    url: string;
    category: 'docs' | 'api' | 'guide';
}

const searchData: SearchResult[] = [
    { title: 'Introduction', description: 'What is JSVoice?', url: '/docs', category: 'docs' },
    { title: 'Installation', description: 'Install via NPM or CDN', url: '/docs/get-started/installation', category: 'docs' },
    { title: 'Quick Start', description: 'Create your first voice app', url: '/docs/get-started/quick-start', category: 'docs' },
    { title: 'Wake Word', description: 'Configure "Hey Computer"', url: '/docs/get-started/wake-word', category: 'docs' },

    { title: 'Voice Recognition', description: 'Speech-to-text core module', url: '/docs/core/recognition', category: 'api' },
    { title: 'Speech Synthesis', description: 'Text-to-speech (TTS)', url: '/docs/core/synthesis', category: 'api' },
    { title: 'Visualizers', description: 'Audio visualization hooks', url: '/docs/core/visualizers', category: 'api' },

    { title: 'Navigation Commands', description: 'Go to, Open new tab', url: '/docs/commands/navigation', category: 'guide' },
    { title: 'Scrolling Commands', description: 'Scroll up/down', url: '/docs/commands/scrolling', category: 'guide' },
    { title: 'Form Controls', description: 'Fill inputs with voice', url: '/docs/commands/forms', category: 'guide' },
    { title: 'Interaction', description: 'Click buttons by voice', url: '/docs/commands/interaction', category: 'guide' },
    { title: 'System Commands', description: 'Dark mode, Zoom', url: '/docs/commands/system', category: 'guide' },

    { title: 'Pattern Matching', description: 'Dynamic variables {key}', url: '/docs/advanced/patterns', category: 'guide' },
    { title: 'Event Handling', description: 'onSpeechStart, onCommand', url: '/docs/advanced/events', category: 'guide' },
    { title: 'Error Handling', description: 'Permission errors', url: '/docs/advanced/errors', category: 'guide' },

    { title: 'JSVoice Class', description: 'API Reference', url: '/docs/api/class', category: 'api' },
    { title: 'TypeScript Types', description: 'Interfaces and Definitions', url: '/docs/api/types', category: 'api' },

    { title: 'Playground', description: 'Try JSVoice in browser', url: '/playground', category: 'docs' },
];

interface SearchDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);

    useEffect(() => {
        if (query.trim()) {
            const filtered = searchData.filter(
                (item) =>
                    item.title.toLowerCase().includes(query.toLowerCase()) ||
                    item.description.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'docs':
                return <FileText className="w-4 h-4" />;
            case 'api':
                return <Code className="w-4 h-4" />;
            case 'guide':
                return <Lightbulb className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-2xl glass-strong rounded-xl shadow-2xl glow-orange">
                {/* Search Input */}
                <div className="flex items-center border-b border-[#CC5500]/20 p-4">
                    <Search className="w-5 h-5 text-[#CC5500] mr-3" />
                    <input
                        type="text"
                        placeholder="Search documentation..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
                        autoFocus
                    />
                    <button
                        onClick={onClose}
                        className="ml-3 p-1 rounded-lg hover:bg-[#CC5500]/20 transition-colors"
                        aria-label="Close search"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto p-2">
                    {query.trim() === '' ? (
                        <div className="p-8 text-center text-gray-400">
                            <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                            <p>Start typing to search...</p>
                        </div>
                    ) : results.length === 0 ? (
                        <div className="p-8 text-center text-gray-400">
                            <p>No results found for "{query}"</p>
                        </div>
                    ) : (
                        <div className="space-y-1">
                            {results.map((result, index) => (
                                <a
                                    key={index}
                                    href={result.url}
                                    onClick={onClose}
                                    className="block p-4 rounded-lg hover:bg-[#CC5500]/10 transition-colors group"
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="mt-1 text-[#CC5500]">
                                            {getCategoryIcon(result.category)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-medium group-hover:text-[#E67300] transition-colors">
                                                {result.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 mt-1">
                                                {result.description}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-500 uppercase px-2 py-1 rounded bg-[#CC5500]/10">
                                            {result.category}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-[#CC5500]/20 p-3 flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                            <kbd className="px-2 py-1 bg-[#141414] rounded border border-[#CC5500]/20">↑</kbd>
                            <kbd className="px-2 py-1 bg-[#141414] rounded border border-[#CC5500]/20">↓</kbd>
                            <span>Navigate</span>
                        </span>
                        <span className="flex items-center space-x-1">
                            <kbd className="px-2 py-1 bg-[#141414] rounded border border-[#CC5500]/20">↵</kbd>
                            <span>Select</span>
                        </span>
                    </div>
                    <span className="flex items-center space-x-1">
                        <kbd className="px-2 py-1 bg-[#141414] rounded border border-[#CC5500]/20">ESC</kbd>
                        <span>Close</span>
                    </span>
                </div>
            </div>
        </div>
    );
}
