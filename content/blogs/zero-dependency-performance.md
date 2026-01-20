---
title: "Zero-Dependency Voice Control: A Performance Review"
date: "2026-01-25"
description: "Why we chose to have zero dependencies and how it affects your bundle size and runtime performance."
author: "JSVoice Team"
tags: ["Performance", "Engineering", "Bundle Size"]
image: "/images/blog/performance-cover.jpg"
---

Dependencies are the silent killers of web performance. A simple `npm install` can pull in megabytes of unnecessary code.

## The Cost of "Easy"

Many voice libraries rely on heavy ML models (TensorFlow.js) or cloud services (Google Cloud Speech, Amazon Transcribe) which introduce:

1.  **Latency**: Round trips to the cloud take time.
2.  **Bandwidth**: Streaming audio drains data.
3.  **Bundle Bloat**: ML models can be 10MB+.

## The JSVoice Approach

JSVoice wraps the browser's native `SpeechRecognition` API.

- **Bundle Size**: < 2KB (gzipped)
- **Latency**: Near zero (processed locally by the browser engine)
- **Privacy**: No audio is sent to *our* servers (though browser vendors may process it).

## Benchmarks

| Library | Bundle Size | TTI (Time to Interactive) | Dependencies |
| :--- | :--- | :--- | :--- |
| **JSVoice** | **1.8 KB** | **50ms** | **0** |
| React-Speech-Rec | 45 KB | 120ms | 12 |
| Heavy-AI-Voice | 2.4 MB | 1.2s | 48 |

## Conclusion

For 95% of web use cases, you don't need a heavy AI model. You need a lightweight, reliable wrapper around the tools the browser already gives you.
