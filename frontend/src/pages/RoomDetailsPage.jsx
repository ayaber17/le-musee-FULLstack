    import React from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { ArrowLeft, Maximize, Wifi, Users, Coffee, Shield } from 'lucide-react';

    const RoomDetailsPage = () => {
    const { id } = useParams(); // Bach n-3erfo chmen bit khtar l'user
    const navigate = useNavigate();

    // Hna khassk t-jib l'data (ghadi n-stakhdmo l'biout li 3endk f RoomsPage)
    // F l'mustaqbal hadchi kiy-ji men l'API
    const room = {
        id: id,
        name: id === "1" ? "Classic Heritage Room" : id === "2" ? "Luxury Museum Suite" : "Royal Family Suite",
        price: id === "1" ? 1200 : id === "2" ? 2500 : 3800,
        img: `/images/ch${id}.webp`,
        desc: "A timeless sanctuary blending Moroccan craftsmanship with modern minimalism. This room offers a unique experience where luxury meets comfort."
    };

    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-8">
            {/* Back Button */}
            <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black mb-12 transition-colors"
            >
            <ArrowLeft size={14} /> Back to Selection
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image Section */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <img src={room.img} alt={room.name} className="w-full aspect-square object-cover shadow-2xl" />
            </motion.div>

            {/* Details Section */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-[10px] tracking-[0.5em] uppercase text-[#C8A96A] font-bold">Details & Experience</span>
                <h1 className="text-5xl font-serif text-[#1a1a1a] mt-4 mb-6">{room.name}</h1>
                <p className="text-2xl font-serif mb-8 text-gray-800">MAD {room.price} <span className="text-sm font-sans text-gray-400">/ Night</span></p>
                
                <p className="text-gray-500 leading-relaxed mb-10 font-light italic">{room.desc}</p>

                {/* Amenities Grid */}
                <div className="grid grid-cols-2 gap-8 border-t border-black/5 pt-10 mb-12">
                <div className="flex items-center gap-4 text-gray-600">
                    <Maximize size={20} className="text-[#C8A96A]" />
                    <div><p className="text-[10px] uppercase tracking-widest text-gray-400">Space</p><p className="text-sm">45 m²</p></div>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                    <Wifi size={20} className="text-[#C8A96A]" />
                    <div><p className="text-[10px] uppercase tracking-widest text-gray-400">Connectivity</p><p className="text-sm">High Speed Wifi</p></div>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                    <Users size={20} className="text-[#C8A96A]" />
                    <div><p className="text-[10px] uppercase tracking-widest text-gray-400">Capacity</p><p className="text-sm">2 Adults</p></div>
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                    <Coffee size={20} className="text-[#C8A96A]" />
                    <div><p className="text-[10px] uppercase tracking-widest text-gray-400">Service</p><p className="text-sm">Breakfast Included</p></div>
                </div>
                </div>

<button 
  onClick={() => navigate(`/rooms?book=${room.id}`)}
  className="w-full bg-[#1a1a1a] text-white py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C8A96A] transition-all"
>
  Check Availability
</button>            </motion.div>
            </div>
        </div>
        </div>
    );
    };

    export default RoomDetailsPage;