import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HotelExperience = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <Navbar />
      
      {/* --- 1. Hero Section (تصويرة كبيرة الفوق) --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="/images/a4.webp" // تأكد من المسار أو استعمل رابط خارجي
            className="w-full h-full object-cover" 
            alt="Le Musée Hotel Exterior" 
          />
          {/* Layer كحل شفاف باش تبان الكتيبة */}
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[12px] tracking-[0.6em] uppercase mb-4 block font-sans"
          >
            Since 2012
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-6xl md:text-[9rem] font-serif italic font-light leading-none"
          >
            The Experience
          </motion.h1>
        </div>

        {/* سهم كيشير للهبوط لتحت */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto"></div>
        </motion.div>
      </section>

      {/* --- 2. About Content (التكملة ديال المعلومات) --- */}
      <section className="py-24 px-8 md:px-0">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-12 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <h2 className="text-[#C8A966] text-[11px] uppercase tracking-[0.5em] font-bold">Our Philosophy</h2>
              <p className="text-3xl md:text-5xl font-serif italic text-[#1a1a1a] leading-tight">
                "Where Moroccan hospitality meets modern artistic spirit."
              </p>
              
              <div className="w-20 h-[1px] bg-[#C8A966] mx-auto"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-left font-light text-gray-600 leading-relaxed text-lg">
                <p>
                  Located in the heart of Rabat’s business district, opposite the prestigious Mohammed VI Museum of Modern and Contemporary Art, Hotel le Musée has become a landmark for travelers seeking authenticity. Our prime location offers more than just convenience; it offers a front-row seat to the city's cultural revolution.
                </p>
                <p>
                  Whether you are here for business or leisure, our 24-hour reception, airport shuttles, and panoramic terrace are designed to make your stay seamless. Enjoy a varied breakfast buffet before exploring the city with our guided tours, and return to the comfort of our modern, air-conditioned rooms.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* سكشن إضافي ديال التصاور (Grid) باش يعمر الصفحة */}
      <section className="pb-24 px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
          <div className="md:col-span-2 overflow-hidden">
             <img src="/images/ch8.webp" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Room" />
          </div>
          <div className="overflow-hidden">
             <img src="/images/a4.webp" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Details" />
          </div>
        </div>
      </section>
{/* --- Section Localisation --- */}
<section className="py-24 px-8 md:px-16 bg-[#F3F1ED]">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-[#C8A966] text-[11px] uppercase tracking-[0.5em] font-bold mb-4">How to find us</h2>
      <p className="text-4xl font-serif italic text-[#1a1a1a]">Our Location in Rabat</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
      {/* معلومات العنوان على اليسار */}
      <div className="space-y-8 order-2 md:order-1">
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Address</h4>
          <p className="text-gray-600 font-light leading-relaxed">
            Rue Ben Ghazi, Hassan<br />
            10000 Rabat, Morocco
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest mb-2">Contact</h4>
          <p className="text-gray-600 font-light">+212 5 37 70 70 50</p>
          <p className="text-gray-600 font-light">contact@hotellemusee.com</p>
        </div>
        <a 
          href="https://www.google.com/maps/dir/?api=1&destination=Hotel+le+Musee+Rabat" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block border-b border-[#C8A966] text-[#C8A966] pb-1 text-sm uppercase tracking-widest hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all"
        >
          Get Directions
        </a>
      </div>

      {/* الخريطة (Iframe) فـ الوسط واليمين */}
      <div className="md:col-span-2 h-[450px] w-full rounded-sm overflow-hidden shadow-xl order-1 md:order-2">
        <iframe 
  title="Hotel le Musee Location"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3307.355620478164!2d-6.837336024285123!3d34.01804997316972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76986fffdc43d%3A0xab60c0642c7f8b50!2sHotel%20le%20Mus%C3%A9e!5e0!3m2!1sen!2sma!4v1713280000000!5m2!1sen!2sma" 
  width="100%" 
  height="100%" 
  style={{ border: 0 }} 
  allowFullScreen="" 
  loading="lazy" 
  referrerPolicy="no-referrer-when-downgrade"
></iframe>
      </div>
    </div>
  </div>
</section>
    </div>
    
  );
};

export default HotelExperience;