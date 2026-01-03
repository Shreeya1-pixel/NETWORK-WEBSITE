import React from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
    Calendar,
    Users,
    UserCircle,
    Rocket,
    Globe2,
    Building2
} from 'lucide-react';

const features = [
    {
        icon: Calendar,
        title: "Event Hub",
        subtitle: "Across All Campuses",
        description: "Never miss an opportunity again. Get every club event, workshop, hackathon, or competition in one clean, real-time calendar synced across your entire university network.",
        gradient: "from-[#800020] to-[#a83248]"
    },
    {
        icon: Users,
        title: "Smart Collaboration",
        subtitle: "Finder",
        description: "Find the right teammates instantly. Match with students based on skills, interests, and project goals — from hackathons to startups.",
        gradient: "from-[#a83248] to-[#FFB6C1]"
    },
    {
        icon: UserCircle,
        title: "Dynamic Student",
        subtitle: "Profiles",
        description: "Go beyond the traditional CV. Showcase projects, achievements, interests, prototypes, and even startup ideas — all in one place.",
        gradient: "from-[#FFB6C1] to-[#EFDECD]"
    },
    {
        icon: Rocket,
        title: "Startup & Idea",
        subtitle: "Launchpad",
        description: "Share your startup ideas, post prototypes, collect user feedback, and build with peers. A digital space where early ideas grow into real ventures.",
        gradient: "from-[#EFDECD] to-[#800020]"
    },
    {
        icon: Globe2,
        title: "Connected",
        subtitle: "Campuses",
        description: "Network isn't one campus — it's an ecosystem. BITS Dubai, Pilani, Goa, Hyderabad and expanding to IITs, Manipal, and major universities worldwide.",
        gradient: "from-[#800020] to-[#FFB6C1]"
    },
    {
        icon: Building2,
        title: "Industry Portal",
        subtitle: "Coming Soon",
        description: "A dedicated portal for companies to discover verified student talent through real-time data, leaderboards, and project analytics powered by AI/ML.",
        gradient: "from-[#FFB6C1] to-[#800020]"
    }
];

const FeatureCard = ({ feature, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const Icon = feature.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
            data-cursor-hover
        >
            <div className="relative h-full p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-[#EFDECD]/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#800020]/10 hover:border-[#FFB6C1] hover:-translate-y-2">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-1">
                    {feature.title}
                </h3>
                <p className="text-sm font-medium text-[#800020] mb-4">
                    {feature.subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                </p>

                {/* Decorative corner */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#FFB6C1]/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
        </motion.div>
    );
};

export default function FeaturesGrid() {
    const headerRef = useRef(null);
    const sectionRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    return (
        <section ref={sectionRef} className="py-32 px-6 bg-gradient-to-b from-[#FFF0F5] via-[#FDFBF7] to-[#FFF9F5] relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute top-0 left-10 w-96 h-96 bg-[#FFB6C1]/10 rounded-full blur-3xl"
            />
            <motion.div
                style={{ y: backgroundY }}
                className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#EFDECD]/20 rounded-full blur-3xl"
            />
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-2 bg-[#800020]/10 rounded-full text-[#800020] text-sm font-medium mb-6">
                        Why Join NETWORK
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6">
                        Supporting Students in
                        <br />
                        <span className="bg-gradient-to-r from-[#800020] to-[#FFB6C1] bg-clip-text text-transparent">
                            Six Important Areas
                        </span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Everything you need to connect, collaborate, and create opportunities for your future.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}