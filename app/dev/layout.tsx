'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Terminal, Activity, Zap, LayoutTemplate } from 'lucide-react';

export default function DevLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-black pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-white">Developer Tools</h1>
                    <p className="text-muted-foreground">Monitor, debug, and build voice interactions.</p>
                </div>

                {/* Sub-navigation Tabs */}
                <DevNav />

                {/* Main Content Area */}
                <div className="glass rounded-xl border border-white/10 p-6 min-h-[600px]">
                    {children}
                </div>
            </div>
        </div>
    );
}

function DevNav() {
    const pathname = usePathname();

    const tabs = [
        { name: 'Console', href: '/dev/console', icon: Terminal },
        { name: 'Inspector', href: '/dev/inspector', icon: Activity },
        { name: 'Command Builder', href: '/dev/builder', icon: Zap },
        { name: 'HUD Generator', href: '/dev/hud', icon: LayoutTemplate },
    ];

    return (
        <div className="flex space-x-2 border-b border-white/10 pb-4 overflow-x-auto">
            {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className={cn(
                            "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                            isActive
                                ? "bg-primary/20 text-primary border border-primary/30"
                                : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.name}</span>
                    </Link>
                );
            })}
        </div>
    );
}
