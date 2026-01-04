import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateEmail } from "@/lib/validation";
import { submitToWaitlist } from "@/lib/api";
import { validateEmail } from "@/lib/validation";

// Generate constellation patterns
const generateConstellations = () => {
    const constellations = [];
    const patterns = [
        // Constellation 1 - top left
        [{ x: 15, y: 20 }, { x: 20, y: 15 }, { x: 25, y: 22 }, { x: 18, y: 28 }],
        // Constellation 2 - top right
        [{ x: 75, y: 25 }, { x: 80, y: 20 }, { x: 85, y: 28 }, { x: 82, y: 35 }],
        // Constellation 3 - center
        [{ x: 45, y: 40 }, { x: 50, y: 35 }, { x: 55, y: 40 }, { x: 50, y: 45 }, { x: 48, y: 50 }],
        // Constellation 4 - bottom left
        [{ x: 20, y: 70 }, { x: 25, y: 75 }, { x: 30, y: 72 }, { x: 28, y: 80 }],
        // Constellation 5 - bottom right
        [{ x: 70, y: 75 }, { x: 75, y: 70 }, { x: 80, y: 75 }, { x: 75, y: 82 }],
    ];

    patterns.forEach((pattern, patternIdx) => {
        pattern.forEach((pos, starIdx) => {
            constellations.push({
                id: `${patternIdx}-${starIdx}`,
                x: pos.x,
                y: pos.y,
                size: Math.random() * 3 + 3,
                delay: Math.random() * 2,
                duration: Math.random() * 1.5 + 2,
                glowSize: Math.random() * 15 + 10,
                patternIdx,
                starIdx
            });
        });
    });

    return constellations;
};

const StarField = ({ mousePosition }) => {
    const [stars] = useState(() => generateConstellations());

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Constellation lines */}
            <svg className="absolute inset-0 w-full h-full">
                {[[0, 1], [1, 2], [2, 3], [3, 0]].map((pair, idx) => {
                    const star1 = stars.find(s => s.patternIdx === 0 && s.starIdx === pair[0]);
                    const star2 = stars.find(s => s.patternIdx === 0 && s.starIdx === pair[1]);
                    if (!star1 || !star2) return null;

                    const dx1 = mousePosition.x - (star1.x + star2.x) / 2;
                    const dy1 = mousePosition.y - (star1.y + star2.y) / 2;
                    const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                    const isNear1 = dist1 < 25;

                    return (
                        <motion.line
                            key={`line-0-${idx}`}
                            x1={`${star1.x}%`}
                            y1={`${star1.y}%`}
                            x2={`${star2.x}%`}
                            y2={`${star2.y}%`}
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth={isNear1 ? "2" : "1"}
                            animate={{
                                opacity: isNear1 ? [0.3, 0.8, 0.3] : [0.1, 0.3, 0.1]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    );
                })}
                {[[0, 1], [1, 2], [2, 3]].map((pair, idx) => {
                    const star1 = stars.find(s => s.patternIdx === 1 && s.starIdx === pair[0]);
                    const star2 = stars.find(s => s.patternIdx === 1 && s.starIdx === pair[1]);
                    if (!star1 || !star2) return null;

                    const dx1 = mousePosition.x - (star1.x + star2.x) / 2;
                    const dy1 = mousePosition.y - (star1.y + star2.y) / 2;
                    const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
                    const isNear1 = dist1 < 25;

                    return (
                        <motion.line
                            key={`line-1-${idx}`}
                            x1={`${star1.x}%`}
                            y1={`${star1.y}%`}
                            x2={`${star2.x}%`}
                            y2={`${star2.y}%`}
                            stroke="rgba(255, 255, 255, 0.3)"
                            strokeWidth={isNear1 ? "2" : "1"}
                            animate={{
                                opacity: isNear1 ? [0.3, 0.8, 0.3] : [0.1, 0.3, 0.1]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                    );
                })}
            </svg>

            {/* Stars */}
            {stars.map((star) => {
                const dx = mousePosition.x - star.x;
                const dy = mousePosition.y - star.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const isNearCursor = distance < 25;

                return (
                    <motion.div
                        key={star.id}
                        className="absolute"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                        }}
                    >
                        <motion.div
                            className="relative"
                            animate={{
                                opacity: isNearCursor ? 1 : 0.7,
                                scale: isNearCursor ? [1, 2, 1] : [1, 1.2, 1],
                            }}
                            transition={{
                                duration: isNearCursor ? 0.5 : star.duration,
                                repeat: Infinity,
                                delay: star.delay,
                                ease: "easeInOut"
                            }}
                        >
                            {/* Bright outer glow */}
                            <div
                                className="absolute rounded-full blur-xl"
                                style={{
                                    width: `${star.glowSize * (isNearCursor ? 2 : 1)}px`,
                                    height: `${star.glowSize * (isNearCursor ? 2 : 1)}px`,
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    background: isNearCursor
                                        ? 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
                                        : 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                                }}
                            />
                            {/* Inner bright star */}
                            <div
                                className="relative rounded-full bg-white"
                                style={{
                                    width: `${star.size}px`,
                                    height: `${star.size}px`,
                                    boxShadow: isNearCursor
                                        ? '0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.8)'
                                        : '0 0 10px rgba(255,255,255,0.8)',
                                }}
                            />
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default function HeroSection() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
    const sectionRef = useRef(null);
    const { scrollY } = useScroll();
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Generate sparkle positions once
    const sparkles = useMemo(() =>
        [...Array(15)].map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 6 + 4,
            xOffset: Math.random() * 20 - 10,
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 2,
        })), []
    );

    const y1 = useTransform(scrollY, [0, 500], [0, 150]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);

    // Cute scroll animations - gentle and smooth
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.9, 0.7]);
    const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
    const starFieldOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0.3]);
    const sparklesOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.6, 0]);
    const sparklesY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                setMousePosition({ x, y });
            }
        };

        const section = sectionRef.current;
        if (section) {
            section.addEventListener('mousemove', handleMouseMove);
            return () => section.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    const [submissionMessage, setSubmissionMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [emailError, setEmailError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');

        // Validate email
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            setEmailError(emailValidation.error);
            return;
        }

        if (email && !isSubmitting) {
            setIsSubmitting(true);

            try {
                const result = await submitToWaitlist(email);

                if (result.success) {
                    setSubmissionMessage(result.message || "SUBMITTED! We'll be in touch.");
                    setSubmitted(true);
                    setEmail('');
                }
            } catch (error) {
                // Handle duplicate email error
                if (error.message.includes('already') || error.message.includes('exists')) {
                    setEmailError('This email has already been submitted. Each email can only be used once.');
                } else if (error.message.includes('Too many requests')) {
                    setSubmissionMessage(error.message);
                    setSubmitted(true);
                } else {
                    setEmailError(error.message || 'Failed to submit. Please try again.');
                }
            } finally {
                setTimeout(() => {
                    setSubmitted(false);
                    setSubmissionMessage('');
                    setIsSubmitting(false);
                }, 3000);
            }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FDFBF7] via-[#FFF9F5] to-[#FFF0F5]"
        >
            {/* Starry background with scroll fade */}
            <motion.div style={{ opacity: starFieldOpacity }}>
                <StarField mousePosition={mousePosition} />
            </motion.div>

            {/* Floating sparkles on scroll */}
            <motion.div
                style={{
                    opacity: sparklesOpacity,
                    y: sparklesY
                }}
                className="absolute inset-0 pointer-events-none overflow-hidden"
            >
                {sparkles.map((sparkle) => (
                    <motion.div
                        key={sparkle.id}
                        className="absolute rounded-full bg-[#FFB6C1]"
                        style={{
                            left: `${sparkle.left}%`,
                            top: `${sparkle.top}%`,
                            width: `${sparkle.size}px`,
                            height: `${sparkle.size}px`,
                            boxShadow: '0 0 10px rgba(255, 182, 193, 0.8)',
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, sparkle.xOffset, 0],
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: sparkle.duration,
                            repeat: Infinity,
                            delay: sparkle.delay,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </motion.div>

            {/* Animated background shapes */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-20 left-10 w-72 h-72 bg-[#FFB6C1]/20 rounded-full blur-3xl"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-20 right-10 w-96 h-96 bg-[#800020]/10 rounded-full blur-3xl"
            />
            <motion.div
                style={{ y: y1 }}
                className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-[#EFDECD]/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
            />

            {/* Floating elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-32 right-20 w-20 h-20 bg-gradient-to-br from-[#800020] to-[#FFB6C1] rounded-2xl opacity-20 hidden lg:block"
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-br from-[#EFDECD] to-[#FFB6C1] rounded-full opacity-30 hidden lg:block"
            />

            <motion.div
                style={{
                    y: contentY,
                    opacity: contentOpacity,
                    scale: contentScale
                }}
                className="relative z-10 max-w-5xl mx-auto px-6 text-center"
            >
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#EFDECD] mb-8 shadow-sm"
                >
                    <Sparkles className="w-4 h-4 text-[#800020]" />
                    <span className="text-sm font-medium text-[#800020]">The Future of Student Networking</span>
                </motion.div>

                {/* Main heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
                >
                    <span className="text-[#1a1a1a]">Join </span>
                    <span className="bg-gradient-to-r from-[#800020] via-[#a83248] to-[#FFB6C1] bg-clip-text text-transparent">
                        NETWORK
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    A next-generation networking platform, built by students for students—connecting peers
                    within and across campuses to unlock collaboration, opportunities, and real relationships.
                </motion.p>

                {/* Email signup */}
                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                >
                    <div className="flex-1">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError('');
                            }}
                            className={`h-14 px-6 bg-white/90 backdrop-blur-sm ${emailError ? 'border-[#800020]' : 'border-[#EFDECD]'} rounded-full text-base focus:border-[#800020] focus:ring-[#800020]/20 transition-all`}
                        />
                        {emailError && (
                            <p className="mt-2 text-sm text-[#800020] px-6">{emailError}</p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-14 px-8 bg-[#800020] hover:bg-[#600018] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#800020]/25 group"
                        data-cursor-hover
                    >
                        {submitted ? 'Welcome!' : isSubmitting ? 'Submitting...' : 'Join Waitlist'}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.form>
                {submitted && (
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 text-[#800020] font-medium"
                    >
                        {submissionMessage}
                    </motion.p>
                )}

                {/* Launch date */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-8 text-sm text-gray-500"
                >
                    <span className="font-medium text-[#800020]">17 February 2025</span>
                    <span className="mx-2">•</span>
                    <span>BITS Pilani Dubai Campus</span>
                </motion.div>
            </motion.div>
        </section>
    );
}