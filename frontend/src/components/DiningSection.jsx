    // import React, { useState } from 'react';
    // import { motion, AnimatePresence } from 'framer-motion';

    // // 1. Data dyal tsawer dyal l'makla
    // const diningImages = [
    // "/images/res1.jpg",
    // "/images/res2.jpg",
    // "/images/res3.jpg",
    // "/images/res4.jpg",
    // "/images/res5.jpg",
    // ];

    // const DiningSection = () => {
    // const [currentIndex, setCurrentIndex] = useState(0);

    // // Function bash nbeddlo l'index
    // const handleNext = () => {
    //     setCurrentIndex((prev) => (prev + 1) % diningImages.length);
    // };

    // return (
    //     <section className="min-h-screen bg-[#F3EFE9] py-24 px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
    //     {/* Left Side: Ktaba */}
    //     <div className="space-y-8">
    //         <h2 className="text-6xl md:text-8xl font-serif text-[#7A2B3A] leading-tight">
    //         Elegance at <br /> the Heart <br /> of Dining
    //         </h2>
    //         <p className="text-sm tracking-widest uppercase opacity-60">
    //         Experience Arabian traditions, sharing joy with family and friends.
    //         </p>
            
    //         <button className="bg-[#1a1a1a] text-white px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-black transition-colors">
    //         Discover More →
    //         </button>

    //         {/* Custom Pagination: 1/6 NEXT > */}
    //         <div className="flex items-center gap-8 pt-12">
    //         <span className="text-sm font-light">{currentIndex + 1}/{diningImages.length}</span>
    //         <div className="w-32 h-[1px] bg-black/20 relative">
    //             <motion.div 
    //             className="absolute h-full bg-black"
    //             animate={{ width: `${((currentIndex + 1) / diningImages.length) * 100}%` }}
    //             />
    //         </div>
    //         <button 
    //             onClick={handleNext}
    //             className="text-sm tracking-[0.2em] uppercase font-bold hover:opacity-50 transition"
    //         >
    //             Next 
    //         </button>
    //         </div>
    //     </div>

    //     {/* Right Side: Tsawer (L'animation) */}
    //     <div className="relative h-[600px] w-full overflow-hidden shadow-2xl">
    //         <AnimatePresence mode="wait">
    //         <motion.img
    //             key={currentIndex} // Darori l'key i-kon hwa l'index bash Framer Motion i-fhem t-bedlat
    //             src={diningImages[currentIndex]}
    //             initial={{ x: 300, opacity: 0 }} // Kat-ji men l'imane
    //             animate={{ x: 0, opacity: 1 }}   // Kat-wssel l'blass-ha
    //             exit={{ x: -300, opacity: 0 }}    // Kat-khrej l'isser
    //             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    //             className="absolute inset-0 w-full h-full object-cover"
    //             alt="Dining Experience"
    //         />
    //         </AnimatePresence>
    //     </div>

    //     </section>
    // );
    // };

    // export default DiningSection;
    import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom'; 

// 📸 صور من public/images
const diningImages = [
  "/images/res1.webp",
  "/images/res2.webp",
  "/images/res3.webp",
  "/images/res4.webp",
  "/images/res5.webp",
];

const DiningSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🔁 Auto Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % diningImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 👉 Next button
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % diningImages.length);
  };

  return (
    <section className="min-h-screen bg-[#F3EFE9] py-24 px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

      {/* 📝 LEFT SIDE */}
      <div className="space-y-8">
        <h2 className="text-5xl md:text-7xl font-serif text-[#7A2B3A] leading-tight">
          Elegance at <br /> the Heart <br /> of Dining
        </h2>

        <p className="text-sm tracking-widest uppercase opacity-60">
          Experience refined gastronomy, where every dish tells a story of taste and tradition.
        </p>

        <Link 
  to="/restaurant" 
  className="inline-block bg-[#1a1a1a] text-white px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-black transition text-center"
>
  Discover More →
</Link>

        {/* 📊 Pagination */}
        <div className="flex items-center gap-8 pt-12">
          <span className="text-sm font-light">
            {currentIndex + 1}/{diningImages.length}
          </span>

          <div className="w-32 h-[2px] bg-black/20 relative rounded-full overflow-hidden">
            <motion.div
              className="absolute h-full bg-black"
              animate={{
                width: `${((currentIndex + 1) / diningImages.length) * 100}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <button
            onClick={handleNext}
            className="text-sm tracking-[0.2em] uppercase font-bold hover:opacity-50 transition"
          >
            Next
          </button>
        </div>
      </div>

      {/* 🖼️ RIGHT SIDE */}
      <div className="relative h-[600px] w-full overflow-hidden shadow-2xl rounded-3xl">

        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={diningImages[currentIndex]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Dining Experience"
          />
        </AnimatePresence>

        {/* overlay gradient (luxury touch) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

      </div>

    </section>
  );
};

export default DiningSection;