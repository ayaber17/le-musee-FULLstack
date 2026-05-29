    import React from 'react';
    import { motion } from 'framer-motion';
    import Navbar from '../components/Navbar';
    import Footer from '../components/Footer';

    const DiningPage = () => {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
        <Navbar />
        
        {/* Hero Section - صورة كبيرة للمطعم */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-black">
            <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
            >
            <img src="/images/res1.webp" className="w-full h-full object-cover" alt="Fine Dining" />
            </motion.div>
            <div className="relative z-10 text-center text-white">
            <h1 className="text-6xl md:text-8xl font-serif italic">Culinary Art</h1>
            <p className="mt-4 text-[10px] uppercase tracking-[0.6em] opacity-80">Taste the Excellence at Le Musée</p>
            </div>
        </section>

        {/* Content Section */}
        <section className="py-24 px-8 md:px-32 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-8">
            <h2 className="text-[#7A2B3A] text-[11px] uppercase tracking-[0.5em] font-bold">The Kitchen</h2>
            <h3 className="text-4xl font-serif italic text-[#1a1a1a]">A fusion of Moroccan traditions & International flair.</h3>
            <p className="text-gray-600 leading-loose font-light">
                Our restaurant offers a sensory journey. From the smell of freshly baked Moroccan bread in the morning to the refined French-inspired dishes in the evening, every meal is prepared with locally sourced ingredients.
            </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
            <img src="/images/res2.webp" className="w-full h-64 object-cover rounded-2xl" alt="Dish 1" />
            <img src="/images/res3.webp" className="w-full h-64 object-cover rounded-2xl mt-8" alt="Dish 2" />
            </div>
        </section>

        {/* Menu Highlight Section */}
        <section className="py-20 bg-[#F3EFE9] text-center">
            <div className="max-w-2xl mx-auto px-8">
                <h2 className="text-3xl font-serif mb-8 text-[#7A2B3A]">Breakfast, Lunch & Dinner</h2>
                <p className="text-gray-500 font-light mb-12">Open daily from 7:00 AM to 11:00 PM for hotel guests and visitors.</p>
                <a 
    href="/menu_le_musee.pdf" // السمية ديال الملف اللي حطيتي فـ public
    download="Menu_Le_Musee.pdf" // السمية اللي غاتبان للمستخدم فاش يتيليشارجي
    className="inline-block border border-[#7A2B3A] text-[#7A2B3A] px-12 py-4 uppercase text-[10px] tracking-widest hover:bg-[#7A2B3A] hover:text-white transition-all text-center"
>
    Download Our Menu (PDF)
</a>
            </div>
        </section>
        
        </div>
    );
    };

    export default DiningPage;