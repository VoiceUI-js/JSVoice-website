"use client"

import { DocsHeader, DocsSection } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function ScrollingCommandsPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Scrolling Commands"
                description="Hands-free page scrolling capabilities."
                badges={["Built-in", "Accessibility"]}
            />

            <DocsSection title="Commands">
                <div className="overflow-hidden rounded-lg border border-white/10">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-gray-300">
                            <tr>
                                <th className="px-6 py-3">Command</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-400">
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"scroll down"</td>
                                <td className="px-6 py-4">Scrolls down by ~500px or one viewport height</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"scroll up"</td>
                                <td className="px-6 py-4">Scrolls up by ~500px or one viewport height</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"scroll to bottom"</td>
                                <td className="px-6 py-4">Smoothly scrolls to the footer of the page</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"scroll to top"</td>
                                <td className="px-6 py-4">Smoothly scrolls to the header of the page</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocsSection>

            <DocsSection title="Customization">
                <p>
                    Scroll amounts and behavior (smooth vs instant) can be customized in the global options (coming in v0.3).
                </p>
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/commands/navigation"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Navigation
                </Link>
                <Link
                    href="/docs/commands/forms"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Form Controls
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
