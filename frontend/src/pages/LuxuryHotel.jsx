// import React from 'react';
// import { motion } from 'framer-motion';
// import BookingBar from "../components/BookingBar";
// import AboutSection from "../components/AboutSection";
// import RoomsCarousel from "../components/RoomsCarousel";
// import DiningSection from "../components/DiningSection";
// import HotelDetails from "../components/HotelDetails";
// import FAQSection from "../components/FAQSection";
// import DestinationSection from "../components/DestinationSection";
// import ReviewsSection from "../components/ReviewsSection"; // <--- Zid hada
// import Footer from "../components/Footer"; // <--- Zid l'footer l'premium

// const LuxuryHotel = () => {
//   return (
//     <div className="min-h-screen bg-[#FDFBF7] text-[#2D2D2D] font-serif overflow-x-hidden">

//       {/* --- 1. Navbar & Hero (Paradise Vibe) --- */}
//       <nav className="flex justify-between items-center px-8 md:px-16 py-8 absolute top-0 w-full z-40 text-white">
//         <div className="text-xl font-bold tracking-[0.3em] uppercase"></div>
//         <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium">
//         </div>

//       </nav>

//       <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
//         <div className="absolute inset-0 z-0">
//           <img
//             src="https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1260"
//             className="w-full h-full object-cover"
//             alt="Hero"
//           />
//           <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
//         </div>
//         <motion.div 
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2 }}
//           className="relative z-10 text-center text-white px-4"
//         >
//           <span className="text-[12px] tracking-[0.5em] uppercase mb-4 block opacity-80">Welcome to paradise</span>
//           <h1 className="text-5xl md:text-[7rem] leading-[1.1] mb-8 font-light italic">Le <br /> Musée</h1>
//         </motion.div>
//       </section>

//       {/* --- 2. Booking Bar (With Adults/Children Logic) --- */}
//       <div className="relative z-50 -mt-12 px-4 md:px-0">
//         <BookingBar />
//       </div>

//       {/* --- 3. Riyadh Title --- */}
//       <div className="pt-32 pb-16 text-center">
//         <motion.h2 
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="text-4xl md:text-7xl font-light text-[#1a1a1a] tracking-tight"
//         >
//           In Rabat, <span className="italic font-serif">Maroc.</span>
//         </motion.h2>
//       </div>

//       {/* --- 4. About Section (Stacking Effect) --- */}
//       <AboutSection />

//       {/* --- 5. Rooms & Suites (Dark Green Carousel) --- */}
//       <RoomsCarousel />

//       {/* --- 6. Dining Experience (Interactive Slider) --- */}
//       <DiningSection />

//       {/* --- 7. Destination (Discover Rabat) --- */}
//       <DestinationSection />

//       {/* --- 8. Guest Reviews (Voices from Backend) --- */}
//       <ReviewsSection />

//       {/* --- 9. Hotel Details (Check-in/Out) --- */}
//       <HotelDetails />
      
//       {/* --- 10. FAQ Section (Bordeaux/Dark Red) --- */}
//       <FAQSection />

//       {/* --- 11. Final Footer (Newsletter & Contact) --- */}

//     </div>
//   );
// };

// export default LuxuryHotel;

import React from 'react';
import { motion } from 'framer-motion';

// استيراد المكونات (تأكد أن المسارات صحيحة في مشروعك)
import BookingBar from "../components/BookingBar";
import AboutSection from "../components/AboutSection";
import RoomsCarousel from "../components/RoomsCarousel";
import DiningSection from "../components/DiningSection";
import HotelDetails from "../components/HotelDetails";
import FAQSection from "../components/FAQSection";
import DestinationSection from "../components/DestinationSection";
import ReviewsSection from "../components/ReviewsSection"; 
import Footer from "../components/Footer"; 
import CouponPrompt from "../components/CouponPrompt"; // المكون اللي صاوبنا للـ Coupon

const LuxuryHotel = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2D2D] font-serif overflow-x-hidden">

      <CouponPrompt />

      {/* --- 1. Navbar & Hero (Paradise Vibe) --- */}
      <nav className="flex justify-between items-center px-8 md:px-16 py-8 absolute top-0 w-full z-40 text-white">
        <div className="text-xl font-bold tracking-[0.3em] uppercase">
          Le Musée
        </div>
        <div className="hidden md:flex gap-10 text-[11px] uppercase tracking-[0.2em] font-medium">
          <a href="#about" className="hover:text-[#C8A96A] transition-colors">L'Hôtel</a>
          <a href="#rooms" className="hover:text-[#C8A96A] transition-colors">Chambres</a>
          <a href="#dining" className="hover:text-[#C8A96A] transition-colors">Gastronomie</a>
          <a href="#contact" className="hover:text-[#C8A96A] transition-colors">Contact</a>
        </div>
      </nav>

      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/ch5.webp" 
            className="w-full h-full object-cover brightness-[0.7]"
            alt="Hotel Hero"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] mb-4 block font-sans">A Moroccan Paradise</span>
          <h1 className="text-5xl md:text-[7rem] leading-[1.1] mb-8 font-light italic">
            Le <br /> Musée
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-[1px] h-20 bg-white/30"></div>
            <span className="text-[10px] uppercase tracking-[0.3em]">Découvrir l'excellence</span>
          </motion.div>
        </motion.div>
      </section>

      {/* --- 2. Booking Bar (Section de réservation) --- */}
      <div className="relative z-50 -mt-12 px-4 md:px-0 max-w-6xl mx-auto">
        <BookingBar />
      </div>

      {/* --- 3. Welcome Title --- */}
      <div className="pt-32 pb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-light text-[#1a1a1a] tracking-tight"
        >
          In Rabat, <span className="italic font-serif">Maroc.</span>
        </motion.h2>
      </div>

      {/* --- 4. About Section (Stacking Effect) --- */}
      <section id="about">
        <AboutSection />
      </section>

      {/* --- 5. Rooms & Suites (Carousel) --- */}
      <section id="rooms">
        <RoomsCarousel />
      </section>

      {/* --- 6. Hotel Details & Luxury Stats --- */}
      <HotelDetails />

      {/* --- 7. Dining Experience --- */}
      <section id="dining">
        <DiningSection />
      </section>

      {/* --- 8. Destination (Rabat) --- */}
      <DestinationSection />

      {/* --- 9. Social Proof (Reviews) --- */}
      <ReviewsSection />

      {/* --- 10. Frequently Asked Questions --- */}
      <FAQSection />

      
    </div>
  );
};

export default LuxuryHotel;