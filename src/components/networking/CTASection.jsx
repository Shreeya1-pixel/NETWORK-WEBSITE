import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateEmail } from "@/lib/validation";
import { submitToWaitlist } from "@/lib/api";

export default function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError('');

        // Validate email
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            setEmailError(emailValidation.error);
            return;
        }

        if (email && !isSubmitting) {
            setIsSubmitting(true);

            try {
                const result = await submitToWaitlist(email);

                if (result.success) {
                    setSubmissionMessage(result.message || "SUBMITTED! We'll be in touch.");
                    setSubmitted(true);
                    setEmail('');
                }
            } catch (error) {
                // Handle duplicate email error
                if (error.message.includes('already') || error.message.includes('exists')) {
                    setEmailError('This email has already been submitted. Each email can only be used once.');
                } else if (error.message.includes('Too many requests')) {
                    setSubmissionMessage(error.message);
                    setSubmitted(true);
                } else {
                    setEmailError(error.message || 'Failed to submit. Please try again.');
                }
            } finally {
                setTimeout(() => {
                    setSubmitted(false);
                    setSubmissionMessage('');
                    setIsSubmitting(false);
                }, 3000);
            }
        }
    };

    return (
        <section ref={ref} className="py-32 px-6 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto relative z-10"
            >
                <div className="tint-neutral-frost rounded-[20px] p-12 md:p-16 border border-white/41 backdrop-blur-[24px] shadow-[0_6px_24px_rgba(100,120,160,0.13)] text-center transition-all duration-[0.18s] ease hover:shadow-[0_10px_32px_rgba(100,120,160,0.2)]">
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 3, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="inline-flex p-4 rounded-2xl mb-8 bg-white/30 border border-white/40 backdrop-blur-[10px]"
                    >
                        <Sparkles className="w-8 h-8 text-accent" />
                    </motion.div>

                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-primary mb-6">
                        Ready to Join the Network?
                    </h2>
                    <p className="font-body text-lg text-secondary mb-10 max-w-xl mx-auto">
                        Start connecting, collaborating, and creating opportunities today.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <div className="flex-1">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError('');
                                }}
                                className={`h-14 px-6 rounded-2xl text-base font-body text-primary placeholder:text-muted bg-white/28 backdrop-blur-[24px] border transition-all duration-[0.18s] ease ${emailError ? 'border-accent/60' : 'border-white/41'} focus:border-accent/50 focus:ring-2 focus:ring-accent/20`}
                            />
                            {emailError && (
                                <p className="mt-2 text-sm text-accent px-6 font-body">{emailError}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            variant={submitted ? 'success' : 'primary'}
                            className="h-14 px-8 rounded-2xl font-medium whitespace-nowrap group"
                            data-cursor-hover
                        >
                            {submitted ? 'Welcome!' : isSubmitting ? 'Submitting...' : 'Sign Up Now'}
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>
                    {submitted && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-4 font-body font-medium text-success"
                        >
                            {submissionMessage}
                        </motion.p>
                    )}
                </div>
            </motion.div>
        </section>
    );
}