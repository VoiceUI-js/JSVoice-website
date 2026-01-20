---
title: "Building a Voice Controlled Todo App with React & JSVoice"
date: "2026-01-22"
description: "A step-by-step tutorial on adding voice commands to a React Application in under 10 minutes."
author: "JSVoice Team"
tags: ["Tutorial", "React", "Voice Control"]
image: "/images/blog/todo-app-cover.jpg"
---

Voice control shouldn't be hard. In this tutorial, we will build a simple Todo App that you can control entirely with your voice.

## Prerequisites

- React 18+
- `jsvoice` (v0.2.1+)

## Step 1: Installation

First, grab the library:

```bash
npm install jsvoice
```

## Step 2: The Hook

We will use the `useVoice` hook to listen for specific patterns.

```tsx
import { useState } from 'react';
import { useVoice } from 'jsvoice';

export default function TodoApp() {
  const [todos, setTodos] = useState<string[]>([]);
  const { isListening } = useVoice();
  
  // Register commands
  useVoice.registerCommand('add task {task}', (params) => {
    setTodos(prev => [...prev, params.task]);
  });

  useVoice.registerCommand('delete task {index}', (params) => {
    // Logic to delete task
  });

  return (
    <div>
       <h1>Voice Todo</h1>
       <p>Status: {isListening ? 'Listening...' : 'Off'}</p>
       <ul>
         {todos.map(todo => <li key={todo}>{todo}</li>)}
       </ul>
    </div>
  )
}
```

## Conclusion

With just a few lines of code, we enable complex interactions. The `add task {task}` pattern automatically captures the variable content, making natural language processing trivial for simple use cases.
