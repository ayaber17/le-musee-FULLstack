// // import React, { useState, useEffect, useCallback, useRef } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //     Search, BedDouble, LogIn, LogOut, AlertCircle,
// //     RefreshCw, User, Calendar, ChevronRight,
// //     Home, Bell, Printer, X, StickyNote, Check,
// //     XCircle, LayoutDashboard, Wrench
// // } from 'lucide-react';
// // import api from '../api';

// // // ─── Helpers ──────────────────────────────────────────────────────────────────
// // const nightsBetween = (a, b) => {
// //     if (!a || !b) return 0;
// //     return Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000));
// // };
// // const fmt = (d) => d ? new Date(d).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
// // const fmtTime = (d) => d ? new Date(d).toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' }) : '';

// // // ─── Status Config ────────────────────────────────────────────────────────────
// // const STATUS = {
// //     pending:    { label: 'En attente', color: 'bg-amber-100 text-amber-700',     dot: 'bg-amber-400' },
// //     confirmed:  { label: 'Confirmé',   color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
// //     completed:  { label: 'Terminé',    color: 'bg-blue-100 text-blue-700',       dot: 'bg-blue-400' },
// //     cancelled:  { label: 'Annulé',     color: 'bg-red-100 text-red-600',         dot: 'bg-red-400' },
// //     checked_in: { label: 'Checked In', color: 'bg-[#1B3022]/10 text-[#1B3022]',  dot: 'bg-[#1B3022]' },
// // };

// // const ROOM_STATUS = {
// //     available:   { label: 'Disponible',  bg: 'bg-emerald-500', text: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
// //     occupied:    { label: 'Occupée',     bg: 'bg-[#1B3022]',   text: 'text-[#1B3022] bg-[#1B3022]/10 border-[#1B3022]/20' },
// //     cleaning:    { label: 'Nettoyage',   bg: 'bg-amber-400',   text: 'text-amber-700 bg-amber-50 border-amber-200' },
// //     maintenance: { label: 'Maintenance', bg: 'bg-red-400',     text: 'text-red-700 bg-red-50 border-red-200' },
// // };

// // // ─── Badge ────────────────────────────────────────────────────────────────────
// // const Badge = ({ status }) => {
// //     const s = STATUS[status] ?? STATUS.pending;
// //     return (
// //         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.color}`}>
// //             <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
// //             {s.label}
// //         </span>
// //     );
// // };

// // // ─── Receipt Modal ────────────────────────────────────────────────────────────
// // const ReceiptModal = ({ booking, onClose }) => {
// //     const receiptRef = useRef();
// //     if (!booking) return null;
// //     const nights   = nightsBetween(booking.date_debut, booking.date_fin);
// //     const services = booking.room?.services ?? [];
// //     const guest    = `${booking.user?.prenom ?? ''} ${booking.user?.nom ?? ''}`.trim() || 'Guest';

// //     const handlePrint = () => {
// //         const w = window.open('', '_blank');
// //         w.document.write(`<html><head><title>Reçu #${booking.id}</title>
// //         <style>
// //             body{font-family:Georgia,serif;padding:40px;color:#1B3022}
// //             .row{display:flex;justify-content:space-between;margin:6px 0;font-size:13px}
// //             .label{color:#6b7280}.divider{border-top:1px dashed #e5e7eb;margin:16px 0}
// //             h1{font-size:24px;margin-bottom:4px}.sub{font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase}
// //             .total{font-size:18px;font-weight:bold}.footer{text-align:center;font-size:10px;color:#d1d5db;margin-top:20px;text-transform:uppercase;letter-spacing:2px}
// //         </style></head><body>${receiptRef.current.innerHTML}</body></html>`);
// //         w.document.close();
// //         w.print();
// //     };
    

// //     return (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// //             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
// //             onClick={onClose}>
// //             <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
// //                 className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
// //                 onClick={e => e.stopPropagation()}>
// //                 <div className="bg-[#1B3022] px-6 py-5 flex justify-between items-center">
// //                     <div>
// //                         <p className="text-[9px] text-[#C8A96A] uppercase tracking-widest font-bold">Reçu de séjour</p>
// //                         <p className="text-white font-serif text-lg">Le Musée</p>
// //                     </div>
// //                     <button onClick={onClose}><X size={18} className="text-white/50 hover:text-white" /></button>
// //                 </div>
// //                 <div ref={receiptRef} className="px-6 py-5 space-y-4">
// //                     <div>
// //                         <h1 className="font-serif text-2xl text-[#1B3022]">Le Musée</h1>
// //                         <p className="sub text-[10px] text-gray-400 uppercase tracking-widest">Hôtel de luxe — Maroc</p>
// //                         <p className="text-[10px] text-gray-400 mt-1">Réservation #{booking.id}</p>
// //                     </div>
// //                     <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
// //                         {[
// //                             ['Client',  guest],
// //                             ['Chambre', booking.room?.num_room ?? '—'],
// //                             ['Arrivée', fmt(booking.date_debut)],
// //                             ['Départ',  fmt(booking.date_fin)],
// //                             ['Nuits',   nights],
// //                             ['Coupon',  booking.coupon_id ? 'Appliqué ✓' : 'Aucun'],
// //                         ].map(([label, value]) => (
// //                             <div key={label} className="row flex justify-between text-xs">
// //                                 <span className="label text-gray-400">{label}</span>
// //                                 <span className="font-bold text-[#1B3022]">{value}</span>
// //                             </div>
// //                         ))}
// //                     </div>
// //                     {services.length > 0 && (
// //                         <div className="border-t border-dashed border-gray-200 pt-3">
// //                             <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2">Services inclus</p>
// //                             {services.map(s => (
// //                                 <div key={s.id} className="flex items-center gap-2 text-xs text-gray-500 mb-1">
// //                                     <Check size={10} className="text-emerald-500" /> {s.nom_service}
// //                                 </div>
// //                             ))}
// //                         </div>
// //                     )}
// //                     <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
// //                         <span className="text-sm font-bold text-[#1B3022]">Total</span>
// //                         <span className="text-xl font-bold text-[#C8A96A]">{booking.prix_total} MAD</span>
// //                     </div>
// //                     <p className="text-[9px] text-center text-gray-300 uppercase tracking-widest">
// //                         Merci de votre confiance — Le Musée
// //                     </p>
// //                 </div>
// //                 <div className="px-6 pb-5">
// //                     <button onClick={handlePrint}
// //                         className="w-full flex items-center justify-center gap-2 bg-[#1B3022] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-colors">
// //                         <Printer size={14} /> Imprimer le reçu
// //                     </button>
// //                 </div>
// //             </motion.div>
// //         </motion.div>
// //     );
// // };

// // // ─── Note Modal ───────────────────────────────────────────────────────────────
// // const NoteModal = ({ booking, onClose, onSave }) => {
// //     const [note, setNote] = useState(booking?.note ?? '');
// //     if (!booking) return null;
// //     return (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// //             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
// //             onClick={onClose}>
// //             <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
// //                 className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
// //                 onClick={e => e.stopPropagation()}>
// //                 <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
// //                     <p className="font-serif text-[#1B3022]">Note interne — #{booking.id}</p>
// //                     <button onClick={onClose}><X size={16} className="text-gray-400" /></button>
// //                 </div>
// //                 <div className="px-6 py-4">
// //                     <textarea value={note} onChange={e => setNote(e.target.value)}
// //                         placeholder="Ajouter une note sur ce séjour..."
// //                         className="w-full h-32 text-xs text-[#1B3022] border border-gray-100 rounded-xl p-3 resize-none focus:outline-none focus:border-[#1B3022]/30" />
// //                 </div>
// //                 <div className="px-6 pb-5 flex gap-2">
// //                     <button onClick={onClose}
// //                         className="flex-1 py-2.5 rounded-xl border border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-widest">
// //                         Annuler
// //                     </button>
// //                     <button onClick={() => onSave(booking.id, note)}
// //                         className="flex-1 py-2.5 rounded-xl bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-colors">
// //                         Sauvegarder
// //                     </button>
// //                 </div>
// //             </motion.div>
// //         </motion.div>
// //     );
// // };

// // // ─── Notifications Panel ──────────────────────────────────────────────────────
// // const NotificationsPanel = ({ onClose }) => {
// //     const [notifs, setNotifs]   = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError]     = useState(null);

// //     useEffect(() => {
// //         (async () => {
// //             try {
// //                 const res = await api.get('/notifications');
// //                 // Backend returns paginated: { data: [...], total, ... }  OR plain array
// //                 const raw = res.data;
// //                 const list = Array.isArray(raw)
// //                     ? raw
// //                     : Array.isArray(raw?.data)
// //                         ? raw.data
// //                         : [];
// //                 setNotifs(list);
// //             } catch (e) {
// //                 console.error('Notifications fetch error:', e);
// //                 setError('Impossible de charger les notifications.');
// //             } finally { setLoading(false); }
// //         })();
// //     }, []);

// //     const markRead = async (id) => {
// //         try {
// //             await api.patch(`/notifications/${id}/read`);
// //             setNotifs(n => n.map(x => x.id === id ? { ...x, is_read: true } : x));
// //         } catch (e) { console.error(e); }
// //     };

// //     const markAll = async () => {
// //         try {
// //             await api.post('/notifications/mark-all-read');
// //             setNotifs(n => n.map(x => ({ ...x, is_read: true })));
// //         } catch (e) { console.error(e); }
// //     };

// //     return (
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
// //             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-end"
// //             onClick={onClose}>
// //             <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
// //                 className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden mt-20 mr-6"
// //                 onClick={e => e.stopPropagation()}>
// //                 <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
// //                     <p className="font-serif text-[#1B3022]">Notifications</p>
// //                     <div className="flex items-center gap-3">
// //                         <button onClick={markAll} className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-[#1B3022] transition-colors">
// //                             Tout lire
// //                         </button>
// //                         <button onClick={onClose}><X size={16} className="text-gray-400" /></button>
// //                     </div>
// //                 </div>
// //                 <div className="overflow-y-auto max-h-96">
// //                     {loading ? (
// //                         <div className="flex justify-center py-8">
// //                             <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#1B3022]" />
// //                         </div>
// //                     ) : error ? (
// //                         <div className="text-center py-12 text-red-400">
// //                             <AlertCircle size={24} className="mx-auto mb-2" />
// //                             <p className="text-xs italic">{error}</p>
// //                         </div>
// //                     ) : notifs.length === 0 ? (
// //                         <div className="text-center py-12 text-gray-300">
// //                             <Bell size={24} className="mx-auto mb-2" />
// //                             <p className="text-xs italic">Aucune notification</p>
// //                         </div>
// //                     ) : notifs.map(n => (
// //                         <div key={n.id} onClick={() => markRead(n.id)}
// //                             className={`px-6 py-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${!n.is_read ? 'bg-[#1B3022]/5' : ''}`}>
// //                             <div className="flex items-start gap-3">
// //                                 <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.is_read ? 'bg-gray-200' : 'bg-[#1B3022]'}`} />
// //                                 <div>
// //                                     <p className="text-xs text-[#1B3022]">{n.message}</p>
// //                                     <p className="text-[9px] text-gray-400 mt-1">{fmtTime(n.created_at)}</p>
// //                                 </div>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </motion.div>
// //         </motion.div>
// //     );
// // };

// // // ─── Booking Card ─────────────────────────────────────────────────────────────
// // const BookingCard = ({ booking, onCheckIn, onCheckOut, onCancel, onReceipt, onNote, onStatusChange }) => {
// //     const [open, setOpen]           = useState(false);
// //     const [statusMenu, setStatusMenu] = useState(false);
// //     const nights   = nightsBetween(booking.date_debut, booking.date_fin);
// //     const guest    = `${booking.user?.prenom ?? ''} ${booking.user?.nom ?? ''}`.trim() || 'Guest';
// //     const room     = booking.room?.num_room ?? '—';
// //     const services = booking.room?.services ?? [];

// //     return (
// //         <motion.div layout className={`bg-white rounded-2xl border overflow-hidden transition-all ${open ? 'border-[#1B3022]/20 shadow-md' : 'border-gray-100'}`}>
// //             <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
// //                 onClick={() => setOpen(o => !o)}>
// //                 <div className="w-9 h-9 rounded-xl bg-[#1B3022]/10 flex items-center justify-center flex-shrink-0">
// //                     <User size={14} className="text-[#1B3022]" />
// //                 </div>
// //                 <div className="flex-1 min-w-0">
// //                     <p className="font-bold text-[#1B3022] text-sm truncate">{guest}</p>
// //                     <p className="text-[10px] text-gray-400 flex items-center gap-1.5 flex-wrap">
// //                         <BedDouble size={10} /> Ch. {room}
// //                         <span className="text-gray-200">|</span>
// //                         <Calendar size={10} /> {fmt(booking.date_debut)} → {fmt(booking.date_fin)}
// //                         <span className="text-gray-200">|</span>
// //                         {nights} nuit{nights > 1 ? 's' : ''}
// //                     </p>
// //                 </div>
// //                 <div className="flex items-center gap-2 flex-shrink-0">
// //                     <Badge status={booking.status_payment} />
// //                     <ChevronRight size={13} className={`text-gray-300 transition-transform ${open ? 'rotate-90' : ''}`} />
// //                 </div>
// //             </div>

// //             <AnimatePresence>
// //                 {open && (
// //                     <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
// //                         exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
// //                         <div className="px-5 pb-4 pt-2 border-t border-gray-50 space-y-4">
// //                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
// //                                 {[
// //                                     { label: 'Réservation #', value: `#${booking.id}` },
// //                                     { label: 'Total',          value: `${booking.prix_total} MAD` },
// //                                     { label: 'Nuits',          value: nights },
// //                                     { label: 'Étage',          value: booking.room?.floor ? `Étage ${booking.room.floor}` : '—' },
// //                                     { label: 'Email',          value: booking.user?.email ?? '—' },
// //                                     { label: 'Téléphone',      value: booking.user?.telephone ?? '—' },
// //                                     { label: 'CIN/Passeport',  value: booking.user?.cin_passport ?? '—' },
// //                                     { label: 'Coupon',         value: booking.coupon_id ? 'Appliqué ✓' : 'Aucun' },
// //                                 ].map(({ label, value }) => (
// //                                     <div key={label} className="bg-gray-50 rounded-xl px-3 py-2">
// //                                         <p className="text-[9px] uppercase tracking-widest text-gray-400">{label}</p>
// //                                         <p className="text-xs font-bold text-[#1B3022] mt-0.5 truncate">{value}</p>
// //                                     </div>
// //                                 ))}
// //                             </div>

// //                             {services.length > 0 && (
// //                                 <div>
// //                                     <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2">Services inclus</p>
// //                                     <div className="flex flex-wrap gap-2">
// //                                         {services.map(s => (
// //                                             <span key={s.id} className="flex items-center gap-1 px-2.5 py-1 bg-[#1B3022]/5 text-[#1B3022] rounded-full text-[10px] font-medium">
// //                                                 <Check size={9} className="text-emerald-500" /> {s.nom_service}
// //                                             </span>
// //                                         ))}
// //                                     </div>
// //                                 </div>
// //                             )}

// //                             {booking.note && (
// //                                 <div className="bg-amber-50 rounded-xl px-3 py-2 border border-amber-100">
// //                                     <p className="text-[9px] uppercase tracking-widest text-amber-400 mb-1">Note interne</p>
// //                                     <p className="text-xs text-amber-700">{booking.note}</p>
// //                                 </div>
// //                             )}

// //                             <div className="flex flex-wrap gap-2 pt-1 items-center">

// //                                 {/* ── Status dropdown ── */}
// //                                 <div className="relative">
// //                                     <button
// //                                         onClick={() => setStatusMenu(m => !m)}
// //                                         className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-colors ${STATUS[booking.status_payment]?.color ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
// //                                         <span className={`w-1.5 h-1.5 rounded-full ${STATUS[booking.status_payment]?.dot}`} />
// //                                         {STATUS[booking.status_payment]?.label ?? booking.status_payment}
// //                                         <ChevronRight size={10} className={`transition-transform ${statusMenu ? 'rotate-90' : ''}`} />
// //                                     </button>
// //                                     <AnimatePresence>
// //                                         {statusMenu && (
// //                                             <motion.div
// //                                                 initial={{ opacity: 0, y: -4, scale: 0.97 }}
// //                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
// //                                                 exit={{ opacity: 0, y: -4, scale: 0.97 }}
// //                                                 transition={{ duration: 0.12 }}
// //                                                 className="absolute bottom-full mb-1 left-0 bg-white border border-gray-100 rounded-xl shadow-lg z-30 overflow-hidden min-w-[160px]">
// //                                                 {[
// //                                                     { key: 'pending',    label: 'En attente' },
// //                                                     { key: 'confirmed',  label: 'Confirmé' },
// //                                                     { key: 'checked_in', label: 'Checked In' },
// //                                                     { key: 'completed',  label: 'Terminé' },
// //                                                     { key: 'cancelled',  label: 'Annulé' },
// //                                                 ].filter(s => s.key !== booking.status_payment).map(({ key, label }) => (
// //                                                     <button key={key}
// //                                                         onClick={() => { onStatusChange(booking.id, key); setStatusMenu(false); }}
// //                                                         className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors text-left`}>
// //                                                         <span className={`w-1.5 h-1.5 rounded-full ${STATUS[key]?.dot}`} />
// //                                                         <span className={STATUS[key]?.color.split(' ')[1]}>{label}</span>
// //                                                     </button>
// //                                                 ))}
// //                                             </motion.div>
// //                                         )}
// //                                     </AnimatePresence>
// //                                 </div>

// //                                 {['pending', 'confirmed'].includes(booking.status_payment) && (
// //                                     <button onClick={() => onCheckIn(booking.id)}
// //                                         className="flex items-center gap-1.5 px-4 py-2 bg-[#1B3022] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[#2d5238] transition-colors">
// //                                         <LogIn size={12} /> Check In
// //                                     </button>
// //                                 )}
// //                                 {booking.status_payment === 'checked_in' && (
// //                                     <button onClick={() => onCheckOut(booking.id)}
// //                                         className="flex items-center gap-1.5 px-4 py-2 bg-[#C8A96A] text-[#1B3022] rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[#b8945a] transition-colors">
// //                                         <LogOut size={12} /> Check Out
// //                                     </button>
// //                                 )}
// //                                 {['pending','confirmed','checked_in','completed'].includes(booking.status_payment) && (
// //                                     <button onClick={() => onReceipt(booking)}
// //                                         className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
// //                                         <Printer size={12} /> Reçu
// //                                     </button>
// //                                 )}
// //                                 <button onClick={() => onNote(booking)}
// //                                     className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors">
// //                                     <StickyNote size={12} /> Note
// //                                 </button>
// //                                 {['pending','confirmed'].includes(booking.status_payment) && (
// //                                     <button onClick={() => onCancel(booking.id)}
// //                                         className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-red-100 transition-colors">
// //                                         <XCircle size={12} /> Annuler
// //                                     </button>
// //                                 )}
// //                             </div>
// //                         </div>
// //                     </motion.div>
// //                 )}
// //             </AnimatePresence>
// //         </motion.div>
// //     );
// // };

// // // ─── Room Card ────────────────────────────────────────────────────────────────
// // const RoomCard = ({ room }) => {
// //     const s   = room.status ?? 'available';
// //     const cfg = ROOM_STATUS[s] ?? ROOM_STATUS.available;
// //     const services = room.services ?? [];
// //     return (
// //         <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
// //             className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
// //             <div className="flex justify-between items-start">
// //                 <div>
// //                     <p className="text-[9px] uppercase tracking-widest text-gray-400">Chambre</p>
// //                     <p className="text-2xl font-bold text-[#1B3022]">{room.num_room ?? '—'}</p>
// //                     <p className="text-[10px] text-gray-400">Étage {room.floor ?? '—'}</p>
// //                 </div>
// //                 <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${cfg.text}`}>
// //                     {cfg.label}
// //                 </span>
// //             </div>
// //             <div>
// //                 <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Type</p>
// //                 <p className="text-xs font-medium text-[#1B3022]">{room.type?.title ?? room.room_type?.name ?? '—'}</p>
// //                 {(room.type?.base_price || room.room_type?.base_price) && (
// //                     <p className="text-[10px] text-[#C8A96A] font-bold mt-0.5">{room.type?.base_price ?? room.room_type?.base_price} MAD / nuit</p>
// //                 )}
// //             </div>
// //             {services.length > 0 && (
// //                 <div className="flex flex-wrap gap-1">
// //                     {services.slice(0, 3).map(s => (
// //                         <span key={s.id} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full text-[9px]">{s.nom_service}</span>
// //                     ))}
// //                     {services.length > 3 && <span className="text-[9px] text-gray-400">+{services.length - 3}</span>}
// //                 </div>
// //             )}
// //         </motion.div>
// //     );
// // };

// // // ─── Overview Tab ─────────────────────────────────────────────────────────────
// // const OverviewTab = ({ bookings, rooms }) => {
// //     const todayStr  = new Date().toISOString().slice(0, 10);

// //     // Helper: normalize date string to YYYY-MM-DD regardless of ISO timestamp format
// //     const toDate = (d) => d ? d.slice(0, 10) : null;

// //     // Arrivées auj. = bookings whose check-in date is today (not yet checked in)
// //     const checkIns  = bookings.filter(b =>
// //         toDate(b.date_debut) === todayStr &&
// //         ['confirmed', 'pending'].includes(b.status_payment)
// //     ).length;

// //     // Départs auj. = checked_in guests whose check-out date is today
// //     const checkOuts = bookings.filter(b =>
// //         toDate(b.date_fin) === todayStr &&
// //         b.status_payment === 'checked_in'
// //     ).length;

// //     const inHouse   = bookings.filter(b => b.status_payment === 'checked_in').length;
// //     const pending   = bookings.filter(b => b.status_payment === 'pending').length;
// //     const available = rooms.filter(r => r.status === 'available').length;

// //     const STATS = [
// //         { label: 'Arrivées auj.',   value: checkIns,  icon: LogIn,       color: 'bg-emerald-500' },
// //         { label: 'Départs auj.',    value: checkOuts, icon: LogOut,      color: 'bg-[#C8A96A]' },
// //         { label: 'En séjour',       value: inHouse,   icon: BedDouble,   color: 'bg-blue-500' },
// //         { label: 'En attente',      value: pending,   icon: AlertCircle, color: 'bg-red-400' },
// //         { label: 'Chambres libres', value: available, icon: Home,        color: 'bg-[#1B3022]' },
// //     ];

// //     return (
// //         <div className="space-y-6">
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
// //                 {STATS.map((s, i) => (
// //                     <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
// //                         transition={{ delay: i * 0.08 }}
// //                         className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
// //                         <div className={`w-11 h-11 ${s.color} text-white rounded-xl flex items-center justify-center mb-4 shadow`}>
// //                             <s.icon size={20} />
// //                         </div>
// //                         <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
// //                         <h4 className="text-3xl font-bold text-[#1B3022]">{s.value}</h4>
// //                     </motion.div>
// //                 ))}
// //             </div>

// //             {/* Room Status Summary */}
// //             <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
// //                 <div className="px-7 py-5 border-b border-gray-50 bg-gray-50/60">
// //                     <h3 className="font-serif text-lg text-[#1B3022]">État des Chambres</h3>
// //                 </div>
// //                 <div className="p-7 grid grid-cols-2 md:grid-cols-4 gap-4">
// //                     {Object.entries(ROOM_STATUS).map(([key, cfg]) => {
// //                         const count = rooms.filter(r => r.status === key).length;
// //                         return (
// //                             <div key={key} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
// //                                 <div className={`w-3 h-3 rounded-full ${cfg.bg}`} />
// //                                 <div>
// //                                     <p className="text-[9px] uppercase tracking-widest text-gray-400">{cfg.label}</p>
// //                                     <p className="text-xl font-bold text-[#1B3022]">{count}</p>
// //                                 </div>
// //                             </div>
// //                         );
// //                     })}
// //                 </div>
// //             </div>

// //             {/* Recent bookings */}
// //             <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
// //                 <div className="px-7 py-5 border-b border-gray-50 bg-gray-50/60">
// //                     <h3 className="font-serif text-lg text-[#1B3022]">Séjours actifs aujourd'hui</h3>
// //                 </div>
// //                 <div className="divide-y divide-gray-50">
// //                     {bookings
// //                         .filter(b =>
// //                             toDate(b.date_debut) === new Date().toISOString().slice(0, 10) &&
// //                             ['confirmed', 'pending', 'checked_in'].includes(b.status_payment)
// //                         )
// //                         .slice(0, 5)
// //                         .map(b => (
// //                             <div key={b.id} className="px-7 py-4 flex items-center justify-between">
// //                                 <div>
// //                                     <p className="text-sm font-medium text-[#1B3022]">
// //                                         {`${b.user?.prenom ?? ''} ${b.user?.nom ?? ''}`.trim() || 'Guest'}
// //                                     </p>
// //                                     <p className="text-[10px] text-gray-400">Ch. {b.room?.num_room ?? '—'}</p>
// //                                 </div>
// //                                 <Badge status={b.status_payment} />
// //                             </div>
// //                         ))}
// //                     {bookings.filter(b =>
// //                         toDate(b.date_debut) === new Date().toISOString().slice(0, 10) &&
// //                         ['confirmed', 'pending', 'checked_in'].includes(b.status_payment)
// //                     ).length === 0 && (
// //                         <p className="px-7 py-8 text-sm text-gray-300 italic text-center">Aucun séjour actif aujourd'hui.</p>
// //                     )}
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // // ─── Bookings Tab ─────────────────────────────────────────────────────────────
// // const BookingsTab = ({ bookings, rooms, onCheckIn, onCheckOut, onCancel, onReceipt, onNote, notes, onStatusChange }) => {
// //     const [search, setSearch]       = useState('');
// //     const [filterStatus, setFilter] = useState('all');

// //     const filtered = bookings
// //         .map(b => ({ ...b, note: notes[b.id] ?? b.note }))
// //         .filter(b => {
// //             const q = search.toLowerCase();
// //             const matchSearch = !q
// //                 || `${b.user?.prenom ?? ''} ${b.user?.nom ?? ''}`.toLowerCase().includes(q)
// //                 || b.user?.email?.toLowerCase().includes(q)
// //                 || String(b.id).includes(q)
// //                 || String(b.room?.num_room ?? '').toLowerCase().includes(q);
// //             const matchStatus = filterStatus === 'all' || b.status_payment === filterStatus;
// //             return matchSearch && matchStatus;
// //         });

// //     return (
// //         <div className="space-y-4">
// //             <div className="flex gap-3 flex-wrap">
// //                 <div className="relative flex-1 min-w-[220px]">
// //                     <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
// //                     <input value={search} onChange={e => setSearch(e.target.value)}
// //                         placeholder="Nom, email, chambre, #réservation..."
// //                         className="w-full pl-9 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-xs text-[#1B3022] placeholder-gray-300 focus:outline-none focus:border-[#1B3022]/30" />
// //                 </div>
// //                 <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 flex-wrap">
// //                     {[
// //                         { v: 'all',        l: 'Tous' },
// //                         { v: 'pending',    l: 'Attente' },
// //                         { v: 'confirmed',  l: 'Confirmé' },
// //                         { v: 'checked_in', l: 'In' },
// //                         { v: 'completed',  l: 'Terminé' },
// //                         { v: 'cancelled',  l: 'Annulé' },
// //                     ].map(({ v, l }) => (
// //                         <button key={v} onClick={() => setFilter(v)}
// //                             className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${
// //                                 filterStatus === v ? 'bg-[#1B3022] text-white' : 'text-gray-400 hover:text-[#1B3022]'
// //                             }`}>
// //                             {l}
// //                         </button>
// //                     ))}
// //                 </div>
// //             </div>
// //             <p className="text-[10px] text-gray-400 uppercase tracking-widest">
// //                 {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
// //             </p>
// //             {filtered.length === 0 ? (
// //                 <div className="text-center py-16 text-gray-300">
// //                     <BedDouble size={32} className="mx-auto mb-2" />
// //                     <p className="text-sm italic">Aucune réservation trouvée.</p>
// //                 </div>
// //             ) : (
// //                 <div className="space-y-2">
// //                     {filtered.map(b => (
// //                         <BookingCard key={b.id} booking={b}
// //                             onCheckIn={onCheckIn} onCheckOut={onCheckOut}
// //                             onCancel={onCancel} onReceipt={onReceipt} onNote={onNote}
// //                             onStatusChange={onStatusChange} />
// //                     ))}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // // ─── Rooms Tab ────────────────────────────────────────────────────────────────
// // const RoomsTab = ({ rooms }) => (
// //     <div>
// //         <div className="flex gap-3 mb-5 flex-wrap">
// //             {Object.entries(ROOM_STATUS).map(([key, cfg]) => (
// //                 <div key={key} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-100">
// //                     <div className={`w-2 h-2 rounded-full ${cfg.bg}`} />
// //                     <span className="text-[10px] text-gray-500">{cfg.label}</span>
// //                     <span className="text-[10px] font-bold text-[#1B3022]">{rooms.filter(r => r.status === key).length}</span>
// //                 </div>
// //             ))}
// //         </div>
// //         {rooms.length === 0 ? (
// //             <div className="text-center py-16 text-gray-300">
// //                 <Home size={32} className="mx-auto mb-2" />
// //                 <p className="text-sm italic">Aucune chambre trouvée.</p>
// //             </div>
// //         ) : (
// //             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// //                 {rooms.map(r => <RoomCard key={r.id} room={r} />)}
// //             </div>
// //         )}
// //     </div>
// // );

// // // ─── Main ─────────────────────────────────────────────────────────────────────
// // const ReceptionistDashboard = () => {
// //     const [activeTab, setActiveTab]     = useState('Overview');
// //     const [bookings, setBookings]       = useState([]);
// //     const [rooms, setRooms]             = useState([]);
// //     const [loading, setLoading]         = useState(true);
// //     const [unread, setUnread]           = useState(0);
// //     const [showNotifs, setShowNotifs]   = useState(false);
// //     const [receipt, setReceipt]         = useState(null);
// //     const [noteBooking, setNoteBooking] = useState(null);
// //     const [notes, setNotes]             = useState({});
// //     const navigate = useNavigate();

// //     const userName = localStorage.getItem('user_name') ?? 'Staff';
// //     const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

// //     const loadAll = useCallback(async () => {
// //         setLoading(true);
// //         try {
// //             const [bRes, rRes] = await Promise.all([
// //                 api.get('/admin/bookings'),
// //                 api.get('/rooms'),
// //             ]);
// //             const bookingsData = bRes.data?.data ?? bRes.data ?? [];
// //             const rawRooms     = rRes.data?.data ?? rRes.data ?? [];

// //             // Compute room status: backend status takes priority.
// //             // If backend returns 'available' but a booking covers today, mark as occupied.
// //             const todayStr2 = new Date().toISOString().slice(0, 10);

// //             const checkedInIds = new Set(
// //                 bookingsData
// //                     .filter(b => b.status_payment === 'checked_in')
// //                     .map(b => b.room_id)
// //             );

// //             // Rooms with active reservation overlapping today (pending or confirmed)
// //             const reservedTodayIds = new Set(
// //                 bookingsData
// //                     .filter(b =>
// //                         ['pending', 'confirmed'].includes(b.status_payment) &&
// //                         b.date_debut?.slice(0, 10) <= todayStr2 &&
// //                         b.date_fin?.slice(0, 10)   >  todayStr2
// //                     )
// //                     .map(b => b.room_id)
// //             );

// //             const roomsWithStatus = rawRooms.map(r => {
// //                 // booking-derived status always wins — backend DB may be stale
// //                 if (checkedInIds.has(r.id) || reservedTodayIds.has(r.id)) {
// //                     return { ...r, status: 'occupied' };
// //                 }
// //                 // keep backend status (cleaning, maintenance, etc.) if not booking-derived
// //                 return { ...r, status: r.status ?? 'available' };
// //             });

// //             setBookings(bookingsData);
// //             setRooms(roomsWithStatus);
// //         } catch (e) { console.error(e); }
// //         finally { setLoading(false); }
// //     }, []);

// //     const loadUnread = useCallback(async () => {
// //         try {
// //             const res = await api.get('/notifications/unread-count');
// //             // Backend returns { unread_count: N, count: N }
// //             const val = res.data?.unread_count ?? res.data?.count ?? res.data ?? 0;
// //             setUnread(typeof val === 'number' ? val : 0);
// //         } catch (e) { console.error('loadUnread error:', e); }
// //     }, []);

// //     useEffect(() => { loadAll(); loadUnread(); }, []);

// //     const handleLogout = async () => {
// //         try { await api.post('/logout'); } catch (_) {}
// //         localStorage.removeItem('auth_token');
// //         localStorage.removeItem('user_role');
// //         localStorage.removeItem('user_name');
// //         navigate('/auth');
// //     };

// //     const handleCheckIn  = async (id) => {
// //         try { await api.patch(`/admin/bookings/${id}`, { status_payment: 'checked_in' }); loadAll(); }
// //         catch (e) { console.error(e); }
// //     };
// //     const handleCheckOut = async (id) => {
// //         try { await api.patch(`/admin/bookings/${id}`, { status_payment: 'completed' }); loadAll(); }
// //         catch (e) { console.error(e); }
// //     };
// //     const handleCancel = async (id) => {
// //         if (!confirm('Annuler cette réservation ?')) return;
// //         try { await api.patch(`/admin/bookings/${id}`, { status_payment: 'cancelled' }); loadAll(); }
// //         catch (e) { console.error(e); }
// //     };
// //     const handleStatusChange = async (id, newStatus) => {
// //         try {
// //             await api.patch(`/admin/bookings/${id}`, { status_payment: newStatus });
// //             setBookings(prev => prev.map(b => b.id === id ? { ...b, status_payment: newStatus } : b));
// //         } catch (e) { console.error(e); }
// //     };
// //     const handleSaveNote = (id, note) => {
// //         setNotes(n => ({ ...n, [id]: note }));
// //         setNoteBooking(null);
// //     };

// //     const tabs = [
// //         { name: 'Overview',      Icon: LayoutDashboard },
// //         { name: 'Réservations',  Icon: Calendar },
// //     ];

// //     if (loading) return (
// //         <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE]">
// //             <div className="text-center">
// //                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B3022] mx-auto mb-4" />
// //                 <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em]">Chargement…</p>
// //             </div>
// //         </div>
// //     );

// //     return (
// //         <div className="flex min-h-screen bg-[#F5F3EE]">

// //             {/* ── Sidebar ── */}
// //             <aside className="w-60 bg-[#1B3022] text-white hidden md:flex flex-col shadow-2xl flex-shrink-0">
// //                 {/* Logo */}
// //                 <div className="p-8 border-b border-white/10">
// //                     <h1 className="text-lg font-serif tracking-[0.2em] uppercase text-[#C8A96A]">Le Musée</h1>
// //                     <span className="text-[9px] opacity-40 tracking-[0.3em] uppercase">Réception</span>
// //                 </div>

// //                 {/* Nav */}
// //                 <nav className="flex-1 p-5 space-y-1">
// //                     {tabs.map(({ name, Icon }) => (
// //                         <button key={name} onClick={() => setActiveTab(name)}
// //                             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs transition-all duration-200 ${
// //                                 activeTab === name
// //                                     ? 'bg-[#C8A96A] text-[#1B3022] font-bold shadow-md'
// //                                     : 'hover:bg-white/8 opacity-60 hover:opacity-100'
// //                             }`}>
// //                             <Icon size={15} />
// //                             {name}
// //                         </button>
// //                     ))}

// //                     {/* ── Séparateur ── */}
// //                     <div className="border-t border-white/10 my-3" />

// //                     {/* Gestion Chambres → StaffRoomDashboard */}
// //                     <button
// //                         type="button"
// //                         onClick={() => window.location.href = '/staff/rooms'}
// //                         className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs bg-[#C8A96A]/15 hover:bg-[#C8A96A]/30 text-[#C8A96A] font-bold border border-[#C8A96A]/30 hover:border-[#C8A96A]/60 transition-all"
// //                     >
// //                         <Wrench size={15} />
// //                         Gestion Chambres
// //                     </button>
// //                 </nav>

// //                 {/* Footer */}
// //                 <div className="p-5 border-t border-white/10 space-y-3">
// //                     <div className="flex items-center gap-2.5 px-2">
// //                         <div className="w-7 h-7 bg-[#C8A96A] rounded-full flex items-center justify-center text-[10px] font-bold text-[#1B3022]">
// //                             {initials}
// //                         </div>
// //                         <div>
// //                             <p className="text-[9px] font-bold uppercase tracking-tight text-white/80">{userName}</p>
// //                             <div className="flex items-center gap-1">
// //                                 <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
// //                                 <span className="text-[8px] text-emerald-400 font-bold">ONLINE</span>
// //                             </div>
// //                         </div>
// //                     </div>
// //                     <button onClick={handleLogout}
// //                         className="flex items-center gap-2.5 px-2 text-xs text-red-300/80 hover:text-red-300 transition-colors w-full">
// //                         <LogOut size={13} /> Déconnexion
// //                     </button>
// //                 </div>
// //             </aside>

// //             {/* ── Main ── */}
// //             <main className="flex-1 overflow-y-auto">
// //                 {/* Topbar */}
// //                 <header className="flex justify-between items-center px-8 pt-8 pb-4">
// //                     <div>
// //                         <h2 className="text-2xl font-serif text-[#1B3022] tracking-tight">{activeTab}</h2>
// //                         <p className="text-[10px] text-gray-400 italic mt-0.5">
// //                             {new Date().toLocaleDateString('fr-MA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
// //                         </p>
// //                     </div>
// //                     <div className="flex items-center gap-3">
// //                         {/* Bell */}
// //                         <button onClick={() => setShowNotifs(true)}
// //                             className="relative w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:border-[#1B3022]/30 transition-colors">
// //                             <Bell size={15} className="text-[#1B3022]" />
// //                             {unread > 0 && (
// //                                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8A96A] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
// //                                     {unread}
// //                                 </span>
// //                             )}
// //                         </button>
// //                         <button onClick={loadAll}
// //                             className="flex items-center gap-2 text-[9px] bg-[#1B3022] text-white px-4 py-2.5 rounded-full font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-colors">
// //                             <RefreshCw size={11} /> Actualiser
// //                         </button>
// //                     </div>
// //                 </header>

// //                 {/* Tab Content */}
// //                 <div className="px-8 pb-10">
// //                     <AnimatePresence mode="wait">
// //                         <motion.div key={activeTab}
// //                             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
// //                             exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
// //                             {activeTab === 'Overview' && (
// //                                 <OverviewTab bookings={bookings} rooms={rooms} />
// //                             )}
// //                             {activeTab === 'Réservations' && (
// //                                 <BookingsTab
// //                                     bookings={bookings} rooms={rooms} notes={notes}
// //                                     onCheckIn={handleCheckIn} onCheckOut={handleCheckOut}
// //                                     onCancel={handleCancel} onReceipt={setReceipt} onNote={setNoteBooking}
// //                                     onStatusChange={handleStatusChange}
// //                                 />
// //                             )}
// //                         </motion.div>
// //                     </AnimatePresence>
// //                 </div>
// //             </main>

// //             {/* Modals */}
// //             <AnimatePresence>
// //                 {showNotifs  && <NotificationsPanel onClose={() => { setShowNotifs(false); loadUnread(); }} />}
// //                 {receipt     && <ReceiptModal booking={receipt} onClose={() => setReceipt(null)} />}
// //                 {noteBooking && <NoteModal booking={noteBooking} onClose={() => setNoteBooking(null)} onSave={handleSaveNote} />}
// //             </AnimatePresence>
// //         </div>
// //     );
// // };

// // export default ReceptionistDashboard;


// import React, { useState, useEffect, useCallback, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import {
//     Search, BedDouble, LogIn, LogOut, AlertCircle,
//     RefreshCw, User, Calendar, ChevronRight,
//     Home, Bell, Printer, X, StickyNote, Check,
//     XCircle, LayoutDashboard, Wrench
// } from 'lucide-react';
// import api from '../api';

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const nightsBetween = (a, b) => {
//     if (!a || !b) return 0;
//     return Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000));
// };
// const fmt = (d) => d ? new Date(d).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
// const fmtTime = (d) => d ? new Date(d).toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' }) : '';

// // ─── Status Config ────────────────────────────────────────────────────────────
// const STATUS = {
//     pending:    { label: 'En attente', color: 'bg-amber-100 text-amber-700',     dot: 'bg-amber-400' },
//     confirmed:  { label: 'Confirmé',   color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
//     completed:  { label: 'Terminé',    color: 'bg-blue-100 text-blue-700',       dot: 'bg-blue-400' },
//     cancelled:  { label: 'Annulé',     color: 'bg-red-100 text-red-600',         dot: 'bg-red-400' },
//     checked_in: { label: 'Checked In', color: 'bg-[#1B3022]/10 text-[#1B3022]',  dot: 'bg-[#1B3022]' },
// };

// const ROOM_STATUS = {
//     available:   { label: 'Disponible',  bg: 'bg-emerald-500', text: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
//     occupied:    { label: 'Occupée',     bg: 'bg-[#1B3022]',   text: 'text-[#1B3022] bg-[#1B3022]/10 border-[#1B3022]/20' },
//     cleaning:    { label: 'Nettoyage',   bg: 'bg-amber-400',   text: 'text-amber-700 bg-amber-50 border-amber-200' },
//     maintenance: { label: 'Maintenance', bg: 'bg-red-400',     text: 'text-red-700 bg-red-50 border-red-200' },
// };

// // ─── Badge ────────────────────────────────────────────────────────────────────
// const Badge = ({ status }) => {
//     const s = STATUS[status] ?? STATUS.pending;
//     return (
//         <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.color}`}>
//             <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
//             {s.label}
//         </span>
//     );
// };

// // ─── Receipt Modal ────────────────────────────────────────────────────────────
// const ReceiptModal = ({ booking, onClose }) => {
//     const receiptRef = useRef();
//     if (!booking) return null;
//     const nights   = nightsBetween(booking.date_debut, booking.date_fin);
//     const services = booking.room?.services ?? [];
//     const guest    = `${booking.user?.prenom ?? ''} ${booking.user?.nom ?? ''}`.trim() || 'Guest';

//     const handlePrint = () => {
//         const w = window.open('', '_blank');
//         if (!w) {
//             alert("Veuillez autoriser les fenêtres pop-up pour imprimer le reçu.");
//             return;
//         }
//         w.document.write(`<html><head><title>Reçu #${booking.id}</title>
//         <style>
//             body{font-family:Georgia,serif;padding:40px;color:#1B3022}
//             .row{display:flex;justify-content:space-between;margin:6px 0;font-size:13px}
//             .label{color:#6b7280}.divider{border-top:1px dashed #e5e7eb;margin:16px 0}
//             h1{font-size:24px;margin-bottom:4px}.sub{font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase}
//             .total{font-size:18px;font-weight:bold}.footer{text-align:center;font-size:10px;color:#d1d5db;margin-top:20px;text-transform:uppercase;letter-spacing:2px}
//         </style></head><body>${receiptRef.current.innerHTML}</body></html>`);
//         w.document.close();
//         w.print();
//     };

//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//             onClick={onClose}>
//             <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
//                 className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
//                 onClick={e => e.stopPropagation()}>
//                 <div className="bg-[#1B3022] px-6 py-5 flex justify-between items-center">
//                     <div>
//                         <p className="text-[9px] text-[#C8A96A] uppercase tracking-widest font-bold">Reçu de séjour</p>
//                         <p className="text-white font-serif text-lg">Le Musée</p>
//                     </div>
//                     <button onClick={onClose}><X size={18} className="text-white/50 hover:text-white" /></button>
//                 </div>
//                 <div ref={receiptRef} className="px-6 py-5 space-y-4">
//                     <div>
//                         <h1 className="font-serif text-2xl text-[#1B3022]">Le Musée</h1>
//                         <p className="sub text-[10px] text-gray-400 uppercase tracking-widest">Hôtel de luxe — Maroc</p>
//                         <p className="text-[10px] text-gray-400 mt-1">Réservation #{booking.id}</p>
//                     </div>
//                     <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
//                         {[
//                             ['Client',  guest],
//                             ['Chambre', booking.room?.num_room ?? '—'],
//                             ['Arrivée', fmt(booking.date_debut)],
//                             ['Départ',  fmt(booking.date_fin)],
//                             ['Nuits',   nights],
//                             ['Coupon',  booking.coupon_id ? 'Appliqué ✓' : 'Aucun'],
//                         ].map(([label, value]) => (
//                             <div key={label} className="row flex justify-between text-xs">
//                                 <span className="label text-gray-400">{label}</span>
//                                 <span className="font-bold text-[#1B3022]">{value}</span>
//                             </div>
//                         ))}
//                     </div>
//                     {services.length > 0 && (
//                         <div className="border-t border-dashed border-gray-200 pt-3">
//                             <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2">Services inclus</p>
//                             {services.map(s => (
//                                 <div key={s.id} className="flex items-center gap-2 text-xs text-gray-500 mb-1">
//                                     <Check size={10} className="text-emerald-500" /> {s.nom_service}
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                     <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
//                         <span className="text-sm font-bold text-[#1B3022]">Total</span>
//                         <span className="text-xl font-bold text-[#C8A96A]">{booking.prix_total} MAD</span>
//                     </div>
//                     <p className="text-[9px] text-center text-gray-300 uppercase tracking-widest">
//                         Merci de votre confiance — Le Musée
//                     </p>
//                 </div>
//                 <div className="px-6 pb-5">
//                     <button onClick={handlePrint}
//                         className="w-full flex items-center justify-center gap-2 bg-[#1B3022] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-colors">
//                         <Printer size={14} /> Imprimer le reçu
//                     </button>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// // ─── Note Modal ───────────────────────────────────────────────────────────────
// const NoteModal = ({ booking, onClose, onSave }) => {
//     const [note, setNote] = useState(booking?.note ?? '');
//     if (!booking) return null;
//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//             onClick={onClose}>
//             <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
//                 className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
//                 onClick={e => e.stopPropagation()}>
//                 <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
//                     <p className="font-serif text-[#1B3022]">Note interne — #{booking.id}</p>
//                     <button onClick={onClose}><X size={16} className="text-gray-400" /></button>
//                 </div>
//                 <div className="px-6 py-4">
//                     <textarea value={note} onChange={e => setNote(e.target.value)}
//                         placeholder="Ajouter une note sur ce séjour..."
//                         className="w-full h-32 text-xs text-[#1B3022] border border-gray-100 rounded-xl p-3 resize-none focus:outline-none focus:border-[#1B3022]/30" />
//                 </div>
//                 <div className="px-6 pb-5 flex gap-2">
//                     <button onClick={onClose}
//                         className="flex-1 py-2.5 rounded-xl border border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-widest">
//                         Annuler
//                     </button>
//                     <button onClick={() => onSave(booking.id, note)}
//                         className="flex-1 py-2.5 rounded-xl bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-colors">
//                         Sauvegarder
//                     </button>
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// // ─── Notifications Panel ──────────────────────────────────────────────────────
// const NotificationsPanel = ({ onClose }) => {
//     const [notifs, setNotifs]   = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError]     = useState(null);

//     useEffect(() => {
//         (async () => {
//             try {
//                 const res = await api.get('/notifications');
//                 const raw = res.data;
//                 const list = Array.isArray(raw)
//                     ? raw
//                     : Array.isArray(raw?.data)
//                         ? raw.data
//                         : [];
//                 setNotifs(list);
//             } catch (e) {
//                 console.error('Notifications fetch error:', e);
//                 setError('Impossible de charger les notifications.');
//             } finally { setLoading(false); }
//         })();
//     }, []);

//     const markRead = async (id) => {
//         try {
//             await api.patch(`/notifications/${id}/read`);
//             setNotifs(n => n.map(x => x.id === id ? { ...x, is_read: true } : x));
//         } catch (e) { console.error(e); }
//     };

//     const markAll = async () => {
//         try {
//             await api.post('/notifications/mark-all-read');
//             setNotifs(n => n.map(x => ({ ...x, is_read: true })));
//         } catch (e) { console.error(e); }
//     };

//     return (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-end"
//             onClick={onClose}>
//             <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
//                 className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden mt-20 mr-6"
//                 onClick={e => e.stopPropagation()}>
//                 <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
//                     <p className="font-serif text-[#1B3022]">Notifications</p>
//                     <div className="flex items-center gap-3">
//                         <button onClick={markAll} className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-[#1B3022] transition-colors">
//                             Tout lire
//                         </button>
//                         <button onClick={onClose}><X size={16} className="text-gray-400" /></button>
//                     </div>
//                 </div>
//                 <div className="overflow-y-auto max-h-96">
//                     {loading ? (
//                         <div className="flex justify-center py-8">
//                             <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#1B3022]" />
//                         </div>
//                     ) : error ? (
//                         <div className="text-center py-12 text-red-400">
//                             <AlertCircle size={24} className="mx-auto mb-2" />
//                             <p className="text-xs italic">{error}</p>
//                         </div>
//                     ) : notifs.length === 0 ? (
//                         <div className="text-center py-12 text-gray-300">
//                             <Bell size={24} className="mx-auto mb-2" />
//                             <p className="text-xs italic">Aucune notification</p>
//                         </div>
//                     ) : notifs.map(n => (
//                         <div key={n.id} onClick={() => markRead(n.id)}
//                             className={`px-6 py-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${!n.is_read ? 'bg-[#1B3022]/5' : ''}`}>
//                             <div className="flex items-start gap-3">
//                                 <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.is_read ? 'bg-gray-200' : 'bg-[#1B3022]'}`} />
//                                 <div>
//                                     <p className="text-xs text-[#1B3022]">{n.message}</p>
//                                     <p className="text-[9px] text-gray-400 mt-1">{fmtTime(n.created_at)}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </motion.div>
//         </motion.div>
//     );
// };

// // ─── Booking Card ─────────────────────────────────────────────────────────────
// const BookingCard = ({ booking, onCheckIn, onCheckOut, onCancel, onReceipt, onNote, onStatusChange }) => {
//     const [open, setOpen]           = useState(false);
//     const [statusMenu, setStatusMenu] = useState(false);
//     const nights   = nightsBetween(booking.date_debut, booking.date_fin);
//     const guest    = `${booking.user?.prenom ?? ''} ${booking.user?.nom ?? ''}`.trim() || 'Guest';
//     const room     = booking.room?.num_room ?? '—';
//     const services = booking.room?.services ?? [];

//     return (
//         <motion.div layout className={`bg-white rounded-2xl border overflow-hidden transition-all ${open ? 'border-[#1B3022]/20 shadow-md' : 'border-gray-100'}`}>
//             <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
//                 onClick={() => setOpen(o => !o)}>
//                 <div className="w-9 h-9 rounded-xl bg-[#1B3022]/10 flex items-center justify-center flex-shrink-0">
//                     <User size={14} className="text-[#1B3022]" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                     <p className="font-bold text-[#1B3022] text-sm truncate">{guest}</p>
//                     <p className="text-[10px] text-gray-400 flex items-center gap-1.5 flex-wrap">
//                         <BedDouble size={10} /> Ch. {room}
//                         <span className="text-gray-200">|</span>
//                         <Calendar size={10} /> {fmt(booking.date_debut)} → {fmt(booking.date_fin)}
//                         <span className="text-gray-200">|</span>
//                         {nights} nuit{nights > 1 ? 's' : ''}
//                     </p>
//                 </div>
//                 <div className="flex items-center gap-2 flex-shrink-0">
//                     <Badge status={booking.status_payment} />
//                     <ChevronRight size={13} className={`text-gray-300 transition-transform ${open ? 'rotate-90' : ''}`} />
//                 </div>
//             </div>

//             <AnimatePresence>
//                 {open && (
//                     <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
//                         <div className="px-5 pb-4 pt-2 border-t border-gray-50 space-y-4">
//                             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                                 {[
//                                     { label: 'Réservation #', value: `#${booking.id}` },
//                                     { label: 'Total',          value: `${booking.prix_total} MAD` },
//                                     { label: 'Nuits',          value: nights },
//                                     { label: 'Étage',          value: booking.room?.floor ? `Étage ${booking.room.floor}` : '—' },
//                                     { label: 'Email',          value: booking.user?.email ?? '—' },
//                                     { label: 'Téléphone',      value: booking.user?.telephone ?? '—' },
//                                     { label: 'CIN/Passeport',  value: booking.user?.cin_passport ?? '—' },
//                                     { label: 'Coupon',         value: booking.coupon_id ? 'Appliqué ✓' : 'Aucun' },
//                                 ].map(({ label, value }) => (
//                                     <div key={label} className="bg-gray-50 rounded-xl px-3 py-2">
//                                         <p className="text-[9px] uppercase tracking-widest text-gray-400">{label}</p>
//                                         <p className="text-xs font-bold text-[#1B3022] mt-0.5 truncate">{value}</p>
//                                     </div>
//                                 ))}
//                             </div>

//                             {services.length > 0 && (
//                                 <div>
//                                     <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2">Services inclus</p>
//                                     <div className="flex flex-wrap gap-2">
//                                         {services.map(s => (
//                                             <span key={s.id} className="flex items-center gap-1 px-2.5 py-1 bg-[#1B3022]/5 text-[#1B3022] rounded-full text-[10px] font-medium">
//                                                 <Check size={9} className="text-emerald-500" /> {s.nom_service}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {booking.note && (
//                                 <div className="bg-amber-50 rounded-xl px-3 py-2 border border-amber-100">
//                                     <p className="text-[9px] uppercase tracking-widest text-amber-400 mb-1">Note interne</p>
//                                     <p className="text-xs text-amber-700">{booking.note}</p>
//                                 </div>
//                             )}

//                             <div className="flex flex-wrap gap-2 pt-1 items-center">
//                                 <div className="relative">
//                                     <button
//                                         onClick={() => setStatusMenu(m => !m)}
//                                         className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-colors ${STATUS[booking.status_payment]?.color ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
//                                         <span className={`w-1.5 h-1.5 rounded-full ${STATUS[booking.status_payment]?.dot}`} />
//                                         {STATUS[booking.status_payment]?.label ?? booking.status_payment}
//                                         <ChevronRight size={10} className={`transition-transform ${statusMenu ? 'rotate-90' : ''}`} />
//                                     </button>
//                                     <AnimatePresence>
//                                         {statusMenu && (
//                                             <motion.div
//                                                 initial={{ opacity: 0, y: -4, scale: 0.97 }}
//                                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                                 exit={{ opacity: 0, y: -4, scale: 0.97 }}
//                                                 transition={{ duration: 0.12 }}
//                                                 className="absolute bottom-full mb-1 left-0 bg-white border border-gray-100 rounded-xl shadow-lg z-30 overflow-hidden min-w-[160px]">
//                                                 {[
//                                                     { key: 'pending',    label: 'En attente' },
//                                                     { key: 'confirmed',  label: 'Confirmé' },
//                                                     { key: 'checked_in', label: 'Checked In' },
//                                                     { key: 'completed',  label: 'Terminé' },
//                                                     { key: 'cancelled',  label: 'Annulé' },
//                                                 ].filter(s => s.key !== booking.status_payment).map(({ key, label }) => (
//                                                     <button key={key}
//                                                         onClick={() => { onStatusChange(booking.id, key); setStatusMenu(false); }}
//                                                         className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors text-left">
//                                                         <span className={`w-1.5 h-1.5 rounded-full ${STATUS[key]?.dot}`} />
//                                                         <span className={STATUS[key]?.color.split(' ')[1]}>{label}</span>
//                                                     </button>
//                                                 ))}
//                                             </motion.div>
//                                         )}
//                                     </AnimatePresence>
//                                 </div>

//                                 {['pending', 'confirmed'].includes(booking.status_payment) && (
//                                     <button onClick={() => onCheckIn(booking.id)}
//                                         className="flex items-center gap-1.5 px-4 py-2 bg-[#1B3022] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[#2d5238] transition-colors">
//                                         <LogIn size={12} /> Check In
//                                     </button>
//                                 )}
//                                 {booking.status_payment === 'checked_in' && (
//                                     <button onClick={() => onCheckOut(booking.id)}
//                                         className="flex items-center gap-1.5 px-4 py-2 bg-[#C8A96A] text-[#1B3022] rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[#b8945a] transition-colors">
//                                         <LogOut size={12} /> Check Out
//                                     </button>
//                                 )}
//                                 {['pending','confirmed','checked_in','completed'].includes(booking.status_payment) && (
//                                     <button onClick={() => onReceipt(booking)}
//                                         className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
//                                         <Printer size={12} /> Reçu
//                                     </button>
//                                 )}
//                                 <button onClick={() => onNote(booking)}
//                                     className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors">
//                                     <StickyNote size={12} /> Note
//                                 </button>
//                                 {['pending','confirmed'].includes(booking.status_payment) && (
//                                     <button onClick={() => onCancel(booking.id)}
//                                         className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-red-100 transition-colors">
//                                         <XCircle size={12} /> Annuler
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </motion.div>
//     );
// };

// // ─── Room Card ────────────────────────────────────────────────────────────────
// const RoomCard = ({ room }) => {
//     const s   = room.status ?? 'available';
//     const cfg = ROOM_STATUS[s] ?? ROOM_STATUS.available;
//     const services = room.services ?? [];
//     return (
//         <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
//             <div className="flex justify-between items-start">
//                 <div>
//                     <p className="text-[9px] uppercase tracking-widest text-gray-400">Chambre</p>
//                     <p className="text-2xl font-bold text-[#1B3022]">{room.num_room ?? '—'}</p>
//                     <p className="text-[10px] text-gray-400">Étage {room.floor ?? '—'}</p>
//                 </div>
//                 <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${cfg.text}`}>
//                     {cfg.label}
//                 </span>
//             </div>
//             <div>
//                 <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Type</p>
//                 <p className="text-xs font-medium text-[#1B3022]">{room.type?.title ?? room.room_type?.name ?? '—'}</p>
//                 {(room.type?.base_price || room.room_type?.base_price) && (
//                     <p className="text-[10px] text-[#C8A96A] font-bold mt-0.5">{room.type?.base_price ?? room.room_type?.base_price} MAD / nuit</p>
//                 )}
//             </div>
//             {services.length > 0 && (
//                 <div className="flex flex-wrap gap-1">
//                     {services.slice(0, 3).map(s => (
//                         <span key={s.id} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full text-[9px]">{s.nom_service}</span>
//                     ))}
//                     {services.length > 3 && <span className="text-[9px] text-gray-400">+{services.length - 3}</span>}
//                 </div>
//             )}
//         </motion.div>
//     );
// };

// // ─── Overview Tab ─────────────────────────────────────────────────────────────
// const OverviewTab = ({ bookings, rooms }) => {
//     const todayStr  = new Date().toISOString().slice(0, 10);
//     const toDate = (d) => d ? d.slice(0, 10) : null;

//     const checkIns  = bookings.filter(b =>
//         toDate(b.date_debut) === todayStr &&
//         ['confirmed', 'pending'].includes(b.status_payment)
//     ).length;

//     const checkOuts = bookings.filter(b =>
//         toDate(b.date_fin) === todayStr &&
//         b.status_payment === 'checked_in'
//     ).length;

//     const inHouse   = bookings.filter(b => b.status_payment === 'checked_in').length;
//     const pending   = bookings.filter(b => b.status_payment === 'pending').length;
//     const available = rooms.filter(r => r.status === 'available').length;

//     const STATS = [
//         { label: 'Arrivées auj.',   value: checkIns,  icon: LogIn,       color: 'bg-emerald-500' },
//         { label: 'Départs auj.',    value: checkOuts, icon: LogOut,      color: 'bg-[#C8A96A]' },
//         { label: 'En séjour',       value: inHouse,   icon: BedDouble,   color: 'bg-blue-500' },
//         { label: 'En attente',      value: pending,   icon: AlertCircle, color: 'bg-red-400' },
//         { label: 'Chambres libres', value: available, icon: Home,        color: 'bg-[#1B3022]' },
//     ];

//     return (
//         <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
//                 {STATS.map((s, i) => (
//                     <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: i * 0.08 }}
//                         className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
//                         <div className={`w-11 h-11 ${s.color} text-white rounded-xl flex items-center justify-center mb-4 shadow`}>
//                             <s.icon size={20} />
//                         </div>
//                         <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
//                         <h4 className="text-3xl font-bold text-[#1B3022]">{s.value}</h4>
//                     </motion.div>
//                 ))}
//             </div>

//             <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
//                 <div className="px-7 py-5 border-b border-gray-50 bg-gray-50/60">
//                     <h3 className="font-serif text-lg text-[#1B3022]">État des Chambres</h3>
//                 </div>
//                 <div className="p-7 grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {Object.entries(ROOM_STATUS).map(([key, cfg]) => {
//                         const count = rooms.filter(r => r.status === key).length;
//                         return (
//                             <div key={key} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
//                                 <div className={`w-3 h-3 rounded-full ${cfg.bg}`} />
//                                 <div>
//                                     <p className="text-[9px] uppercase tracking-widest text-gray-400">{cfg.label}</p>
//                                     <p className="text-xl font-bold text-[#1B3022]">{count}</p>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>

//             <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
//                 <div className="px-7 py-5 border-b border-gray-50 bg-gray-50/60">
//                     <h3 className="font-serif text-lg text-[#1B3022]">Séjours actifs aujourd'hui</h3>
//                 </div>
//                 <div className="divide-y divide-gray-50">
//                     {bookings
//                         .filter(b =>
//                             toDate(b.date_debut) === todayStr &&
//                             ['confirmed', 'pending', 'checked_in'].includes(b.status_payment)
//                         )
//                         .slice(0, 5)
//                         .map(b => (
//                             <div key={b.id} className="px-7 py-4 flex items-center justify-between">
//                                 <div>
//                                     <p className="text-sm font-medium text-[#1B3022]">
//                                         {`${b.user?.prenom ?? ''} ${b.user?.nom ?? ''}`.trim() || 'Guest'}
//                                     </p>
//                                     <p className="text-[10px] text-gray-400">Ch. {b.room?.num_room ?? '—'}</p>
//                                 </div>
//                                 <Badge status={b.status_payment} />
//                             </div>
//                         ))}
//                     {bookings.filter(b =>
//                         toDate(b.date_debut) === todayStr &&
//                         ['confirmed', 'pending', 'checked_in'].includes(b.status_payment)
//                     ).length === 0 && (
//                         <p className="px-7 py-8 text-sm text-gray-300 italic text-center">Aucun séjour actif aujourd'hui.</p>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// // ─── Bookings Tab ─────────────────────────────────────────────────────────────
// const BookingsTab = ({ bookings, onCheckIn, onCheckOut, onCancel, onReceipt, onNote, notes, onStatusChange }) => {
//     const [search, setSearch]       = useState('');
//     const [filterStatus, setFilter] = useState('all');

//     const filtered = bookings
//         .map(b => ({ ...b, note: notes[b.id] ?? b.note }))
//         .filter(b => {
//             const q = search.toLowerCase();
//             const matchSearch = !q
//                 || `${b.user?.prenom ?? ''} ${b.user?.nom ?? ''}`.toLowerCase().includes(q)
//                 || b.user?.email?.toLowerCase().includes(q)
//                 || String(b.id).includes(q)
//                 || String(b.room?.num_room ?? '').toLowerCase().includes(q);
//             const matchStatus = filterStatus === 'all' || b.status_payment === filterStatus;
//             return matchSearch && matchStatus;
//         });

//     return (
//         <div className="space-y-4">
//             <div className="flex gap-3 flex-wrap">
//                 <div className="relative flex-1 min-w-[220px]">
//                     <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
//                     <input value={search} onChange={e => setSearch(e.target.value)}
//                         placeholder="Nom, email, chambre, #réservation..."
//                         className="w-full pl-9 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-xs text-[#1B3022] placeholder-gray-300 focus:outline-none focus:border-[#1B3022]/30" />
//                 </div>
//                 <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 flex-wrap">
//                     {[
//                         { v: 'all',        l: 'Tous' },
//                         { v: 'pending',    l: 'Attente' },
//                         { v: 'confirmed',  l: 'Confirmé' },
//                         { v: 'checked_in', l: 'In' },
//                         { v: 'completed',  l: 'Terminé' },
//                         { v: 'cancelled',  l: 'Annulé' },
//                     ].map(({ v, l }) => (
//                         <button key={v} onClick={() => setFilter(v)}
//                             className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${
//                                 filterStatus === v ? 'bg-[#1B3022] text-white' : 'text-gray-400 hover:text-[#1B3022]'
//                             }`}>
//                             {l}
//                         </button>
//                     ))}
//                 </div>
//             </div>
//             <p className="text-[10px] text-gray-400 uppercase tracking-widest">
//                 {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
//             </p>
//             {filtered.length === 0 ? (
//                 <div className="text-center py-16 text-gray-300">
//                     <BedDouble size={32} className="mx-auto mb-2" />
//                     <p className="text-sm italic">Aucune réservation trouvée.</p>
//                 </div>
//             ) : (
//                 <div className="space-y-2">
//                     {filtered.map(b => (
//                         <BookingCard key={b.id} booking={b}
//                             onCheckIn={onCheckIn} onCheckOut={onCheckOut}
//                             onCancel={onCancel} onReceipt={onReceipt} onNote={onNote}
//                             onStatusChange={onStatusChange} />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// // ─── Rooms Tab ────────────────────────────────────────────────────────────────
// const RoomsTab = ({ rooms }) => (
//     <div>
//         <div className="flex gap-3 mb-5 flex-wrap">
//             {Object.entries(ROOM_STATUS).map(([key, cfg]) => (
//                 <div key={key} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-100">
//                     <div className={`w-2 h-2 rounded-full ${cfg.bg}`} />
//                     <span className="text-[10px] text-gray-500">{cfg.label}</span>
//                     <span className="text-[10px] font-bold text-[#1B3022]">{rooms.filter(r => r.status === key).length}</span>
//                 </div>
//             ))}
//         </div>
//         {rooms.length === 0 ? (
//             <div className="text-center py-16 text-gray-300">
//                 <Home size={32} className="mx-auto mb-2" />
//                 <p className="text-sm italic">Aucune chambre trouvée.</p>
//             </div>
//         ) : (
//             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                 {rooms.map(r => <RoomCard key={r.id} room={r} />)}
//             </div>
//         )}
//     </div>
// );

// // ─── Main Dashboard ───────────────────────────────────────────────────────────
// const ReceptionistDashboard = () => {
//     const [activeTab, setActiveTab]     = useState('Overview');
//     const [bookings, setBookings]       = useState([]);
//     const [rooms, setRooms]             = useState([]);
//     const [loading, setLoading]         = useState(true);
//     const [unread, setUnread]           = useState(0);
//     const [showNotifs, setShowNotifs]   = useState(false);
//     const [receipt, setReceipt]         = useState(null);
//     const [noteBooking, setNoteBooking] = useState(null);
//     const [notes, setNotes]             = useState({});
//     const navigate = useNavigate();

//     const userName = localStorage.getItem('user_name') ?? 'Staff';
//     const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

//     const loadAll = useCallback(async () => {
//         setLoading(true);
//         try {
//             const [bRes, rRes] = await Promise.all([
//                 api.get('/admin/bookings'),
//                 api.get('/rooms'),
//             ]);
//             const bookingsData = bRes.data?.data ?? bRes.data ?? [];
//             const rawRooms     = rRes.data?.data ?? rRes.data ?? [];
//             const todayStr2 = new Date().toISOString().slice(0, 10);

//             const checkedInIds = new Set(
//                 bookingsData
//                     .filter(b => b.status_payment === 'checked_in')
//                     .map(b => b.room_id)
//             );

//             const reservedTodayIds = new Set(
//                 bookingsData
//                     .filter(b =>
//                         ['pending', 'confirmed'].includes(b.status_payment) &&
//                         b.date_debut?.slice(0, 10) <= todayStr2 &&
//                         b.date_fin?.slice(0, 10)   >  todayStr2
//                     )
//                     .map(b => b.room_id)
//             );

//             const roomsWithStatus = rawRooms.map(r => {
//                 if (checkedInIds.has(r.id) || reservedTodayIds.has(r.id)) {
//                     return { ...r, status: 'occupied' };
//                 }
//                 return { ...r, status: r.status ?? 'available' };
//             });

//             setBookings(bookingsData);
//             setRooms(roomsWithStatus);
//         } catch (e) { console.error(e); }
//         finally { setLoading(false); }
//     }, []);

//     const loadUnread = useCallback(async () => {
//         try {
//             const res = await api.get('/notifications/unread-count');
//             const val = res.data?.unread_count ?? res.data?.count ?? res.data ?? 0;
//             setUnread(typeof val === 'number' ? val : 0);
//         } catch (e) { console.error('loadUnread error:', e); }
//     }, []);

//     useEffect(() => { loadAll(); loadUnread(); }, [loadAll, loadUnread]);

//     const handleLogout = async () => {
//         try { await api.post('/logout'); } catch (_) {}
//         localStorage.removeItem('auth_token');
//         localStorage.removeItem('user_role');
//         localStorage.removeItem('user_name');
//         navigate('/auth');
//     };

//     const handleCheckIn  = async (id) => {
//         try { await api.patch(`/admin/bookings/${id}`, { status_payment: 'checked_in' }); loadAll(); }
//         catch (e) { console.error(e); }
//     };
//     const handleCheckOut = async (id) => {
//         try { await api.patch(`/admin/bookings/${id}`, { status_payment: 'completed' }); loadAll(); }
//         catch (e) { console.error(e); }
//     };
//     const handleCancel = async (id) => {
//         if (!confirm('Annuler cette réservation ?')) return;
//         try { await api.patch(`/admin/bookings/${id}`, { status_payment: 'cancelled' }); loadAll(); }
//         catch (e) { console.error(e); }
//     };
//     const handleStatusChange = async (id, newStatus) => {
//         try {
//             await api.patch(`/admin/bookings/${id}`, { status_payment: newStatus });
//             setBookings(prev => prev.map(b => b.id === id ? { ...b, status_payment: newStatus } : b));
//         } catch (e) { console.error(e); }
//     };
//     const handleSaveNote = (id, note) => {
//         setNotes(n => ({ ...n, [id]: note }));
//         setNoteBooking(null);
//     };

//     // FIX 1: Included "Chambres" layout tab explicitly here
//     const tabs = [
//         { name: 'Overview',      Icon: LayoutDashboard },
//         { name: 'Réservations',  Icon: Calendar },
//         { name: 'Chambres',      Icon: Home }
//     ];

//     if (loading) return (
//         <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE]">
//             <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B3022] mx-auto mb-4" />
//                 <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em]">Chargement…</p>
//             </div>
//         </div>
//     );

//     return (
//         <div className="flex min-h-screen bg-[#F5F3EE]">
//             {/* ── Sidebar ── */}
//             <aside className="w-60 bg-[#1B3022] text-white hidden md:flex flex-col shadow-2xl flex-shrink-0">
//                 <div className="p-8 border-b border-white/10">
//                     <h1 className="text-lg font-serif tracking-[0.2em] uppercase text-[#C8A96A]">Le Musée</h1>
//                     <span className="text-[9px] opacity-40 tracking-[0.3em] uppercase">Réception</span>
//                 </div>

//                 <nav className="flex-1 p-5 space-y-1">
//                     {tabs.map(({ name, Icon }) => (
//                         <button key={name} onClick={() => setActiveTab(name)}
//                             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs transition-all duration-200 ${
//                                 activeTab === name
//                                     ? 'bg-[#C8A96A] text-[#1B3022] font-bold shadow-md'
//                                     : 'hover:bg-white/5 opacity-60 hover:opacity-100'
//                             }`}>
//                             <Icon size={15} />
//                             {name}
//                         </button>
//                     ))}

//                     <div className="border-t border-white/10 my-3" />

//                     {/* FIX 2: Used SPA hook instead of forcing window reload */}
//                     <button
//                         type="button"
//                         onClick={() => navigate('/staff/rooms')}
//                         className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs bg-[#C8A96A]/15 hover:bg-[#C8A96A]/30 text-[#C8A96A] font-bold border border-[#C8A96A]/30 hover:border-[#C8A96A]/60 transition-all"
//                     >
//                         <Wrench size={15} />
//                         Gestion Chambres
//                     </button>
//                 </nav>

//                 <div className="p-5 border-t border-white/10 space-y-3">
//                     <div className="flex items-center gap-2.5 px-2">
//                         <div className="w-7 h-7 bg-[#C8A96A] rounded-full flex items-center justify-center text-[10px] font-bold text-[#1B3022]">
//                             {initials}
//                         </div>
//                         <div>
//                             <p className="text-[9px] font-bold uppercase tracking-tight text-white/80">{userName}</p>
//                             <div className="flex items-center gap-1">
//                                 <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
//                                 <span className="text-[8px] text-emerald-400 font-bold">ONLINE</span>
//                             </div>
//                         </div>
//                     </div>
//                     <button onClick={handleLogout}
//                         className="flex items-center gap-2.5 px-2 text-xs text-red-300/80 hover:text-red-300 transition-colors w-full">
//                         <LogOut size={13} /> Déconnexion
//                     </button>
//                 </div>
//             </aside>

//             {/* ── Main Canvas ── */}
//             <main className="flex-1 overflow-y-auto">
//                 <header className="flex justify-between items-center px-8 pt-8 pb-4">
//                     <div>
//                         <h2 className="text-2xl font-serif text-[#1B3022] tracking-tight">{activeTab}</h2>
//                         <p className="text-[10px] text-gray-400 italic mt-0.5">
//                             {new Date().toLocaleDateString('fr-MA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
//                         </p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                         <button onClick={() => setShowNotifs(true)}
//                             className="relative w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:border-[#1B3022]/30 transition-colors">
//                             <Bell size={15} className="text-[#1B3022]" />
//                             {unread > 0 && (
//                                 <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8A96A] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
//                                     {unread}
//                                 </span>
//                             )}
//                         </button>
//                         <button onClick={loadAll}
//                             className="flex items-center gap-2 text-[9px] bg-[#1B3022] text-white px-4 py-2.5 rounded-full font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-colors">
//                             <RefreshCw size={11} /> Actualiser
//                         </button>
//                     </div>
//                 </header>

//                 <div className="px-8 pb-10">
//                     <AnimatePresence mode="wait">
//                         <motion.div key={activeTab}
//                             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
//                             {activeTab === 'Overview' && (
//                                 <OverviewTab bookings={bookings} rooms={rooms} />
//                             )}
//                             {activeTab === 'Réservations' && (
//                                 <BookingsTab
//                                     bookings={bookings} notes={notes}
//                                     onCheckIn={handleCheckIn} onCheckOut={handleCheckOut}
//                                     onCancel={handleCancel} onReceipt={setReceipt} onNote={setNoteBooking}
//                                     onStatusChange={handleStatusChange}
//                                 />
//                             )}
//                             {/* FIX 1: Linked layout visibility here */}
//                             {activeTab === 'Chambres' && (
//                                 <RoomsTab rooms={rooms} />
//                             )}
//                         </motion.div>
//                     </AnimatePresence>
//                 </div>
//             </main>

//             {/* Modals */}
//             <AnimatePresence>
//                 {showNotifs  && <NotificationsPanel onClose={() => { setShowNotifs(false); loadUnread(); }} />}
//                 {receipt     && <ReceiptModal booking={receipt} onClose={() => setReceipt(null)} />}
//                 {noteBooking && <NoteModal booking={noteBooking} onClose={() => setNoteBooking(null)} onSave={handleSaveNote} />}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default ReceptionistDashboard;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Search, BedDouble, LogIn, LogOut, AlertCircle,
    RefreshCw, User, Calendar, ChevronRight,
    Home, Bell, Printer, X, StickyNote, Check,
    XCircle, LayoutDashboard, Wrench
} from 'lucide-react';
import api from '../api';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const nightsBetween = (a, b) => {
    if (!a || !b) return 0;
    return Math.max(0, Math.round((new Date(b) - new Date(a)) / 86400000));
};
const fmt = (d) => d ? new Date(d).toLocaleDateString('fr-MA', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
const fmtTime = (d) => d ? new Date(d).toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' }) : '';

// ─── Status Config ────────────────────────────────────────────────────────────
const STATUS = {
    pending:    { label: 'En attente', color: 'bg-amber-100 text-amber-700',     dot: 'bg-amber-400' },
    confirmed:  { label: 'Confirmé',   color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
    completed:  { label: 'Terminé',    color: 'bg-blue-100 text-blue-700',       dot: 'bg-blue-400' },
    cancelled:  { label: 'Annulé',     color: 'bg-red-100 text-red-600',         dot: 'bg-red-400' },
    checked_in: { label: 'Checked In', color: 'bg-[#1B3022]/10 text-[#1B3022]',  dot: 'bg-[#1B3022]' },
};

const ROOM_STATUS = {
    available:   { label: 'Disponible',  bg: 'bg-emerald-500', text: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    occupied:    { label: 'Occupée',     bg: 'bg-[#1B3022]',   text: 'text-[#1B3022] bg-[#1B3022]/10 border-[#1B3022]/20' },
    cleaning:    { label: 'Nettoyage',   bg: 'bg-amber-400',   text: 'text-amber-700 bg-amber-50 border-amber-200' },
    maintenance: { label: 'Maintenance', bg: 'bg-red-400',     text: 'text-red-700 bg-red-50 border-red-200' },
};

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ status }) => {
    const s = STATUS[status] ?? STATUS.pending;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${s.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {s.label}
        </span>
    );
};

// ─── Receipt Modal ────────────────────────────────────────────────────────────
const ReceiptModal = ({ booking, onClose }) => {
    const receiptRef = useRef();
    if (!booking) return null;
    const nights   = nightsBetween(booking.date_debut, booking.date_fin);
    const services = booking.room?.services ?? [];
    const guest    = `${booking.user?.prenom ?? ''} ${booking.user?.nom ?? ''}`.trim() || 'Guest';

    const handlePrint = () => {
        const w = window.open('', '_blank');
        if (!w) {
            alert("Veuillez autoriser les fenêtres pop-up pour imprimer le reçu.");
            return;
        }
        w.document.write(`<html><head><title>Reçu #${booking.id}</title>
        <style>
            body{font-family:Georgia,serif;padding:40px;color:#1B3022}
            .row{display:flex;justify-content:space-between;margin:6px 0;font-size:13px}
            .label{color:#6b7280}.divider{border-top:1px dashed #e5e7eb;margin:16px 0}
            h1{font-size:24px;margin-bottom:4px}.sub{font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase}
            .total{font-size:18px;font-weight:bold}.footer{text-align:center;font-size:10px;color:#d1d5db;margin-top:20px;text-transform:uppercase;letter-spacing:2px}
        </style></head><body>${receiptRef.current.innerHTML}</body></html>`);
        w.document.close();
        w.print();
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}>
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}>
                <div className="bg-[#1B3022] px-6 py-5 flex justify-between items-center">
                    <div>
                        <p className="text-[9px] text-[#C8A96A] uppercase tracking-widest font-bold">Reçu de séjour</p>
                        <p className="text-white font-serif text-lg">Le Musée</p>
                    </div>
                    <button onClick={onClose}><X size={18} className="text-white/50 hover:text-white" /></button>
                </div>
                <div ref={receiptRef} className="px-6 py-5 space-y-4">
                    <div>
                        <h1 className="font-serif text-2xl text-[#1B3022]">Le Musée</h1>
                        <p className="sub text-[10px] text-gray-400 uppercase tracking-widest">Hôtel de luxe — Maroc</p>
                        <p className="text-[10px] text-gray-400 mt-1">Réservation #{booking.id}</p>
                    </div>
                    <div className="border-t border-dashed border-gray-200 pt-4 space-y-2">
                        {[
                            ['Client',  guest],
                            ['Chambre', booking.room?.num_room ?? '—'],
                            ['Arrivée', fmt(booking.date_debut)],
                            ['Départ',  fmt(booking.date_fin)],
                            ['Nuits',   nights],
                            ['Coupon',  booking.coupon_id ? 'Appliqué ✓' : 'Aucun'],
                        ].map(([label, value]) => (
                            <div key={label} className="row flex justify-between text-xs">
                                <span className="label text-gray-400">{label}</span>
                                <span className="font-bold text-[#1B3022]">{value}</span>
                            </div>
                        ))}
                    </div>
                    {services.length > 0 && (
                        <div className="border-t border-dashed border-gray-200 pt-3">
                            <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2">Services inclus</p>
                            {services.map(s => (
                                <div key={s.id} className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                    <Check size={10} className="text-emerald-500" /> {s.nom_service}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="border-t border-dashed border-gray-200 pt-3 flex justify-between items-center">
                        <span className="text-sm font-bold text-[#1B3022]">Total</span>
                        <span className="text-xl font-bold text-[#C8A96A]">{booking.prix_total} MAD</span>
                    </div>
                    <p className="text-[9px] text-center text-gray-300 uppercase tracking-widest">
                        Merci de votre confiance — Le Musée
                    </p>
                </div>
                <div className="px-6 pb-5">
                    <button onClick={handlePrint}
                        className="w-full flex items-center justify-center gap-2 bg-[#1B3022] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-colors">
                        <Printer size={14} /> Imprimer le reçu
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─── Note Modal ───────────────────────────────────────────────────────────────
const NoteModal = ({ booking, onClose, onSave }) => {
    const [note, setNote] = useState(booking?.note ?? '');
    if (!booking) return null;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}
                className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden"
                onClick={e => e.stopPropagation()}>
                <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
                    <p className="font-serif text-[#1B3022]">Note interne — #{booking.id}</p>
                    <button onClick={onClose}><X size={16} className="text-gray-400" /></button>
                </div>
                <div className="px-6 py-4">
                    <textarea value={note} onChange={e => setNote(e.target.value)}
                        placeholder="Ajouter une note sur ce séjour..."
                        className="w-full h-32 text-xs text-[#1B3022] border border-gray-100 rounded-xl p-3 resize-none focus:outline-none focus:border-[#1B3022]/30" />
                </div>
                <div className="px-6 pb-5 flex gap-2">
                    <button onClick={onClose}
                        className="flex-1 py-2.5 rounded-xl border border-gray-100 text-xs text-gray-400 font-bold uppercase tracking-widest">
                        Annuler
                    </button>
                    <button onClick={() => onSave(booking.id, note)}
                        className="flex-1 py-2.5 rounded-xl bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-colors">
                        Sauvegarder
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─── Notifications Panel ──────────────────────────────────────────────────────
const NotificationsPanel = ({ onClose }) => {
    const [notifs, setNotifs]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await api.get('/notifications');
                const raw = res.data;
                const list = Array.isArray(raw)
                    ? raw
                    : Array.isArray(raw?.data)
                        ? raw.data
                        : [];
                setNotifs(list);
            } catch (e) {
                console.error('Notifications fetch error:', e);
                setError('Impossible de charger les notifications.');
            } finally { setLoading(false); }
        })();
    }, []);

    const markRead = async (id) => {
        try {
            await api.patch(`/notifications/${id}/read`);
            setNotifs(n => n.map(x => x.id === id ? { ...x, is_read: true } : x));
        } catch (e) { console.error(e); }
    };

    const markAll = async () => {
        try {
            await api.post('/notifications/mark-all-read');
            setNotifs(n => n.map(x => ({ ...x, is_read: true })));
        } catch (e) { console.error(e); }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-end"
            onClick={onClose}>
            <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden mt-20 mr-6"
                onClick={e => e.stopPropagation()}>
                <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
                    <p className="font-serif text-[#1B3022]">Notifications</p>
                    <div className="flex items-center gap-3">
                        <button onClick={markAll} className="text-[9px] uppercase tracking-widest text-gray-400 hover:text-[#1B3022] transition-colors">
                            Tout lire
                        </button>
                        <button onClick={onClose}><X size={16} className="text-gray-400" /></button>
                    </div>
                </div>
                <div className="overflow-y-auto max-h-96">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-[#1B3022]" />
                        </div>
                    ) : error ? (
                        <div className="text-center py-12 text-red-400">
                            <AlertCircle size={24} className="mx-auto mb-2" />
                            <p className="text-xs italic">{error}</p>
                        </div>
                    ) : notifs.length === 0 ? (
                        <div className="text-center py-12 text-gray-300">
                            <Bell size={24} className="mx-auto mb-2" />
                            <p className="text-xs italic">Aucune notification</p>
                        </div>
                    ) : notifs.map(n => (
                        <div key={n.id} onClick={() => markRead(n.id)}
                            className={`px-6 py-4 border-b border-gray-50 cursor-pointer hover:bg-gray-50 transition-colors ${!n.is_read ? 'bg-[#1B3022]/5' : ''}`}>
                            <div className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.is_read ? 'bg-gray-200' : 'bg-[#1B3022]'}`} />
                                <div>
                                    <p className="text-xs text-[#1B3022]">{n.message}</p>
                                    <p className="text-[9px] text-gray-400 mt-1">{fmtTime(n.created_at)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};

// ─── Booking Card ─────────────────────────────────────────────────────────────
const BookingCard = ({ booking, onCheckIn, onCheckOut, onCancel, onReceipt, onNote, onStatusChange }) => {
    const [open, setOpen]           = useState(false);
    const [statusMenu, setStatusMenu] = useState(false);
    const nights   = nightsBetween(booking.date_debut, booking.date_fin);
    const guest    = `${booking.user?.prenom ?? ''} ${booking.user?.nom ?? ''}`.trim() || 'Guest';
    const room     = booking.room?.num_room ?? '—';
    const services = booking.room?.services ?? [];

    return (
        <motion.div layout className={`bg-white rounded-2xl border overflow-hidden transition-all ${open ? 'border-[#1B3022]/20 shadow-md' : 'border-gray-100'}`}>
            <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setOpen(o => !o)}>
                <div className="w-9 h-9 rounded-xl bg-[#1B3022]/10 flex items-center justify-center flex-shrink-0">
                    <User size={14} className="text-[#1B3022]" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#1B3022] text-sm truncate">{guest}</p>
                    <p className="text-[10px] text-gray-400 flex items-center gap-1.5 flex-wrap">
                        <BedDouble size={10} /> Ch. {room}
                        <span className="text-gray-200">|</span>
                        <Calendar size={10} /> {fmt(booking.date_debut)} → {fmt(booking.date_fin)}
                        <span className="text-gray-200">|</span>
                        {nights} nuit{nights > 1 ? 's' : ''}
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge status={booking.status_payment} />
                    <ChevronRight size={13} className={`text-gray-300 transition-transform ${open ? 'rotate-90' : ''}`} />
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <div className="px-5 pb-4 pt-2 border-t border-gray-50 space-y-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { label: 'Réservation #', value: `#${booking.id}` },
                                    { label: 'Total',          value: `${booking.prix_total} MAD` },
                                    { label: 'Nuits',          value: nights },
                                    { label: 'Étage',          value: booking.room?.floor ? `Étage ${booking.room.floor}` : '—' },
                                    { label: 'Email',          value: booking.user?.email ?? '—' },
                                    { label: 'Téléphone',      value: booking.user?.telephone ?? '—' },
                                    { label: 'CIN/Passeport',  value: booking.user?.cin_passport ?? '—' },
                                    { label: 'Coupon',         value: booking.coupon_id ? 'Appliqué ✓' : 'Aucun' },
                                ].map(({ label, value }) => (
                                    <div key={label} className="bg-gray-50 rounded-xl px-3 py-2">
                                        <p className="text-[9px] uppercase tracking-widest text-gray-400">{label}</p>
                                        <p className="text-xs font-bold text-[#1B3022] mt-0.5 truncate">{value}</p>
                                    </div>
                                ))}
                            </div>

                            {services.length > 0 && (
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-2">Services inclus</p>
                                    <div className="flex flex-wrap gap-2">
                                        {services.map(s => (
                                            <span key={s.id} className="flex items-center gap-1 px-2.5 py-1 bg-[#1B3022]/5 text-[#1B3022] rounded-full text-[10px] font-medium">
                                                <Check size={9} className="text-emerald-500" /> {s.nom_service}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {booking.note && (
                                <div className="bg-amber-50 rounded-xl px-3 py-2 border border-amber-100">
                                    <p className="text-[9px] uppercase tracking-widest text-amber-400 mb-1">Note interne</p>
                                    <p className="text-xs text-amber-700">{booking.note}</p>
                                </div>
                            )}

                            <div className="flex flex-wrap gap-2 pt-1 items-center">
                                <div className="relative">
                                    <button
                                        onClick={() => setStatusMenu(m => !m)}
                                        className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-colors ${STATUS[booking.status_payment]?.color ?? 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS[booking.status_payment]?.dot}`} />
                                        {STATUS[booking.status_payment]?.label ?? booking.status_payment}
                                        <ChevronRight size={10} className={`transition-transform ${statusMenu ? 'rotate-90' : ''}`} />
                                    </button>
                                    <AnimatePresence>
                                        {statusMenu && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                                                transition={{ duration: 0.12 }}
                                                className="absolute bottom-full mb-1 left-0 bg-white border border-gray-100 rounded-xl shadow-lg z-30 overflow-hidden min-w-[160px]">
                                                {[
                                                    { key: 'pending',    label: 'En attente' },
                                                    { key: 'confirmed',  label: 'Confirmé' },
                                                    { key: 'checked_in', label: 'Checked In' },
                                                    { key: 'completed',  label: 'Terminé' },
                                                    { key: 'cancelled',  label: 'Annulé' },
                                                ].filter(s => s.key !== booking.status_payment).map(({ key, label }) => (
                                                    <button key={key}
                                                        onClick={() => { onStatusChange(booking.id, key); setStatusMenu(false); }}
                                                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors text-left">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS[key]?.dot}`} />
                                                        <span className={STATUS[key]?.color.split(' ')[1]}>{label}</span>
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {['pending', 'confirmed'].includes(booking.status_payment) && (
                                    <button onClick={() => onCheckIn(booking.id)}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-[#1B3022] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[#2d5238] transition-colors">
                                        <LogIn size={12} /> Check In
                                    </button>
                                )}
                                {booking.status_payment === 'checked_in' && (
                                    <button onClick={() => onCheckOut(booking.id)}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-[#C8A96A] text-[#1B3022] rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-[#b8945a] transition-colors">
                                        <LogOut size={12} /> Check Out
                                    </button>
                                )}
                                {['pending','confirmed','checked_in','completed'].includes(booking.status_payment) && (
                                    <button onClick={() => onReceipt(booking)}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
                                        <Printer size={12} /> Reçu
                                    </button>
                                )}
                                <button onClick={() => onNote(booking)}
                                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-600 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors">
                                    <StickyNote size={12} /> Note
                                </button>
                                {['pending','confirmed'].includes(booking.status_payment) && (
                                    <button onClick={() => onCancel(booking.id)}
                                        className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-500 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-red-100 transition-colors">
                                        <XCircle size={12} /> Annuler
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// ─── Room Card ────────────────────────────────────────────────────────────────
const RoomCard = ({ room }) => {
    const s   = room.status ?? 'available';
    const cfg = ROOM_STATUS[s] ?? ROOM_STATUS.available;
    const services = room.services ?? [];
    return (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-[9px] uppercase tracking-widest text-gray-400">Chambre</p>
                    <p className="text-2xl font-bold text-[#1B3022]">{room.num_room ?? '—'}</p>
                    <p className="text-[10px] text-gray-400">Étage {room.floor ?? '—'}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${cfg.text}`}>
                    {cfg.label}
                </span>
            </div>
            <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Type</p>
                <p className="text-xs font-medium text-[#1B3022]">{room.type?.title ?? room.room_type?.name ?? '—'}</p>
                {(room.type?.base_price || room.room_type?.base_price) && (
                    <p className="text-[10px] text-[#C8A96A] font-bold mt-0.5">{room.type?.base_price ?? room.room_type?.base_price} MAD / nuit</p>
                )}
            </div>
            {services.length > 0 && (
                <div className="flex flex-wrap gap-1">
                    {services.slice(0, 3).map(s => (
                        <span key={s.id} className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full text-[9px]">{s.nom_service}</span>
                    ))}
                    {services.length > 3 && <span className="text-[9px] text-gray-400">+{services.length - 3}</span>}
                </div>
            )}
        </motion.div>
    );
};

// ─── Overview Tab ─────────────────────────────────────────────────────────────
const OverviewTab = ({ bookings, rooms }) => {
    const todayStr  = new Date().toISOString().slice(0, 10);
    const toDate = (d) => d ? d.slice(0, 10) : null;

    const checkIns  = bookings.filter(b =>
        toDate(b.date_debut) === todayStr &&
        ['confirmed', 'pending'].includes(b.status_payment)
    ).length;

    const checkOuts = bookings.filter(b =>
        toDate(b.date_fin) === todayStr &&
        b.status_payment === 'checked_in'
    ).length;

    const inHouse   = bookings.filter(b => b.status_payment === 'checked_in').length;
    const pending   = bookings.filter(b => b.status_payment === 'pending').length;
    const available = rooms.filter(r => r.status === 'available').length;

    const STATS = [
        { label: 'Arrivées auj.',   value: checkIns,  icon: LogIn,       color: 'bg-emerald-500' },
        { label: 'Départs auj.',    value: checkOuts, icon: LogOut,      color: 'bg-[#C8A96A]' },
        { label: 'En séjour',       value: inHouse,   icon: BedDouble,   color: 'bg-blue-500' },
        { label: 'En attente',      value: pending,   icon: AlertCircle, color: 'bg-red-400' },
        { label: 'Chambres libres', value: available, icon: Home,        color: 'bg-[#1B3022]' },
    ];

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
                {STATS.map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                        <div className={`w-11 h-11 ${s.color} text-white rounded-xl flex items-center justify-center mb-4 shadow`}>
                            <s.icon size={20} />
                        </div>
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                        <h4 className="text-3xl font-bold text-[#1B3022]">{s.value}</h4>
                    </motion.div>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                <div className="px-7 py-5 border-b border-gray-50 bg-gray-50/60">
                    <h3 className="font-serif text-lg text-[#1B3022]">État des Chambres</h3>
                </div>
                <div className="p-7 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(ROOM_STATUS).map(([key, cfg]) => {
                        const count = rooms.filter(r => r.status === key).length;
                        return (
                            <div key={key} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                                <div className={`w-3 h-3 rounded-full ${cfg.bg}`} />
                                <div>
                                    <p className="text-[9px] uppercase tracking-widest text-gray-400">{cfg.label}</p>
                                    <p className="text-xl font-bold text-[#1B3022]">{count}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                <div className="px-7 py-5 border-b border-gray-50 bg-gray-50/60">
                    <h3 className="font-serif text-lg text-[#1B3022]">Séjours actifs aujourd'hui</h3>
                </div>
                <div className="divide-y divide-gray-50">
                    {bookings
                        .filter(b =>
                            toDate(b.date_debut) === todayStr &&
                            ['confirmed', 'pending', 'checked_in'].includes(b.status_payment)
                        )
                        .slice(0, 5)
                        .map(b => (
                            <div key={b.id} className="px-7 py-4 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-[#1B3022]">
                                        {`${b.user?.prenom ?? ''} ${b.user?.nom ?? ''}`.trim() || 'Guest'}
                                    </p>
                                    <p className="text-[10px] text-gray-400">Ch. {b.room?.num_room ?? '—'}</p>
                                </div>
                                <Badge status={b.status_payment} />
                            </div>
                        ))}
                    {bookings.filter(b =>
                        toDate(b.date_debut) === todayStr &&
                        ['confirmed', 'pending', 'checked_in'].includes(b.status_payment)
                    ).length === 0 && (
                        <p className="px-7 py-8 text-sm text-gray-300 italic text-center">Aucun séjour actif aujourd'hui.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// ─── Bookings Tab ─────────────────────────────────────────────────────────────
const BookingsTab = ({ bookings, onCheckIn, onCheckOut, onCancel, onReceipt, onNote, notes, onStatusChange }) => {
    const [search, setSearch]       = useState('');
    const [filterStatus, setFilter] = useState('all');

    const filtered = bookings
        .map(b => ({ ...b, note: notes[b.id] ?? b.note }))
        .filter(b => {
            const q = search.toLowerCase();
            const matchSearch = !q
                || `${b.user?.prenom ?? ''} ${b.user?.nom ?? ''}`.toLowerCase().includes(q)
                || b.user?.email?.toLowerCase().includes(q)
                || String(b.id).includes(q)
                || String(b.room?.num_room ?? '').toLowerCase().includes(q);
            const matchStatus = filterStatus === 'all' || b.status_payment === filterStatus;
            return matchSearch && matchStatus;
        });

    return (
        <div className="space-y-4">
            <div className="flex gap-3 flex-wrap">
                <div className="relative flex-1 min-w-[220px]">
                    <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Nom, email, chambre, #réservation..."
                        className="w-full pl-9 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-xs text-[#1B3022] placeholder-gray-300 focus:outline-none focus:border-[#1B3022]/30" />
                </div>
                <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 flex-wrap">
                    {[
                        { v: 'all',        l: 'Tous' },
                        { v: 'pending',    l: 'Attente' },
                        { v: 'confirmed',  l: 'Confirmé' },
                        { v: 'checked_in', l: 'In' },
                        { v: 'completed',  l: 'Terminé' },
                        { v: 'cancelled',  l: 'Annulé' },
                    ].map(({ v, l }) => (
                        <button key={v} onClick={() => setFilter(v)}
                            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${
                                filterStatus === v ? 'bg-[#1B3022] text-white' : 'text-gray-400 hover:text-[#1B3022]'
                            }`}>
                            {l}
                        </button>
                    ))}
                </div>
            </div>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
            </p>
            {filtered.length === 0 ? (
                <div className="text-center py-16 text-gray-300">
                    <BedDouble size={32} className="mx-auto mb-2" />
                    <p className="text-sm italic">Aucune réservation trouvée.</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {filtered.map(b => (
                        <BookingCard key={b.id} booking={b}
                            onCheckIn={onCheckIn} onCheckOut={onCheckOut}
                            onCancel={onCancel} onReceipt={onReceipt} onNote={onNote}
                            onStatusChange={onStatusChange} />
                    ))}
                </div>
            )}
        </div>
    );
};

// ─── Rooms Tab ────────────────────────────────────────────────────────────────
const RoomsTab = ({ rooms }) => (
    <div>
        {/* ── Gestion Chambres ── */}
        <div className="flex justify-end mb-4">
            <button
                type="button"
                onClick={() => { window.location.href = '/staff/rooms'; }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1B3022] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#2d5238] transition-colors"
            >
                🔧 Gestion Chambres
            </button>
        </div>
        <div className="flex gap-3 mb-5 flex-wrap">
            {Object.entries(ROOM_STATUS).map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 border border-gray-100">
                    <div className={`w-2 h-2 rounded-full ${cfg.bg}`} />
                    <span className="text-[10px] text-gray-500">{cfg.label}</span>
                    <span className="text-[10px] font-bold text-[#1B3022]">{rooms.filter(r => r.status === key).length}</span>
                </div>
            ))}
        </div>
        {rooms.length === 0 ? (
            <div className="text-center py-16 text-gray-300">
                <Home size={32} className="mx-auto mb-2" />
                <p className="text-sm italic">Aucune chambre trouvée.</p>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {rooms.map(r => <RoomCard key={r.id} room={r} />)}
            </div>
        )}
    </div>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const ReceptionistDashboard = () => {
    const [activeTab, setActiveTab]     = useState('Overview');
    const [bookings, setBookings]       = useState([]);
    const [rooms, setRooms]             = useState([]);
    const [loading, setLoading]         = useState(true);
    const [unread, setUnread]           = useState(0);
    const [showNotifs, setShowNotifs]   = useState(false);
    const [receipt, setReceipt]         = useState(null);
    const [noteBooking, setNoteBooking] = useState(null);
    const [notes, setNotes]             = useState({});
    const navigate = useNavigate();

    const userName = localStorage.getItem('user_name') ?? 'Staff';
    const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    const loadAll = useCallback(async () => {
        setLoading(true);
        try {
            const [bRes, rRes] = await Promise.all([
                api.get('/admin/bookings'),
                api.get('/rooms'),
            ]);
            const bookingsData = bRes.data?.data ?? bRes.data ?? [];
            const rawRooms     = rRes.data?.data ?? rRes.data ?? [];
            const todayStr2 = new Date().toISOString().slice(0, 10);

            const checkedInIds = new Set(
                bookingsData
                    .filter(b => b.status_payment === 'checked_in')
                    .map(b => b.room_id)
            );

            const reservedTodayIds = new Set(
                bookingsData
                    .filter(b =>
                        ['pending', 'confirmed'].includes(b.status_payment) &&
                        b.date_debut?.slice(0, 10) <= todayStr2 &&
                        b.date_fin?.slice(0, 10)   >  todayStr2
                    )
                    .map(b => b.room_id)
            );

            const roomsWithStatus = rawRooms.map(r => {
                if (checkedInIds.has(r.id) || reservedTodayIds.has(r.id)) {
                    return { ...r, status: 'occupied' };
                }
                return { ...r, status: r.status ?? 'available' };
            });

            setBookings(bookingsData);
            setRooms(roomsWithStatus);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    }, []);

    const loadUnread = useCallback(async () => {
        try {
            const res = await api.get('/notifications/unread-count');
            const val = res.data?.unread_count ?? res.data?.count ?? res.data ?? 0;
            setUnread(typeof val === 'number' ? val : 0);
        } catch (e) { console.error('loadUnread error:', e); }
    }, []);

    useEffect(() => { loadAll(); loadUnread(); }, [loadAll, loadUnread]);

    const handleLogout = async () => {
        try { await api.post('/logout'); } catch (_) {}
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_name');
        navigate('/auth');
    };

    const handleCheckIn  = async (id) => {
        try { await api.patch(`/admin/bookings/${id}`, { status_payment: 'checked_in' }); loadAll(); }
        catch (e) { console.error(e); }
    };
    const handleCheckOut = async (id) => {
        try { await api.patch(`/admin/bookings/${id}`, { status_payment: 'completed' }); loadAll(); }
        catch (e) { console.error(e); }
    };
    const handleCancel = async (id) => {
        if (!confirm('Annuler cette réservation ?')) return;
        try { await api.patch(`/admin/bookings/${id}`, { status_payment: 'cancelled' }); loadAll(); }
        catch (e) { console.error(e); }
    };
    const handleStatusChange = async (id, newStatus) => {
        try {
            await api.patch(`/admin/bookings/${id}`, { status_payment: newStatus });
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status_payment: newStatus } : b));
        } catch (e) { console.error(e); }
    };
    const handleSaveNote = (id, note) => {
        setNotes(n => ({ ...n, [id]: note }));
        setNoteBooking(null);
    };

    // FIX 1: Included "Chambres" layout tab explicitly here
    const tabs = [
        { name: 'Overview',      Icon: LayoutDashboard },
        { name: 'Réservations',  Icon: Calendar },
        { name: 'Chambres',      Icon: Home }
    ];

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B3022] mx-auto mb-4" />
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em]">Chargement…</p>
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-[#F5F3EE]">
            {/* ── Sidebar ── */}
            <aside className="w-60 bg-[#1B3022] text-white hidden md:flex flex-col shadow-2xl flex-shrink-0">
                <div className="p-8 border-b border-white/10">
                    <h1 className="text-lg font-serif tracking-[0.2em] uppercase text-[#C8A96A]">Le Musée</h1>
                    <span className="text-[9px] opacity-40 tracking-[0.3em] uppercase">Réception</span>
                </div>

                <nav className="flex-1 p-5 space-y-1">
                    {tabs.map(({ name, Icon }) => (
                        <button key={name} onClick={() => setActiveTab(name)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs transition-all duration-200 ${
                                activeTab === name
                                    ? 'bg-[#C8A96A] text-[#1B3022] font-bold shadow-md'
                                    : 'hover:bg-white/5 opacity-60 hover:opacity-100'
                            }`}>
                            <Icon size={15} />
                            {name}
                        </button>
                    ))}

                    <div className="border-t border-white/10 my-3" />

                    {/* FIX 2: Used SPA hook instead of forcing window reload */}
                    <button
                        type="button"
                        onClick={() => navigate('/staff/rooms')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs bg-[#C8A96A]/15 hover:bg-[#C8A96A]/30 text-[#C8A96A] font-bold border border-[#C8A96A]/30 hover:border-[#C8A96A]/60 transition-all"
                    >
                        <Wrench size={15} />
                        Gestion Chambres
                    </button>
                </nav>

                <div className="p-5 border-t border-white/10 space-y-3">
                    <div className="flex items-center gap-2.5 px-2">
                        <div className="w-7 h-7 bg-[#C8A96A] rounded-full flex items-center justify-center text-[10px] font-bold text-[#1B3022]">
                            {initials}
                        </div>
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-tight text-white/80">{userName}</p>
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="text-[8px] text-emerald-400 font-bold">ONLINE</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleLogout}
                        className="flex items-center gap-2.5 px-2 text-xs text-red-300/80 hover:text-red-300 transition-colors w-full">
                        <LogOut size={13} /> Déconnexion
                    </button>
                </div>
            </aside>

            {/* ── Main Canvas ── */}
            <main className="flex-1 overflow-y-auto">
                <header className="flex justify-between items-center px-8 pt-8 pb-4">
                    <div>
                        <h2 className="text-2xl font-serif text-[#1B3022] tracking-tight">{activeTab}</h2>
                        <p className="text-[10px] text-gray-400 italic mt-0.5">
                            {new Date().toLocaleDateString('fr-MA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => setShowNotifs(true)}
                            className="relative w-9 h-9 bg-white border border-gray-100 rounded-xl flex items-center justify-center hover:border-[#1B3022]/30 transition-colors">
                            <Bell size={15} className="text-[#1B3022]" />
                            {unread > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8A96A] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                                    {unread}
                                </span>
                            )}
                        </button>
                        <button onClick={loadAll}
                            className="flex items-center gap-2 text-[9px] bg-[#1B3022] text-white px-4 py-2.5 rounded-full font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-colors">
                            <RefreshCw size={11} /> Actualiser
                        </button>
                    </div>
                </header>

                <div className="px-8 pb-10">
                    <AnimatePresence mode="wait">
                        <motion.div key={activeTab}
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                            {activeTab === 'Overview' && (
                                <OverviewTab bookings={bookings} rooms={rooms} />
                            )}
                            {activeTab === 'Réservations' && (
                                <BookingsTab
                                    bookings={bookings} notes={notes}
                                    onCheckIn={handleCheckIn} onCheckOut={handleCheckOut}
                                    onCancel={handleCancel} onReceipt={setReceipt} onNote={setNoteBooking}
                                    onStatusChange={handleStatusChange}
                                />
                            )}
                            {/* FIX 1: Linked layout visibility here */}
                            {activeTab === 'Chambres' && (
                                <RoomsTab rooms={rooms} />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Modals */}
            <AnimatePresence>
                {showNotifs  && <NotificationsPanel onClose={() => { setShowNotifs(false); loadUnread(); }} />}
                {receipt     && <ReceiptModal booking={receipt} onClose={() => setReceipt(null)} />}
                {noteBooking && <NoteModal booking={noteBooking} onClose={() => setNoteBooking(null)} onSave={handleSaveNote} />}
            </AnimatePresence>
        </div>
    );
};

export default ReceptionistDashboard;