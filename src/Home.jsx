import React from 'react';
import CustomCursor from '@/components/networking/CustomCursor';
import Navbar from '@/components/networking/Navbar';
import HeroSection from '@/components/networking/HeroSection';
import FeaturesGrid from '@/components/networking/FeaturesGrid';
import StatsSection from '@/components/networking/StatsSection';
import HowItWorks from '@/components/networking/HowItWorks';
import EventsTeaser from '@/components/networking/EventsTeaser';
import CTASection from '@/components/networking/CTASection';
import PartnerForm from '@/components/networking/PartnerForm';
import Footer from '@/components/networking/Footer';

export default function Home() {
    return (
        <div className="min-h-screen overflow-x-hidden relative">
            {/* Ambient depth blobs — corner positions, behind content */}
            <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
                <div className="ambient-blob ambient-blob--blue top-0 right-0 translate-x-1/3 -translate-y-1/3" />
                <div className="ambient-blob ambient-blob--mint bottom-0 left-0 -translate-x-1/3 translate-y-1/3" />
                <div className="ambient-blob ambient-blob--lavender top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 opacity-90" />
            </div>
            <CustomCursor />
            <Navbar />

            <div id="hero" className="relative z-10">
                <HeroSection />
            </div>

            <div id="features" className="relative z-10">
                <FeaturesGrid />
            </div>

            <div className="relative z-10"><StatsSection /></div>

            <div id="how-it-works" className="relative z-10">
                <HowItWorks />
            </div>

            <div id="events" className="relative z-10">
                <EventsTeaser />
            </div>

            <div id="cta" className="relative z-10">
                <CTASection />
            </div>

            <div id="partner" className="relative z-10">
                <PartnerForm />
            </div>

            <div className="relative z-10"><Footer /></div>
        </div>
    );
}