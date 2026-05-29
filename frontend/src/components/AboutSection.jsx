    import React from 'react';
    import { motion } from 'framer-motion';
    import { MoveRight } from 'lucide-react';
    import { Link } from 'react-router-dom';

    const AboutSection = () => {
    return (
        <section className="py-24 px-8 md:px-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* L'isser: Tsawer b l'animation dyal split */}
            <div className="relative flex gap-2 h-[500px]">
            {/* Taswira 1: Kat7el l'imane */}
            <motion.div 
                initial={{ width: "100%" }}
                whileInView={{ width: "65%" }}
                transition={{ duration: 1.5, ease: [0.6, 0.01, -0.05, 0.95] }}
                viewport={{ once: true }}
                className="h-full overflow-hidden relative"
            >
                <img 
                src= "/images/a4.webp"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Lobby"
                />
            </motion.div>

            {/* Taswira 2: Taswira sghira li katban f'l'wesset (b7al split) */}
            <motion.div 
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "35%", opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.6, 0.01, -0.05, 0.95] }}
                viewport={{ once: true }}
                className="h-full overflow-hidden relative"
            >
                <img 
                src="/images/ch8.webp" 
                className="absolute inset-0 w-full h-full object-cover"
                alt="Interior"
                />
            </motion.div>
            </div>

            {/* L'imane: L'ktaba o Button */}
            <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
            >
            <p className="text-[#555] font-light leading-relaxed text-lg max-w-md">
                Located in the city center in Rabat’s business district, opposite the Mohammed VI Museum, Hotel le Musée offers easy access to transportation, restaurants, and entertainment. It features modern air-conditioned rooms with panoramic views, free Wi-Fi, private parking, a restaurant, meeting rooms, and numerous services: airport shuttle, 24-hour reception, accessibility facilities, terrace café (7am-11pm), varied breakfast buffet, and guided city tours.
            </p>

                <Link 
        to="/experience"  // هادا هو الرابط اللي زدنا ف App.jsx
        className="bg-[#2D2D2D] text-white px-8 py-4 flex items-center gap-6 group hover:bg-black transition-all w-fit"
    >
        <span className="text-xs font-bold tracking-[0.2em] uppercase">
            Learn More About
        </span>
        <MoveRight size={18} className="group-hover:translate-x-2 transition-transform" />
    </Link>
            </motion.div>

        </div>
        </section>
    );
    };

    export default AboutSection;