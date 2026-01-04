import React, { useEffect } from 'react';

export default function CustomCursor() {
    useEffect(() => {
        // Create a pink arrow cursor using SVG (standard arrow shape pointing up-left)
        // Using a simple, clean arrow design that matches the default cursor style
        const style = document.createElement('style');
        style.textContent = `
            @media (min-width: 768px) {
                * {
                    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath d='M1 1 L1 17 L6 12 L9 15 L9 8 L15 8 L9 2 Z' fill='%23FFB6C1'/%3E%3C/svg%3E") 2 2, auto !important;
                }
                a, button, input, textarea, [data-cursor-hover], [role='button'] {
                    cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Cpath d='M1 1 L1 17 L6 12 L9 15 L9 8 L15 8 L9 2 Z' fill='%23FFB6C1'/%3E%3C/svg%3E") 2 2, pointer !important;
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return null;
}