import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="py-16 px-6">
            <div className="max-w-6xl mx-auto rounded-[20px] p-12 border border-white/41 bg-white/28 backdrop-blur-[24px] shadow-[0_6px_24px_rgba(100,120,160,0.13)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="font-heading text-3xl font-medium mb-4 text-accent">
                            NETWORK
                        </h3>
                        <p className="font-body text-secondary leading-relaxed">
                            Built by students, for students. Connecting campuses worldwide.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-body font-semibold text-lg mb-4 text-primary">Contact Info</h4>
                        <div className="space-y-3">
                            <a
                                href="mailto:network.app1410@gmail.com"
                                className="flex items-center gap-3 font-body text-secondary hover:text-accent transition-all duration-[0.18s] ease"
                                data-cursor-hover
                            >
                                <Mail className="w-5 h-5 text-accent" />
                                <span>network.app1410@gmail.com</span>
                            </a>
                            <div className="flex items-center gap-3 font-body text-secondary">
                                <MapPin className="w-5 h-5 text-accent" />
                                <span>India & Dubai</span>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-body font-semibold text-lg mb-4 text-primary">Follow Us</h4>
                        <motion.a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-body text-accent bg-[rgba(160,140,230,0.22)] border border-[rgba(160,140,230,0.4)] hover:bg-[rgba(160,140,230,0.28)] transition-all duration-[0.18s] ease"
                            data-cursor-hover
                        >
                            <Instagram className="w-5 h-5" />
                            <span>Instagram</span>
                        </motion.a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/40 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <p className="font-body text-muted text-sm flex items-center gap-2">
                                © 2025 NETWORK. All rights reserved.
                                <span className="flex items-center gap-1">
                                    Made with <Heart className="w-4 h-4 text-accent fill-current" /> by students
                                </span>
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="font-body text-muted hover:text-accent text-sm transition-all duration-[0.18s] ease" data-cursor-hover>
                                Privacy
                            </a>
                            <a href="#" className="font-body text-muted hover:text-accent text-sm transition-all duration-[0.18s] ease" data-cursor-hover>
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}