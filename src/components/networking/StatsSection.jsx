import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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

    return (
        <section ref={sectionRef} className="py-24 px-6 relative overflow-hidden">
            <div ref={ref} className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="glass tint-lavender rounded-[20px] p-12 md:p-16 border border-white/41 backdrop-blur-[24px] bg-white/28 shadow-[0_6px_24px_rgba(100,120,160,0.13)]"
                >
                    <div className="text-center mb-16">
                        <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary mb-4">
                            Our Vision
                        </h2>
                        <p className="font-body text-lg text-secondary max-w-3xl mx-auto leading-relaxed">
                            To make meaningful networking accessible for every student, everywhere. We believe that every student,
                            regardless of their background or location, deserves the opportunity to connect, collaborate, and thrive.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-primary mb-2 tabular-nums">
                                    <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                                </div>
                                <div className="font-body text-secondary text-sm md:text-base font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-center mt-12 font-body text-muted text-sm"
                    >
                        Supporting Intellectual, Social, and Financial Growth
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}