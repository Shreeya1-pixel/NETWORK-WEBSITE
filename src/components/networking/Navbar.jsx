import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300"
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-bold cursor-pointer"
                            onClick={() => scrollToSection('hero')}
                            data-cursor-hover
                        >
                            <span className="bg-gradient-to-r from-[#800020] to-[#FFB6C1] bg-clip-text text-transparent">
                                NETWORK
                            </span>
                        </motion.div>

                        {/* Desktop menu */}
                        <div className="hidden md:flex items-center gap-8">
                            {['Features', 'How It Works', 'Events', 'Partner'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                                    className="text-sm font-medium transition-colors text-gray-700 hover:text-[#800020]"
                                    data-cursor-hover
                                >
                                    {item}
                                </button>
                            ))}
                            <Button
                                onClick={() => scrollToSection('cta')}
                                className="bg-[#800020] hover:bg-[#600018] text-white rounded-full px-6 h-10 font-medium"
                                data-cursor-hover
                            >
                                Join Waitlist
                            </Button>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2"
                            data-cursor-hover
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6 text-[#800020]" />
                            ) : (
                                <Menu className="w-6 h-6 text-[#800020]" />
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
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col gap-6">
                            {['Features', 'How It Works', 'Events', 'Partner'].map((item, index) => (
                                <motion.button
                                    key={item}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                                    className="text-2xl font-bold text-[#1a1a1a] text-left"
                                >
                                    {item}
                                </motion.button>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Button
                                    onClick={() => scrollToSection('cta')}
                                    className="w-full bg-[#800020] hover:bg-[#600018] text-white rounded-full h-14 font-medium text-lg mt-4"
                                >
                                    Join Waitlist
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}