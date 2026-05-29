import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, X, Sparkles, Copy, Check, Loader2 } from 'lucide-react';
import axios from 'axios';

const CouponPrompt = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);
    const [coupon, setCoupon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestCoupon = async () => {
            try {
                // هاد الرابط خاصو يكون كيرجع أخر كوبون صالح من Laravel
                const response = await axios.get('http://127.0.0.1:8000/api/coupons/latest-valid');
                if (response.data) {
                    setCoupon(response.data);
                    // مورا ما نلقاو الكوبون، كنتسناو 3 ثواني عاد كنبينوه
                    setTimeout(() => setIsVisible(true), 3000);
                }
            } catch (err) {
                console.error("No valid coupons found",err);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestCoupon();
    }, []);

    const copyToClipboard = () => {
        if (!coupon) return;
        navigator.clipboard.writeText(coupon.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading || !coupon) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -50 }}
                    className="fixed bottom-8 left-8 z-[100] max-w-sm"
                >
                    <div className="bg-[#1B3022] text-white p-6 shadow-2xl border border-[#C8A96A]/30 relative overflow-hidden group">
                        <div className="absolute -right-4 -top-4 text-[#C8A96A]/10 rotate-12 group-hover:rotate-45 transition-transform duration-700">
                            <Sparkles size={100} />
                        </div>

                        <button onClick={() => setIsVisible(false)} className="absolute top-2 right-2 text-white/50 hover:text-white transition-colors">
                            <X size={18} />
                        </button>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-[#C8A96A] p-2 rounded-full text-[#1B3022]">
                                    <Tag size={16} />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C8A96A]">Offre Limitée</span>
                            </div>

                            <h3 className="font-serif text-xl mb-2 italic">
                                {coupon.discount_type === 'percent' ? `${coupon.discount_value}%` : `${coupon.discount_value} MAD`} de remise
                            </h3>
                            <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
                                Utilisez le code ci-dessous pour votre prochaine réservation. Expire le: {new Date(coupon.end_date).toLocaleDateString()}
                            </p>

                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-white/5 border border-white/10 px-4 py-3 text-sm font-mono tracking-widest text-[#C8A96A] font-bold">
                                    {coupon.code}
                                </div>
                                <button onClick={copyToClipboard} className="bg-[#C8A96A] text-[#1B3022] px-4 py-3 hover:bg-[#d4b982] transition-colors">
                                    {copied ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CouponPrompt;