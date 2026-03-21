import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    TrendingUp,
    BarChart3,
    Target,
    Handshake,
    Search,
    Send,
    DollarSign,
} from 'lucide-react';
import Navbar from '@/components/networking/Navbar';
import Footer from '@/components/networking/Footer';
import CustomCursor from '@/components/networking/CustomCursor';

const tintClasses = ['tint-aqua-mint', 'tint-neutral-frost', 'tint-soft-blue', 'tint-lavender'];

function FeatureBulletCard({ card, index, tintClass }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const Icon = card.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="group relative h-full min-h-[32rem] md:min-h-[36rem] flex"
            data-cursor-hover
        >
            <div
                className={`glass ${tintClass} flex flex-col w-full p-8 md:p-9 rounded-[18px] border border-white/[0.41] backdrop-blur-[24px] shadow-[0_6px_24px_rgba(100,120,160,0.13)] transition-all duration-[0.18s] ease hover:shadow-[0_10px_32px_rgba(100,120,160,0.2)] hover:-translate-y-0.5`}
            >
                <div className="inline-flex p-4 rounded-2xl bg-white/30 border border-white/40 backdrop-blur-[10px] mb-6 w-fit group-hover:scale-[1.02] transition-transform duration-[0.18s] ease">
                    <Icon className="w-7 h-7 text-accent" />
                </div>

                <div className="flex flex-col gap-8 flex-1">
                    {card.blocks.map((block, bi) => (
                        <div
                            key={bi}
                            className={bi > 0 ? 'pt-6 border-t border-white/35' : ''}
                        >
                            <h3 className="font-heading text-lg md:text-xl font-medium text-primary mb-4 leading-snug">
                                {block.title}
                            </h3>
                            <ul className="space-y-2.5">
                                {block.lines.map((line, li) => (
                                    <li
                                        key={li}
                                        className="flex gap-2.5 font-body text-sm text-secondary leading-relaxed"
                                    >
                                        <span className="text-accent shrink-0 mt-0.5" aria-hidden>
                                            ●
                                        </span>
                                        <span>{line}</span>
                                    </li>
                                ))}
                                {block.benefit ? (
                                    <li className="flex gap-2.5 font-body text-sm text-primary font-medium leading-relaxed mt-3 pt-1">
                                        <span className="shrink-0 text-lg leading-none" aria-hidden title="Key takeaway">
                                            ✅
                                        </span>
                                        <span>{block.benefit}</span>
                                    </li>
                                ) : null}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

const eventCards = [
    {
        icon: TrendingUp,
        blocks: [
            {
                title: 'Attendance prediction',
                lines: [
                    'Smartly predicts how many people will attend',
                    'When the crowd will peak',
                ],
                benefit: 'Helps you avoid empty seats or overcrowding.',
            },
        ],
    },
    {
        icon: BarChart3,
        blocks: [
            {
                title: 'Automated survey insights',
                lines: [
                    'Collects feedback after events',
                    'Converts it into simple insights',
                ],
                benefit: 'No need to read hundreds of responses manually.',
            },
        ],
    },
    {
        icon: Target,
        blocks: [
            {
                title: 'Smart promotion targeting',
                lines: ['Sends invites to people most likely to attend'],
                benefit: 'Better turnout with less effort.',
            },
        ],
    },
    {
        icon: Handshake,
        blocks: [
            {
                title: 'Budget barter marketplace',
                lines: ['Exchange services instead of spending money'],
                benefit: 'Example: promote a brand in exchange for venue or sponsorship.',
            },
            {
                title: 'Attendee barter tickets',
                lines: [
                    'People earn tickets by contributing (promotion, volunteering, and more)',
                ],
                benefit: 'Boosts engagement without needing cash.',
            },
        ],
    },
];

const companyCards = [
    {
        icon: Search,
        blocks: [
            {
                title: 'Candidate screening & ranking',
                lines: ['Automatically filters and ranks students'],
                benefit: 'You see the best candidates instantly.',
            },
        ],
    },
    {
        icon: Target,
        blocks: [
            {
                title: 'Predictive role matching',
                lines: ['Suggests which student fits which role'],
                benefit: 'Reduces hiring mistakes.',
            },
        ],
    },
    {
        icon: Send,
        blocks: [
            {
                title: 'Automated outreach sequences',
                lines: ['Sends follow-up messages automatically'],
                benefit: 'Saves time for HR teams.',
            },
        ],
    },
    {
        icon: DollarSign,
        blocks: [
            {
                title: 'Stake pools & shadow shifts',
                lines: [
                    'Student stake pools — reward top performers from a shared pool',
                    'Shadow shift slots — students observe real work environments',
                ],
                benefit: 'Motivated talent and a clear trial-before-hire experience.',
            },
        ],
    },
];

export default function CompanyPage() {
    const headerRef = useRef(null);
    const isHeaderInView = useInView(headerRef, { once: true, margin: '-100px' });

    return (
        <div className="min-h-screen overflow-x-hidden relative">
            <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
                <div className="ambient-blob ambient-blob--blue top-0 right-0 translate-x-1/3 -translate-y-1/3" />
                <div className="ambient-blob ambient-blob--mint bottom-0 left-0 -translate-x-1/3 translate-y-1/3" />
                <div className="ambient-blob ambient-blob--lavender top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-90" />
            </div>
            <CustomCursor />
            <Navbar />

            <section className="relative z-10 pt-32 pb-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        ref={headerRef}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-14"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-accent hover:text-primary font-body text-sm mb-8 transition-all duration-[0.18s] ease"
                            data-cursor-hover
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>
                        <p className="font-body text-accent text-lg mb-3 tracking-wide">NETWORK</p>
                        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium text-primary mb-4">
                            Full feature breakdown
                        </h1>
                        <p className="font-body text-secondary max-w-2xl mx-auto">
                            Events and companies — tools that scale with your goals.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Event features — 4 columns */}
            <section className="relative z-10 py-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-center mb-10"
                    >
                        <span className="pill inline-block px-4 py-2 text-primary text-sm font-body font-medium mb-4">
                            Event features
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary">
                            For organizers
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
                        {eventCards.map((card, index) => (
                            <FeatureBulletCard
                                key={index}
                                card={card}
                                index={index}
                                tintClass={tintClasses[index % tintClasses.length]}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Company features — 4 columns */}
            <section className="relative z-10 py-10 px-6 pb-20">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-center mb-10"
                    >
                        <span className="pill inline-block px-4 py-2 text-primary text-sm font-body font-medium mb-4">
                            Company features
                        </span>
                        <h2 className="font-heading text-3xl md:text-4xl font-medium text-primary">
                            For employers
                        </h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
                        {companyCards.map((card, index) => (
                            <FeatureBulletCard
                                key={index}
                                card={card}
                                index={index}
                                tintClass={tintClasses[(index + 1) % tintClasses.length]}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
}
