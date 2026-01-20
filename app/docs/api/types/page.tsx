"use client"

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TypesPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="TypeScript Definitions"
                description="Interface definitions for JSVoice options and event objects."
                badges={["TypeScript", "Interfaces"]}
            />

            <DocsSection title="JSVoiceOptions">
                <CodeBlock
                    language="typescript"
                    code={`interface JSVoiceOptions {
  // Recognition Settings
  continuous?: boolean;        // Default: true
  interimResults?: boolean;    // Default: true
  lang?: string;              // Default: 'en-US'
  autoRestart?: boolean;      // Default: true
  restartDelay?: number;      // Default: 500ms
  engines?: any[];            // Default: [] (Custom engine classes)
  engine?: any;               // Default: null (Specific engine instance)
  
  // Wake Word Settings
  wakeWord?: string | null;          // Default: null
  wakeWordTimeout?: number;          // Default: 5000ms
  
  // Initial Commands
  commands?: Record<string, Function>;
  patternCommands?: Array<{pattern: string, callback: Function}>;
  
  // Event Callbacks
  onSpeechStart?: () => void;
  onSpeechEnd?: () => void;
  onCommandRecognized?: (phrase: string, raw: string, result: any, args?: any) => void;
  onCommandNotRecognized?: (raw: string) => void;
  onActionPerformed?: (action: string, payload: any) => void;
  onMicrophonePermissionGranted?: () => void;
  onMicrophonePermissionDenied?: (error: any) => void;
  onWakeWordDetected?: (word: string) => void;
  onError?: (error: any) => void;
  onStatusChange?: (message: string) => void;
}`}
                />
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/api/class"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Class Reference
                </Link>
            </div>
        </div>
    )
}
