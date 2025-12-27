"use client"

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function VisualizersPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Audio Visualizers"
                description="Create stunning real-time visualizations using microphone input data."
                badges={["Canvas", "Web Audio API"]}
            />

            <DocsSection title="Getting Audio Data">
                <p>
                    JSVoice provides a simple hook to access the raw frequency or waveform data from the microphone. This is perfect for creating "Siri-like" bubbles or equalizers.
                </p>
                <CodeBlock
                    language="javascript"
                    code={`// Start analyzing
voice.startAmplitude((dataPoints) => {
  // dataPoints is an array of 0-1 values representing volume/frequency
  drawVisualizer(dataPoints);
}, {
  mode: 'bars',   // or 'waveform'
  barCount: 16    // quantity of data points
});

// Stop analyzing
voice.stopAmplitude();`}
                />
            </DocsSection>

            <DocsSection title="Canvas Example">
                <p>Here is a simple example of how to draw a bar chart visualizer on a canvas.</p>
                <CodeBlock
                    language="javascript"
                    code={`const canvas = document.getElementById('waveform');
const ctx = canvas.getContext('2d');

voice.startAmplitude((bars) => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw bars
  const barWidth = canvas.width / bars.length;
  bars.forEach((value, index) => {
    const height = value * canvas.height;
    const x = index * barWidth;
    const y = canvas.height - height;
    
    ctx.fillStyle = \`hsl(\${value * 120}, 70%, 50%)\`;
    ctx.fillRect(x, y, barWidth - 2, height);
  });
}, { mode: 'bars', barCount: 16 });`}
                />
            </DocsSection>

            <div className="flex justify-between pt-8 border-t border-white/10 mt-12">
                <Link
                    href="/docs/core/synthesis"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Speech Synthesis
                </Link>
                <Link
                    href="/docs/commands/navigation"
                    className="flex items-center gap-2 text-[#CC5500] hover:text-[#FF6600] font-medium transition-colors"
                >
                    Next: Navigation Commands
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
