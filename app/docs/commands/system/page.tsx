"use client"

import { DocsHeader, DocsSection } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function SystemCommandsPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="UI & System Commands"
                description="Control global interface states like theme and zoom."
                badges={["Built-in", "Utilities"]}
            />

            <DocsSection title="Dark Mode">
                <p>
                    JSVoice provides built-in support for standard dark mode toggling, looking for the `data-theme` attribute on the `&lt;html&gt;` element or `dark` class usage.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <span className="block text-xs text-gray-500 mb-1">Command</span>
                        <strong className="text-white">"Toggle Dark Mode"</strong>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <span className="block text-xs text-gray-500 mb-1">Command</span>
                        <strong className="text-white">"Switch Theme"</strong>
                    </div>
                </div>
            </DocsSection>

            <DocsSection title="Zoom Control">
                <p>
                    Adjust the accessibility zoom level of the page document body.
                </p>
                <div className="overflow-hidden rounded-lg border border-white/10 mt-4">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-gray-300">
                            <tr>
                                <th className="px-6 py-3">Command</th>
                                <th className="px-6 py-3">Effect</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-400">
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"zoom in"</td>
                                <td className="px-6 py-4">Increase scale by 10%</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"zoom out"</td>
                                <td className="px-6 py-4">Decrease scale by 10%</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"reset zoom"</td>
                                <td className="px-6 py-4">Reset scale to 100%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/commands/interaction"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Interaction
                </Link>
                <Link
                    href="/docs/advanced/patterns"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Pattern Matching
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
