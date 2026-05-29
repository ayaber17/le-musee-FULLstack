    import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';

    const faqs = [
    { q: "Check-in and check-out times at le Musee?", a: "Check-in starts at 3:00 PM and check-out is until 12:00 PM." },
    { q: "Does Le Musée, Rabat, allow pets?", a: "We maintain a pet-free environment to ensure the comfort of all our guests." },
    { q: "What are the parking options at Le Musée, Rabat?", a: "We offer complimentary valet parking and secure underground parking for all guests." },
    { q: "Does Le Musé, Raba, offer in-room Wi-Fi?", a: "Yes, high-speed fiber optic Wi-Fi is available throughout the hotel and in all rooms." },
    { q: "Which airport is closest to Le Musée, Rabat?", a: "King Khalid International Airport (RUH) is the closest, approximately 30 minutes away." },
    ];

    const FAQSection = () => {
    const [expanded, setExpanded] = useState(null);

    return (
        <section className="bg-[#7A2B3A] text-white py-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
            
            {/* Left Side: Title */}
            <h2 className="text-7xl md:text-9xl font-serif leading-tight">
            Your <br /> common <br /> questions
            </h2>

            {/* Right Side: Accordion */}
            <div className="flex flex-col border-t border-white/20">
            {faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/20">
                <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="w-full py-8 flex justify-between items-center text-left group"
                >
                    <span className="text-xl md:text-2xl font-light group-hover:pl-4 transition-all duration-300">
                    {faq.q}
                    </span>
                    <span className="text-3xl font-thin">{expanded === i ? '−' : '+'}</span>
                </button>
                
                <AnimatePresence>
                    {expanded === i && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-white/60 font-light max-w-md">
                        {faq.a}
                        </p>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
    };

    export default FAQSection;