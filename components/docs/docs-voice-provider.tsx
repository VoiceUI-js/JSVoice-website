"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Mic, MicOff } from "lucide-react"
import { menuGroups } from "@/lib/docs-config"
/* @ts-ignore */
import JSVoice from "jsvoice"
import { cn } from "@/lib/utils"

export default function DocsVoiceProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    const [isListening, setIsListening] = React.useState(false)
    const [voiceInstance, setVoiceInstance] = React.useState<any>(null)
    const [lastCommand, setLastCommand] = React.useState<string | null>(null)

    React.useEffect(() => {
        // Initialize JSVoice
        const voice = new JSVoice({
            continuous: true,
            interimResults: false,
            lang: 'en-US',
            onSpeechStart: () => setIsListening(true),
            onSpeechEnd: () => setIsListening(false),
            onCommandRecognized: (phrase: string) => {
                setLastCommand(phrase)
                console.log("Command recognized:", phrase)
                // Clear the feedback after 2 seconds
                setTimeout(() => setLastCommand(null), 2000)
            },
            onError: (err: any) => console.error("Voice Error:", err)
        })

        setVoiceInstance(voice)

        // Register Navigation Commands
        menuGroups.forEach(group => {
            group.items.forEach(item => {
                // Command: "Go to Installation", "Open Installation"
                const phrase = item.title.toLowerCase()

                voice.addCommand(`go to ${phrase}`, () => {
                    router.push(item.href)
                })

                voice.addCommand(`open ${phrase}`, () => {
                    router.push(item.href)
                })
            })
        })

        // Core Navigation
        voice.addCommand("go home", () => router.push("/"))
        voice.addCommand("go to home", () => router.push("/"))

        // Scrolling (built-in usually, but adding explicit just in case or for feedback)
        // JSVoice usually handles basic scrolling if enabled, but let's be explicit if needed or rely on defaults.
        // Assuming JSVoice default behavior includes scrolling if configured, or we add manual helpers.

        return () => {
            if (voice) {
                voice.stop()
            }
        }
    }, [router])

    const toggleVoice = () => {
        if (voiceInstance) {
            voiceInstance.toggle()
        }
    }

    return (
        <>
            {/* Status Indicator */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
                {lastCommand && (
                    <div className="bg-black/90 text-white px-4 py-2 rounded-lg border border-[#CC5500]/50 shadow-lg animate-in slide-in-from-right-10 fade-in duration-300">
                        <span className="text-[#CC5500] font-bold mr-2">Command:</span>
                        {lastCommand}
                    </div>
                )}

                <button
                    onClick={toggleVoice}
                    className={cn(
                        "pointer-events-auto p-4 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2",
                        isListening
                            ? "bg-[#CC5500] text-white shadow-[0_0_20px_rgba(204,85,0,0.5)] scale-110"
                            : "bg-[#1A1A1A] text-gray-400 hover:text-white border border-white/10"
                    )}
                >
                    {isListening ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
                </button>
            </div>

            {children}
        </>
    )
}
