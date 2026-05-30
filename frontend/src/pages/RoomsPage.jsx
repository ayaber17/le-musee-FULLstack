// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Maximize, Wifi, Users } from 'lucide-react';
// import axios from 'axios'; // تأكد بلي داير npm install axios
// import BookingModal from "../components/BookingModal";

// const RoomsPage = () => {
//     const [roomTypes, setRoomTypes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedRoom, setSelectedRoom] = useState(null);
//     const [modalOpen, setModalOpen] = useState(false);

//     const location = useLocation();
//     const navigate = useNavigate();
//     const searchParams = new URLSearchParams(location.search);
//     const selectedTypeFromQuery = searchParams.get('type');

//     // Mapping dyal tswera l-kola Room Type 3la 7ssab l-IDs li f database
//     const roomImages = {
//         1: "/images/ch1.webp", // Chambre Standard
//         2: "/images/ch2.webp", // Chambre Supérieure
//         3: "/images/ch3.webp", // Chambre Triple Standard
//         4: "/images/ch4.webp", // Chambre Triple Supérieure
//         5: "/images/ch5.webp", // Suite Junior
//         6: "/images/ch6.webp", // Suite Familiale
//     };

//     useEffect(() => {
//         const fetchRoomTypes = async () => {
//             try {
//                 // beddel had l-URL 3la 7ssab l-API dyalk
//                 const response = await axios.get('http://localhost:8000/api/room-types');
//                 setRoomTypes(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching room types:", error);
//                 setLoading(false);
//             }
//         };
//         fetchRoomTypes();
//     }, []);

//     const handleBookNow = (room) => {
//         setSelectedRoom(room);
//         setModalOpen(true);
//     };

//     const handleModalClose = () => {
//         setModalOpen(false);
//         setTimeout(() => setSelectedRoom(null), 400);
//     };

//     // Filter l-ghoraf ila kan l-user khtar type f-navbar maslan
//     const filteredRooms = selectedTypeFromQuery
//         ? roomTypes.filter(room => room.id.toString() === selectedTypeFromQuery)
//         : roomTypes;

//     if (loading) return <div className="text-center pt-40 font-serif">Loading our exquisite collection...</div>;

//     return (
//         <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">
//             {/* Header Section */}
//             <div className="max-w-7xl mx-auto px-8 mb-20 text-center">
//                 <motion.span
//                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//                     className="text-[10px] tracking-[0.5em] uppercase text-[#C8A96A] font-bold"
//                 >
//                     Exquisite Living
//                 </motion.span>
//                 <motion.h1
//                     initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
//                     className="text-5xl md:text-7xl font-serif text-[#1a1a1a] mt-4 mb-6"
//                 >
//                     Suites & Rooms
//                 </motion.h1>
//                 <div className="w-20 h-[1px] bg-[#C8A96A] mx-auto"></div>
//             </div>

//             {/* Rooms Grid */}
//             <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
//                 {filteredRooms.map((room, index) => (
//                     <motion.div
//                         key={room.id}
//                         initial={{ opacity: 0, y: 40 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.8, delay: index * 0.1 }}
//                         className="group"
//                     >
//                         {/* Image Wrapper */}
//                         <div className="relative overflow-hidden aspect-[16/10] mb-8 bg-[#e5e5e5]">
//                             <img
//                                 src={roomImages[room.id] || "/images/ch1.webp"}
//                                 alt={room.name}
//                                 className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
//                                 onError={e => { e.target.src = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80'; }}
//                             />
//                             {/* Price Badge */}
//                             <div className="absolute bottom-0 left-0 bg-white px-8 py-4 text-black shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform">
//                                 <p className="text-[10px] uppercase tracking-widest text-gray-400">Starting from</p>
//                                 <p className="text-xl font-serif">MAD {room.base_price}<span className="text-xs">/Night</span></p>
//                             </div>
//                         </div>

//                         {/* Content Section */}
//                         <div className="flex flex-col md:flex-row justify-between items-start gap-6">
//                             <div className="flex-1">
//                                 <h3 className="text-3xl font-serif text-[#1a1a1a] mb-3 group-hover:text-[#C8A96A] transition-colors duration-500">
//                                     {room.name}
//                                 </h3>
//                                 <p className="text-sm text-gray-500 leading-relaxed font-light mb-6 max-w-md italic">
//                                     {room.description}
//                                 </p>

//                                 {/* Room Amenities */}
//                                 <div className="flex gap-6 text-gray-400 mb-8">
//                                     <div className="flex items-center gap-2">
//                                         <Maximize size={16} />
//                                         <span className="text-[10px]">45 m²</span>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <Wifi size={16} />
//                                         <span className="text-[10px]">Free Wifi</span>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <Users size={16} />
//                                         <span className="text-[10px]">{room.capacity_adult} Guests</span>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Buttons */}
//                             <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
//                                 <button
//                                     onClick={() => handleBookNow(room)}
//                                     className="bg-[#1a1a1a] text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#C8A96A] transition-all duration-500"
//                                 >
//                                     Book Now
//                                 </button>
//                                 <button 
//                                     onClick={() => navigate(`/rooms/${room.id}`)}
//                                     className="border border-black/10 px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black hover:text-white transition-all duration-500"
//                                 >
//                                     Explore Details
//                                 </button>
//                             </div>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>

//             {/* Booking Modal Component */}
//             <BookingModal
//                 room={selectedRoom}
//                 isOpen={modalOpen}
//                 onClose={handleModalClose}
//             />
//         </div>
//     );
// };

// export default RoomsPage;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize, Wifi, Users, BedDouble, CalendarX, ChevronDown } from 'lucide-react';
import axios from 'axios';
import BookingModal from "../components/BookingModal";

// ─── Config ───────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL;

const roomImages = {
    1: "/images/ch1.webp",
    2: "/images/ch2.webp",
    3: "/images/ch3.webp",
    4: "/images/ch4.webp",
    5: "/images/ch5.webp",
    6: "/images/ch6.webp",
    7: "/images/ch7.webp",
    8: "/images/ch8.webp",
};

const fallbackImage = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const today = () => {
    const d = new Date();
    return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
};

const tomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
};

// ─── Component ────────────────────────────────────────────────────────────────
const RoomsPage = () => {
    const [roomTypes, setRoomTypes] = useState([]);
    const [availability, setAvailability] = useState({}); // { [roomTypeId]: { available: bool, nextRoom: obj|null } }
    const [loadingTypes, setLoadingTypes] = useState(true);
    const [loadingAvail, setLoadingAvail] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Date filter state
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [datesApplied, setDatesApplied] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const selectedTypeFromQuery = new URLSearchParams(location.search).get('type');

    // ── 1. Fetch room types ───────────────────────────────────────────────────
    useEffect(() => {
        axios.get(`${API_BASE}/room-types`)
            .then(({ data }) => setRoomTypes(data))
            .catch(console.error)
            .finally(() => setLoadingTypes(false));
    }, []);

    // ── 2. Check availability when dates change ───────────────────────────────
    // Backend endpoint attendu: GET /api/rooms/available?check_in=YYYY-MM-DD&check_out=YYYY-MM-DD
    // Retourne: [{ room_type_id, available_count, next_available_room: { id, num_room, ... } }]
    const checkAvailability = async (ci, co) => {
        if (!ci || !co) return;
        setLoadingAvail(true);
        try {
            const { data } = await axios.get(`${API_BASE}/rooms/available`, {
                params: { check_in: ci, check_out: co },
            });

            // Transform to map: { roomTypeId: { available, room } }
            const map = {};
            data.forEach(item => {
                map[item.room_type_id] = {
                    available: item.available_count > 0,
                    room: item.next_available_room ?? null,
                    count: item.available_count,
                };
            });
            setAvailability(map);
            setDatesApplied(true);
        } catch (err) {
            console.error('Availability check failed:', err);
        } finally {
            setLoadingAvail(false);
        }
    };

    const handleApplyDates = () => {
        if (checkIn && checkOut) checkAvailability(checkIn, checkOut);
    };

    const handleClearDates = () => {
        setCheckIn('');
        setCheckOut('');
        setAvailability({});
        setDatesApplied(false);
    };

    // ── 3. Book a room ────────────────────────────────────────────────────────
    const handleBookNow = (roomType) => {
        // إذا عندنا availability نستعملو الغرفة المتاحة، غير هذا نمررو الـ type
        const avail = availability[roomType.id];
        const roomToBook = avail?.room ?? { ...roomType, _typeOnly: true };
        setSelectedRoom({ ...roomToBook, type: roomType });
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setTimeout(() => setSelectedRoom(null), 400);
    };

    // ── 4. Filter ─────────────────────────────────────────────────────────────
    const filteredTypes = selectedTypeFromQuery
        ? roomTypes.filter(rt => rt.id.toString() === selectedTypeFromQuery)
        : roomTypes;

    // ── Render ────────────────────────────────────────────────────────────────
    if (loadingTypes) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
                <p className="font-serif text-2xl text-[#1a1a1a] animate-pulse">
                    Préparation de votre séjour…
                </p>
            </div>
        );
    }

    return (
        <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-20">

            {/* ── Header ── */}
            <div className="max-w-7xl mx-auto px-8 mb-16 text-center">
                <motion.span
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-[10px] tracking-[0.5em] uppercase text-[#C8A96A] font-bold"
                >
                    Exquisite Living
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-serif text-[#1a1a1a] mt-4 mb-6"
                >
                    Suites & Rooms
                </motion.h1>
                <div className="w-20 h-[1px] bg-[#C8A96A] mx-auto mb-12" />

                {/* ── Date Filter Bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white border border-black/8 px-6 py-4 shadow-sm"
                >
                    <div className="flex items-center gap-3">
                        <div className="text-left">
                            <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Arrivée</p>
                            <input
                                type="date"
                                min={today()}
                                value={checkIn}
                                onChange={e => { setCheckIn(e.target.value); setCheckOut(''); setDatesApplied(false); }}
                                className="text-sm text-[#1a1a1a] outline-none bg-transparent cursor-pointer"
                            />
                        </div>
                        <span className="text-gray-300 text-lg">→</span>
                        <div className="text-left">
                            <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Départ</p>
                            <input
                                type="date"
                                min={checkIn || tomorrow()}
                                disabled={!checkIn}
                                value={checkOut}
                                onChange={e => { setCheckOut(e.target.value); setDatesApplied(false); }}
                                className="text-sm text-[#1a1a1a] outline-none bg-transparent cursor-pointer disabled:opacity-40"
                            />
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleApplyDates}
                            disabled={!checkIn || !checkOut || loadingAvail}
                            className="bg-[#1a1a1a] text-white px-5 py-2.5 text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-[#C8A96A] hover:text-[#1a1a1a] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            {loadingAvail ? 'Vérification…' : 'Vérifier'}
                        </button>
                        {datesApplied && (
                            <button
                                onClick={handleClearDates}
                                className="border border-black/10 px-4 py-2.5 text-[9px] uppercase tracking-widest text-gray-400 hover:text-[#1a1a1a] transition-colors"
                            >
                                Effacer
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Availability summary */}
                {datesApplied && (
                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-xs text-gray-400 mt-4"
                    >
                        {Object.values(availability).filter(a => a.available).length} type(s) disponible(s) pour vos dates
                    </motion.p>
                )}
            </div>

            {/* ── Rooms Grid ── */}
            <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
                {filteredTypes.map((roomType, index) => {
                    const avail = availability[roomType.id];
                    const isUnavailable = datesApplied && avail && !avail.available;
                    const isAvailable = datesApplied && avail && avail.available;

                    return (
                        <motion.div
                            key={roomType.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`group relative ${isUnavailable ? 'opacity-60' : ''}`}
                        >
                            {/* ── Image ── */}
                            <div className="relative overflow-hidden aspect-[16/10] mb-8 bg-[#e5e5e5]">
                                <img
                                    src={roomImages[roomType.id] || fallbackImage}
                                    alt={roomType.name}
                                    className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${!isUnavailable ? 'group-hover:scale-105' : ''}`}
                                    onError={e => { e.target.src = fallbackImage; }}
                                />

                                {/* Unavailable overlay */}
                                {isUnavailable && (
                                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-2">
                                        <CalendarX size={28} className="text-white/80" />
                                        <p className="text-white text-xs uppercase tracking-widest font-bold">
                                            Complet pour ces dates
                                        </p>
                                    </div>
                                )}

                                {/* Available badge */}
                                {isAvailable && (
                                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1.5 text-[9px] uppercase tracking-widest font-bold">
                                        {avail.count} chambre{avail.count > 1 ? 's' : ''} disponible{avail.count > 1 ? 's' : ''}
                                    </div>
                                )}

                                {/* Price Badge */}
                                <div className="absolute bottom-0 left-0 bg-white px-8 py-4 text-black shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform">
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400">À partir de</p>
                                    <p className="text-xl font-serif">
                                        MAD {roomType.base_price}
                                        <span className="text-xs text-gray-400">/Nuit</span>
                                    </p>
                                </div>
                            </div>

                            {/* ── Content ── */}
                            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                                <div className="flex-1">
                                    <h3 className="text-3xl font-serif text-[#1a1a1a] mb-3 group-hover:text-[#C8A96A] transition-colors duration-500">
                                        {roomType.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed font-light mb-6 max-w-md italic">
                                        {roomType.description}
                                    </p>

                                    {/* Amenities */}
                                    <div className="flex gap-6 text-gray-400 mb-8">
                                        <div className="flex items-center gap-2">
                                            <BedDouble size={16} />
                                            <span className="text-[10px]">{roomType.bed_number} lit{roomType.bed_number > 1 ? 's' : ''}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Wifi size={16} />
                                            <span className="text-[10px]">Wifi Gratuit</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users size={16} />
                                            <span className="text-[10px]">
                                                {roomType.capacity_adult} adulte{roomType.capacity_adult > 1 ? 's' : ''}
                                                {roomType.capacity_children > 0 && ` · ${roomType.capacity_children} enfant${roomType.capacity_children > 1 ? 's' : ''}`}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* ── Buttons ── */}
                                <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
                                    {isUnavailable ? (
                                        // غرفة مكتملة — زر disabled مع رسالة
                                        <div className="text-center">
                                            <button
                                                disabled
                                                className="w-full bg-gray-200 text-gray-400 px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold cursor-not-allowed"
                                            >
                                                Non disponible
                                            </button>
                                            <p className="text-[9px] text-gray-400 mt-2 tracking-wide">
                                                Aucune chambre libre pour ces dates
                                            </p>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleBookNow(roomType)}
                                            className="bg-[#1a1a1a] text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#C8A96A] hover:text-[#1a1a1a] transition-all duration-500"
                                        >
                                            {isAvailable ? 'Réserver' : 'Réserver'}
                                        </button>
                                    )}
                                    <button
                                        onClick={() => navigate(`/rooms/${roomType.id}`)}
                                        className="border border-black/10 px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black hover:text-white transition-all duration-500"
                                    >
                                        Voir les détails
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ── Booking Modal ── */}
            <BookingModal
                room={selectedRoom}
                isOpen={modalOpen}
                onClose={handleModalClose}
                defaultCheckIn={checkIn}
                defaultCheckOut={checkOut}
            />
        </div>
    );
};

export default RoomsPage;