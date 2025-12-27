'use client';

import Link from 'next/link';
import { Github, Twitter, MessageCircle, Mail } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#0A0A0A] border-t border-[#CC5500]/20 mt-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center glow-orange">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="w-6 h-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-white">
                                JSVoice
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Voice commands made simple. Zero dependencies, TypeScript ready,
                            production proven.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/VoiceUI-js/VoiceUI"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 flex items-center justify-center text-gray-400 hover:text-[#E67300] hover:border-[#CC5500] hover:glow-orange transition-all"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com/jsvoice"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 flex items-center justify-center text-gray-400 hover:text-[#E67300] hover:border-[#CC5500] hover:glow-orange transition-all"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://discord.gg/jsvoice"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 flex items-center justify-center text-gray-400 hover:text-[#E67300] hover:border-[#CC5500] hover:glow-orange transition-all"
                                aria-label="Discord"
                            >
                                <MessageCircle className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Documentation Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Documentation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/docs"
                                    className="text-gray-400 hover:text-[#E67300] transition-colors text-sm"
                                >
                                    Getting Started
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/docs/api"
                                    className="text-gray-400 hover:text-[#E67300] transition-colors text-sm"
                                >
                                    API Reference
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/docs/guides"
                                    className="text-gray-400 hover:text-[#E67300] transition-colors text-sm"
                                >
                                    Guides
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/docs/examples"
                                    className="text-gray-400 hover:text-[#E67300] transition-colors text-sm"
                                >
                                    Examples
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/playground"
                                    className="text-gray-400 hover:text-[#E67300] transition-colors text-sm"
                                >
                                    Playground
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/showcase"
                                    className="text-gray-400 hover:text-[#E67300] transition-colors text-sm"
                                >
                                    Showcase
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-gray-400 hover:text-[#E67300] transition-colors text-sm"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/VoiceUI-js/VoiceUI"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-[#E67300] transition-colors text-sm"
                                >
                                    GitHub
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Get the latest updates and news about JSVoice.
                        </p>
                        <form className="space-y-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-white placeholder-gray-500 focus:border-[#CC5500] focus:outline-none focus:ring-2 focus:ring-[#CC5500]/50 transition-all"
                                suppressHydrationWarning
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 rounded-lg gradient-orange text-white font-medium hover:glow-orange transition-all"
                                suppressHydrationWarning
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-[#CC5500]/20">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} JSVoice. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link
                                href="/privacy"
                                className="text-gray-400 hover:text-[#E67300] transition-colors text-sm"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-gray-400 hover:text-[#E67300] transition-colors text-sm"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/license"
                                className="text-gray-400 hover:text-[#E67300] transition-colors text-sm"
                            >
                                License
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
