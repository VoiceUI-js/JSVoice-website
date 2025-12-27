"use client"

import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { motion } from "framer-motion"
import DocsVoiceProvider from "@/components/docs/docs-voice-provider"

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DocsVoiceProvider>
            <div className="flex min-h-screen bg-[#0A0A0A] pt-24">
                <DocsSidebar />
                <main className="flex-1 w-full lg:max-w-[calc(100vw-16rem)] min-h-screen">
                    <div className="max-w-4xl mx-auto px-4 py-8 lg:px-12 lg:py-12">
                        {children}
                    </div>
                </main>
            </div>
        </DocsVoiceProvider>
    )
}
