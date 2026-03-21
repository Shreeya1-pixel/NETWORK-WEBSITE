import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, User, Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { validateEmail, validatePhone } from "@/lib/validation";
import { submitPartnershipRequest } from "@/lib/api";
import { SuccessDialog } from "@/components/ui/SuccessDialog";

export default function PartnerForm() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        phone: ''
    });
    const [formData, setFormData] = useState({
        organization: '',
        contact: '',
        email: '',
        phone: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.isValid) {
            setErrors(prev => ({ ...prev, email: emailValidation.error }));
            toast.error(emailValidation.error);
            return;
        }

        // Validate phone
        const phoneValidation = validatePhone(formData.phone);
        if (!phoneValidation.isValid) {
            setErrors(prev => ({ ...prev, phone: phoneValidation.error }));
            toast.error(phoneValidation.error);
            return;
        }

        // Clear errors
        setErrors({ email: '', phone: '' });

        setIsSubmitting(true);

        try {
            const result = await submitPartnershipRequest({
                organization: formData.organization,
                contact: formData.contact,
                email: formData.email,
                phone: formData.phone,
            });

            if (result.success) {
                setShowSuccessDialog(true);
                setSubmitted(true);
                setFormData({ organization: '', contact: '', email: '', phone: '' });
            }
        } catch (error) {
            if (error.message.includes('already') || error.message.includes('exists')) {
                setErrors(prev => ({ ...prev, email: 'Partnership request already submitted with this email' }));
                toast.error('Partnership request already submitted with this email');
            } else if (error.message.includes('Too many requests')) {
                toast.error(error.message);
            } else {
                toast.error(error.message || 'Failed to submit partnership request. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <section ref={ref} className="py-32 px-6">
            <SuccessDialog
                isOpen={showSuccessDialog}
                onClose={() => setShowSuccessDialog(false)}
                title="Partnership Request Sent!"
                message="Thank you for your interest in partnering with NETWORK. We have received your details and will be in touch shortly."
            />
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="pill inline-block px-4 py-2 text-primary text-sm font-body font-medium mb-6">
                            Partnership
                        </span>
                        <h2 className="font-heading text-4xl md:text-5xl font-medium text-primary mb-6">
                            Become a Partner
                        </h2>
                        <p className="font-body text-lg text-secondary mb-8 leading-relaxed">
                            Join us as a partner and be part of NETWORK's mission to connect students across campuses.
                            Help us build the future of student networking together.
                        </p>

                        {/* Benefits */}
                        <div className="space-y-4">
                            {[
                                'Access to verified student talent',
                                'Early adopter benefits',
                                'Brand visibility across campuses',
                                'Direct engagement opportunities'
                            ].map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="w-6 h-6 rounded-full bg-[rgba(207,233,219,0.55)] border border-white/40 flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-success" />
                                    </div>
                                    <span className="font-body text-primary">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right form — glass */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="tint-soft-blue rounded-[18px] p-8 md:p-10 border border-white/41 backdrop-blur-[24px] shadow-[0_6px_24px_rgba(100,120,160,0.13)]">
                            <div className="space-y-6">
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/70" />
                                    <Input
                                        placeholder="Organization Name"
                                        value={formData.organization}
                                        onChange={(e) => handleChange('organization', e.target.value)}
                                        className="h-14 pl-12 rounded-2xl font-body text-primary placeholder:text-muted bg-white/28 backdrop-blur-[24px] border border-white/41 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/70" />
                                    <Input
                                        placeholder="Contact Person"
                                        value={formData.contact}
                                        onChange={(e) => handleChange('contact', e.target.value)}
                                        className="h-14 pl-12 rounded-2xl font-body text-primary placeholder:text-muted bg-white/28 backdrop-blur-[24px] border border-white/41 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                                        required
                                    />
                                </div>

                                <div>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/70" />
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            className={`h-14 pl-12 rounded-2xl font-body text-primary placeholder:text-muted bg-white/28 backdrop-blur-[24px] border ${errors.email ? 'border-accent/60' : 'border-white/41'} focus:border-accent/50 focus:ring-2 focus:ring-accent/20`}
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-2 text-sm font-body text-accent">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/70" />
                                        <Input
                                            type="tel"
                                            placeholder="Phone (Dubai or India)"
                                            value={formData.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            className={`h-14 pl-12 rounded-2xl font-body text-primary placeholder:text-muted bg-white/28 backdrop-blur-[24px] border ${errors.phone ? 'border-accent/60' : 'border-white/41'} focus:border-accent/50 focus:ring-2 focus:ring-accent/20`}
                                            required
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="mt-2 text-sm font-body text-accent">{errors.phone}</p>
                                    )}
                                    {!errors.phone && formData.phone && (
                                        <p className="mt-1 text-xs font-body text-muted">Format: +971501234567 (Dubai) or +919876543210 (India)</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    variant={submitted ? 'success' : 'primary'}
                                    className="w-full h-14 rounded-2xl font-medium group"
                                    data-cursor-hover
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {submitted ? 'Request Sent!' : 'Submit'}
                                            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}