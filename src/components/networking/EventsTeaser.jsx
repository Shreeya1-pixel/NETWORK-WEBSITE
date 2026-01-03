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
        <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-[#FDFBF7] via-[#FFF0F5] to-[#FFF9F5] overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-4 py-2 bg-[#800020]/10 rounded-full text-[#800020] text-sm font-medium mb-6">
                            COMING SOON
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                            Upcoming Events
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Be the first to experience NETWORK. Join us for our official launch and connect with
                            students from across the globe.
                        </p>

                        {/* Event card */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-[#EFDECD] shadow-xl shadow-[#800020]/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#800020] to-[#a83248] rounded-2xl flex items-center justify-center">
                                    <span className="text-2xl font-bold text-white">17</span>
                                </div>
                                <div>
                                    <p className="font-bold text-[#1a1a1a] text-lg">February 2025</p>
                                    <p className="text-gray-500">Official Launch Day</p>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Calendar className="w-5 h-5 text-[#800020]" />
                                    <span>Launch Event & Networking Session</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <MapPin className="w-5 h-5 text-[#800020]" />
                                    <span>BITS Pilani Dubai Campus</span>
                                </div>
                            </div>

                            <Button
                                className="w-full h-14 bg-[#800020] hover:bg-[#600018] text-white rounded-full font-medium group"
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
                            {/* Draggable N block */}
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
                                className="absolute top-0 right-0 w-64 h-48 bg-gradient-to-br from-[#800020] to-[#a83248] rounded-3xl shadow-2xl flex items-center justify-center"
                                data-cursor-hover
                            >
                                <span className="text-white text-6xl font-bold opacity-20 pointer-events-none select-none">N</span>
                                <motion.div
                                    className="absolute inset-0 bg-white/20 rounded-3xl opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>

                            {/* Draggable E block */}
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
                                className="absolute top-20 left-0 w-56 h-40 bg-gradient-to-br from-[#FFB6C1] to-[#EFDECD] rounded-3xl shadow-xl flex items-center justify-center z-10"
                                data-cursor-hover
                            >
                                <span className="text-[#800020] text-5xl font-bold opacity-30 pointer-events-none select-none">E</span>
                                <motion.div
                                    className="absolute inset-0 bg-white/30 rounded-3xl opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>

                            {/* Draggable T block */}
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
                                className="absolute bottom-0 right-10 w-48 h-36 bg-white border-2 border-[#EFDECD] rounded-3xl shadow-lg flex items-center justify-center"
                                data-cursor-hover
                            >
                                <span className="text-[#800020] text-4xl font-bold opacity-40 pointer-events-none select-none">T</span>
                                <motion.div
                                    className="absolute inset-0 bg-[#FFB6C1]/10 rounded-3xl opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </div>

                        {/* Animated decorative circles */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FFB6C1]/20 rounded-full blur-2xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                            className="absolute top-10 -right-10 w-32 h-32 bg-[#800020]/10 rounded-full blur-2xl"
                        />

                        {/* Hint text */}
                        {!blocksMoved.n && !blocksMoved.e && !blocksMoved.t && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2 }}
                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm text-gray-400 font-medium whitespace-nowrap"
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