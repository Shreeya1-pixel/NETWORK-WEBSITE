import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateEmail } from "@/lib/validation";

export default function CTASection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmailError('');
        
        // Validate email
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
            setEmailError(emailValidation.error);
            return;
        }

        const trimmedEmail = email.toLowerCase().trim();
        
        // Check if email already exists (ONE SUBMISSION PER EMAIL LIMIT)
        const submittedEmails = JSON.parse(localStorage.getItem('submittedEmails') || '[]');
        if (submittedEmails.includes(trimmedEmail)) {
            setEmailError('This email has already been submitted. Each email can only be used once.');
            setSubmissionMessage('This email has already been submitted.');
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setSubmissionMessage('');
            }, 4000);
            return;
        }

        // Rate limiting: Prevent spam submissions
        const lastSubmissionTime = localStorage.getItem('lastSubmissionTime');
        const now = Date.now();
        const RATE_LIMIT_MS = 5000; // 5 seconds between submissions
        
        if (lastSubmissionTime && (now - parseInt(lastSubmissionTime)) < RATE_LIMIT_MS) {
            const remainingTime = Math.ceil((RATE_LIMIT_MS - (now - parseInt(lastSubmissionTime))) / 1000);
            setSubmissionMessage(`Please wait ${remainingTime} second${remainingTime > 1 ? 's' : ''} before submitting again.`);
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setSubmissionMessage('');
            }, 3000);
            return;
        }

        if (email && !isSubmitting) {
            setIsSubmitting(true);
            
            // Add email to submitted list (ONE SUBMISSION PER EMAIL)
            submittedEmails.push(trimmedEmail);
            localStorage.setItem('submittedEmails', JSON.stringify(submittedEmails));
            localStorage.setItem('lastSubmissionTime', now.toString());
            setSubmissionMessage("SUBMITTED! We'll be in touch.");
            setSubmitted(true);

            setEmail('');
            setTimeout(() => {
                setSubmitted(false);
                setSubmissionMessage('');
                setIsSubmitting(false);
            }, 3000);
        }
    };

    return (
        <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-[#FFF9F5] to-[#FDFBF7] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#800020]/5 via-[#FFB6C1]/10 to-[#EFDECD]/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto relative z-10"
            >
                <div className="bg-white/80 backdrop-blur-xl rounded-[3rem] border border-[#EFDECD] p-12 md:p-16 shadow-2xl shadow-[#800020]/10 text-center">
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="inline-flex p-4 bg-gradient-to-br from-[#800020] to-[#a83248] rounded-2xl mb-8"
                    >
                        <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6">
                        Ready to Join the Network?
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
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
                                className={`h-14 px-6 bg-white ${emailError ? 'border-[#800020]' : 'border-[#EFDECD]'} rounded-full text-base focus:border-[#800020] focus:ring-[#800020]/20`}
                            />
                            {emailError && (
                                <p className="mt-2 text-sm text-[#800020] px-6">{emailError}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="h-14 px-8 bg-[#800020] hover:bg-[#600018] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full font-medium whitespace-nowrap group transition-all duration-300 hover:shadow-lg hover:shadow-[#800020]/25"
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
                            className="mt-4 text-[#800020] font-medium"
                        >
                            {submissionMessage}
                        </motion.p>
                    )}
                </div>
            </motion.div>
        </section>
    );
}