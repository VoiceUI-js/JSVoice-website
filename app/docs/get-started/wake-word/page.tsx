import type { Metadata } from 'next';

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
    title: "Wake Word Detection | JSVoice Documentation",
    description: "Implement hands-free voice activation like 'Hey Computer'. Learn how to configure custom wake words and timeout settings.",
    openGraph: {
        title: "Hands-free Wake Word Detection | JSVoice",
        description: "Add 'Hey Siri' style activation to your web apps with JSVoice. Fully customizable wake words.",
    }
};

export default function WakeWordPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Wake Word Detection"
                description="Enable hands-free activation using a custom phrase like 'Hey Computer'."
                badges={["Hands-free", "Privacy Warning"]}
            />

            <DocsSection title="How it Works">
                <p>
                    Wake word mode keeps the microphone listener active but silences command execution until a specific keyword is heard. This creates a "Hands Free" experience similar to smart home devices.
                </p>
            </DocsSection>

            <div className="p-6 my-8 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <h4 className="flex items-center gap-2 text-lg font-bold text-orange-500 mb-2">
                    ⚠️ Privacy Warning
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                    This feature works by <strong>continuously streaming audio</strong> to the speech recognition provider (e.g., Google) to convert it to text. JSVoice then checks that text stream for your keyword.
                    <br /><br />
                    This is <strong>not</strong> an offline, on-device wake word engine. Do not use this feature if you require strict privacy or if you are using a paid API (like OpenAI Whisper) usage-based pricing, as "listening" costs money.
                </p>
            </div>

            <DocsSection title="Configuration">
                <p>
                    Enable wake word by passing the <code>wakeWord</code> option to the constructor.
                </p>

                <CodeBlock
                    language="javascript"
                    code={`const voice = new JSVoice({
  wakeWord: 'hey assistant',
  wakeWordTimeout: 5000, 
  onWakeWordDetected: (word) => {
    // 1. Play a 'ding' sound
    playSound('wake');

    // 2. Show UI feedback
    console.log('Listening for command...');
  }
});`}
                />
            </DocsSection>

            <DocsSection title="Interaction Flow">
                <ol className="list-decimal list-inside space-y-4 text-gray-400 ml-4">
                    <li>
                        <strong className="text-white">Standby:</strong> The microphone listens, but commands are ignored.
                    </li>
                    <li>
                        <strong className="text-white">Activation:</strong> User says "Hey Assistant". System fires `onWakeWordDetected`.
                    </li>
                    <li>
                        <strong className="text-white">Active Window:</strong> The system enters an "Active" state for 5 seconds (configurable).
                    </li>
                    <li>
                        <strong className="text-white">Execution:</strong> If a valid command (e.g. "Scroll Down") is spoken within the window, it executes.
                    </li>
                    <li>
                        <strong className="text-white">Reset:</strong> After the timeout or command execution, the system returns to Standby.
                    </li>
                </ol>
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/get-started/quick-start"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quick Start
                </Link>
                <Link
                    href="/docs/core/recognition"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Voice Recognition
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
