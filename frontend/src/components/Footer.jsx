    import React from 'react';
    import { motion } from 'framer-motion';

    const Footer = () => {
    return (
        <footer className="bg-[#0C1B17] text-white py-24 px-8 md:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            
            {/* Newsletter Section */}
            <div className="text-center mb-32">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-serif mb-6"
            >
                Keep Up-to-Date
            </motion.h2>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60 mb-12">
                Stay ahead with updates on newly uncovered hotels.
            </p>
            
            <div className="max-w-xl mx-auto">
                <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-white transition-colors text-center mb-8"
                />
                <button className="w-full bg-[#E9C496] text-black py-5 uppercase tracking-[0.3em] text-[11px] font-bold hover:bg-white transition-all duration-500">
                Subscribe
                </button>
            </div>
            </div>

            {/* Bottom Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start border-t border-white/10 pt-16">
            
            {/* Quick Links */}
            <div className="flex flex-col gap-3 text-[10px] uppercase tracking-widest text-white/50">
                <a href="#" className="hover:text-white transition">Overview</a>
                <a href="#" className="hover:text-white transition">Gallery</a>
                <a href="#" className="hover:text-white transition">Suites & Rooms</a>
                <a href="#" className="hover:text-white transition">Dining</a>
            </div>

            {/* Logo & Social */}
            <div className="flex flex-col items-center">
                <div className="text-center mb-8">
                <h3 className="text-3xl tracking-[0.2em] font-light">Le Musée</h3>
                <p className="text-[10px] tracking-[0.5em] text-[#E9C496] mt-2">ESTD 2002</p>
                </div>
                <div className="flex gap-8 text-white/40">
                <span>𝕏</span> <span>Instagram</span> <span>Facebook</span>
                </div>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col gap-4 text-[11px] text-right text-white/60">
                <p>📍 Rue Benghazi, Hassan,10000 Rabat, Maroc</p>
                <p>✉️ hotellemusee@gmail.com</p>
                <p>📞 05 37 70 70 50</p>
            </div>

            </div>
        </div>
        </footer>
    );
    };

    export default Footer;