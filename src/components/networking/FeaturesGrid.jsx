import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Calendar,
    Users,
    UserCircle,
    Rocket,
    Globe2,
    Building2
} from 'lucide-react';

const tintClasses = ['tint-mint', 'tint-soft-blue', 'tint-lavender', 'tint-warm-sand', 'tint-aqua-mint', 'tint-neutral-frost'];

const features = [
    {
        icon: Calendar,
        title: "Event Hub",
        subtitle: "Across All Campuses",
        description: "Never miss an opportunity again. Get every club event, workshop, hackathon, or competition in one clean, real-time calendar synced across your entire university network.",
    },
    {
        icon: Users,
        title: "Smart Collaboration",
        subtitle: "Finder",
        description: "Find the right teammates instantly. Match with students based on skills, interests, and project goals — from hackathons to startups.",
    },
    {
        icon: UserCircle,
        title: "Dynamic Student",
        subtitle: "Profiles",
        description: "Go beyond the traditional CV. Showcase projects, achievements, interests, prototypes, and even startup ideas — all in one place.",
    },
    {
        icon: Rocket,
        title: "Startup & Idea",
        subtitle: "Launchpad",
        description: "Share your startup ideas, post prototypes, collect user feedback, and build with peers. A digital space where early ideas grow into real ventures.",
    },
    {
        icon: Globe2,
        title: "Connected",
        subtitle: "Campuses",
        description: "Network isn't one campus — it's an ecosystem. BITS Dubai, Pilani, Goa, Hyderabad and expanding to IITs, Manipal, and major universities worldwide.",
    },
    {
        icon: Building2,
        title: "Industry Portal",
        subtitle: "Coming Soon",
        description: "A dedicated portal for companies to discover verified student talent through real-time data, leaderboards, and project analytics powered by AI/ML.",
    }
];

const FeatureCard = ({ feature, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const Icon = feature.icon;

    const tintClass = tintClasses[index % tintClasses.length];
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative"
            data-cursor-hover
        >
            <div className={`glass ${tintClass} relative h-full p-8 rounded-[18px] overflow-hidden transition-all duration-[0.18s] ease hover:shadow-[0_10px_32px_rgba(100,120,160,0.2)] hover:-translate-y-2 border border-white/[0.41] backdrop-blur-[24px]`}>
                {/* Icon */}
                <div className="inline-flex p-4 rounded-2xl bg-white/30 border border-white/40 backdrop-blur-[10px] mb-6 group-hover:scale-105 transition-transform duration-[0.18s] ease">
                    <Icon className="w-6 h-6 text-accent" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl font-medium text-primary mb-1">
                    {feature.title}
                </h3>
                <p className="text-sm font-body font-medium text-accent mb-4">
                    {feature.subtitle}
                </p>
                <p className="font-body text-secondary leading-relaxed text-sm">
                    {feature.description}
                </p>
            </div>
        </motion.div>
    );
};

export default function FeaturesGrid() {
    const headerRef = useRef(null);
    const sectionRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

    return (
        <section ref={sectionRef} className="py-32 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="pill inline-block px-4 py-2 text-primary text-sm font-body font-medium mb-6">
                        Why Join NETWORK
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-primary mb-6">
                        Supporting Students in
                        <br />
                        <span className="text-accent">
                            Six Important Areas
                        </span>
                    </h2>
                    <p className="font-body text-lg text-secondary max-w-2xl mx-auto">
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