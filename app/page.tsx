'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, Mic, Play, Code, Zap, Radio, BarChart3, FileCode, Package, Rocket, Check, Terminal } from 'lucide-react';
import LiquidEtherWrapper from '@/components/LiquidEtherWrapper';
import MagicBento from '@/components/MagicBento';
import { CodeBlock } from '@/components/code/code-block';

export default function HomePage() {

  const features = [
    {
      icon: Mic,
      title: 'Voice Recognition',
      description: 'Real-time speech-to-text with 50+ language support and continuous listening mode.',
    },
    {
      icon: Play,
      title: 'Speech Synthesis',
      description: 'Natural text-to-speech with customizable voices, rate, pitch, and volume control.',
    },
    {
      icon: Zap,
      title: 'Pattern Matching',
      description: 'Extract variables from commands with simple {variable} syntax for dynamic handling.',
    },
    {
      icon: Radio,
      title: 'Wake Word Detection',
      description: 'Hands-free activation with custom wake words like "Hey Assistant" or "OK Computer".',
    },
    {
      icon: BarChart3,
      title: 'Audio Visualization',
      description: 'Real-time amplitude monitoring with waveform and frequency bar visualization.',
    },
    {
      icon: FileCode,
      title: 'TypeScript Support',
      description: 'Full type definitions included for complete IDE autocomplete and type checking.',
    },
    {
      icon: Package,
      title: 'Zero Dependencies',
      description: 'Pure JavaScript with no external libraries. Just 32KB minified and gzipped.',
    },
    {
      icon: Rocket,
      title: 'Production Ready',
      description: 'Comprehensive error handling, extensive documentation, and active maintenance.',
    },
  ];

  const installCode = `npm install jsvoice`;

  const basicCode = `import JSVoice from 'jsvoice';

// Create instance
const voice = new JSVoice({
  onStatusChange: (message) => {
    console.log('Status:', message);
  }
});

// Add a command
voice.addCommand('hello world', () => {
  voice.speak('Hello! How can I help you?');
});

// Start listening
voice.start();`;

  const patternCode = `// Extract variables from commands
voice.addPatternCommand('set volume to {level}', (args) => {
  const volume = parseInt(args.level);
  audioElement.volume = volume / 100;
  voice.speak(\`Volume set to \${volume} percent\`);
});

// User says: "set volume to 75"
// System extracts: { level: "75" }`;

  const wakeWordCode = `// Hands-free activation
const voice = new JSVoice({
  wakeWord: 'hey assistant',
  wakeWordTimeout: 5000,
  onWakeWordDetected: (word) => {
    console.log('Wake word detected:', word);
  }
});

// User: "hey assistant"
// System: [Listening...]
// User: "scroll down"
// System: [Executes command]`;

  const builtInCommands = [
    { category: 'Scrolling', commands: ['scroll down', 'scroll up', 'scroll to bottom', 'scroll to top'] },
    { category: 'Zoom', commands: ['zoom in', 'zoom out', 'reset zoom'] },
    { category: 'Click', commands: ['click [text]', 'click button [text]'] },
    { category: 'Form', commands: ['type [value] in [field]', 'fill [value] in [field]'] },
    { category: 'Reading', commands: ['read this page', 'read this paragraph'] },
    { category: 'Theme', commands: ['toggle dark mode', 'dark mode on/off'] },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">

      {/* Hero Section with Full Viewport Liquid Ether */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Full viewport Liquid Ether background */}
        <div className="absolute inset-0 w-full h-full">
          <LiquidEtherWrapper
            colors={['#CC5500', '#E67300', '#FF8A3D', '#0A0A0A']}
            mouseForce={30}
            cursorSize={150}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={3.0}
            takeoverDuration={0.25}
            autoResumeDelay={2500}
            autoRampDuration={1.0}
          />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Voice Commands
                <span className="block text-gradient-orange mt-2">Made Simple</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                Zero dependencies. TypeScript ready. Production proven.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 w-full sm:w-auto px-4 sm:px-0">
              <Link
                href="/docs"
                className="group w-full sm:w-auto px-8 py-4 rounded-lg gradient-orange text-white font-semibold text-base sm:text-lg hover:glow-orange transition-all text-center relative overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              <Link
                href="/playground"
                className="group w-full sm:w-auto px-8 py-4 rounded-lg bg-transparent border-2 border-[#CC5500] text-white font-semibold text-base sm:text-lg hover:bg-[#CC5500] hover:glow-orange transition-all text-center relative overflow-hidden"
              >
                <span className="relative z-10">Live Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              <a
                href="https://github.com/VoiceUI-js/VoiceUI"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-8 py-4 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-white font-semibold text-base sm:text-lg hover:border-[#CC5500] hover:glow-orange transition-all flex items-center justify-center space-x-2 relative overflow-hidden"
              >
                <Github className="w-5 h-5 relative z-10" />
                <span className="relative z-10">View on GitHub</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-16 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-2xl text-gray-400">
              Everything you need to build voice-enabled applications
            </p>
          </div>

          <MagicBento />
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Get Started in 30 Seconds
            </h2>
            <p className="text-xl text-gray-400">
              Simple installation and intuitive API
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Installation */}
            <div className="glass rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full gradient-orange flex items-center justify-center text-white font-bold glow-orange">
                  1
                </div>
                <h3 className="text-2xl font-bold text-white">Install JSVoice</h3>
              </div>
              <CodeBlock code={installCode} language="bash" showLineNumbers={false} />
            </div>

            {/* Basic Usage */}
            <div className="glass rounded-xl p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full gradient-orange flex items-center justify-center text-white font-bold glow-orange">
                  2
                </div>
                <h3 className="text-2xl font-bold text-white">Add Voice Commands</h3>
              </div>
              <CodeBlock code={basicCode} language="javascript" filename="app.js" />
            </div>

            <div className="text-center pt-8">
              <Link
                href="/docs"
                className="inline-flex items-center px-8 py-4 rounded-lg gradient-orange text-white font-semibold text-lg hover:glow-orange transition-all"
              >
                View Full Documentation →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-gray-400">
              Go beyond basic commands with powerful features
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Pattern Matching */}
            <div className="glass rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <Zap className="w-6 h-6 text-[#E67300]" />
                <span>Pattern Matching</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Extract variables from voice commands automatically
              </p>
              <CodeBlock code={patternCode} language="javascript" filename="pattern-example.js" />
            </div>

            {/* Wake Word */}
            <div className="glass rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center space-x-2">
                <Radio className="w-6 h-6 text-[#E67300]" />
                <span>Wake Word Detection</span>
              </h3>
              <p className="text-gray-400 mb-4">
                Hands-free activation with custom wake words
              </p>
              <CodeBlock code={wakeWordCode} language="javascript" filename="wake-word.js" />
            </div>
          </div>
        </div>
      </section>

      {/* Built-in Commands */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Built-in Commands
            </h2>
            <p className="text-xl text-gray-400">
              Pre-built voice commands for common web interactions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {builtInCommands.map((category, index) => (
              <div key={index} className="glass rounded-xl p-6">
                <h3 className="text-xl font-bold text-[#E67300] mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.commands.map((cmd, cmdIndex) => (
                    <li key={cmdIndex} className="flex items-start space-x-2 text-gray-300">
                      <Check className="w-5 h-5 text-[#CC5500] flex-shrink-0 mt-0.5" />
                      <code className="text-sm bg-[#141414] px-2 py-1 rounded">{cmd}</code>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections Removed: Stats, CTA */}

    </div>
  );
}
