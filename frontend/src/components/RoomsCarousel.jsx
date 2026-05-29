    // import React, { useRef, } from 'react';
    // import { motion, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';

    // // L'data dyal tsawer (Sta3mel tsawer 7a9i9ya)
    // const rooms = [
    // "/images/ch1.jpg",
    // "/images/ch2.jpg",
    // "/images/ch3.jpg",
    // "/images/ch4.jpg",
    // "/images/ch5.jpg",
    // "/images/ch6.jpg",
    // "/images/ch7.jpg",
    // "/images/ch8.jpg",
    // "/images/ch9.jpg",
    // ];

    // // N-doublo l'data bach iji l'effe dyal la-tanhahi
    // const duplicatedRooms = [...rooms, ...rooms, ...rooms];

    // const RoomsCarousel = () => {
    // const ref = useRef(null);
    // const baseX = useMotionValue(0);

    // // useAnimationFrame: Hadchi hwa li kikhlli l'animation tkon sria3a o smooth b7al f'l'video games
    // useAnimationFrame((t, delta) => {
    //     // 1. Beddel l'sor3a hna (masala -50 aw -100)
    //     let moveBy = -40 * (delta / 1000); 

    //     baseX.set(baseX.get() + moveBy);

    //     // 2. Reset l'posistion mlli nwsslo l'akher l'Carousel bach iji continuous
    //     if (ref.current) {
    //     const containerWidth = ref.current.offsetWidth / 3; // Hit doublnah 3 d l'mrat
    //     if (baseX.get() <= -containerWidth) {
    //         baseX.set(0);
    //     }
    //     }
    // });

    // return (
    //     <section className="py-32 bg-[#0C1B17] text-white overflow-hidden">
        
    //     {/* 1. L'unwan: "Suites and Rooms" */}
    //     <div className="text-center mb-24 px-4">
    //         <motion.h2 
    //         initial={{ opacity: 0, y: 30 }}
    //         whileInView={{ opacity: 1, y: 0 }}
    //         viewport={{ once: true }}
    //         className="text-6xl md:text-8xl font-serif text-[#F3EFE9] mb-6"
    //         >
    //         Suites and Rooms
    //         </motion.h2>
    //         <p className="max-w-xl mx-auto text-sm text-[#F3EFE9]/70 font-light leading-relaxed">
    //         TheLorax, Riyadh, spans 64 acres of lush gardens with luxurious accommodations, fine dining, 
    //         and unmatched amenities.
    //         </p>
    //     </div>

    //     {/* 2. L'Carousel Track */}
    //     <div className="relative w-full">
    //         {/* Had l'container hwa li kyt7arek */}
    //         <motion.div 
    //         ref={ref}
    //         className="flex gap-4 md:gap-8 pr-8" // Fada2 bin tsawer
    //         style={{ x: baseX }} // Nrbto x b baseX dyal useAnimationFrame
    //         >
    //         {duplicatedRooms.map((src, index) => (
    //             <div 
    //             key={index}
    //             className={`flex-shrink-0 relative overflow-hidden group 
    //                         ${index % 2 === 0 ? 'w-[300px] h-[400px]' : 'w-[200px] h-[300px] mt-12'}`}
    //             // ^^^ L'asrar dyal height l'beddel dyal l'photo:
    //             // Index % 2 === 0: tsawer kbar
    //             // Index % 2 !== 0: tsawer sghar o nazlin chwiya
    //             >
    //             <img 
    //                 src={src} 
    //                 alt={`Room ${index}`} 
    //                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
    //             />
    //             </div>
    //         ))}
    //         </motion.div>
    //     </div>

    //     </section>
    // );
    // };

    // export default RoomsCarousel;

import React, { useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';

const rooms = [
  "/images/ch1.webp",
  "/images/ch2.webp",
  "/images/ch3.webp",
  "/images/ch4.webp",
  "/images/ch5.webp",
  "/images/ch6.webp",
  "/images/ch7.webp",
  "/images/ch8.webp",
  "/images/ch9.webp",
];

const duplicatedRooms = [...rooms, ...rooms, ...rooms];

const RoomsCarousel = () => {
  const ref = useRef(null);
  const baseX = useMotionValue(0);

  const isHovered = useRef(false);
  const isDragging = useRef(false); // 🔥 NEW

  // 🎯 Auto scroll
  useAnimationFrame((t, delta) => {
    // ❌ وقف ملي hover أو drag
    if (isHovered.current || isDragging.current) return;

    let moveBy = -40 * (delta / 1000); // نفس speed ديالك

    baseX.set(baseX.get() + moveBy);

    if (ref.current) {
      const width = ref.current.offsetWidth / 3;

      if (baseX.get() <= -width) {
        baseX.set(0);
      }
    }
  });

  return (
    <section className="py-32 bg-[#0C1B17] text-white overflow-hidden">

      {/* Title */}
      <div className="text-center mb-24 px-4">
        <h2 className="text-6xl md:text-8xl font-serif text-[#F3EFE9] mb-6">
          Suites and Rooms
        </h2>
        <p className="max-w-xl mx-auto text-sm text-[#F3EFE9]/70 font-light">
          Discover refined spaces designed for comfort and elegance.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={ref}
          className="flex gap-6 cursor-grab active:cursor-grabbing"
          style={{ x: baseX }}

          // 🟢 drag
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}

          // 🟢 pause on hover
          onMouseEnter={() => (isHovered.current = true)}
          onMouseLeave={() => (isHovered.current = false)}

          // 🟢 pause on drag (🔥 NEW)
          onDragStart={() => (isDragging.current = true)}
          onDragEnd={() => (isDragging.current = false)}
        >
          {duplicatedRooms.map((src, index) => (
            <div
              key={index}
              className={`flex-shrink-0 relative overflow-hidden group rounded-2xl shadow-xl
                ${index % 2 === 0 ? 'w-[300px] h-[400px]' : 'w-[220px] h-[300px] mt-12'}`}
            >
              <img
                src={src}
                alt="Room"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>

            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default RoomsCarousel;