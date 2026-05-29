// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { X, Tag, Loader2, CheckCircle2, AlertCircle, BedDouble, Calendar, Moon } from 'lucide-react';
// // import api from '../api';

// // // ─── useBooking Hook ──────────────────────────────────────────────────────────
// // export function useBooking() {
// //     const [state, setState] = useState({
// //         loading: false,
// //         error: null,
// //         booking: null,
// //         success: false,
// //     });

// //     const createBooking = async ({ room_id, date_debut, date_fin, coupon_code }) => {
// //         setState({ loading: true, error: null, booking: null, success: false });
// //         try {
// //             const { data } = await api.post('/bookings', {
// //                 room_id,
// //                 date_debut,
// //                 date_fin,
// //                 coupon_code: coupon_code || null,
// //             });
// //             setState({ loading: false, error: null, booking: data.booking, success: true });
// //         } catch (err) {
// //             const errorMessage =
// //                 err.response?.data?.message ||
// //                 err.response?.data?.error ||
// //                 'Something went wrong. Please try again.';
// //             setState({ loading: false, error: errorMessage, booking: null, success: false });
// //             throw err;
// //         }
// //     };

// //     const reset = () =>
// //         setState({ loading: false, error: null, booking: null, success: false });

// //     return { ...state, createBooking, reset };
// // }

// // // ─── Helpers ──────────────────────────────────────────────────────────────────
// // const formatDate = (str) => {
// //     if (!str) return '—';
// //     return new Date(str).toLocaleDateString('fr-MA', {
// //         day: '2-digit',
// //         month: 'short',
// //         year: 'numeric',
// //     });
// // };

// // // ─── Step Indicator ───────────────────────────────────────────────────────────
// // const StepIndicator = ({ step }) => (
// //     <div className="flex items-center gap-2 mb-8">
// //         {[1, 2, 3].map((s) => (
// //             <React.Fragment key={s}>
// //                 <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
// //                     step === s
// //                         ? 'bg-[#1a1a1a] text-white scale-110'
// //                         : step > s
// //                         ? 'bg-[#C8A96A] text-white'
// //                         : 'bg-black/10 text-gray-400'
// //                 }`}>
// //                     {step > s ? '✓' : s}
// //                 </div>
// //                 {s < 3 && (
// //                     <div className={`flex-1 h-px transition-all duration-300 ${
// //                         step > s ? 'bg-[#C8A96A]' : 'bg-black/10'
// //                     }`} />
// //                 )}
// //             </React.Fragment>
// //         ))}
// //     </div>
// // );

// // // ─── Component ────────────────────────────────────────────────────────────────
// // export default function BookingModal({ isOpen, onClose, room }) {
// //     const { createBooking, loading, error, booking, reset } = useBooking();
// //     const [step, setStep]   = useState(1);
// //     const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
// //     const [coupon, setCoupon] = useState('');

// //     const today = new Date().toISOString().split('T')[0];

// //     // Reset on close
// //     useEffect(() => {
// //         if (!isOpen) {
// //             setTimeout(() => {
// //                 setStep(1);
// //                 setDates({ checkIn: '', checkOut: '' });
// //                 setCoupon('');
// //                 reset();
// //             }, 300);
// //         }
// //     }, [isOpen]);

// //     // Calculations
// //     const nights = dates.checkIn && dates.checkOut
// //         ? Math.max(0, Math.round(
// //             (new Date(dates.checkOut) - new Date(dates.checkIn)) / (1000 * 60 * 60 * 24)
// //         ))
// //         : 0;

// //     // Use room.type.base_price if available, fallback to room.price
// //     const pricePerNight = room?.type?.base_price ?? room?.price ?? 0;
// //     const estimatedTotal = nights * pricePerNight;

// //     const handleConfirm = async () => {
// //         try {
// //             await createBooking({
// //                 room_id:      room.id,
// //                 date_debut:   dates.checkIn,
// //                 date_fin:     dates.checkOut,
// //                 coupon_code:  coupon || null,
// //             });
// //             setStep(3);
// //         } catch {
// //             // error is handled inside the hook and shown in UI
// //         }
// //     };

// //     const canProceed = dates.checkIn && dates.checkOut && nights > 0;

// //     return (
// //         <AnimatePresence>
// //             {isOpen && (
// //                 <>
// //                     {/* Backdrop */}
// //                     <motion.div
// //                         initial={{ opacity: 0 }}
// //                         animate={{ opacity: 1 }}
// //                         exit={{ opacity: 0 }}
// //                         onClick={onClose}
// //                         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
// //                     />

// //                     {/* Panel */}
// //                     <motion.div
// //                         initial={{ x: '100%' }}
// //                         animate={{ x: 0 }}
// //                         exit={{ x: '100%' }}
// //                         transition={{ type: 'spring', damping: 28, stiffness: 220 }}
// //                         className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FDFBF7] z-[1000] shadow-2xl flex flex-col"
// //                     >
// //                         {/* ── Header ── */}
// //                         <div className="px-8 py-6 flex justify-between items-start border-b border-black/5">
// //                             <div>
// //                                 <p className="text-[9px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold mb-1">
// //                                     Le Musée — Réservation
// //                                 </p>
// //                                 <h2 className="text-2xl font-serif italic text-[#1a1a1a] leading-tight">
// //                                     {room?.num_room ? `Chambre ${room.num_room}` : room?.name ?? 'Chambre'}
// //                                 </h2>
// //                                 {room?.type?.name && (
// //                                     <p className="text-xs text-gray-400 mt-0.5">{room.type.name}</p>
// //                                 )}
// //                             </div>
// //                             <button
// //                                 onClick={onClose}
// //                                 className="p-2 hover:bg-black/5 rounded-full transition-colors mt-1"
// //                             >
// //                                 <X size={18} />
// //                             </button>
// //                         </div>

// //                         {/* ── Content ── */}
// //                         <div className="flex-1 overflow-y-auto px-8 py-6">
// //                             <StepIndicator step={step} />

// //                             <AnimatePresence mode="wait">

// //                                 {/* ─ Step 1: Dates & Coupon ─ */}
// //                                 {step === 1 && (
// //                                     <motion.div
// //                                         key="step1"
// //                                         initial={{ opacity: 0, y: 10 }}
// //                                         animate={{ opacity: 1, y: 0 }}
// //                                         exit={{ opacity: 0, y: -10 }}
// //                                         transition={{ duration: 0.2 }}
// //                                     >
// //                                         <div className="space-y-5">
// //                                             {/* Date inputs */}
// //                                             <div className="grid grid-cols-2 gap-3">
// //                                                 <div className="space-y-1.5">
// //                                                     <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 flex items-center gap-1.5">
// //                                                         <Calendar size={11} /> Check In
// //                                                     </label>
// //                                                     <input
// //                                                         type="date"
// //                                                         min={today}
// //                                                         value={dates.checkIn}
// //                                                         onChange={(e) =>
// //                                                             setDates({ checkIn: e.target.value, checkOut: '' })
// //                                                         }
// //                                                         className="w-full bg-white border border-black/8 p-3 text-sm focus:border-[#C8A96A] outline-none transition-colors rounded-sm"
// //                                                     />
// //                                                 </div>
// //                                                 <div className="space-y-1.5">
// //                                                     <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 flex items-center gap-1.5">
// //                                                         <Calendar size={11} /> Check Out
// //                                                     </label>
// //                                                     <input
// //                                                         type="date"
// //                                                         min={dates.checkIn || today}
// //                                                         disabled={!dates.checkIn}
// //                                                         value={dates.checkOut}
// //                                                         onChange={(e) =>
// //                                                             setDates({ ...dates, checkOut: e.target.value })
// //                                                         }
// //                                                         className="w-full bg-white border border-black/8 p-3 text-sm focus:border-[#C8A96A] outline-none transition-colors rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
// //                                                     />
// //                                                 </div>
// //                                             </div>

// //                                             {/* Nights badge */}
// //                                             {nights > 0 && (
// //                                                 <div className="flex items-center gap-2 text-xs text-gray-500">
// //                                                     <Moon size={12} className="text-[#C8A96A]" />
// //                                                     <span>
// //                                                         <strong className="text-[#1a1a1a]">{nights}</strong>{' '}
// //                                                         nuit{nights > 1 ? 's' : ''}
// //                                                     </span>
// //                                                 </div>
// //                                             )}

// //                                             {/* Coupon */}
// //                                             <div className="space-y-1.5">
// //                                                 <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 flex items-center gap-1.5">
// //                                                     <Tag size={11} /> Code Promo (optionnel)
// //                                                 </label>
// //                                                 <input
// //                                                     type="text"
// //                                                     placeholder="MUSEUM2024"
// //                                                     value={coupon}
// //                                                     onChange={(e) => setCoupon(e.target.value.toUpperCase())}
// //                                                     className="w-full bg-white border border-black/8 p-3 text-sm focus:border-[#C8A96A] outline-none transition-colors rounded-sm uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal"
// //                                                 />
// //                                             </div>

// //                                             {/* Price estimate */}
// //                                             {estimatedTotal > 0 && (
// //                                                 <div className="bg-black/[0.03] border border-black/5 p-5 space-y-2.5">
// //                                                     <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
// //                                                         <span>Prix / nuit</span>
// //                                                         <span>MAD {pricePerNight.toLocaleString()}</span>
// //                                                     </div>
// //                                                     <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
// //                                                         <span>Durée</span>
// //                                                         <span>{nights} nuit{nights > 1 ? 's' : ''}</span>
// //                                                     </div>
// //                                                     <div className="border-t border-black/5 pt-2.5 flex justify-between">
// //                                                         <span className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">
// //                                                             Total estimé
// //                                                         </span>
// //                                                         <span className="font-serif text-lg text-[#C8A96A]">
// //                                                             MAD {estimatedTotal.toLocaleString()}
// //                                                         </span>
// //                                                     </div>
// //                                                 </div>
// //                                             )}

// //                                             <button
// //                                                 disabled={!canProceed}
// //                                                 onClick={() => setStep(2)}
// //                                                 className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C8A96A] hover:text-[#1a1a1a] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
// //                                             >
// //                                                 Vérifier les détails
// //                                             </button>
// //                                         </div>
// //                                     </motion.div>
// //                                 )}

// //                                 {/* ─ Step 2: Confirm ─ */}
// //                                 {step === 2 && (
// //                                     <motion.div
// //                                         key="step2"
// //                                         initial={{ opacity: 0, x: 20 }}
// //                                         animate={{ opacity: 1, x: 0 }}
// //                                         exit={{ opacity: 0, x: -20 }}
// //                                         transition={{ duration: 0.2 }}
// //                                     >
// //                                         <div className="space-y-6">
// //                                             {/* Summary card */}
// //                                             <div className="bg-white border border-black/5 divide-y divide-black/5">
// //                                                 <div className="px-5 py-3 flex items-center gap-3">
// //                                                     <BedDouble size={15} className="text-[#C8A96A]" />
// //                                                     <div>
// //                                                         <p className="text-[9px] uppercase tracking-widest text-gray-400">Chambre</p>
// //                                                         <p className="text-sm font-bold text-[#1a1a1a]">
// //                                                             {room?.num_room ? `N° ${room.num_room}` : room?.name}
// //                                                             {room?.type?.name && (
// //                                                                 <span className="font-normal text-gray-400 ml-1.5">
// //                                                                     — {room.type.name}
// //                                                                 </span>
// //                                                             )}
// //                                                         </p>
// //                                                     </div>
// //                                                 </div>
// //                                                 {[
// //                                                     { label: 'Arrivée',   value: formatDate(dates.checkIn) },
// //                                                     { label: 'Départ',    value: formatDate(dates.checkOut) },
// //                                                     { label: 'Nuits',     value: `${nights} nuit${nights > 1 ? 's' : ''}` },
// //                                                     { label: 'Prix / nuit', value: `MAD ${pricePerNight.toLocaleString()}` },
// //                                                     ...(coupon ? [{ label: 'Code promo', value: coupon, highlight: true }] : []),
// //                                                 ].map(({ label, value, highlight }) => (
// //                                                     <div key={label} className="px-5 py-3 flex justify-between items-center">
// //                                                         <span className="text-[10px] uppercase tracking-widest text-gray-400">{label}</span>
// //                                                         <span className={`text-sm font-medium ${highlight ? 'text-green-600' : 'text-[#1a1a1a]'}`}>
// //                                                             {value}
// //                                                         </span>
// //                                                     </div>
// //                                                 ))}
// //                                                 <div className="px-5 py-4 flex justify-between items-center bg-black/[0.02]">
// //                                                     <span className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">
// //                                                         Total estimé
// //                                                     </span>
// //                                                     <span className="font-serif text-xl text-[#C8A96A]">
// //                                                         MAD {estimatedTotal.toLocaleString()}
// //                                                     </span>
// //                                                 </div>
// //                                             </div>

// //                                             {/* Error */}
// //                                             {error && (
// //                                                 <motion.div
// //                                                     initial={{ opacity: 0, y: -5 }}
// //                                                     animate={{ opacity: 1, y: 0 }}
// //                                                     className="p-4 bg-red-50 border border-red-100 flex gap-2.5 text-red-600 items-start"
// //                                                 >
// //                                                     <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
// //                                                     <p className="text-xs leading-relaxed">{error}</p>
// //                                                 </motion.div>
// //                                             )}

// //                                             {/* Actions */}
// //                                             <div className="space-y-2">
// //                                                 <button
// //                                                     onClick={handleConfirm}
// //                                                     disabled={loading}
// //                                                     className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C8A96A] hover:text-[#1a1a1a] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
// //                                                 >
// //                                                     {loading
// //                                                         ? <><Loader2 className="animate-spin" size={14} /> Traitement…</>
// //                                                         : 'Confirmer la réservation'
// //                                                     }
// //                                                 </button>
// //                                                 <button
// //                                                     onClick={() => setStep(1)}
// //                                                     disabled={loading}
// //                                                     className="w-full text-[9px] uppercase tracking-widest text-gray-400 hover:text-[#1a1a1a] py-2 transition-colors disabled:opacity-40"
// //                                                 >
// //                                                     ← Retour
// //                                                 </button>
// //                                             </div>
// //                                         </div>
// //                                     </motion.div>
// //                                 )}

// //                                 {/* ─ Step 3: Success ─ */}
// //                                 {step === 3 && (
// //                                     <motion.div
// //                                         key="step3"
// //                                         initial={{ scale: 0.9, opacity: 0 }}
// //                                         animate={{ scale: 1, opacity: 1 }}
// //                                         transition={{ duration: 0.3 }}
// //                                         className="text-center py-10"
// //                                     >
// //                                         <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
// //                                             <CheckCircle2 className="text-green-600" size={32} />
// //                                         </div>
// //                                         <h3 className="text-3xl font-serif italic text-[#1a1a1a] mb-3">
// //                                             Confirmé !
// //                                         </h3>
// //                                         <p className="text-gray-400 text-sm mb-1">
// //                                             Votre séjour au Musée a été réservé.
// //                                         </p>
// //                                         <p className="text-[10px] text-gray-300 uppercase tracking-widest mb-8">
// //                                             {formatDate(dates.checkIn)} → {formatDate(dates.checkOut)}
// //                                         </p>

// //                                         {/* Total charged */}
// //                                         <div className="bg-white border border-black/5 p-5 mb-6">
// //                                             <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">
// //                                                 Montant total
// //                                             </p>
// //                                             <p className="font-serif text-2xl text-[#C8A96A]">
// //                                                 MAD {(booking?.prix_total ?? estimatedTotal).toLocaleString()}
// //                                             </p>
// //                                             {booking?.id && (
// //                                                 <p className="text-[9px] text-gray-300 mt-1">
// //                                                     Réservation #{booking.id}
// //                                                 </p>
// //                                             )}
// //                                         </div>

// //                                         <button
// //                                             onClick={onClose}
// //                                             className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C8A96A] hover:text-[#1a1a1a] transition-all duration-300"
// //                                         >
// //                                             Fermer
// //                                         </button>
// //                                     </motion.div>
// //                                 )}

// //                             </AnimatePresence>
// //                         </div>
// //                     </motion.div>
// //                 </>
// //             )}
// //         </AnimatePresence>
// //     );
// // }


// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Tag, Loader2, CheckCircle2, AlertCircle, BedDouble, Calendar, Moon } from 'lucide-react';
// import api from '../api';

// // ─── useBooking Hook ──────────────────────────────────────────────────────────
// export function useBooking() {
//     const [state, setState] = useState({
//         loading: false,
//         error: null,
//         booking: null,
//         success: false,
//     });

//     const createBooking = async ({ room_id, date_debut, date_fin, coupon_code }) => {
//         setState({ loading: true, error: null, booking: null, success: false });
//         try {
//             const { data } = await api.post('/bookings', {
//                 room_id,
//                 date_debut,
//                 date_fin,
//                 // FIX 1: Don't send coupon_code key at all if empty — backend
//                 // validation may reject an explicit null on a required-if field.
//                 ...(coupon_code ? { coupon_code } : {}),
//             });
//             setState({ loading: false, error: null, booking: data.booking, success: true });
//         } catch (err) {
//             // FIX 2: Also handle Laravel validation errors (422) which return
//             // err.response.data.errors — an object of field → [messages].
//             const laravelErrors = err.response?.data?.errors;
//             const errorMessage = laravelErrors
//                 ? Object.values(laravelErrors).flat().join(' ')
//                 : err.response?.data?.message ||
//                   err.response?.data?.error ||
//                   'Something went wrong. Please try again.';
//             setState({ loading: false, error: errorMessage, booking: null, success: false });
//             throw err;
//         }
//     };

//     const reset = () =>
//         setState({ loading: false, error: null, booking: null, success: false });

//     return { ...state, createBooking, reset };
// }

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const formatDate = (str) => {
//     if (!str) return '—';
//     return new Date(str).toLocaleDateString('fr-MA', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//     });
// };

// // ─── Step Indicator ───────────────────────────────────────────────────────────
// const StepIndicator = ({ step }) => (
//     <div className="flex items-center gap-2 mb-8">
//         {[1, 2, 3].map((s) => (
//             <React.Fragment key={s}>
//                 <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
//                     step === s
//                         ? 'bg-[#1a1a1a] text-white scale-110'
//                         : step > s
//                         ? 'bg-[#C8A96A] text-white'
//                         : 'bg-black/10 text-gray-400'
//                 }`}>
//                     {step > s ? '✓' : s}
//                 </div>
//                 {s < 3 && (
//                     <div className={`flex-1 h-px transition-all duration-300 ${
//                         step > s ? 'bg-[#C8A96A]' : 'bg-black/10'
//                     }`} />
//                 )}
//             </React.Fragment>
//         ))}
//     </div>
// );

// // ─── Component ────────────────────────────────────────────────────────────────
// export default function BookingModal({ isOpen, onClose, room }) {
//     const { createBooking, loading, error, booking, reset } = useBooking();
//     const [step, setStep]     = useState(1);
//     const [dates, setDates]   = useState({ checkIn: '', checkOut: '' });
//     const [coupon, setCoupon] = useState('');

//     // FIX 3: today must use local date, not UTC — toISOString() can return
//     // yesterday's date for users in UTC+ timezones (e.g. Morocco UTC+1).
//     const today = (() => {
//         const d = new Date();
//         return [
//             d.getFullYear(),
//             String(d.getMonth() + 1).padStart(2, '0'),
//             String(d.getDate()).padStart(2, '0'),
//         ].join('-');
//     })();

//     // FIX 4: reset() is created fresh every render — include it in useCallback
//     // or just call the individual setters to avoid the stale-closure warning
//     // and an infinite loop if reset() ever changes.
//     const handleReset = useCallback(() => {
//         setStep(1);
//         setDates({ checkIn: '', checkOut: '' });
//         setCoupon('');
//         reset();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     useEffect(() => {
//         if (!isOpen) {
//             const t = setTimeout(handleReset, 300);
//             return () => clearTimeout(t);
//         }
//     }, [isOpen, handleReset]);

//     // Calculations
//     const nights = dates.checkIn && dates.checkOut
//         ? Math.max(0, Math.round(
//             (new Date(dates.checkOut) - new Date(dates.checkIn)) / (1000 * 60 * 60 * 24)
//         ))
//         : 0;

// const pricePerNight = Number(room?.base_price || room?.price || 0);
// const estimatedTotal = nights * pricePerNight;
//     const handleConfirm = async () => {
//         try {
//             await createBooking({
//                 room_id:     room.id,
//                 date_debut:  dates.checkIn,
//                 date_fin:    dates.checkOut,
//                 coupon_code: coupon || null,
//             });
//             setStep(3);
//         } catch {
//             // error already set inside the hook — stays on step 2 to show it
//         }
//     };

//     // FIX 5: also validate that checkOut is strictly after checkIn (nights > 0
//     // already covers this, but be explicit so same-day is blocked too).
//     const canProceed = dates.checkIn && dates.checkOut && nights > 0;

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <>
//                     {/* Backdrop */}
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         onClick={onClose}
//                         className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
//                     />

//                     {/* Panel */}
//                     <motion.div
//                         initial={{ x: '100%' }}
//                         animate={{ x: 0 }}
//                         exit={{ x: '100%' }}
//                         transition={{ type: 'spring', damping: 28, stiffness: 220 }}
//                         className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FDFBF7] z-[1000] shadow-2xl flex flex-col"
//                     >
//                         {/* ── Header ── */}
//                         <div className="px-8 py-6 flex justify-between items-start border-b border-black/5">
//                             <div>
//                                 <p className="text-[9px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold mb-1">
//                                     Le Musée — Réservation
//                                 </p>
//                                 <h2 className="text-2xl font-serif italic text-[#1a1a1a] leading-tight">
//                                     {room?.num_room ? `Chambre ${room.num_room}` : room?.name ?? 'Chambre'}
//                                 </h2>
//                                 {room?.type?.name && (
//                                     <p className="text-xs text-gray-400 mt-0.5">{room.type.name}</p>
//                                 )}
//                             </div>
//                             <button
//                                 onClick={onClose}
//                                 className="p-2 hover:bg-black/5 rounded-full transition-colors mt-1"
//                             >
//                                 <X size={18} />
//                             </button>
//                         </div>

//                         {/* ── Content ── */}
//                         <div className="flex-1 overflow-y-auto px-8 py-6">
//                             <StepIndicator step={step} />

//                             <AnimatePresence mode="wait">

//                                 {/* ─ Step 1: Dates & Coupon ─ */}
//                                 {step === 1 && (
//                                     <motion.div
//                                         key="step1"
//                                         initial={{ opacity: 0, y: 10 }}
//                                         animate={{ opacity: 1, y: 0 }}
//                                         exit={{ opacity: 0, y: -10 }}
//                                         transition={{ duration: 0.2 }}
//                                     >
//                                         <div className="space-y-5">
//                                             {/* Date inputs */}
//                                             <div className="grid grid-cols-2 gap-3">
//                                                 <div className="space-y-1.5">
//                                                     <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 flex items-center gap-1.5">
//                                                         <Calendar size={11} /> Check In
//                                                     </label>
//                                                     <input
//                                                         type="date"
//                                                         min={today}
//                                                         value={dates.checkIn}
//                                                         onChange={(e) =>
//                                                             setDates({ checkIn: e.target.value, checkOut: '' })
//                                                         }
//                                                         className="w-full bg-white border border-black/8 p-3 text-sm focus:border-[#C8A96A] outline-none transition-colors rounded-sm"
//                                                     />
//                                                 </div>
//                                                 <div className="space-y-1.5">
//                                                     <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 flex items-center gap-1.5">
//                                                         <Calendar size={11} /> Check Out
//                                                     </label>
//                                                     <input
//                                                         type="date"
//                                                         // FIX 3 continued: min for checkout must be day AFTER checkIn
//                                                         min={dates.checkIn
//                                                             ? (() => {
//                                                                 const d = new Date(dates.checkIn);
//                                                                 d.setDate(d.getDate() + 1);
//                                                                 return d.toISOString().split('T')[0];
//                                                             })()
//                                                             : today}
//                                                         disabled={!dates.checkIn}
//                                                         value={dates.checkOut}
//                                                         onChange={(e) =>
//                                                             setDates({ ...dates, checkOut: e.target.value })
//                                                         }
//                                                         className="w-full bg-white border border-black/8 p-3 text-sm focus:border-[#C8A96A] outline-none transition-colors rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
//                                                     />
//                                                 </div>
//                                             </div>

//                                             {/* Nights badge */}
//                                             {nights > 0 && (
//                                                 <div className="flex items-center gap-2 text-xs text-gray-500">
//                                                     <Moon size={12} className="text-[#C8A96A]" />
//                                                     <span>
//                                                         <strong className="text-[#1a1a1a]">{nights}</strong>{' '}
//                                                         nuit{nights > 1 ? 's' : ''}
//                                                     </span>
//                                                 </div>
//                                             )}

//                                             {/* Coupon */}
//                                             <div className="space-y-1.5">
//                                                 <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 flex items-center gap-1.5">
//                                                     <Tag size={11} /> Code Promo (optionnel)
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     placeholder="MUSEUM2024"
//                                                     value={coupon}
//                                                     onChange={(e) => setCoupon(e.target.value.toUpperCase())}
//                                                     className="w-full bg-white border border-black/8 p-3 text-sm focus:border-[#C8A96A] outline-none transition-colors rounded-sm uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal"
//                                                 />
//                                             </div>

//                                             {/* Price estimate */}
//                                             {estimatedTotal > 0 && (
//                                                 <div className="bg-black/[0.03] border border-black/5 p-5 space-y-2.5">
//                                                     <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
//                                                         <span>Prix / nuit</span>
// <span>MAD {pricePerNight.toLocaleString()}</span>                                                    </div>
//                                                     <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
//                                                         <span>Durée</span>
//                                                         <span>{nights} nuit{nights > 1 ? 's' : ''}</span>
//                                                     </div>
//                                                     <div className="border-t border-black/5 pt-2.5 flex justify-between">
//                                                         <span className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">
//                                                             Total estimé
//                                                         </span>
//                                                         <span className="font-serif text-lg text-[#C8A96A]">
//                                                             MAD {estimatedTotal.toLocaleString()}
//                                                         </span>
//                                                     </div>
//                                                 </div>
//                                             )}

//                                             <button
//                                                 disabled={!canProceed}
//                                                 onClick={() => setStep(2)}
//                                                 className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C8A96A] hover:text-[#1a1a1a] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
//                                             >
//                                                 Vérifier les détails
//                                             </button>
//                                         </div>
//                                     </motion.div>
//                                 )}

//                                 {/* ─ Step 2: Confirm ─ */}
//                                 {step === 2 && (
//                                     <motion.div
//                                         key="step2"
//                                         initial={{ opacity: 0, x: 20 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         exit={{ opacity: 0, x: -20 }}
//                                         transition={{ duration: 0.2 }}
//                                     >
//                                         <div className="space-y-6">
//                                             {/* Summary card */}
//                                             <div className="bg-white border border-black/5 divide-y divide-black/5">
//                                                 <div className="px-5 py-3 flex items-center gap-3">
//                                                     <BedDouble size={15} className="text-[#C8A96A]" />
//                                                     <div>
//                                                         <p className="text-[9px] uppercase tracking-widest text-gray-400">Chambre</p>
//                                                         <p className="text-sm font-bold text-[#1a1a1a]">
//                                                             {room?.num_room ? `N° ${room.num_room}` : room?.name}
//                                                             {room?.type?.name && (
//                                                                 <span className="font-normal text-gray-400 ml-1.5">
//                                                                     — {room.type.name}
//                                                                 </span>
//                                                             )}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                                 {[
//                                                     { label: 'Arrivée',     value: formatDate(dates.checkIn) },
//                                                     { label: 'Départ',      value: formatDate(dates.checkOut) },
//                                                     { label: 'Nuits',       value: `${nights} nuit${nights > 1 ? 's' : ''}` },
//                                                     { label: 'Prix / nuit', value: `MAD ${pricePerNight.toLocaleString()}` },
//                                                     ...(coupon ? [{ label: 'Code promo', value: coupon, highlight: true }] : []),
//                                                 ].map(({ label, value, highlight }) => (
//                                                     <div key={label} className="px-5 py-3 flex justify-between items-center">
//                                                         <span className="text-[10px] uppercase tracking-widest text-gray-400">{label}</span>
//                                                         <span className={`text-sm font-medium ${highlight ? 'text-green-600' : 'text-[#1a1a1a]'}`}>
//                                                             {value}
//                                                         </span>
//                                                     </div>
//                                                 ))}
//                                                 <div className="px-5 py-4 flex justify-between items-center bg-black/[0.02]">
//                                                     <span className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">
//                                                         Total estimé
//                                                     </span>
//                                                     <span className="font-serif text-xl text-[#C8A96A]">
//                                                         MAD {estimatedTotal.toLocaleString()}
//                                                     </span>
//                                                 </div>
//                                             </div>

//                                             {/* Error */}
//                                             {error && (
//                                                 <motion.div
//                                                     initial={{ opacity: 0, y: -5 }}
//                                                     animate={{ opacity: 1, y: 0 }}
//                                                     className="p-4 bg-red-50 border border-red-100 flex gap-2.5 text-red-600 items-start"
//                                                 >
//                                                     <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
//                                                     <p className="text-xs leading-relaxed">{error}</p>
//                                                 </motion.div>
//                                             )}

//                                             {/* Actions */}
//                                             <div className="space-y-2">
//                                                 <button
//                                                     onClick={handleConfirm}
//                                                     disabled={loading}
//                                                     className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C8A96A] hover:text-[#1a1a1a] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
//                                                 >
//                                                     {loading
//                                                         ? <><Loader2 className="animate-spin" size={14} /> Traitement…</>
//                                                         : 'Confirmer la réservation'
//                                                     }
//                                                 </button>
//                                                 <button
//                                                     onClick={() => setStep(1)}
//                                                     disabled={loading}
//                                                     className="w-full text-[9px] uppercase tracking-widest text-gray-400 hover:text-[#1a1a1a] py-2 transition-colors disabled:opacity-40"
//                                                 >
//                                                     ← Retour
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </motion.div>
//                                 )}

//                                 {/* ─ Step 3: Success ─ */}
//                                 {step === 3 && (
//                                     <motion.div
//                                         key="step3"
//                                         initial={{ scale: 0.9, opacity: 0 }}
//                                         animate={{ scale: 1, opacity: 1 }}
//                                         transition={{ duration: 0.3 }}
//                                         className="text-center py-10"
//                                     >
//                                         <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
//                                             <CheckCircle2 className="text-green-600" size={32} />
//                                         </div>
//                                         <h3 className="text-3xl font-serif italic text-[#1a1a1a] mb-3">
//                                             Confirmé !
//                                         </h3>
//                                         <p className="text-gray-400 text-sm mb-1">
//                                             Votre séjour au Musée a été réservé.
//                                         </p>
//                                         <p className="text-[10px] text-gray-300 uppercase tracking-widest mb-8">
//                                             {formatDate(dates.checkIn)} → {formatDate(dates.checkOut)}
//                                         </p>

//                                         {/* Total charged */}
//                                         <div className="bg-white border border-black/5 p-5 mb-6">
//                                             <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">
//                                                 Montant total
//                                             </p>
//                                             <p className="font-serif text-2xl text-[#C8A96A]">
//                                                 MAD {(booking?.prix_total ?? estimatedTotal).toLocaleString()}
//                                             </p>
//                                             {booking?.id && (
//                                                 <p className="text-[9px] text-gray-300 mt-1">
//                                                     Réservation #{booking.id}
//                                                 </p>
//                                             )}
//                                         </div>

//                                         <button
//                                             onClick={onClose}
//                                             className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C8A96A] hover:text-[#1a1a1a] transition-all duration-300"
//                                         >
//                                             Fermer
//                                         </button>
//                                     </motion.div>
//                                 )}

//                             </AnimatePresence>
//                         </div>
//                     </motion.div>
//                 </>
//             )}
//         </AnimatePresence>
//     );
// }

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, Loader2, CheckCircle2, AlertCircle, BedDouble, Calendar, Moon, Check } from 'lucide-react';
import api from '../api';

// ─── useBooking Hook ──────────────────────────────────────────────────────────
export function useBooking() {
    const [state, setState] = useState({
        loading: false,
        error: null,
        booking: null,
        success: false,
    });

    const createBooking = async ({ room_id, date_debut, date_fin, coupon_code }) => {
        setState({ loading: true, error: null, booking: null, success: false });
        try {
            const { data } = await api.post('/bookings', {
                room_id,
                date_debut,
                date_fin,
                ...(coupon_code ? { coupon_code } : {}),
            });
            setState({ loading: false, error: null, booking: data.booking, success: true });
        } catch (err) {
            const laravelErrors = err.response?.data?.errors;
            const errorMessage = laravelErrors
                ? Object.values(laravelErrors).flat().join(' ')
                : err.response?.data?.message ||
                    err.response?.data?.error ||
                    'Something went wrong. Please try again.';
            setState({ loading: false, error: errorMessage, booking: null, success: false });
            throw err;
        }
    };

    const reset = () =>
        setState({ loading: false, error: null, booking: null, success: false });

    return { ...state, createBooking, reset };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatDate = (str) => {
    if (!str) return '—';
    return new Date(str).toLocaleDateString('fr-MA', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

// ─── Step Indicator ───────────────────────────────────────────────────────────
const StepIndicator = ({ step }) => (
    <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                    step === s
                        ? 'bg-[#1a1a1a] text-white scale-110'
                        : step > s
                        ? 'bg-[#C8A96A] text-white'
                        : 'bg-black/10 text-gray-400'
                }`}>
                    {step > s ? '✓' : s}
                </div>
                {s < 3 && (
                    <div className={`flex-1 h-px transition-all duration-300 ${
                        step > s ? 'bg-[#C8A96A]' : 'bg-black/10'
                    }`} />
                )}
            </React.Fragment>
        ))}
    </div>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function BookingModal({ isOpen, onClose, room }) {
    const { createBooking, loading, error, booking, reset } = useBooking();
    const [step, setStep]     = useState(1);
    const [dates, setDates]   = useState({ checkIn: '', checkOut: '' });
    const [coupon, setCoupon] = useState('');

    // ── Coupon verification state ──
    // status: 'idle' | 'loading' | 'valid' | 'invalid'
    const [couponStatus, setCouponStatus] = useState('idle');
    const [couponData, setCouponData]     = useState(null); // { discount_type, discount_value }
    const [couponError, setCouponError]   = useState('');

    // Local date (avoid UTC off-by-one for UTC+ timezones like Morocco)
    const today = (() => {
        const d = new Date();
        return [
            d.getFullYear(),
            String(d.getMonth() + 1).padStart(2, '0'),
            String(d.getDate()).padStart(2, '0'),
        ].join('-');
    })();

    const handleReset = useCallback(() => {
        setStep(1);
        setDates({ checkIn: '', checkOut: '' });
        setCoupon('');
        setCouponStatus('idle');
        setCouponData(null);
        setCouponError('');
        reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(handleReset, 300);
            return () => clearTimeout(t);
        }
    }, [isOpen, handleReset]);

    // Reset coupon validation whenever the user changes the coupon input
    const handleCouponChange = (e) => {
        setCoupon(e.target.value.toUpperCase());
        setCouponStatus('idle');
        setCouponData(null);
        setCouponError('');
    };

    // ── Coupon verification call ──────────────────────────────────────────────
    const verifyCoupon = async () => {
        if (!coupon.trim()) return;
        setCouponStatus('loading');
        setCouponData(null);
        setCouponError('');
        try {
            const { data } = await api.get('/coupons/check', { params: { code: coupon } });
            // Expected response: { valid: true, discount_type: 'percent'|'fixed', discount_value: number }
            if (data.valid) {
                setCouponStatus('valid');
                setCouponData({
                    discount_type:  data.discount_type,
                    discount_value: Number(data.discount_value),
                });
            } else {
                setCouponStatus('invalid');
                setCouponError(data.message || 'Code promo invalide ou expiré.');
            }
        } catch (err) {
            setCouponStatus('invalid');
            setCouponError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                'Code promo invalide ou expiré.'
            );
        }
    };

    // ── Price calculations ────────────────────────────────────────────────────
    const nights = dates.checkIn && dates.checkOut
        ? Math.max(0, Math.round(
            (new Date(dates.checkOut) - new Date(dates.checkIn)) / (1000 * 60 * 60 * 24)
        ))
        : 0;

    const pricePerNight  = Number(room?.base_price || room?.price || 0);
    const subtotal       = nights * pricePerNight;

    // Calculate discount amount
    const discountAmount = (() => {
        if (couponStatus !== 'valid' || !couponData) return 0;
        if (couponData.discount_type === 'percent') {
            return Math.round((subtotal * couponData.discount_value) / 100 * 100) / 100;
        }
        // fixed
        return Math.min(couponData.discount_value, subtotal);
    })();

    const estimatedTotal = Math.max(0, subtotal - discountAmount);

    const handleConfirm = async () => {
        try {
            await createBooking({
                room_id:     room.id,
                date_debut:  dates.checkIn,
                date_fin:    dates.checkOut,
                // Only send coupon if it was validated successfully
                coupon_code: couponStatus === 'valid' ? coupon : null,
            });
            setStep(3);
        } catch {
            // error already set inside the hook — stays on step 2 to show it
        }
    };

    const canProceed = dates.checkIn && dates.checkOut && nights > 0;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999]"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FDFBF7] z-[1000] shadow-2xl flex flex-col"
                    >
                        {/* ── Header ── */}
                        <div className="px-8 py-6 flex justify-between items-start border-b border-black/5">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-[#C8A96A] font-bold mb-1">
                                    Le Musée — Réservation
                                </p>
                                <h2 className="text-2xl font-serif italic text-[#1a1a1a] leading-tight">
                                    {room?.num_room ? `Chambre ${room.num_room}` : room?.name ?? 'Chambre'}
                                </h2>
                                {room?.type?.name && (
                                    <p className="text-xs text-gray-400 mt-0.5">{room.type.name}</p>
                                )}
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-black/5 rounded-full transition-colors mt-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* ── Content ── */}
                        <div className="flex-1 overflow-y-auto px-8 py-6">
                            <StepIndicator step={step} />

                            <AnimatePresence mode="wait">

                                {/* ─ Step 1: Dates & Coupon ─ */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="space-y-5">
                                            {/* Date inputs */}
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 flex items-center gap-1.5">
                                                        <Calendar size={11} /> Check In
                                                    </label>
                                                    <input
                                                        type="date"
                                                        min={today}
                                                        value={dates.checkIn}
                                                        onChange={(e) =>
                                                            setDates({ checkIn: e.target.value, checkOut: '' })
                                                        }
                                                        className="w-full bg-white border border-black/8 p-3 text-sm focus:border-[#C8A96A] outline-none transition-colors rounded-sm"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 flex items-center gap-1.5">
                                                        <Calendar size={11} /> Check Out
                                                    </label>
                                                    <input
                                                        type="date"
                                                        min={dates.checkIn
                                                            ? (() => {
                                                                const d = new Date(dates.checkIn);
                                                                d.setDate(d.getDate() + 1);
                                                                return d.toISOString().split('T')[0];
                                                            })()
                                                            : today}
                                                        disabled={!dates.checkIn}
                                                        value={dates.checkOut}
                                                        onChange={(e) =>
                                                            setDates({ ...dates, checkOut: e.target.value })
                                                        }
                                                        className="w-full bg-white border border-black/8 p-3 text-sm focus:border-[#C8A96A] outline-none transition-colors rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
                                                    />
                                                </div>
                                            </div>

                                            {/* Nights badge */}
                                            {nights > 0 && (
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                                    <Moon size={12} className="text-[#C8A96A]" />
                                                    <span>
                                                        <strong className="text-[#1a1a1a]">{nights}</strong>{' '}
                                                        nuit{nights > 1 ? 's' : ''}
                                                    </span>
                                                </div>
                                            )}

                                            {/* ── Coupon with verify button ── */}
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 flex items-center gap-1.5">
                                                    <Tag size={11} /> Code Promo (optionnel)
                                                </label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="MUSEUM2024"
                                                        value={coupon}
                                                        onChange={handleCouponChange}
                                                        className={`flex-1 bg-white border p-3 text-sm outline-none transition-colors rounded-sm uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal ${
                                                            couponStatus === 'valid'
                                                                ? 'border-green-400 focus:border-green-500'
                                                                : couponStatus === 'invalid'
                                                                ? 'border-red-300 focus:border-red-400'
                                                                : 'border-black/8 focus:border-[#C8A96A]'
                                                        }`}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={verifyCoupon}
                                                        disabled={!coupon.trim() || couponStatus === 'loading' || couponStatus === 'valid'}
                                                        className="px-4 py-3 bg-[#1a1a1a] text-white text-[9px] uppercase tracking-widest font-bold hover:bg-[#C8A96A] hover:text-[#1a1a1a] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 whitespace-nowrap rounded-sm"
                                                    >
                                                        {couponStatus === 'loading' ? (
                                                            <Loader2 size={12} className="animate-spin" />
                                                        ) : couponStatus === 'valid' ? (
                                                            <Check size={12} />
                                                        ) : (
                                                            'Appliquer'
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Coupon feedback */}
                                                <AnimatePresence mode="wait">
                                                    {couponStatus === 'valid' && couponData && (
                                                        <motion.div
                                                            key="coupon-valid"
                                                            initial={{ opacity: 0, y: -4 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -4 }}
                                                            className="flex items-center gap-2 text-green-600"
                                                        >
                                                            <CheckCircle2 size={13} />
                                                            <span className="text-[11px] font-medium">
                                                                Code valide —{' '}
                                                                {couponData.discount_type === 'percent'
                                                                    ? `${couponData.discount_value}% de réduction`
                                                                    : `MAD ${couponData.discount_value.toLocaleString()} de réduction`
                                                                }
                                                            </span>
                                                        </motion.div>
                                                    )}
                                                    {couponStatus === 'invalid' && (
                                                        <motion.div
                                                            key="coupon-invalid"
                                                            initial={{ opacity: 0, y: -4 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -4 }}
                                                            className="flex items-center gap-2 text-red-500"
                                                        >
                                                            <AlertCircle size={13} />
                                                            <span className="text-[11px]">{couponError}</span>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>

                                            {/* Price estimate */}
                                            {subtotal > 0 && (
                                                <div className="bg-black/[0.03] border border-black/5 p-5 space-y-2.5">
                                                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                                                        <span>Prix / nuit</span>
                                                        <span>MAD {pricePerNight.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-400">
                                                        <span>Durée</span>
                                                        <span>{nights} nuit{nights > 1 ? 's' : ''}</span>
                                                    </div>
                                                    {/* Discount line — shown only when coupon valid */}
                                                    {couponStatus === 'valid' && discountAmount > 0 && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            className="flex justify-between text-[10px] uppercase tracking-widest text-green-600"
                                                        >
                                                            <span>Réduction ({coupon})</span>
                                                            <span>− MAD {discountAmount.toLocaleString()}</span>
                                                        </motion.div>
                                                    )}
                                                    <div className="border-t border-black/5 pt-2.5 flex justify-between">
                                                        <span className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">
                                                            Total estimé
                                                        </span>
                                                        <span className="font-serif text-lg text-[#C8A96A]">
                                                            MAD {estimatedTotal.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            <button
                                                disabled={!canProceed}
                                                onClick={() => setStep(2)}
                                                className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C8A96A] hover:text-[#1a1a1a] transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                                            >
                                                Vérifier les détails
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ─ Step 2: Confirm ─ */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="space-y-6">
                                            {/* Summary card */}
                                            <div className="bg-white border border-black/5 divide-y divide-black/5">
                                                <div className="px-5 py-3 flex items-center gap-3">
                                                    <BedDouble size={15} className="text-[#C8A96A]" />
                                                    <div>
                                                        <p className="text-[9px] uppercase tracking-widest text-gray-400">Chambre</p>
                                                        <p className="text-sm font-bold text-[#1a1a1a]">
                                                            {room?.num_room ? `N° ${room.num_room}` : room?.name}
                                                            {room?.type?.name && (
                                                                <span className="font-normal text-gray-400 ml-1.5">
                                                                    — {room.type.name}
                                                                </span>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                                {[
                                                    { label: 'Arrivée',     value: formatDate(dates.checkIn) },
                                                    { label: 'Départ',      value: formatDate(dates.checkOut) },
                                                    { label: 'Nuits',       value: `${nights} nuit${nights > 1 ? 's' : ''}` },
                                                    { label: 'Prix / nuit', value: `MAD ${pricePerNight.toLocaleString()}` },
                                                    ...(couponStatus === 'valid' ? [{
                                                        label: 'Code promo',
                                                        value: `${coupon} (−${
                                                            couponData?.discount_type === 'percent'
                                                                ? `${couponData.discount_value}%`
                                                                : `MAD ${discountAmount.toLocaleString()}`
                                                        })`,
                                                        highlight: true,
                                                    }] : []),
                                                    ...(discountAmount > 0 ? [{
                                                        label: 'Réduction',
                                                        value: `− MAD ${discountAmount.toLocaleString()}`,
                                                        highlight: true,
                                                    }] : []),
                                                ].map(({ label, value, highlight }) => (
                                                    <div key={label} className="px-5 py-3 flex justify-between items-center">
                                                        <span className="text-[10px] uppercase tracking-widest text-gray-400">{label}</span>
                                                        <span className={`text-sm font-medium ${highlight ? 'text-green-600' : 'text-[#1a1a1a]'}`}>
                                                            {value}
                                                        </span>
                                                    </div>
                                                ))}
                                                <div className="px-5 py-4 flex justify-between items-center bg-black/[0.02]">
                                                    <span className="text-xs uppercase tracking-widest font-bold text-[#1a1a1a]">
                                                        Total estimé
                                                    </span>
                                                    <span className="font-serif text-xl text-[#C8A96A]">
                                                        MAD {estimatedTotal.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Error */}
                                            {error && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="p-4 bg-red-50 border border-red-100 flex gap-2.5 text-red-600 items-start"
                                                >
                                                    <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs leading-relaxed">{error}</p>
                                                </motion.div>
                                            )}

                                            {/* Actions */}
                                            <div className="space-y-2">
                                                <button
                                                    onClick={handleConfirm}
                                                    disabled={loading}
                                                    className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C8A96A] hover:text-[#1a1a1a] transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                                                >
                                                    {loading
                                                        ? <><Loader2 className="animate-spin" size={14} /> Traitement…</>
                                                        : 'Confirmer la réservation'
                                                    }
                                                </button>
                                                <button
                                                    onClick={() => setStep(1)}
                                                    disabled={loading}
                                                    className="w-full text-[9px] uppercase tracking-widest text-gray-400 hover:text-[#1a1a1a] py-2 transition-colors disabled:opacity-40"
                                                >
                                                    ← Retour
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ─ Step 3: Success ─ */}
                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-center py-10"
                                    >
                                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="text-green-600" size={32} />
                                        </div>
                                        <h3 className="text-3xl font-serif italic text-[#1a1a1a] mb-3">
                                            Confirmé !
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-1">
                                            Votre séjour au Musée a été réservé.
                                        </p>
                                        <p className="text-[10px] text-gray-300 uppercase tracking-widest mb-8">
                                            {formatDate(dates.checkIn)} → {formatDate(dates.checkOut)}
                                        </p>

                                        {/* Total charged */}
                                        <div className="bg-white border border-black/5 p-5 mb-6">
                                            <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">
                                                Montant total
                                            </p>
                                            <p className="font-serif text-2xl text-[#C8A96A]">
                                                MAD {(booking?.prix_total ?? estimatedTotal).toLocaleString()}
                                            </p>
                                            {booking?.id && (
                                                <p className="text-[9px] text-gray-300 mt-1">
                                                    Réservation #{booking.id}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            onClick={onClose}
                                            className="w-full bg-[#1a1a1a] text-white py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#C8A96A] hover:text-[#1a1a1a] transition-all duration-300"
                                        >
                                            Fermer
                                        </button>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}