
import { Mic, Zap, Command, Terminal, Code, Speaker } from "lucide-react"

export const menuGroups = [
    {
        title: "Get Started",
        icon: Zap,
        items: [
            { title: "Introduction", href: "/docs" },
            { title: "Installation", href: "/docs/get-started/installation" },
            { title: "Quick Start", href: "/docs/get-started/quick-start" },
            { title: "Wake Word", href: "/docs/get-started/wake-word" },
        ]
    },
    {
        title: "Core Modules",
        icon: Mic,
        items: [
            { title: "Voice Recognition", href: "/docs/core/recognition" },
            { title: "Speech Synthesis", href: "/docs/core/synthesis" },
            { title: "Visualizers", href: "/docs/core/visualizers" },
        ]
    },
    {
        title: "Command Library",
        icon: Command,
        items: [
            { title: "Navigation", href: "/docs/commands/navigation" },
            { title: "Scrolling", href: "/docs/commands/scrolling" },
            { title: "Form Controls", href: "/docs/commands/forms" },
            { title: "Interaction", href: "/docs/commands/interaction" },
            { title: "System", href: "/docs/commands/system" },
        ]
    },
    {
        title: "Advanced",
        icon: Terminal,
        items: [
            { title: "Pattern Matching", href: "/docs/advanced/patterns" },
            { title: "Event Handling", href: "/docs/advanced/events" },
            { title: "Error Handling", href: "/docs/advanced/errors" },
        ]
    },
    {
        title: "API Reference",
        icon: Code,
        items: [
            { title: "JSVoice Class", href: "/docs/api/class" },
            { title: "Types", href: "/docs/api/types" },
        ]
    }
]
