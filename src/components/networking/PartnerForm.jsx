import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Building2, User, Mail, Phone, Send, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function PartnerForm() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        organization: '',
        contact: '',
        email: '',
        phone: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Partnership request submitted successfully!');
        setFormData({ organization: '', contact: '', email: '', phone: '' });
        setIsSubmitting(false);
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <section ref={ref} className="py-32 px-6 bg-gradient-to-b from-[#FDFBF7] to-[#FFF0F5]">
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

                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#800020]/50" />
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className="h-14 pl-12 bg-white border-[#EFDECD] rounded-2xl focus:border-[#800020] focus:ring-[#800020]/20"
                                        required
                                    />
                                </div>

                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#800020]/50" />
                                    <Input
                                        type="tel"
                                        placeholder="Phone"
                                        value={formData.phone}
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        className="h-14 pl-12 bg-white border-[#EFDECD] rounded-2xl focus:border-[#800020] focus:ring-[#800020]/20"
                                    />
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
                                            Submit
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