import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Orb } from '@/components/hero/orb';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center relative overflow-hidden">
            {/* Small minimalist orb effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full max-w-2xl h-96 relative opacity-40">
                    <Orb
                        hue={0}
                        hoverIntensity={0.3}
                        rotateOnHover={false}
                        forceHoverState={false}
                    />
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="max-w-2xl mx-auto space-y-8">
                    {/* 404 */}
                    <div className="text-9xl sm:text-[12rem] font-bold text-gradient-orange animate-in fade-in zoom-in duration-700">
                        404
                    </div>

                    {/* Message */}
                    <h2 className="text-3xl sm:text-4xl font-bold text-white animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                        Page Not Found
                    </h2>

                    <p className="text-xl text-gray-400 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search documentation..."
                                className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-white placeholder-gray-500 focus:border-[#CC5500] focus:outline-none focus:ring-2 focus:ring-[#CC5500]/50 transition-all"
                                suppressHydrationWarning
                                autoComplete="off"
                                data-lpignore="true"
                            />
                        </div>
                    </div>

                    {/* Suggested Pages */}
                    <div className="pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
                        <p className="text-sm text-gray-400 mb-4">Suggested pages:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link
                                href="/"
                                className="px-4 py-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-gray-300 hover:border-[#CC5500] hover:text-white transition-all"
                            >
                                Home
                            </Link>
                            <Link
                                href="/docs"
                                className="px-4 py-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-gray-300 hover:border-[#CC5500] hover:text-white transition-all"
                            >
                                Documentation
                            </Link>
                            <Link
                                href="/playground"
                                className="px-4 py-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-gray-300 hover:border-[#CC5500] hover:text-white transition-all"
                            >
                                Playground
                            </Link>
                            <Link
                                href="/showcase"
                                className="px-4 py-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-gray-300 hover:border-[#CC5500] hover:text-white transition-all"
                            >
                                Showcase
                            </Link>
                        </div>
                    </div>

                    {/* Go Home Button */}
                    <div className="pt-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-600">
                        <Link
                            href="/"
                            className="inline-flex items-center space-x-2 px-8 py-4 rounded-lg gradient-orange text-white font-semibold text-lg hover:glow-orange transition-all"
                        >
                            <Home className="w-5 h-5" />
                            <span>Go Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
