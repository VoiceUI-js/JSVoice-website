'use client';

import { useState } from 'react';

import { Play, RotateCcw, Download, Share2, Mic } from 'lucide-react';
import { CodeBlock } from '@/components/code/code-block';
import { VoiceWaveform } from '@/components/hero/voice-waveform';

export default function PlaygroundPage() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [selectedPreset, setSelectedPreset] = useState('basic');

    const presets = {
        basic: `import JSVoice from 'jsvoice';

const voice = new JSVoice();

// Add a simple command
voice.addCommand('hello', () => {
  console.log('Hello World!');
  voice.speak('Hello! How can I help you?');
});

// Add more commands
voice.addCommand('what time is it', () => {
  const time = new Date().toLocaleTimeString();
  voice.speak(\`The time is \${time}\`);
});

// Start listening
voice.start();`,

        advanced: `import JSVoice from 'jsvoice';

const voice = new JSVoice({
  continuous: true,
  language: 'en-US',
  onResult: (transcript) => {
    console.log('Transcript:', transcript);
  },
  onError: (error) => {
    console.error('Error:', error);
  }
});

// Pattern matching with wildcards
voice.addCommand('search for *', (query) => {
  console.log('Searching for:', query);
  window.open(\`https://google.com/search?q=\${query}\`);
});

// Wake word detection
voice.addCommand('hey assistant', () => {
  voice.speak('Yes, how can I help?');
  voice.enableWakeWord('hey assistant');
});

voice.start();`,

        react: `import { useEffect, useState } from 'react';
import JSVoice from 'jsvoice';

function VoiceApp() {
  const [voice] = useState(() => new JSVoice());
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    voice.addCommand('hello', () => {
      voice.speak('Hello from React!');
    });

    voice.onResult = (text) => {
      setTranscript(text);
    };

    return () => voice.stop();
  }, [voice]);

  const toggleListening = () => {
    if (isListening) {
      voice.stop();
    } else {
      voice.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div>
      <button onClick={toggleListening}>
        {isListening ? 'Stop' : 'Start'}
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  );
}`,
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A]">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-20">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
                        Interactive Playground
                    </h1>
                    <p className="text-xl text-gray-400">
                        Try JSVoice in your browser - no installation required
                    </p>
                </div>

                {/* Main Playground */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
                    {/* Left: Code Editor */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-white">Code Editor</h2>
                            <div className="flex items-center space-x-2">
                                <select
                                    value={selectedPreset}
                                    onChange={(e) => setSelectedPreset(e.target.value)}
                                    className="px-3 py-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-white text-sm focus:border-[#CC5500] focus:outline-none focus:ring-2 focus:ring-[#CC5500]/50"
                                >
                                    <option value="basic">Basic Example</option>
                                    <option value="advanced">Advanced Features</option>
                                    <option value="react">React Integration</option>
                                </select>
                                <button
                                    className="p-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-gray-400 hover:text-[#E67300] hover:border-[#CC5500] transition-all"
                                    aria-label="Reset"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                                <button
                                    className="p-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-gray-400 hover:text-[#E67300] hover:border-[#CC5500] transition-all"
                                    aria-label="Share"
                                >
                                    <Share2 className="w-4 h-4" />
                                </button>
                                <button
                                    className="p-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-gray-400 hover:text-[#E67300] hover:border-[#CC5500] transition-all"
                                    aria-label="Download"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <CodeBlock
                            code={presets[selectedPreset as keyof typeof presets]}
                            language="javascript"
                            filename={`${selectedPreset}-example.js`}
                        />

                        <button className="w-full px-6 py-3 rounded-lg gradient-orange text-white font-semibold hover:glow-orange transition-all flex items-center justify-center space-x-2">
                            <Play className="w-5 h-5" />
                            <span>Run Code</span>
                        </button>
                    </div>

                    {/* Right: Live Preview */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white">Live Preview</h2>

                        <div className="glass rounded-xl p-8 space-y-6">
                            {/* Waveform */}
                            <div className="h-32 rounded-lg bg-[#141414] overflow-hidden">
                                <VoiceWaveform isListening={isListening} />
                            </div>

                            {/* Mic Button */}
                            <div className="text-center">
                                <button
                                    onClick={() => setIsListening(!isListening)}
                                    className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full transition-all ${isListening
                                        ? 'gradient-orange animate-pulse-orange glow-orange-lg'
                                        : 'bg-[#1F1F1F] border-2 border-[#CC5500] hover:glow-orange'
                                        }`}
                                    aria-label={isListening ? 'Stop listening' : 'Start listening'}
                                >
                                    <Mic className={`w-10 h-10 ${isListening ? 'text-white' : 'text-[#CC5500]'}`} />
                                </button>
                                <p className="text-sm text-gray-400 mt-4">
                                    {isListening ? 'Listening...' : 'Click to start'}
                                </p>
                            </div>

                            {/* Transcript */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-gray-400">Transcript:</h3>
                                <div className="min-h-[100px] p-4 rounded-lg bg-[#141414] border border-[#CC5500]/20">
                                    <p className="text-white">
                                        {transcript || 'Your speech will appear here...'}
                                    </p>
                                </div>
                            </div>

                            {/* Console Output */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-semibold text-gray-400">Console Output:</h3>
                                <div className="min-h-[100px] p-4 rounded-lg bg-[#141414] border border-[#CC5500]/20 font-mono text-sm">
                                    <p className="text-green-400">&gt; Ready to execute...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-12 max-w-7xl mx-auto">
                    <div className="glass rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-3">💡 Tips:</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>• Try saying "hello" to trigger the basic command</li>
                            <li>• Use wildcards like "search for *" to capture dynamic input</li>
                            <li>• Check the console output for debugging information</li>
                            <li>• Share your code with others using the share button</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
