"use client"

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowRight, Mic, Speaker, Sparkles } from "lucide-react"

export default function IntroductionPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Introduction"
                description="JSVoice is a lightweight, zero-dependency JavaScript library that brings voice command and speech synthesis capabilities to web applications."
                badges={["v0.2.1", "Zero Dependencies", "< 2KB gzipped"]}
            />

            <DocsSection>
                <p>
                    Built on top of the generic Web Speech API, JSVoice provides a unified, coherent interface for adding voice capabilities to your React, Vue, or vanilla JS applications. It handles the complexity of browser differences, permission management, and state handling so you can focus on building magic.
                </p>
            </DocsSection>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                    {
                        icon: Mic,
                        title: "Voice Recognition",
                        desc: "Convert speech to text in real-time with continuous listening support."
                    },
                    {
                        icon: Speaker,
                        title: "Speech Synthesis",
                        desc: "Make your app talk back with customizable voices, pitch, and rate."
                    },
                    {
                        icon: Sparkles,
                        title: "Pattern Matching",
                        desc: "Extract variables from commands like 'Order {quantity} pizzas'."
                    }
                ].map((feature, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#CC5500]/50 transition-colors group">
                        <feature.icon className="w-8 h-8 text-[#CC5500] mb-4 group-hover:scale-110 transition-transform" />
                        <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>

            <DocsSection title="Why JSVoice?">
                <ul className="grid gap-3">
                    {[
                        "Zero external dependencies - keeps your bundle light",
                        "Built-in wake word detection ('Hey Computer')",
                        "Real-time audio visualization hooks",
                        "TypeScript ready with full type definitions",
                        "Works offline (depending on browser engine)"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#CC5500] shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </DocsSection>

            <DocsSection title="Browser Support">
                <div className="overflow-hidden rounded-lg border border-white/10">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-gray-300">
                            <tr>
                                <th className="px-4 py-3 font-medium">Browser</th>
                                <th className="px-4 py-3 font-medium">Support</th>
                                <th className="px-4 py-3 font-medium">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-400">
                            <tr>
                                <td className="px-4 py-3 text-white">Chrome / Edge</td>
                                <td className="px-4 py-3 text-green-400">Full Support</td>
                                <td className="px-4 py-3">Best experience (Google Engine)</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-white">Safari</td>
                                <td className="px-4 py-3 text-yellow-400">Partial</td>
                                <td className="px-4 py-3">Requires user gesture for every start</td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 text-white">Firefox</td>
                                <td className="px-4 py-3 text-red-400">None</td>
                                <td className="px-4 py-3">Speech Recognition API not supported</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocsSection>

            <div className="flex justify-end pt-8">
                <Link
                    href="/docs/get-started/installation"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#CC5500] text-white font-medium hover:bg-[#CC5500]/90 transition-colors hover:pr-8 duration-300"
                >
                    Next: Installation
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
