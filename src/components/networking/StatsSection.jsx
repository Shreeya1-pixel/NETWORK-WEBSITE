import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const stats = [
    { value: 95, suffix: '%', label: 'Positive Feedback' },
    { value: 1000, suffix: '+', label: 'Students Interviewed' },
    { value: 4, suffix: '', label: 'Campuses at Launch' },
    { value: 250, suffix: 'M+', label: 'Global Students' }
];

const AnimatedCounter = ({ value, suffix, inView }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [inView, value]);

    return (
        <span className="tabular-nums">
            {count.toLocaleString()}{suffix}
        </span>
    );
};

export default function StatsSection() {
    const ref = useRef(null);
    const sectionRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

    return (
        <section ref={sectionRef} className="py-24 px-6 bg-[#800020] relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    style={{ rotate: rotate1 }}
                    className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFB6C1]/10 rounded-full blur-3xl"
                />
                <motion.div
                    style={{ rotate: rotate2 }}
                    className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EFDECD]/10 rounded-full blur-3xl"
                />
            </div>

            <div ref={ref} className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Our Vision
                    </h2>
                    <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                        To make meaningful networking accessible for every student, everywhere. We believe that every student,
                        regardless of their background or location, deserves the opportunity to connect, collaborate, and thrive.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                            </div>
                            <div className="text-white/70 text-sm md:text-base font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center mt-12 text-white/50 text-sm"
                >
                    Supporting Intellectual, Social, and Financial Growth
                </motion.div>
            </div>
        </section>
    );
}