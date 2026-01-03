import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { UserPlus, Users2, Sparkles } from 'lucide-react';

const steps = [
    {
        number: '1',
        icon: UserPlus,
        title: 'Connect',
        description: 'Sign up and create your profile to join the student network.'
    },
    {
        number: '2',
        icon: Users2,
        title: 'Collaborate',
        description: 'Find teammates, join groups, and work on projects together.'
    },
    {
        number: '3',
        icon: Sparkles,
        title: 'Create',
        description: 'Showcase your work, discover opportunities, and build your future.'
    }
];

export default function HowItWorks() {
    const ref = useRef(null);
    const sectionRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const lineProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 100]);

    return (
        <section ref={sectionRef} className="py-32 px-6 bg-gradient-to-b from-[#FFF9F5] to-[#FDFBF7] relative overflow-hidden">
            {/* Animated background */}
            <motion.div
                style={{
                    x: useTransform(scrollYProgress, [0, 1], ['-10%', '10%']),
                    opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3])
                }}
                className="absolute top-20 left-0 w-72 h-72 bg-[#800020]/5 rounded-full blur-3xl"
            />
            <motion.div
                style={{
                    x: useTransform(scrollYProgress, [0, 1], ['10%', '-10%']),
                    opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3])
                }}
                className="absolute bottom-20 right-0 w-96 h-96 bg-[#FFB6C1]/10 rounded-full blur-3xl"
            />
            <div ref={ref} className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-2 bg-[#FFB6C1]/20 rounded-full text-[#800020] text-sm font-medium mb-6">
                        Simple Process
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a]">
                        How It Works
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Animated connection line */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 overflow-hidden">
                        <motion.div
                            style={{ width: `${lineProgress.get()}%` }}
                            animate={{ width: isInView ? "100%" : "0%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-[#800020] via-[#FFB6C1] to-[#EFDECD]"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className="relative text-center"
                                    data-cursor-hover
                                >
                                    {/* Step number circle */}
                                    <div className="relative inline-flex mb-8">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="w-24 h-24 rounded-full bg-white shadow-xl shadow-[#800020]/10 flex items-center justify-center relative z-10 border-4 border-[#EFDECD]"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#800020] to-[#a83248] flex items-center justify-center">
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                        </motion.div>

                                        {/* Step number badge */}
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#FFB6C1] rounded-full flex items-center justify-center font-bold text-[#800020] text-sm shadow-lg z-20">
                                            {step.number}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">
                                        {step.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}