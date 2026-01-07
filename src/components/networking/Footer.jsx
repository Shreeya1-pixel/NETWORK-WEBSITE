import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white py-16 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-3xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-[#800020] to-[#FFB6C1] bg-clip-text text-transparent">
                                NETWORK
                            </span>
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                            Built by students, for students. Connecting campuses worldwide.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
                        <div className="space-y-3">
                            <a
                                href="mailto:network.app1410@gmail.com"
                                className="flex items-center gap-3 text-gray-400 hover:text-[#FFB6C1] transition-colors"
                                data-cursor-hover
                            >
                                <Mail className="w-5 h-5 text-[#800020]" />
                                <span>network.app1410@gmail.com</span>
                            </a>
                            <div className="flex items-center gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 text-[#800020]" />
                                <span>India & Dubai</span>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
                        <motion.a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#800020] to-[#a83248] rounded-full text-white hover:opacity-90 transition-opacity"
                            data-cursor-hover
                        >
                            <Instagram className="w-5 h-5" />
                            <span>Instagram</span>
                        </motion.a>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <p className="text-gray-500 text-sm flex items-center gap-2">
                                © 2025 NETWORK. All rights reserved.
                                <span className="flex items-center gap-1">
                                    Made with <Heart className="w-4 h-4 text-[#800020] fill-current" /> by students
                                </span>
                            </p>
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="text-gray-500 hover:text-[#FFB6C1] text-sm transition-colors" data-cursor-hover>
                                Privacy
                            </a>
                            <a href="#" className="text-gray-500 hover:text-[#FFB6C1] text-sm transition-colors" data-cursor-hover>
                                Terms
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}