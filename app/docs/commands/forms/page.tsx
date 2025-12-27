"use client"

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function FormsCommandsPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Form Controls"
                description="Dictate text directly into input fields and forms."
                badges={["Built-in", "Productivity"]}
            />

            <DocsSection title="Smart Filling">
                <p>
                    JSVoice can identify input fields by their <code>id</code>, <code>name</code>, <code>placeholder</code>, or associated label text.
                </p>
                <div className="overflow-hidden rounded-lg border border-white/10 mt-4">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-gray-300">
                            <tr>
                                <th className="px-6 py-3">Command Pattern</th>
                                <th className="px-6 py-3">Example</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-400">
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"type [value] in [field]"</td>
                                <td className="px-6 py-4 italic">"type Hello World in Message"</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 text-white font-medium">"fill [value] in [field]"</td>
                                <td className="px-6 py-4 italic">"fill john@example.com in email"</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocsSection>

            <DocsSection title="Example">
                <p>Given the following HTML:</p>
                <CodeBlock
                    language="html"
                    code={`<form>
  <label for="username">Username</label>
  <input id="username" type="text" />
</form>`}
                />
                <p className="mt-4">
                    The user can say <span className="text-[#CC5500] font-medium">"Type admin in Username"</span> and JSVoice will automatically focus the input and simulate the typing.
                </p>
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/commands/scrolling"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Scrolling
                </Link>
                <Link
                    href="/docs/commands/interaction"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Interaction
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
