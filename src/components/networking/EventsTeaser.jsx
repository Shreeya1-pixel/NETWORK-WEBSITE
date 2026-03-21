import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function EventsTeaser() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.95]);

    // Track if blocks have been moved
    const [blocksMoved, setBlocksMoved] = useState({ n: false, e: false, t: false });

    return (
        <section ref={ref} className="py-32 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="pill inline-block px-4 py-2 text-primary text-sm font-body font-medium mb-6">
                            COMING SOON
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary mb-6">
                            Upcoming Events
                        </h2>
                        <p className="font-body text-lg text-secondary mb-8 leading-relaxed">
                            Be the first to experience NETWORK. Join us for our official launch and connect with
                            students from across the globe.
                        </p>

                        {/* Event card — glass */}
                        <div className="rounded-[18px] p-8 border border-white/41 bg-white/28 backdrop-blur-[24px] shadow-[0_6px_24px_rgba(100,120,160,0.13)]">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[rgba(160,140,230,0.22)] border border-[rgba(160,140,230,0.4)]">
                                    <span className="text-2xl font-heading font-medium text-accent">17</span>
                                </div>
                                <div>
                                    <p className="font-heading font-medium text-primary text-lg">February 2025</p>
                                    <p className="font-body text-muted">Official Launch Day</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 font-body text-secondary">
                                    <Calendar className="w-5 h-5 text-accent" />
                                    <span>Launch Event & Networking Session</span>
                                </div>
                                <div className="flex items-center gap-3 font-body text-secondary">
                                    <MapPin className="w-5 h-5 text-accent" />
                                    <span>BITS Pilani Dubai Campus</span>
                                </div>
                            </div>

                            <Button
                                variant="primary"
                                className="w-full h-14 rounded-2xl font-medium group"
                                data-cursor-hover
                            >
                                Be Part of the Revolution
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right decorative - Interactive blocks */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ opacity, scale }}
                        className="relative h-[500px] mt-12 lg:mt-0"
                    >
                        <div className="relative h-full">
                            {/* Draggable N block — glass + tint */}
                            <motion.div
                                drag
                                dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                                dragElastic={0.1}
                                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                                whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                                whileHover={{ scale: 1.05, cursor: 'grab' }}
                                onDragStart={() => setBlocksMoved(prev => ({ ...prev, n: true }))}
                                initial={{ x: 200, y: 0, rotate: 6 }}
                                animate={blocksMoved.n ? {} : {
                                    y: [0, -10, 0],
                                    rotate: [6, 8, 6]
                                }}
                                transition={{
                                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="absolute top-0 right-0 w-64 h-48 rounded-3xl flex items-center justify-center border border-white/41 bg-white/28 backdrop-blur-[24px] shadow-[0_6px_24px_rgba(100,120,160,0.13)]"
                                style={{ backgroundImage: 'linear-gradient(135deg, rgba(230,226,248,0.7), rgba(218,213,244,0.66))' }}
                                data-cursor-hover
                            >
                                <span className="text-accent text-6xl font-heading font-medium opacity-40 pointer-events-none select-none">N</span>
                                <motion.div
                                    className="absolute inset-0 bg-white/20 rounded-3xl opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.18 }}
                                />
                            </motion.div>

                            {/* Draggable E block — glass + tint */}
                            <motion.div
                                drag
                                dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                                dragElastic={0.1}
                                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                                whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                                whileHover={{ scale: 1.05, cursor: 'grab' }}
                                onDragStart={() => setBlocksMoved(prev => ({ ...prev, e: true }))}
                                initial={{ x: -50, y: 80, rotate: -6 }}
                                animate={blocksMoved.e ? {} : {
                                    y: [80, 70, 80],
                                    rotate: [-6, -8, -6]
                                }}
                                transition={{
                                    y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                                    rotate: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                                }}
                                className="absolute top-20 left-0 w-56 h-40 rounded-3xl flex items-center justify-center z-10 border border-white/41 bg-white/28 backdrop-blur-[24px] shadow-[0_6px_24px_rgba(100,120,160,0.13)]"
                                style={{ backgroundImage: 'linear-gradient(135deg, rgba(246,231,210,0.7), rgba(241,217,184,0.66))' }}
                                data-cursor-hover
                            >
                                <span className="text-accent text-5xl font-heading font-medium opacity-50 pointer-events-none select-none">E</span>
                                <motion.div
                                    className="absolute inset-0 bg-white/25 rounded-3xl opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.18 }}
                                />
                            </motion.div>

                            {/* Draggable T block — glass + tint */}
                            <motion.div
                                drag
                                dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
                                dragElastic={0.1}
                                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                                whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                                whileHover={{ scale: 1.05, cursor: 'grab' }}
                                onDragStart={() => setBlocksMoved(prev => ({ ...prev, t: true }))}
                                initial={{ x: 100, y: 220, rotate: 3 }}
                                animate={blocksMoved.t ? {} : {
                                    y: [220, 230, 220],
                                    rotate: [3, 5, 3]
                                }}
                                transition={{
                                    y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 },
                                    rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                                }}
                                className="absolute bottom-0 right-10 w-48 h-36 rounded-3xl flex items-center justify-center border border-white/41 bg-white/28 backdrop-blur-[24px] shadow-[0_6px_24px_rgba(100,120,160,0.13)]"
                                style={{ backgroundImage: 'linear-gradient(135deg, rgba(217,239,233,0.7), rgba(203,230,223,0.66))' }}
                                data-cursor-hover
                            >
                                <span className="text-accent text-4xl font-heading font-medium opacity-50 pointer-events-none select-none">T</span>
                                <motion.div
                                    className="absolute inset-0 bg-white/20 rounded-3xl opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.18 }}
                                />
                            </motion.div>
                        </div>

                        {/* Animated decorative blobs */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.25, 0.4, 0.25]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full blur-[38px] bg-[rgba(210,240,220,0.3)]"
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.2, 0.35, 0.2]
                            }}
                            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                            className="absolute top-10 -right-10 w-32 h-32 rounded-full blur-[38px] bg-[rgba(220,210,250,0.25)]"
                        />

                        {/* Hint text */}
                        {!blocksMoved.n && !blocksMoved.e && !blocksMoved.t && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}
                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-body text-muted font-medium whitespace-nowrap"
                            >
                                💡 Try dragging the blocks!
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}