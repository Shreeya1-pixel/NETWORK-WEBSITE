import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Linkedin } from 'lucide-react';
import Navbar from '@/components/networking/Navbar';
import Footer from '@/components/networking/Footer';
import CustomCursor from '@/components/networking/CustomCursor';

const tintClasses = ['tint-mint', 'tint-soft-blue', 'tint-lavender', 'tint-warm-sand'];

const team = [
    {
        name: 'Jannat Chhabra',
        role: 'Co-founder & Co-CEO',
        quote: "It's all in your head",
        image: '/team/j1.png',
        linkedin: null,
    },
    {
        name: 'Shreeya Gupta',
        role: 'Co-founder & Co-CEO',
        quote: 'I code--and I build businesses.',
        image: '/team/j2.png',
        linkedin: 'https://www.linkedin.com/in/shreeya-gupta-811278353/',
    },
    {
        name: 'Devanjali Deb',
        role: 'CRO',
        quote: "When in doubt, Phil's-Osophy it out!",
        image: '/team/j3.png',
        linkedin: 'https://www.linkedin.com/in/devanjali-deb',
    },
    {
        name: 'Taha Ibrahim',
        role: 'CMO',
        quote: 'Eureka',
        image: '/team/j4.png',
        linkedin: null,
    },
];

const topRow = team.slice(0, 2);
const bottomRow = team.slice(2, 4);

function MemberCard({ member, index, tintClass }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-60px' });
    /** j1 only: square + plain object-cover. j2–j4: same taller frame + top bias as j3. */
    const legacyPhoto = member.image === '/team/j1.png';

    return (
        <motion.div
            role="article"
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.1 }}
            className={`glass ${tintClass} flex flex-col gap-3 sm:gap-5 md:gap-8 p-3 sm:p-5 md:p-10 rounded-[14px] sm:rounded-[18px] border border-white/[0.41] backdrop-blur-[24px] shadow-[0_6px_24px_rgba(100,120,160,0.13)] transition-all duration-[0.18s] ease hover:shadow-[0_10px_32px_rgba(100,120,160,0.2)] hover:-translate-y-0.5 w-full min-w-0 h-full md:flex-row md:items-start`}
            data-cursor-hover
        >
            <div
                className={`shrink-0 mx-auto md:mx-0 ${legacyPhoto ? '' : 'pt-1 sm:pt-1.5'}`}
            >
                <div
                    className={
                        legacyPhoto
                            ? 'w-[4.25rem] h-[4.25rem] sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-white/40 shadow-[0_6px_24px_rgba(100,120,160,0.13)] bg-white/20'
                            : 'w-[4.35rem] sm:w-[7.35rem] md:w-[9.25rem] lg:w-44 aspect-[4/5] rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-white/40 shadow-[0_6px_24px_rgba(100,120,160,0.13)] bg-white/20'
                    }
                >
                    <img
                        src={member.image}
                        alt={member.name}
                        className={
                            legacyPhoto
                                ? 'h-full w-full object-cover'
                                : 'h-[118%] w-full min-h-full object-cover object-[center_8%] sm:object-[center_10%] md:object-[center_12%] -translate-y-[7%] sm:-translate-y-[6%] md:-translate-y-[5%] origin-top'
                        }
                        loading="lazy"
                    />
                </div>
            </div>
            <div className="flex flex-col flex-1 text-center md:text-left min-w-0">
                {/* font-body: avoids Fraunces “twisted” J (e.g. Jannat) */}
                <h3 className="font-body font-semibold text-[0.68rem] leading-tight sm:text-sm md:text-xl lg:text-2xl text-primary mb-0.5 sm:mb-1 break-words">
                    {member.name}
                </h3>
                <p className="font-body text-[0.58rem] sm:text-[0.7rem] md:text-sm font-semibold text-accent mb-1.5 sm:mb-3 md:mb-4 leading-snug">{member.role}</p>
                <p className="font-body text-secondary text-[0.6rem] sm:text-xs md:text-sm lg:text-base leading-snug sm:leading-relaxed">
                    <span className="text-primary font-medium">“</span>
                    {member.quote}
                    <span className="text-primary font-medium">”</span>
                </p>
                {member.linkedin ? (
                    <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center md:justify-start gap-1 sm:gap-2 mt-2 sm:mt-4 md:mt-5 text-accent font-body text-[0.65rem] sm:text-sm font-medium hover:text-primary transition-all duration-[0.18s] ease"
                        data-cursor-hover
                    >
                        <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                        <span className="hidden sm:inline">LinkedIn</span>
                        <span className="sm:hidden">in</span>
                    </a>
                ) : null}
            </div>
        </motion.div>
    );
}

export default function StartupTeamPage() {
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

            <section className="relative z-10 pt-32 pb-12 px-3 sm:px-6">
                <div className="max-w-5xl mx-auto w-full">
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
                            Startup team
                        </h1>
                        <p className="font-body text-secondary max-w-2xl mx-auto">
                            Meet the people building NETWORK.
                        </p>
                    </motion.div>

                    {/* 2 above — always 2 columns (side by side on phone) */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-8 mb-4 sm:mb-8 md:mb-10 items-stretch">
                        {topRow.map((member, i) => (
                            <MemberCard
                                key={member.name}
                                member={member}
                                index={i}
                                tintClass={tintClasses[i % tintClasses.length]}
                            />
                        ))}
                    </div>

                    {/* 2 below — always 2 columns */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-4 md:gap-8 pb-20 items-stretch">
                        {bottomRow.map((member, i) => (
                            <MemberCard
                                key={member.name}
                                member={member}
                                index={i + 2}
                                tintClass={tintClasses[(i + 2) % tintClasses.length]}
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
