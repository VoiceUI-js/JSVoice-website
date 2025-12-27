"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface DocsHeaderProps {
    title: string
    description?: string
    badges?: string[]
}

export function DocsHeader({ title, description, badges }: DocsHeaderProps) {
    return (
        <div className="space-y-4 mb-10 border-b border-[#CC5500]/10 pb-8">
            <div className="flex flex-wrap gap-2 mb-3">
                {badges?.map((badge) => (
                    <span
                        key={badge}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-[#CC5500]/10 text-[#CC5500] border border-[#CC5500]/20"
                    >
                        {badge}
                    </span>
                ))}
            </div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-white tracking-tight"
            >
                {title}
            </motion.h1>
            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl"
                >
                    {description}
                </motion.p>
            )}
        </div>
    )
}

export function DocsSection({ title, children, className }: { title?: string, children: React.ReactNode, className?: string }) {
    return (
        <section className={cn("mb-12 space-y-6", className)}>
            {title && (
                <h2 className="text-2xl font-semibold text-white flex items-center gap-2 group">
                    <span className="w-1 h-6 rounded-full bg-[#CC5500] group-hover:h-8 transition-all" />
                    {title}
                </h2>
            )}
            <div className="text-gray-300 leading-7 space-y-4">
                {children}
            </div>
        </section>
    )
}

export function CodeBlock({ code, language = "javascript" }: { code: string, language?: string }) {
    return (
        <div className="relative rounded-lg overflow-hidden border border-[#CC5500]/20 bg-[#0A0A0A] group">
            <div className="flex items-center justify-between px-4 py-2 bg-[#CC5500]/5 border-b border-[#CC5500]/10">
                <span className="text-xs text-gray-500 font-mono">{language}</span>
                <button
                    onClick={() => navigator.clipboard.writeText(code)}
                    className="text-xs text-[#CC5500] opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                >
                    Copy
                </button>
            </div>
            <div className="p-4 overflow-x-auto text-sm font-mono text-gray-300">
                <pre>{code}</pre>
            </div>
        </div>
    )
}
