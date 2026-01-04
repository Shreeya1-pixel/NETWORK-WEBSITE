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
        <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-[#FDFBF7] to-[#FFF0F5]">
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
                        <span className="inline-block px-4 py-2 bg-[#FFB6C1]/20 rounded-full text-[#800020] text-sm font-medium mb-6">
                            Partnership
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
                            Become a Partner
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
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
                                    <div className="w-6 h-6 rounded-full bg-[#800020]/10 flex items-center justify-center">
                                        <CheckCircle className="w-4 h-4 text-[#800020]" />
                                    </div>
                                    <span className="text-gray-700">{benefit}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-[#EFDECD] shadow-xl shadow-[#800020]/5">
                            <div className="space-y-6">
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#800020]/50" />
                                    <Input
                                        placeholder="Organization Name"
                                        value={formData.organization}
                                        onChange={(e) => handleChange('organization', e.target.value)}
                                        className="h-14 pl-12 bg-white border-[#EFDECD] rounded-2xl focus:border-[#800020] focus:ring-[#800020]/20"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#800020]/50" />
                                    <Input
                                        placeholder="Contact Person"
                                        value={formData.contact}
                                        onChange={(e) => handleChange('contact', e.target.value)}
                                        className="h-14 pl-12 bg-white border-[#EFDECD] rounded-2xl focus:border-[#800020] focus:ring-[#800020]/20"
                                        required
                                    />
                                </div>

                                <div>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#800020]/50" />
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            className={`h-14 pl-12 bg-white ${errors.email ? 'border-[#800020]' : 'border-[#EFDECD]'} rounded-2xl focus:border-[#800020] focus:ring-[#800020]/20`}
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-2 text-sm text-[#800020]">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#800020]/50" />
                                        <Input
                                            type="tel"
                                            placeholder="Phone (Dubai or India)"
                                            value={formData.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            className={`h-14 pl-12 bg-white ${errors.phone ? 'border-[#800020]' : 'border-[#EFDECD]'} rounded-2xl focus:border-[#800020] focus:ring-[#800020]/20`}
                                            required
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="mt-2 text-sm text-[#800020]">{errors.phone}</p>
                                    )}
                                    {!errors.phone && formData.phone && (
                                        <p className="mt-1 text-xs text-gray-500">Format: +971501234567 (Dubai) or +919876543210 (India)</p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full h-14 bg-[#800020] hover:bg-[#600018] text-white rounded-2xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#800020]/25 group"
                                    data-cursor-hover
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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