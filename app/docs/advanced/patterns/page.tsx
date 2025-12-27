"use client"

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function PatternsPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Pattern Matching"
                description="Extract variables from voice commands using curly brace syntax."
                badges={["Advanced", "Logic"]}
            />

            <DocsSection title="Dynamic Commands">
                <p>
                    Sometimes you want to capture dynamic data within a command, like setting a volume level or searching for a query. JSVoice's `addPatternCommand` facilitates this using a simple {`{key}`} syntax.
                </p>
                <CodeBlock
                    language="javascript"
                    code={`voice.addPatternCommand('set volume to {level}', (args) => {
    console.log(args.level); // "50", "max", etc.
});`}
                />
            </DocsSection>

            <DocsSection title="Arguments Object">
                <p>
                    The callback receives an `args` object containing key-value pairs for all extracted tokens.
                </p>

                <CodeBlock
                    language="javascript"
                    code={`voice.addPatternCommand('move {direction} by {amount} pixels', (args) => {
    // Command: "move up by 200 pixels"
    
    const dir = args.direction; // "up"
    const dist = parseInt(args.amount); // 200
    
    moveObj(dir, dist);
});`}
                />
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/commands/system"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    System Commands
                </Link>
                <Link
                    href="/docs/advanced/events"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Event Handling
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
