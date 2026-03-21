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
        <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
            <div ref={ref} className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="pill inline-block px-4 py-2 text-primary text-sm font-body font-medium mb-6">
                        Simple Process
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-primary">
                        How It Works
                    </h2>
                </motion.div>

                <div className="relative">
                    {/* Animated connection line */}
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/40 -translate-y-1/2 overflow-hidden rounded-full">
                        <motion.div
                            style={{ width: `${lineProgress.get()}%` }}
                            animate={{ width: isInView ? "100%" : "0%" }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="h-full bg-[rgba(160,140,230,0.4)] rounded-full"
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
                                    {/* Step number circle — glass */}
                                    <div className="relative inline-flex mb-8">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="w-24 h-24 rounded-full flex items-center justify-center relative z-10 border border-white/41 bg-white/28 backdrop-blur-[24px] shadow-[0_6px_24px_rgba(100,120,160,0.13)] transition-all duration-[0.18s] ease"
                                        >
                                            <div className="w-16 h-16 rounded-full bg-[rgba(160,140,230,0.22)] border border-[rgba(160,140,230,0.4)] flex items-center justify-center">
                                                <Icon className="w-8 h-8 text-accent" />
                                            </div>
                                        </motion.div>

                                        {/* Step number badge — pill */}
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-body font-semibold text-accent text-sm z-20 bg-[rgba(218,213,244,0.55)] border border-white/40 backdrop-blur-[10px] shadow-[0_6px_24px_rgba(100,120,160,0.13)]">
                                            {step.number}
                                        </div>
                                    </div>

                                    <h3 className="font-heading text-2xl font-medium text-primary mb-4">
                                        {step.title}
                                    </h3>
                                    <p className="font-body text-secondary leading-relaxed max-w-xs mx-auto">
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