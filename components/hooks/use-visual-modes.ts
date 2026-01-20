import { useEffect } from 'react';

interface VisualModeOptions {
    matrixMode: boolean;
    isLightMode: boolean;
    ghostMode: boolean;
}

export function useVisualModes({ matrixMode, isLightMode, ghostMode }: VisualModeOptions) {
    // Handle Global Color Themes (Matrix / Light / Dark)
    useEffect(() => {
        const root = document.documentElement;

        // Reset requestAnimationFrame to avoid thrashing
        const applyTheme = () => {
            if (matrixMode) {
                // Matrix Green/Dark high contrast
                root.style.filter = 'invert(1) hue-rotate(180deg) brightness(0.8)';
                root.style.transition = 'filter 0.5s ease';
            } else if (isLightMode) {
                // Light Mode (Inverted Dark Mode)
                root.style.filter = 'invert(1) hue-rotate(180deg)';
                root.style.transition = 'filter 0.5s ease';
            } else {
                // Default Dark Mode
                root.style.filter = 'none';
                root.style.transition = 'filter 0.5s ease';
            }
        };

        requestAnimationFrame(applyTheme);
    }, [matrixMode, isLightMode]);

    // Handle Ghost Mode (Opacity/Transparency)
    useEffect(() => {
        const applyGhost = () => {
            if (ghostMode) {
                document.body.style.opacity = '0.3';
                document.body.style.transition = 'opacity 1s ease';
            } else {
                document.body.style.opacity = '1';
                document.body.style.transition = 'opacity 1s ease';
            }
        };
        requestAnimationFrame(applyGhost);
    }, [ghostMode]);
}
