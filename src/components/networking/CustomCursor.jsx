import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const trailRef = useRef([]);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            setIsVisible(true);
        };

        const handleMouseEnter = (e) => {
            if (e.target.closest('a, button, input, textarea, [data-cursor-hover]')) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (e) => {
            if (e.target.closest('a, button, input, textarea, [data-cursor-hover]')) {
                setIsHovering(false);
            }
        };

        const handleMouseOut = () => setIsVisible(false);

        window.addEventListener('mousemove', updateMousePosition);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [cursorX, cursorY]);

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return null;
    }

    return (
        <>
            <style>{`
        @media (min-width: 768px) {
          * { cursor: none !important; }
        }
      `}</style>

            {/* Main cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
            >
                <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2"
                    animate={{
                        scale: isHovering ? 2 : 1,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="w-4 h-4 bg-[#800020] rounded-full" />
                </motion.div>
            </motion.div>

            {/* Trailing cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9998]"
                animate={{
                    x: mousePosition.x - 20,
                    y: mousePosition.y - 20,
                    opacity: isVisible ? 0.3 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <div className="w-10 h-10 border-2 border-[#800020] rounded-full" />
            </motion.div>

            {/* Second trail */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9997]"
                animate={{
                    x: mousePosition.x - 30,
                    y: mousePosition.y - 30,
                    opacity: isVisible ? 0.15 : 0,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="w-[60px] h-[60px] border border-[#FFB6C1] rounded-full" />
            </motion.div>
        </>
    );
}