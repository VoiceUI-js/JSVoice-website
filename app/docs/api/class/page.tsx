"use client"

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ClassReferencePage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="JSVoice Class"
                description="Complete reference for the main JSVoice instance and its methods."
                badges={["API", "Reference"]}
            />

            <DocsSection title="Constructor">
                <CodeBlock
                    language="typescript"
                    code="new JSVoice(options?: JSVoiceOptions)"
                />
            </DocsSection>

            <DocsSection title="Core Methods">
                <div className="space-y-6">
                    <div>
                        <code className="text-[#CC5500] font-mono text-lg block mb-2">start(): Promise&lt;boolean&gt;</code>
                        <p className="text-sm text-gray-400 mb-2">Initialize the recognition engine and ask for permission.</p>
                    </div>
                    <div>
                        <code className="text-[#CC5500] font-mono text-lg block mb-2">stop(): void</code>
                        <p className="text-sm text-gray-400 mb-2">Stop all listening processes.</p>
                    </div>
                    <div>
                        <code className="text-[#CC5500] font-mono text-lg block mb-2">speak(text: string, lang?: string): void</code>
                        <p className="text-sm text-gray-400 mb-2">Synthesize speech output.</p>
                    </div>
                </div>
            </DocsSection>

            <DocsSection title="Command Registration">
                <div className="space-y-6">
                    <div>
                        <code className="text-[#CC5500] font-mono text-lg block mb-2">addCommand(phrase: string, cb: Function): void</code>
                    </div>
                    <div>
                        <code className="text-[#CC5500] font-mono text-lg block mb-2">addPatternCommand(pattern: string, cb: Function): void</code>
                    </div>
                </div>
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/advanced/errors"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Error Handling
                </Link>
                <Link
                    href="/docs/api/types"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Type Definitions
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
