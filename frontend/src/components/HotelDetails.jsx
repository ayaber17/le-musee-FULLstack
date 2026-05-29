    import React from 'react';
    import { motion } from 'framer-motion';

    const details = [
    { icon: "🕒", label: "Check-in from 3:00 pm", sub: "Check-out until noon" },
    { icon: "🛏️", label: "265 rooms and 31 plush suites", sub: "Luxury redefined" },
    { icon: "🌡️", label: "23.01°C", sub: "Perfect Riyadh weather" },
    { icon: "🍽️", label: "1 restaurants and cafe", sub: "Fine dining experience" },
    { icon: "🧘", label: "J Wellness Circle", sub: "Spa & Wellness" },
    ];

    const HotelDetails = () => {
    return (
        <section className="py-32 px-8 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
            
            {/* Left Side: Big Title */}
            <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-7xl md:text-9xl font-serif text-[#1a1a1a]"
            >
            Hotel <br /> Details
            </motion.h2>

            {/* Right Side: Interactive List */}
            <div className="flex flex-col border-t border-black/10">
            {details.map((item, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group py-8 border-b border-black/10 cursor-pointer relative overflow-hidden"
                >
                <div className="flex items-start gap-6 relative z-10">
                    <span className="text-xl opacity-60 group-hover:scale-125 transition-transform duration-500">
                    {item.icon}
                    </span>
                    <div>
                    <h3 className="text-2xl md:text-4xl font-light text-[#1a1a1a] group-hover:italic transition-all">
                        {item.label}
                    </h3>
                    <p className="text-sm uppercase tracking-widest mt-2 opacity-0 group-hover:opacity-40 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        {item.sub}
                    </p>
                    </div>
                </div>
                
                {/* Background Hover Effect */}
                <motion.div 
                    className="absolute inset-0 bg-[#FDFBF7] -z-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                />
                </motion.div>
            ))}
            </div>
        </div>
        </section>
    );
    };

    export default HotelDetails;