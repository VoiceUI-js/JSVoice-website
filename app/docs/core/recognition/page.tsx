"use client"

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function RecognitionPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Voice Recognition"
                description="The core engine for converting spoken language into executable text."
                badges={["Pluggable Engines", "Web API", "Whisper"]}
            />

            <DocsSection title="Basic Usage">
                <p>
                    Voice recognition is managed via the `start()`, `stop()`, and `toggle()` methods. JSVoice handles the complex state management of the `SpeechRecognition` API, including auto-restarts and error handling.
                </p>
                <CodeBlock
                    language="javascript"
                    code={`const voice = new JSVoice();

// Start listening
await voice.start();

// Stop listening
voice.stop();

// Toggle between states
voice.toggle();`}
                />
            </DocsSection>

            <DocsSection title="Configuration Options">
                <p>Pass these options to the constructor to customize behavior.</p>
                <div className="overflow-x-auto border border-white/10 rounded-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-gray-300">
                            <tr>
                                <th className="px-4 py-3">Option</th>
                                <th className="px-4 py-3">Default</th>
                                <th className="px-4 py-3">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-400">
                            <tr>
                                <td className="px-4 py-3 text-[#CC5500] font-mono">continuous</td>
                                <td className="px-4 py-3 font-mono">true</td>
                                <td className="px-4 py-3">Keep listening after a result is returned.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-[#CC5500] font-mono">interimResults</td>
                                <td className="px-4 py-3 font-mono">true</td>
                                <td className="px-4 py-3">Return results that are not yet final (good for real-time feedback).</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-[#CC5500] font-mono">lang</td>
                                <td className="px-4 py-3 font-mono">'en-US'</td>
                                <td className="px-4 py-3">Language code for recognition.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-[#CC5500] font-mono">autoRestart</td>
                                <td className="px-4 py-3 font-mono">true</td>
                                <td className="px-4 py-3">Automatically restart if the browser stops the engine.</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-[#CC5500] font-mono">engines</td>
                                <td className="px-4 py-3 font-mono">[]</td>
                                <td className="px-4 py-3">Array of custom engine classes (e.g. WhisperEngine).</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocsSection>

            <DocsSection title="Pluggable Engines">
                <p>
                    JSVoice supports a fully pluggable architecture. While it ships with a <code>NativeSpeechEngine</code> (browser) by default, you can easily swap this for higher-accuracy cloud providers.
                </p>

                <div className="space-y-4">
                    <h4 className="text-white font-medium">Using OpenAI Whisper</h4>
                    <p className="text-sm">
                        To use Whisper for improved accuracy (at the cost of latency/usage fees), inject the engine via the constructor.
                    </p>
                </div>

                <CodeBlock
                    language="javascript"
                    code={`import { WhisperEngine } from 'jsvoice-engines';
                    
const voice = new JSVoice({
    // Using a custom engine completely replaces the browser native one
    engines: [
        new WhisperEngine({ apiKey: 'YOUR_OPENAI_KEY' })
    ]
});`}
                />
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/get-started/wake-word"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Wake Word Detection
                </Link>
                <Link
                    href="/docs/core/synthesis"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Speech Synthesis
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
