"use client"

import { DocsHeader, DocsSection } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function InteractionCommandsPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Interaction Commands"
                description="Click buttons and links using voice commands."
                badges={["Built-in", "Accessibility"]}
            />

            <DocsSection title="Clicking Elements">
                <p>
                    Trigger click events on interactive elements like buttons and links by referencing their visible text.
                </p>

                <div className="overflow-hidden rounded-lg border border-white/10 mt-4">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-gray-300">
                            <tr>
                                <th className="px-6 py-3">Command</th>
                                <th className="px-6 py-3">Action</th>
                                <th className="px-6 py-3">Target Match Strategy</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-400">
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"click [text]"</td>
                                <td className="px-6 py-4">Clicks any element containing text</td>
                                <td className="px-6 py-4">Label, innerText, aria-label</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"click button [text]"</td>
                                <td className="px-6 py-4">Clicks strictly buttons</td>
                                <td className="px-6 py-4"><code>&lt;button&gt;</code> tags only</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocsSection>

            <DocsSection title="Tips">
                <ul className="list-disc list-inside space-y-2 text-gray-400">
                    <li>Use unique text labels for your buttons for better accuracy.</li>
                    <li>If multiple buttons match (e.g., "Delete"), JSVoice will click the first visible one.</li>
                </ul>
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/commands/forms"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Form Controls
                </Link>
                <Link
                    href="/docs/commands/system"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: UI & System
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
