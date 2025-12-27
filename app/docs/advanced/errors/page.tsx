"use client"

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ErrorsPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Error Handling"
                description="Manage permissions and recognition failures gracefully."
                badges={["Debugging", "Stability"]}
            />

            <DocsSection title="Common Errors">
                <p>
                    Most errors are related to browser permissions or the Web Speech API's strict requirement for secure contexts (HTTPS).
                </p>

                <div className="space-y-4 mt-6">
                    <div className="p-4 bg-[rgba(255,50,50,0.1)] border border-red-500/20 rounded-lg">
                        <h4 className="text-red-400 font-medium mb-1">Microphone Access Denied (NotAllowedError)</h4>
                        <p className="text-sm text-gray-400">User blocked the permission prompt. You must show UI instructing them to re-enable it in settings.</p>
                    </div>

                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <h4 className="text-yellow-400 font-medium mb-1">No Speech Detected (no-speech)</h4>
                        <p className="text-sm text-gray-400">Engine received audio but couldn't identify words. Usually background noise or silence.</p>
                    </div>
                </div>
            </DocsSection>

            <DocsSection title="Handling Strategy">
                <CodeBlock
                    language="javascript"
                    code={`voice.start().catch((error) => {
  if (error.name === 'NotAllowedError') {
    alert("Please allow microphone usage!");
  } else if (error.name === 'NotSupportedError') {
    alert("Please switch to Chrome or Edge.");
  }
});`}
                />
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/advanced/events"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Event Handling
                </Link>
                <Link
                    href="/docs/api/class"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: API Reference
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
