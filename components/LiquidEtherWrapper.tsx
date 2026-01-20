'use client';

import dynamic from 'next/dynamic';
import { ComponentProps } from 'react';

// Dynamically import LiquidEther with no SSR to avoid hydration issues
const LiquidEther = dynamic(() => import('./LiquidEther'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent" />
});

type LiquidEtherProps = ComponentProps<typeof LiquidEther>;

import { useIsMobile } from '@/lib/utils';

export default function LiquidEtherWrapper(props: LiquidEtherProps) {
    const isMobile = useIsMobile();

    if (isMobile) return null;

    return <LiquidEther {...props} />;
}
