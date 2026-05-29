    // import React, { useState } from 'react';
    // import { motion, AnimatePresence } from 'framer-motion';
    // import Navbar from '../components/Navbar';
    // import Footer from '../components/Footer';

    // const RoomsGallery = () => {
    // // 1. البيانات ديال الغرف (تقدر تزيد شحال ما بغيتي)
    // const allImages = [
    //     { id: 1, src: "/images/ch8.webp", category: "Suites", title: "Royal Suite" },
    //     { id: 1, src: "/images/chst1.webp", category: "Standard", title: "triple standard" },
    //     { id: 1, src: "/images/chst2.webp", category: "Standard", title: "triple standard" },
    //     { id: 1, src: "/images/chst3.webp", category: "Standard", title: "triple standard" },
    //     { id: 1, src: "/images/chst4.webp", category: "Standard", title: "chambre standard" },
    //     { id: 1, src: "/images/chst5.webp", category: "Standard", title: "chambre standard" },
    //     { id: 1, src: "/images/chst6.webp", category: "Standard", title: "chambre standard" },
    //     { id: 1, src: "/images/chst7.webp", category: "Standard", title: "chambre standard" },

    //     { id: 2, src: "/images/res3.webp", category: "restaurent", title: "restaurent" },
    //     { id: 3, src: "/images/res2.webp", category: "restaurent", title: "restaurent" },
    //     { id: 4, src: "/images/sj.webp", category: "Suites", title: "Junior Suite" },
    //     { id: 4, src: "/images/sj1.webp", category: "Suites", title: "Junior Suite" },
    //     { id: 4, src: "/images/sj2.webp", category: "Suites", title: "Junior Suite" },
    //     { id: 4, src: "/images/sj4.webp", category: "Suites", title: "Junior Suite" },

    //     { id: 4, src: "/images/sf1.webp", category: "Suites", title: "family Suite" },
    //     { id: 4, src: "/images/sf2.webp", category: "Suites", title: "family Suite" },
    //     { id: 4, src: "/images/sf3.webp", category: "Suites", title: "family Suite" },
    //     { id: 4, src: "/images/sf4.webp", category: "Suites", title: "family Suite" },
    //     { id: 4, src: "/images/sf5.webp", category: "Suites", title: "family Suite" },
    //     { id: 4, src: "/images/sf6.webp", category: "Suites", title: "family Suite" },
    //     { id: 4, src: "/images/sf7.webp", category: "Suites", title: "family Suite" },

    //     { id: 4, src: "/images/ss1.webp", category: "salle de séminaire", title: "salle de séminaire" },
    //     { id: 4, src: "/images/ss2.webp", category: "salle de séminaire", title: "salle de séminaire" },
    //     { id: 4, src: "/images/ss3.webp", category: "salle de séminaire", title: "salle de séminaire" },


    //     { id: 5, src: "/images/res1.webp", category: "restaurent", title: "restaurent" },
    //     { id: 5, src: "/images/res5.webp", category: "restaurent", title: "restaurent" },
    //     { id: 6, src: "/images/res4.webp", category: "restaurent", title: "restaurent" },
    // ];

    // const [filter, setFilter] = useState('All');
    // const categories = ['All', 'Standard', 'restaurent', 'Suites','salle de séminaire'];

    // const filteredImages = filter === 'All' 
    //     ? allImages 
    //     : allImages.filter(img => img.category === filter);

    // return (
    //     <div className="min-h-screen bg-[#FDFBF7]">
    //     <Navbar />

    //     {/* Hero Section */}
    //     <section className="pt-40 pb-20 text-center px-4">
    //         <motion.h4 
    //         initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    //         className="text-[#C8A966] text-[10px] uppercase tracking-[0.5em] mb-4 font-bold"
    //         >
    //         Our Sanctuary
    //         </motion.h4>
    //         <motion.h1 
    //         initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
    //         className="text-5xl md:text-7xl font-serif italic text-[#1a1a1a]"
    //         >
    //         Rooms & Suites Gallery
    //         </motion.h1>
    //     </section>

    //     {/* Filters */}
    //     <div className="flex justify-center gap-8 mb-16 px-4 flex-wrap">
    //         {categories.map((cat) => (
    //         <button
    //             key={cat}
    //             onClick={() => setFilter(cat)}
    //             className={`text-[11px] uppercase tracking-widest pb-2 transition-all ${
    //             filter === cat ? 'border-b-2 border-[#C8A966] text-[#1a1a1a] font-bold' : 'text-gray-400 hover:text-black'
    //             }`}
    //         >
    //             {cat}
    //         </button>
    //         ))}
    //     </div>

    //     {/* Image Grid */}
    //     <section className="px-8 md:px-16 pb-24">
    //         <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    //         <AnimatePresence>
    //             {filteredImages.map((img) => (
    //             <motion.div
    //                 key={img.id}
    //                 layout
    //                 initial={{ opacity: 0, scale: 0.9 }}
    //                 animate={{ opacity: 1, scale: 1 }}
    //                 exit={{ opacity: 0, scale: 0.9 }}
    //                 transition={{ duration: 0.4 }}
    //                 className="relative group overflow-hidden cursor-pointer h-[400px] bg-gray-200"
    //             >
    //                 <img 
    //                 src={img.src} 
    //                 alt={img.title}
    //                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    //                 />
    //                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
    //                 <span className="text-[#C8A966] text-[10px] uppercase tracking-widest mb-2">{img.category}</span>
    //                 <h3 className="text-white text-2xl font-serif italic">{img.title}</h3>
    //                 </div>
    //             </motion.div>
    //             ))}
    //         </AnimatePresence>
    //         </motion.div>
    //     </section>

    //     <Footer />
    //     </div>
    // );
    // };

    // export default RoomsGallery;

    import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RoomsGallery = () => {
    // 1. قادينا الـ IDs باش يكون كل سطر عنده ID وحيد (Unique)
    const allImages = [
        // Suites
        { id: 1, src: "/images/ch8.webp", category: "Suites", title: "Royal Suite" },
        { id: 2, src: "/images/sj.webp", category: "Suites", title: "Junior Suite" },
        { id: 3, src: "/images/sj1.webp", category: "Suites", title: "Junior Suite View" },
        { id: 4, src: "/images/sj2.webp", category: "Suites", title: "Junior Suite Interior" },
        { id: 5, src: "/images/sj4.webp", category: "Suites", title: "Junior Suite Deluxe" },
        { id: 6, src: "/images/sf1.webp", category: "Suites", title: "Family Suite Master" },
        { id: 7, src: "/images/sf2.webp", category: "Suites", title: "Family Suite Living" },

        // Standard
        { id: 8, src: "/images/chst1.webp", category: "Standard", title: "Triple Standard" },
        { id: 9, src: "/images/chst2.webp", category: "Standard", title: "Triple Standard Comfort" },
        { id: 10, src: "/images/chst3.webp", category: "Standard", title: "Triple Standard Plus" },
        { id: 11, src: "/images/chst4.webp", category: "Standard", title: "Classic Room" },
        { id: 12, src: "/images/chst5.webp", category: "Standard", title: "Classic Room View" },
        { id: 13, src: "/images/chst6.webp", category: "Standard", title: "Standard Single" },
        { id: 14, src: "/images/chst7.webp", category: "Standard", title: "Standard Double" },

        // Restaurant
        { id: 15, src: "/images/res3.webp", category: "restaurent", title: "Main Restaurant" },
        { id: 16, src: "/images/res2.webp", category: "restaurent", title: "Dining Area" },
        { id: 17, src: "/images/res1.webp", category: "restaurent", title: "Le Musée Terrace" },
        { id: 18, src: "/images/res5.webp", category: "restaurent", title: "Breakfast Lounge" },
        { id: 19, src: "/images/res4.webp", category: "restaurent", title: "Dinner Setting" },

        // Salle de séminaire
        { id: 20, src: "/images/ss1.webp", category: "salle de séminaire", title: "Grand Hall" },
        { id: 21, src: "/images/ss2.webp", category: "salle de séminaire", title: "Meeting Room" },
        { id: 22, src: "/images/ss3.webp", category: "salle de séminaire", title: "Business Center" },
    ];

    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Standard', 'restaurent', 'Suites', 'salle de séminaire'];

    const filteredImages = filter === 'All' 
        ? allImages 
        : allImages.filter(img => img.category === filter);

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Navbar />

            <section className="pt-40 pb-20 text-center px-4">
                <motion.h4 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-[#C8A966] text-[10px] uppercase tracking-[0.5em] mb-4 font-bold"
                >
                    Our Sanctuary
                </motion.h4>
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                    className="text-5xl md:text-7xl font-serif italic text-[#1a1a1a]"
                >
                    Rooms & Suites Gallery
                </motion.h1>
            </section>

            {/* Filters */}
            <div className="flex justify-center gap-8 mb-16 px-4 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`text-[11px] uppercase tracking-widest pb-2 transition-all ${
                            filter === cat ? 'border-b-2 border-[#C8A966] text-[#1a1a1a] font-bold' : 'text-gray-400 hover:text-black'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Image Grid */}
            <section className="px-8 md:px-16 pb-24">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((img) => (
                            <motion.div
                                key={img.id} // دابا الـ IDs مفرّقين، الـ Animation غتخدم مزيان
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="relative group overflow-hidden cursor-pointer h-[400px] bg-gray-200"
                            >
                                <img 
                                    src={img.src} 
                                    alt={img.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <span className="text-[#C8A966] text-[10px] uppercase tracking-widest mb-2">{img.category}</span>
                                    <h3 className="text-white text-2xl font-serif italic mb-6">{img.title}</h3>
                                    
                                    <Link 
                                        to={`/leave-review/${img.id}`}
                                        className="w-fit border border-white/30 text-white text-[9px] uppercase tracking-[0.2em] px-6 py-3 hover:bg-[#C8A966] hover:border-[#C8A966] transition-all duration-300"
                                    >
                                        Leave a Review
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
};

export default RoomsGallery;