import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function SuccessDialog({ isOpen, onClose, title = "Success!", message = "Your request has been submitted successfully." }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-[100] border border-[#EFDECD]"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-[#800020]/10 rounded-full flex items-center justify-center mb-4">
                                <CheckCircle className="w-8 h-8 text-[#800020]" />
                            </div>

                            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">{title}</h3>
                            <p className="text-gray-600 mb-6">{message}</p>

                            <Button
                                onClick={onClose}
                                className="w-full bg-[#800020] hover:bg-[#600018] text-white rounded-xl h-12 font-medium"
                            >
                                Close
                            </Button>
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
