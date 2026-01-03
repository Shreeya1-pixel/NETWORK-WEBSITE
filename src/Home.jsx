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
        <div className="min-h-screen bg-[#FDFBF7] overflow-x-hidden">
            <CustomCursor />
            <Navbar />

            <div id="hero">
                <HeroSection />
            </div>

            <div id="features">
                <FeaturesGrid />
            </div>

            <StatsSection />

            <div id="how-it-works">
                <HowItWorks />
            </div>

            <div id="events">
                <EventsTeaser />
            </div>

            <div id="cta">
                <CTASection />
            </div>

            <div id="partner">
                <PartnerForm />
            </div>

            <Footer />
        </div>
    );
}