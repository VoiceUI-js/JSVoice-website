"use client"

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function NavigationCommandsPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Navigation Commands"
                description="Control browser navigation and tab management with voice."
                badges={["Built-in", "Navigation"]}
            />

            <DocsSection title="Available Commands">
                <div className="overflow-hidden rounded-lg border border-white/10">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-gray-300">
                            <tr>
                                <th className="px-6 py-3">Command Phrasing</th>
                                <th className="px-6 py-3">Action</th>
                                <th className="px-6 py-3">Example</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-400">
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"open new tab"</td>
                                <td className="px-6 py-4">Opens a blank new tab</td>
                                <td className="px-6 py-4 italic">"Open new tab"</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"go to [site]"</td>
                                <td className="px-6 py-4">Navigates to a common website URL</td>
                                <td className="px-6 py-4 italic">"Go to GitHub"</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"back"</td>
                                <td className="px-6 py-4">Go to previous page (history)</td>
                                <td className="px-6 py-4 italic">"Go back"</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"forward"</td>
                                <td className="px-6 py-4">Go to next page (history)</td>
                                <td className="px-6 py-4 italic">"Go forward"</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocsSection>

            <DocsSection title="Wait, how does 'Go to [site]' work?">
                <p>
                    JSVoice has a built-in map of popular sites (Google, YouTube, GitHub, Twitter, etc.). For unknown sites, it attempts to construct a `.com` URL or performs a search query if configured.
                </p>
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/core/visualizers"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Visualizers
                </Link>
                <Link
                    href="/docs/commands/scrolling"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Scrolling Commands
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
