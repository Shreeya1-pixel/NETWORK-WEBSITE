import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const scrollToSection = (id) => {
        if (location.pathname !== '/') {
            // If not on home page, navigate to home first
            window.location.href = `/#${id}`;
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    const handleLogoClick = () => {
        if (location.pathname === '/') {
            scrollToSection('hero');
        } else {
            window.location.href = '/';
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 left-0 right-0 z-50 transition-all duration-[0.18s] ease"
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="glass flex items-center justify-between rounded-2xl px-6 py-3 border border-white/40 backdrop-blur-[24px] bg-white/28 shadow-[0_6px_24px_rgba(100,120,160,0.13)]">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-heading font-medium cursor-pointer text-primary"
                            onClick={handleLogoClick}
                            data-cursor-hover
                        >
                            <span className="text-accent">
                                NETWORK
                            </span>
                        </motion.div>

                        {/* Desktop menu */}
                        <div className="hidden md:flex items-center gap-8">
                            {location.pathname === '/' && ['Features', 'How It Works', 'Events', 'Partner'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                                    className="text-sm font-body font-medium text-secondary hover:text-primary transition-all duration-[0.18s] ease"
                                    data-cursor-hover
                                >
                                    {item}
                                </button>
                            ))}
                            <Link
                                to="/alumni"
                                className="text-sm font-body font-medium text-secondary hover:text-primary transition-all duration-[0.18s] ease"
                                data-cursor-hover
                            >
                                Students &amp; Alumni
                            </Link>
                            <Link
                                to="/company"
                                className="text-sm font-body font-medium text-secondary hover:text-primary transition-all duration-[0.18s] ease"
                                data-cursor-hover
                            >
                                Company &amp; Events
                            </Link>
                            <Link
                                to="/team"
                                className="text-sm font-body font-medium text-secondary hover:text-primary transition-all duration-[0.18s] ease"
                                data-cursor-hover
                            >
                                Startup team
                            </Link>
                            {location.pathname === '/' && (
                                <Button
                                    onClick={() => scrollToSection('cta')}
                                    variant="primary"
                                    className="rounded-full px-6 h-10 font-medium"
                                    data-cursor-hover
                                >
                                    Join Waitlist
                                </Button>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-primary"
                            data-cursor-hover
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 pt-24 px-6 md:hidden bg-white/25 backdrop-blur-[25px] border border-white/41 shadow-[0_6px_24px_rgba(100,120,160,0.13)]"
                    >
                        <div className="flex flex-col gap-6">
                            {location.pathname === '/' && ['Features', 'How It Works', 'Events', 'Partner'].map((item, index) => (
                                <motion.button
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                                    className="text-2xl font-heading font-medium text-primary text-left"
                                >
                                    {item}
                                </motion.button>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: location.pathname === '/' ? 0.4 : 0.1 }}
                            >
                                <Link
                                    to="/alumni"
                                    className="text-2xl font-heading font-medium text-primary text-left block"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Students &amp; Alumni
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: location.pathname === '/' ? 0.5 : 0.2 }}
                            >
                                <Link
                                    to="/company"
                                    className="text-2xl font-heading font-medium text-primary text-left block"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Company &amp; Events
                                </Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: location.pathname === '/' ? 0.55 : 0.25 }}
                            >
                                <Link
                                    to="/team"
                                    className="text-2xl font-heading font-medium text-primary text-left block"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Startup team
                                </Link>
                            </motion.div>
                            {location.pathname === '/' && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <Button
                                        onClick={() => scrollToSection('cta')}
                                        variant="primary"
                                        className="w-full rounded-full h-14 font-medium text-lg mt-4"
                                    >
                                        Join Waitlist
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}