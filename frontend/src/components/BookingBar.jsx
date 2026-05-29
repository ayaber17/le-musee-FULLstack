//     import React, { useEffect, useState } from 'react';
//     import { motion, AnimatePresence } from 'framer-motion';

//     const BookingBar = () => {
//     const [isBooking, setIsBooking] = useState(false);
//     const [roomTypes, setRoomTypes] = useState([]);
//     useEffect(() => {
//     // Fetch mn l-API dyal Laravel
//     fetch('/api/room-types')
//         .then(res => res.json())
//         .then(data => setRoomTypes(data.data));
// }, []);

// // F l-JSX:
// <select className="bg-transparent outline-none w-full font-bold">
//     {roomTypes.map(type => (
//         <option key={type.id} value={type.id}>{type.name}</option>
//     ))}
// </select>

//     return (
//         <div className="max-w-7xl mx-auto px-4">
//         <div className="bg-[#FDFBF7] shadow-2xl flex items-center min-h-[70px] relative overflow-hidden">
            
//             <AnimatePresence mode="wait">
//             {!isBooking ? (
//                 /* --- Halat 1: Simple Bar (Search/Menu) --- */
//                 <motion.div 
//                 key="simple"
//                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                 className="flex w-full items-center"
//                 >
//                 <button 
//                     onClick={() => setIsBooking(true)}
//                     className="bg-[#E9C496] text-black px-10 py-6 text-[11px] font-bold uppercase tracking-widest flex items-center gap-4 hover:bg-[#dec09a] transition-all"
//                 >
//                     Booking Now <span className="text-lg">→</span>
//                 </button>
                
//                 <div className="flex-1 px-10 flex items-center gap-4 text-black/40 border-r border-black/5">
//                     <span className="text-xl">🔍</span>
//                     <input type="text" placeholder="SEARCH" className="bg-transparent outline-none w-full text-xs tracking-widest" />
//                 </div>

//                 <button className="px-10 py-6 group">
//                     <div className="flex flex-col gap-1 w-8">
//                     <div className="h-[1px] bg-black w-full"></div>
//                     <div className="h-[1px] bg-black w-full"></div>
//                     <div className="h-[1px] bg-black w-3/4 self-end"></div>
//                     </div>
//                 </button>
//                 </motion.div>
//             ) : (
//                 /* --- Halat 2: Full Booking Engine Bar --- */
//                 <motion.div 
//                 key="engine"
//                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
//                 className="flex w-full items-center text-[10px] uppercase tracking-widest font-medium"
//                 >
//                 {/* Close Button */}
//                 <button onClick={() => setIsBooking(false)} className="px-6 text-xl font-thin hover:rotate-90 transition-transform">
//                     ✕
//                 </button>

//                 {/* Select Room */}
//                 <div className="flex-1 px-6 border-r border-black/5">
//                     <p className="text-black/30 mb-1">Select</p>
//                     <select className="bg-transparent outline-none w-full font-bold">
//                     <option>Deluxe Suite</option>
//                     <option>Royal Room</option>
//                     </select>
//                 </div>

//                 {/* Check-in */}
//                 <div className="flex-1 px-6 border-r border-black/5">
//                     <p className="text-black/30 mb-1">Check - In Date</p>
//                     <input type="text" defaultValue="27. JAN" className="bg-transparent outline-none font-bold w-full" />
//                 </div>

//                 {/* Check-out */}
//                 <div className="flex-1 px-6 border-r border-black/5">
//                     <p className="text-black/30 mb-1">Check - Out Date</p>
//                     <input type="text" defaultValue="28. JAN" className="bg-transparent outline-none font-bold w-full" />
//                 </div>

//                 {/* Guests (Adults & Children) */}
//                 <div className="flex-[1.5] px-6 flex gap-4">
//                     <div className="w-1/2">
//                     <p className="text-black/30 mb-1">Adults</p>
//                     <select className="bg-transparent outline-none font-bold w-full">
//                         {[1,2,3,4].map(n => <option key={n}>{n}</option>)}
//                     </select>
//                     </div>
//                     <div className="w-1/2">
//                     <p className="text-black/30 mb-1">Children</p>
//                     <select className="bg-transparent outline-none font-bold w-full">
//                         {[0,1,2,3].map(n => <option key={n}>{n}</option>)}
//                     </select>
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button className="bg-[#E9C496] text-black px-12 py-6 font-bold hover:bg-[#dec09a] transition-all">
//                     View Rooms & Prices →
//                 </button>
//                 </motion.div>
//             )}
//             </AnimatePresence>
//         </div>
//         </div>
//     );
//     };

//     export default BookingBar;
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';

// // 1. Config dyal Axios (Dir l-URL dyal l-backend dyalk)
// const api = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api', // Beddel had l-URL b dyal Laravel
//     headers: { 'Accept': 'application/json' }
// });

// const BookingBar = () => {
//     const [isBooking, setIsBooking] = useState(false);
//     const [roomTypes, setRoomTypes] = useState([]);
//     const [loading, setLoading] = useState(false);
    
//     const [formData, setFormData] = useState({
//         room_type_id: '',
//         date_debut: '',
//         date_fin: '',
//         adults: 1,
//         children: 0
//     });

//     // Fetch Room Types mn l-database (RoomType Model)
//     useEffect(() => {
//         const fetchTypes = async () => {
//     try {
//         const res = await axios.get('http://127.0.0.1:8000/api/room-types');
//         console.log("Data fetched:", res.data); // Chof wash t-affichat hna
//         setRoomTypes(res.data);
//     } catch (err) {
//         console.error("Mouchkil f fetching:", err.response); // Hna ghadi t-chouf l-detail dyal error
//     }
// };
//         fetchTypes();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSearch = async () => {
//         // Validation sghira
//         if (!formData.date_debut || !formData.date_fin) {
//             alert("Please select dates!");
//             return;
//         }

//         setLoading(true);
//         try {
//             // Hna kantsifto l-data l-backend bach n-checkiw availability
//             console.log("Searching for:", formData);
//             // Example navigation:
//             // window.location.href = `/rooms?type=${formData.room_type_id}&start=${formData.date_debut}&end=${formData.date_fin}`;
//         } catch (err) {
//             console.error("Search failed:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-7xl mx-auto px-4">
//             <div className="bg-[#FDFBF7] shadow-2xl flex items-center min-h-[70px] relative overflow-hidden">
//                 <AnimatePresence mode="wait">
//                     {!isBooking ? (
//                         <motion.div key="simple" className="flex w-full items-center" 
//                             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                             <button onClick={() => setIsBooking(true)} className="bg-[#E9C496] text-black px-10 py-6 text-[11px] font-bold uppercase tracking-widest hover:bg-[#dec09a] transition-all">
//                                 Booking Now <span className="ml-2">→</span>
//                             </button>
//                             <div className="flex-1 px-10 flex items-center gap-4 text-black/40 border-r border-black/5">
//                                 <span className="text-xl">🔍</span>
//                                 <input type="text" placeholder="SEARCH ROOMS..." className="bg-transparent outline-none w-full text-xs tracking-widest" />
//                             </div>
//                         </motion.div>
//                     ) : (
//                         <motion.div key="engine" className="flex w-full items-center text-[10px] uppercase tracking-widest font-medium"
//                             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            
//                             <button onClick={() => setIsBooking(false)} className="px-6 text-xl font-thin hover:rotate-90 transition-transform">✕</button>

//                             {/* Select Room Type */}
//                             <div className="flex-1 px-6 border-r border-black/5">
//                                 <p className="text-black/30 mb-1">Room Type</p>
//                                 <select 
//                                     name="room_type_id" 
//                                     value={formData.room_type_id} 
//                                     onChange={handleChange}
//                                     className="bg-transparent outline-none w-full font-bold cursor-pointer"
//                                 >
//                                     {roomTypes.length > 0 ? roomTypes.map(type => (
//                                         <option key={type.id} value={type.id}>{type.name}</option>
//                                     )) : <option>Loading...</option>}
//                                 </select>
//                             </div>

//                             {/* Dates */}
//                             <div className="flex-1 px-6 border-r border-black/5">
//                                 <p className="text-black/30 mb-1">Check - In</p>
//                                 <input type="date" name="date_debut" value={formData.date_debut} onChange={handleChange} className="bg-transparent outline-none font-bold w-full" />
//                             </div>

//                             <div className="flex-1 px-6 border-r border-black/5">
//                                 <p className="text-black/30 mb-1">Check - Out</p>
//                                 <input type="date" name="date_fin" value={formData.date_fin} onChange={handleChange} className="bg-transparent outline-none font-bold w-full" />
//                             </div>

//                             {/* Guests */}
//                             <div className="flex-[1.5] px-6 flex gap-4">
//                                 <div className="w-1/2">
//                                     <p className="text-black/30 mb-1">Adults</p>
//                                     <select name="adults" value={formData.adults} onChange={handleChange} className="bg-transparent outline-none font-bold w-full">
//                                         {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
//                                     </select>
//                                 </div>
//                                 <div className="w-1/2">
//                                     <p className="text-black/30 mb-1">Children</p>
//                                     <select name="children" value={formData.children} onChange={handleChange} className="bg-transparent outline-none font-bold w-full">
//                                         {[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
//                                     </select>
//                                 </div>
//                             </div>

//                             <button 
//                                 onClick={handleSearch}
//                                 disabled={loading}
//                                 className="bg-[#E9C496] text-black px-12 py-6 font-bold hover:bg-[#dec09a] transition-all disabled:bg-gray-300"
//                             >
//                                 {loading ? 'Checking...' : 'Check Availability →'}
//                             </button>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// };

// export default BookingBar;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BookingBar = () => {
    const navigate = useNavigate();
    const [isBooking, setIsBooking] = useState(false);
    const [loading, setLoading] = useState(false);
    
    // بيانات افتراضية لأنواع الغرف (بما أننا ما غنجيبوهمش من الـ DB دابا)
    const roomTypesStatic = [
        { id: 1, name: 'Standard Room' },
        { id: 2, name: 'Luxury Suite' },
        { id: 3, name: 'Family Room' },
        { id: 4, name: 'Presidential Suite' }
    ];

    const [formData, setFormData] = useState({
        room_type_id: '1',
        date_debut: '',
        date_fin: '',
        adults: 1,
        children: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        if (!formData.date_debut || !formData.date_fin) {
            alert("Please select check-in and check-out dates!");
            return;
        }

        setLoading(true);

        // جمع البيانات في الرابط (URL Query Params)
        const queryParams = new URLSearchParams({
            type: formData.room_type_id,
            checkin: formData.date_debut,
            checkout: formData.date_fin,
            adults: formData.adults,
            children: formData.children
        }).toString();

        // انتقال لصفحة الغرف بعد انيميشن خفيف
        setTimeout(() => {
            setLoading(false);
            navigate(`/rooms?${queryParams}`);
        }, 800);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="bg-[#FDFBF7] shadow-2xl flex items-center min-h-[80px] relative overflow-hidden rounded-sm">
                <AnimatePresence mode="wait">
                    {!isBooking ? (
                        /* الحالة 1: الزر الرئيسي */
                        <motion.div 
                            key="simple" 
                            className="flex w-full items-center"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        >
                            <button 
                                onClick={() => setIsBooking(true)} 
                                className="bg-[#E9C496] text-black px-12 py-8 text-[11px] font-bold uppercase tracking-widest hover:bg-[#dec09a] transition-all"
                            >
                                Booking Now <span className="ml-2">→</span>
                            </button>
                            <div className="flex-1 px-10 flex items-center gap-4 text-black/40 border-r border-black/5">
                                <span className="text-xl">🔍</span>
                                <input 
                                    type="text" 
                                    placeholder="SEARCH ROOMS..." 
                                    className="bg-transparent outline-none w-full text-xs tracking-widest uppercase" 
                                />
                            </div>
                        </motion.div>
                    ) : (
                        /* الحالة 2: محرك البحث (Form) */
                        <motion.div 
                            key="engine" 
                            className="flex w-full flex-wrap md:flex-nowrap items-center text-[10px] uppercase tracking-widest font-medium"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        >
                            {/* زر الإغلاق */}
                            <button 
                                onClick={() => setIsBooking(false)} 
                                className="px-6 text-xl font-thin hover:rotate-90 transition-transform"
                            >
                                ✕
                            </button>

                            {/* نوع الغرفة */}
                            <div className="flex-1 px-6 border-r border-black/5 py-4">
                                <p className="text-black/30 mb-1">Room Type</p>
                                <select 
                                    name="room_type_id" 
                                    value={formData.room_type_id} 
                                    onChange={handleChange}
                                    className="bg-transparent outline-none w-full font-bold cursor-pointer"
                                >
                                    {roomTypesStatic.map(type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* تاريخ الدخول */}
                            <div className="flex-1 px-6 border-r border-black/5 py-4">
                                <p className="text-black/30 mb-1">Check - In</p>
                                <input 
                                    type="date" 
                                    name="date_debut" 
                                    value={formData.date_debut} 
                                    onChange={handleChange} 
                                    className="bg-transparent outline-none font-bold w-full cursor-pointer" 
                                />
                            </div>

                            {/* تاريخ الخروج */}
                            <div className="flex-1 px-6 border-r border-black/5 py-4">
                                <p className="text-black/30 mb-1">Check - Out</p>
                                <input 
                                    type="date" 
                                    name="date_fin" 
                                    value={formData.date_fin} 
                                    onChange={handleChange} 
                                    className="bg-transparent outline-none font-bold w-full cursor-pointer" 
                                />
                            </div>

                            {/* عدد الأشخاص */}
                            <div className="flex-[1.2] px-6 flex gap-4 py-4 border-r border-black/5">
                                <div className="w-1/2">
                                    <p className="text-black/30 mb-1">Adults</p>
                                    <select name="adults" value={formData.adults} onChange={handleChange} className="bg-transparent outline-none font-bold w-full">
                                        {[1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                                <div className="w-1/2">
                                    <p className="text-black/30 mb-1">Children</p>
                                    <select name="children" value={formData.children} onChange={handleChange} className="bg-transparent outline-none font-bold w-full">
                                        {[0,1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* زر البحث */}
                            <button 
                                onClick={handleSearch}
                                disabled={loading}
                                className="bg-[#E9C496] text-black px-12 py-8 font-bold hover:bg-[#dec09a] transition-all disabled:bg-gray-300 min-w-[200px]"
                            >
                                {loading ? 'Checking...' : 'Check Availability →'}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default BookingBar;
