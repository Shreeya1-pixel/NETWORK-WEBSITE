import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function SuccessDialog({ isOpen, onClose, title = "Success!", message = "Your request has been submitted successfully." }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[rgba(100,120,160,0.12)] backdrop-blur-[8px]"
                    />

                    {/* Dialog — glass */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: 10 }}
                        className="relative w-full max-w-md rounded-[20px] p-6 border border-white/41 bg-white/28 backdrop-blur-[24px] shadow-[0_10px_32px_rgba(100,120,160,0.2)]"
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[rgba(207,233,219,0.55)] border border-white/40">
                                <CheckCircle className="w-8 h-8 text-success" />
                            </div>

                            <h3 className="font-heading text-2xl font-medium text-primary mb-2">{title}</h3>
                            <p className="font-body text-secondary mb-6">{message}</p>

                            <Button
                                onClick={onClose}
                                variant="primary"
                                className="w-full rounded-2xl h-12 font-medium"
                            >
                                Close
                            </Button>
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full transition-all duration-[0.18s] ease hover:bg-white/30"
                        >
                            <X className="w-5 h-5 text-muted" />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
