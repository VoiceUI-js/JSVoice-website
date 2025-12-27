"use client"

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight, PlayCircle } from "lucide-react"

export default function SynthesisPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Speech Synthesis"
                description="Give your application a voice with text-to-speech capabilities."
                badges={["TTS", "Accessibility"]}
            />

            <DocsSection title="Speaking">
                <p>
                    Use the `speak()` method to convert text to audio. This is useful for feedback, accessibility, or conversational interfaces.
                </p>
                <CodeBlock
                    language="javascript"
                    code={`// Basic
voice.speak('Hello, how are you?');

// Different Language
voice.speak('Hola amigo', 'es-ES');`}
                />
            </DocsSection>

            <DocsSection title="Customizing Voices">
                <p>You can change the pitch, rate, and voice profile through global options or per-call (if extended in future versions).</p>
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 mt-4">
                    <h3 className="text-white font-medium mb-2 flex items-center gap-2">
                        <PlayCircle className="w-4 h-4 text-[#CC5500]" />
                        Try it now
                    </h3>
                    <div className="flex gap-2">
                        <p className="text-sm text-gray-400 italic">Demo functionality coming soon to this docs page.</p>
                    </div>
                </div>
            </DocsSection>

            <DocsSection title="Best Practices">
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                    <li>Use for confirming actions ("Deleted item").</li>
                    <li>Keep messages short and concise.</li>
                    <li>Respect user's system volume settings.</li>
                </ul>
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/core/recognition"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Voice Recognition
                </Link>
                <Link
                    href="/docs/core/visualizers"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Visualizers
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
