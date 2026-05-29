    import React from 'react';
    import { motion } from 'framer-motion';

    const places = [
    {
        title: "Hassan Tower",
        desc: "The iconic symbol of Rabat, standing tall as a masterpiece of Almohad architecture.",
        img:  "/images/a3.webp",
    },
    {
        title: "Oudayas Kasbah",
        desc: "Blue and white charming alleys overlooking the Atlantic Ocean with a peaceful vibe.",
        img: "/images/a2.webp",
    },
    {
        title: "Chellah",
        desc: "Ancient Roman and Islamic ruins surrounded by nature and timeless silence.",
        img: "/images/a1.webp",
    },
    {
        title: "Mohammed VI Museum ",
        desc: "The Mohammed VI Museum of Modern and Contemporary Art, abbreviated MMVI, is a contemporary and modern art museum in Rabat, Morocco which opened in 2014. It is one of fourteen museums of the National Foundation of Museums of Morocco. The museum curates modern and contemporary Moroccan and international art",
        img: "/images/a4.webp",
    },
    {
        title: "Grand theatre of Rabat",
        desc: "a large performing arts center in Rabat, the capital city of Morocco. The building is designed by Zaha Hadid and her architectural firm Zaha Hadid Architects",
        img: "/images/a5.png",
    },
    {
        title: "Mohammed VI Tower",
        desc: "The Mohammed VI Tower, located in Salé near Rabat, Morocco, is a 250-meter-high, 55-story skyscraper, making it one of the tallest buildings in Africa.",
        img: "/images/a7.png",
    },
    ];

    const DestinationSection = () => {
    return (
        <section className="bg-[#F8F6F2] py-32 px-6 md:px-24">

        <div className="max-w-7xl mx-auto">

            {/* Header */}
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-24 text-center"
            >
            <span className="text-[11px] tracking-[0.5em] uppercase text-black/40">
                Discover Morocco
            </span>

            <h2 className="text-5xl md:text-7xl font-serif mt-6 leading-tight text-[#2D2D2D]">
                The Soul of <span className="italic text-[#C8A96A]">Rabat</span>
            </h2>

            <p className="text-black/60 max-w-xl mx-auto mt-6 text-sm md:text-base leading-relaxed">
                Experience timeless beauty through historic landmarks, ocean views, and ancient stories.
            </p>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {places.map((place, i) => (
                <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                >

                {/* Image Card */}
                <div className="relative overflow-hidden aspect-[3/4] rounded-2xl shadow-lg">

                    <img
                    src={place.img}
                    alt={place.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>

                </div>

                {/* Text */}
                <div className="mt-6 px-2">

                    <h3 className="text-2xl font-serif mb-2 tracking-wide">
                    {place.title}
                    </h3>

                    <p className="text-sm text-black/60 leading-relaxed font-light">
                    {place.desc}
                    </p>

                    {/* underline animation */}
                    <div className="mt-5 h-[1px] bg-black/10 relative overflow-hidden">
                    <div className="absolute left-0 top-0 h-full w-0 bg-[#C8A96A] group-hover:w-full transition-all duration-500"></div>
                    </div>

                </div>

                </motion.div>
            ))}

            </div>
        </div>
        </section>
    );
    };

    export default DestinationSection;