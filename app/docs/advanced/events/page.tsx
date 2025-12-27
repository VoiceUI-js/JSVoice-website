"use client"

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function EventsPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Event Handling"
                description="Listen to lifecycle events to build reactive interfaces."
                badges={["Lifecycle", "Callbacks"]}
            />

            <DocsSection title="Event List">
                <p>
                    Hook into the JSVoice lifecycle by passing callbacks to the constructor.
                </p>
                <div className="overflow-hidden rounded-lg border border-white/10 mt-4">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-gray-300">
                            <tr>
                                <th className="px-6 py-3">Callback</th>
                                <th className="px-6 py-3">Trigger</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-400">
                            <tr>
                                <td className="px-6 py-4 text-[#CC5500] font-mono">onSpeechStart</td>
                                <td className="px-6 py-4">Microphone is active and listening</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-[#CC5500] font-mono">onSpeechEnd</td>
                                <td className="px-6 py-4">Microphone has stopped</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-[#CC5500] font-mono">onCommandRecognized</td>
                                <td className="px-6 py-4">Phrase matched a known command</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-[#CC5500] font-mono">onWakeWordDetected</td>
                                <td className="px-6 py-4">Wake word valid, awaiting command</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-[#CC5500] font-mono">onError</td>
                                <td className="px-6 py-4">Error occurred (permissions, no speech)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocsSection>

            <DocsSection title="Example Implementation">
                <CodeBlock
                    language="javascript"
                    code={`const voice = new JSVoice({
  onSpeechStart: () => {
    document.getElementById('indicator').classList.add('recording');
  },
  
  onCommandRecognized: (phrase, raw) => {
    console.log("Matched:", phrase);
    showToast(\`Executed: \${phrase}\`);
  },
  
  onError: (err) => {
    console.error("Voice Error", err);
  }
});`}
                />
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/advanced/patterns"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Pattern Matching
                </Link>
                <Link
                    href="/docs/advanced/errors"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Error Handling
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
