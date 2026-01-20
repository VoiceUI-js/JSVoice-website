---
title: "Introducing JSVoice 1.0.2: Modern Voice Commands for the Web"
date: "2026-01-20"
description: "We are thrilled to announce JSVoice 1.0.2, bringing pluggable speech engines, real-time visualization, and robust TypeScript support to your web apps."
author: "JSVoice Team"
tags: ["Release", "JavaScript", "Voice UI", "Web Speech API"]
image: "/images/blog/v1-release.jpg"
---

We are excited to announce the release of **JSVoice 1.0.2**. This update brings a massive set of improvements, focusing on flexibility, developer experience, and production readiness.

## What is JSVoice?

JSVoice is a production-ready JavaScript library for adding voice commands and speech synthesis to web applications. Built on the Web Speech API, it provides an intuitive interface for creating voice-enabled experiences with **zero dependencies**.

It is perfect for:
- **Accessibility**: Enabling hands-free navigation.
- **Voice-First Interfaces**: Building conversational UIs.
- **Productivity Tools**: Creating efficiency-focused voice apps.

## New in Version 1.0.2

### 1. Pluggable Speech Engines
This is the biggest architectural change. You are no longer limited to the browser's native Web Speech API (which can be inconsistent across browsers).  
JSVoice now supports a **BaseSpeechEngine** architecture, allowing you to plug in custom engines like **OpenAI Whisper**, Google Cloud Speech-to-Text, or your own backend solution.

### 2. Real-Time Audio Visualization
We have added built-in support for visualizing voice input. You can now easily create:
- Waveform displays
- Frequency bars
- Amplitude monitoring

```javascript
voice.startAmplitude((bars) => {
  // bars is an array of normalized values (0-1)
  updateVisualizer(bars);
}, {
  mode: 'bars',
  barCount: 16
});
```

### 3. Advanced Pattern Matching
Commands are now more dynamic than ever. With our new pattern matching engine, you can extract variables directly from speech:

```javascript
// User says: "set volume to 75"
voice.addPatternCommand('set volume to {level}', (args) => {
  console.log(`Volume set to ${args.level}%`); // { level: "75" }
});
```

### 4. Better TypeScript Support
We have completely rewritten our type definitions. JSVoice now provides full type safety for configuration options, events, and engine implementations, giving you a top-tier IDE experience.

## Quick Start

Getting started is easier than ever.

```bash
npm install jsvoice
```

```javascript
import JSVoice from 'jsvoice';

const voice = new JSVoice();

// Add a simple command
voice.addCommand('hello world', () => {
  voice.speak('Hello! How can I help you?');
});

// Start listening
voice.start();
```

## Why JSVoice?

- **Zero Dependencies**: Keeps your bundle size small (32KB minified).
- **Privacy Focused**: Processes data locally where possible (depending on the engine).
- **Cross-Browser**: Normalizes the differences between Chrome, Edge, Safari, and more.

## What's Next?

We are working on official adapter packages for popular AI speech services and deeper integration with LLMs for intent understanding.

Check out the [GitHub Repository](https://github.com/VoiceUI-js/VoiceUI) or the full documentation to learn more.
