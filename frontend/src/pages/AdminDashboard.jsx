// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import SettingsPage from "./SettingsPage"; 
// import { Settings } from 'lucide-react';
// import {
//     LayoutDashboard, BedDouble, MessageSquare,
//     Star, Users, LogOut, RefreshCw, TrendingUp
// } from 'lucide-react';
// import api from '../api';
// import AnalyticsPage from './AnalyticsPage';

// // ─── Status Badge ─────────────────────────────────────────────────────────────
// const StatusBadge = ({ status }) => {
//     const map = {
//         confirmed:  'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
//         completed:  'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
//         pending:    'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
//         cancelled:  'bg-red-50 text-red-600 ring-1 ring-red-200',
//     };
//     return (
//         <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>
//             {status?.replace('_', ' ')}
//         </span>
//     );
// };

// // ─── Stars ────────────────────────────────────────────────────────────────────
// const Stars = ({ rating }) => (
//     <span className="text-[#C8A96A] text-sm tracking-tight">
//         {'★'.repeat(Math.round(rating))}
//         <span className="opacity-20">{'★'.repeat(5 - Math.round(rating))}</span>
//     </span>
// );

// // ─── Stat Card ────────────────────────────────────────────────────────────────
// const StatCard = ({ stat, index, iconMap }) => (
//     <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
//         className="bg-white rounded-2xl p-6 border border-gray-100/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
//     >
//         <div className={`w-11 h-11 ${stat.color} text-white rounded-xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
//             {iconMap[stat.icon]}
//         </div>
//         <p className="text-[9px] uppercase tracking-[0.18em] text-gray-400 mb-1 font-medium">{stat.label}</p>
//         <h4 className="text-3xl font-bold text-[#1B3022] tabular-nums">{stat.value}</h4>
//     </motion.div>
// );

// // ─── Overview Tab ─────────────────────────────────────────────────────────────
// function OverviewTab({ stats, activity, onRefresh, loading }) {
//     const iconMap = {
//         BedDouble:     <BedDouble size={20} />,
//         MessageSquare: <MessageSquare size={20} />,
//         Star:          <Star size={20} />,
//         Users:         <Users size={20} />,
//     };

//     return (
//         <div className="space-y-8">
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
//                 {stats.map((s, i) => (
//                     <StatCard key={s.label} stat={s} index={i} iconMap={iconMap} />
//                 ))}
//             </div>

//             {/* Recent Bookings */}
//             <motion.div
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
//                 className="bg-white rounded-3xl border border-gray-100/80 overflow-hidden shadow-sm"
//             >
//                 <div className="px-7 py-5 border-b border-gray-50 flex justify-between items-center">
//                     <div>
//                         <h3 className="font-serif text-lg text-[#1B3022]">Latest Reservations</h3>
//                         <p className="text-[10px] text-gray-400 mt-0.5">Most recent guest activity</p>
//                     </div>
//                     <button
//                         onClick={onRefresh}
//                         className="flex items-center gap-2 text-[9px] bg-[#1B3022] text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-all duration-200"
//                     >
//                         <RefreshCw size={10} className={loading ? 'animate-spin' : ''} />
//                         Refresh
//                     </button>
//                 </div>
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left">
//                         <thead className="text-[9px] uppercase tracking-[0.15em] text-gray-400 bg-gray-50/40">
//                             <tr>
//                                 {['Guest', 'Room Type', 'Arrival', 'Status'].map(h => (
//                                     <th key={h} className="px-7 py-4 font-bold">{h}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
//                             {activity.length === 0 ? (
//                                 <tr>
//                                     <td colSpan={4} className="px-7 py-10 text-center text-gray-400 text-sm italic">
//                                         No recent activity
//                                     </td>
//                                 </tr>
//                             ) : activity.map((row, i) => (
//                                 <motion.tr
//                                     key={row.id}
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     transition={{ delay: 0.35 + i * 0.04 }}
//                                     className="hover:bg-gray-50/80 group transition-colors"
//                                 >
//                                     <td className="px-7 py-4 font-medium text-gray-900 group-hover:text-[#C8A96A] transition-colors">{row.name}</td>
//                                     <td className="px-7 py-4 text-gray-500 italic">{row.room}</td>
//                                     <td className="px-7 py-4 font-light text-gray-500">{row.date}</td>
//                                     <td className="px-7 py-4"><StatusBadge status={row.status} /></td>
//                                 </motion.tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </motion.div>
//         </div>
//     );
// }

// // ─── Bookings Tab ─────────────────────────────────────────────────────────────
// function BookingsTab() {
//     const [bookings, setBookings] = useState([]);
//     const [filter, setFilter]     = useState('all');
//     const [loading, setLoading]   = useState(true);

//     const load = useCallback(async () => {
//         setLoading(true);
//         try {
//             const res = await api.get('/admin/bookings');
//             setBookings(res.data?.data ?? res.data ?? []);
//         } catch (e) {
//             console.error('Bookings load error:', e);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => { load(); }, [load]);

//     const handleStatusChange = async (booking, newStatus) => {
//         try {
//             await api.patch(`/admin/bookings/${booking.id}`, { status_payment: newStatus });
//             setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status_payment: newStatus } : b));
//         } catch (e) {
//             console.error('Status update error:', e);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!confirm('Delete this booking?')) return;
//         try {
//             await api.delete(`/admin/bookings/${id}`);
//             setBookings(prev => prev.filter(b => b.id !== id));
//         } catch (e) {
//             console.error('Delete error:', e);
//         }
//     };

//     const statuses = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];
//     const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status_payment === filter);

//     return (
//         <div className="space-y-5">
//             {/* Filter Pills */}
//             <div className="flex gap-2 flex-wrap">
//                 {statuses.map(f => (
//                     <button
//                         key={f}
//                         onClick={() => setFilter(f)}
//                         className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-200 ${
//                             filter === f
//                                 ? 'bg-[#1B3022] text-white shadow-sm'
//                                 : 'bg-white border border-gray-200 text-gray-500 hover:border-[#C8A96A] hover:text-[#1B3022]'
//                         }`}
//                     >
//                         {f} ({f === 'all' ? bookings.length : bookings.filter(b => b.status_payment === f).length})
//                     </button>
//                 ))}
//             </div>

//             <div className="bg-white rounded-3xl border border-gray-100/80 overflow-hidden shadow-sm">
//                 <div className="px-7 py-5 border-b border-gray-50 flex justify-between items-center">
//                     <div>
//                         <h3 className="font-serif text-lg text-[#1B3022]">All Bookings</h3>
//                         <p className="text-[10px] text-gray-400 mt-0.5">{filtered.length} reservation{filtered.length !== 1 ? 's' : ''}</p>
//                     </div>
//                     <button onClick={load} className="flex items-center gap-2 text-[9px] bg-[#1B3022] text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-all duration-200">
//                         <RefreshCw size={10} className={loading ? 'animate-spin' : ''} /> Refresh
//                     </button>
//                 </div>

//                 {loading ? (
//                     <div className="flex justify-center py-14">
//                         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1B3022]" />
//                     </div>
//                 ) : filtered.length === 0 ? (
//                     <div className="text-center py-14 text-gray-400 text-sm italic">No bookings found.</div>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="w-full text-left">
//                             <thead className="text-[9px] uppercase tracking-[0.15em] text-gray-400 bg-gray-50/40">
//                                 <tr>
//                                     {['#', 'Guest', 'Room', 'Check-in', 'Check-out', 'Total', 'Status', 'Actions'].map(h => (
//                                         <th key={h} className="px-5 py-4 font-bold">{h}</th>
//                                     ))}
//                                 </tr>
//                             </thead>
//                             <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
//                                 {filtered.map((b, i) => (
//                                     <motion.tr
//                                         key={b.id}
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         transition={{ delay: i * 0.03 }}
//                                         className="hover:bg-gray-50/80 transition-colors"
//                                     >
//                                         <td className="px-5 py-4 text-gray-400 text-xs font-mono">#{b.id}</td>
//                                         <td className="px-5 py-4 font-medium text-gray-900">
//                                             {b.user ? `${b.user.prenom ?? ''} ${b.user.nom ?? ''}`.trim() : 'Guest'}
//                                         </td>
//                                         <td className="px-5 py-4 text-gray-500 italic">{b.room?.type?.title ?? b.room?.name ?? 'N/A'}</td>
//                                         <td className="px-5 py-4 text-gray-500">{b.date_debut}</td>
//                                         <td className="px-5 py-4 text-gray-500">{b.date_fin}</td>
//                                         <td className="px-5 py-4 font-semibold text-[#1B3022]">
//                                             {b.prix_total ? `${Number(b.prix_total).toLocaleString()} MAD` : '—'}
//                                         </td>
//                                         <td className="px-5 py-4"><StatusBadge status={b.status_payment} /></td>
//                                         <td className="px-5 py-4">
//                                             <div className="flex items-center gap-2">
//                                                 <select
//                                                     value={b.status_payment}
//                                                     onChange={e => handleStatusChange(b, e.target.value)}
//                                                     className="text-[10px] border border-gray-200 rounded-lg px-2 py-1.5 bg-white cursor-pointer focus:outline-none focus:border-[#C8A96A] focus:ring-1 focus:ring-[#C8A96A]/30 transition-all"
//                                                 >
//                                                     {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
//                                                         <option key={s} value={s}>{s}</option>
//                                                     ))}
//                                                 </select>
//                                                 <button
//                                                     onClick={() => handleDelete(b.id)}
//                                                     className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 text-xs font-bold transition-all"
//                                                 >
//                                                     ✕
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </motion.tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// // ─── Messages Tab ─────────────────────────────────────────────────────────────
// function MessagesTab() {
//     const [messages, setMessages] = useState([]);
//     const [selected, setSelected] = useState(null);
//     const [loading, setLoading]   = useState(true);

//     useEffect(() => {
//         api.get('/admin/messages')
//             .then(r => setMessages(r.data?.data ?? r.data ?? []))
//             .catch(e => console.error(e))
//             .finally(() => setLoading(false));
//     }, []);

//     const openMessage = async (msg) => {
//         setSelected(msg);
//         if (!msg.is_read) {
//             try {
//                 await api.put(`/admin/messages/${msg.id}/read`);
//                 setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
//             } catch (e) {
//                 console.error(e);
//             }
//         }
//     };

//     const getInitials = (msg) => {
//         const name = (msg.name ?? msg.full_name ?? msg.nom ?? '').trim() || '??';
//         return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
//     };

//     const getDisplayName = (msg) => {
//         const full = msg.name ?? msg.full_name ?? `${msg.prenom ?? ''} ${msg.nom ?? ''}`.trim();
//         return full || 'Guest';
//     };

//     const unreadCount = messages.filter(m => !m.is_read).length;

//     return (
//         <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 h-[680px]">
//             {/* Inbox */}
//             <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100/80 overflow-hidden shadow-sm flex flex-col">
//                 <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center flex-shrink-0">
//                     <h3 className="font-serif text-lg text-[#1B3022]">Inbox</h3>
//                     {unreadCount > 0 && (
//                         <span className="text-[9px] bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold ring-1 ring-amber-200">
//                             {unreadCount} unread
//                         </span>
//                     )}
//                 </div>
//                 <div className="overflow-y-auto flex-1">
//                     {loading ? (
//                         <div className="flex justify-center py-10">
//                             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1B3022]" />
//                         </div>
//                     ) : messages.length === 0 ? (
//                         <div className="text-center py-10 text-gray-400 text-sm italic">No messages yet.</div>
//                     ) : messages.map(msg => (
//                         <button
//                             key={msg.id}
//                             onClick={() => openMessage(msg)}
//                             className={`w-full text-left flex gap-3 px-5 py-4 border-b border-gray-50 transition-all ${
//                                 selected?.id === msg.id ? 'bg-[#F5F3EE] border-l-2 border-l-[#C8A96A]' : 'hover:bg-gray-50/80'
//                             }`}
//                         >
//                             <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
//                                 msg.is_read ? 'bg-gray-100 text-gray-500' : 'bg-[#1B3022] text-[#C8A96A]'
//                             }`}>
//                                 {getInitials(msg)}
//                             </div>
//                             <div className="flex-1 min-w-0">
//                                 <p className={`text-sm ${msg.is_read ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}`}>
//                                     {getDisplayName(msg)}
//                                 </p>
//                                 <p className="text-xs text-gray-400 truncate mt-0.5">
//                                     {msg.message ?? msg.body ?? msg.content ?? '—'}
//                                 </p>
//                             </div>
//                             <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
//                                 <span className="text-[9px] text-gray-400">
//                                     {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}
//                                 </span>
//                                 {!msg.is_read && <span className="w-2 h-2 rounded-full bg-[#C8A96A]" />}
//                             </div>
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Detail */}
//             <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100/80 overflow-hidden shadow-sm flex flex-col">
//                 {selected ? (
//                     <AnimatePresence mode="wait">
                        
//                         <motion.div
//                             key={selected.id}
//                             initial={{ opacity: 0, x: 10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             exit={{ opacity: 0 }}
//                             transition={{ duration: 0.15 }}
//                             className="flex flex-col h-full"
//                         >
//                             <div className="px-7 py-5 border-b border-gray-50 bg-gray-50/40 flex-shrink-0">
//                                 <div className="flex items-center gap-3">
//                                     <div className="w-10 h-10 bg-[#1B3022] text-[#C8A96A] rounded-full flex items-center justify-center text-xs font-bold">
//                                         {getInitials(selected)}
//                                     </div>
//                                     <div>
//                                         <h3 className="font-semibold text-[#1B3022]">{getDisplayName(selected)}</h3>
//                                         {selected.email && <p className="text-[10px] text-gray-400">{selected.email}</p>}
//                                         {selected.telephone && <p className="text-[10px] text-gray-400">📞 {selected.telephone}</p>}
//                                     </div>
//                                     <div className="ml-auto flex items-center gap-2">
//                                         <span className="text-[9px] text-gray-400">
//                                             {selected.created_at ? new Date(selected.created_at).toLocaleString() : ''}
//                                         </span>
//                                         <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ring-1 ${
//                                             selected.is_read ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-orange-50 text-orange-600 ring-orange-200'
//                                         }`}>
//                                             {selected.is_read ? 'Read' : 'Unread'}
//                                         </span>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="flex-1 p-7">
//                                 <div className="bg-[#F5F3EE] rounded-2xl p-6 text-sm text-gray-700 leading-relaxed">
//                                     {selected.message ?? selected.body ?? selected.content ?? '—'}
//                                 </div>
//                             </div>
//                         </motion.div>
//                     </AnimatePresence>
//                 ) : (
//                     <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-3">
//                         <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
//                             <MessageSquare size={28} />
//                         </div>
//                         <p className="text-sm italic text-gray-400">Select a message to read</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// // ─── Reviews Tab ──────────────────────────────────────────────────────────────
// function ReviewsTab() {
//     const [reviews, setReviews] = useState([]);
//     const [meta, setMeta]       = useState({});
//     const [loading, setLoading] = useState(true);
//     const [page, setPage]       = useState(1);

//     const load = useCallback(async (p = 1) => {
//         setLoading(true);
//         try {
//             const res = await api.get(`/reviews?per_page=10&page=${p}`);
//             const data = res.data;
//             setReviews(data.data ?? data ?? []);
//             setMeta({ total: data.total, last_page: data.last_page, current_page: data.current_page });
//         } catch (e) {
//             console.error('Reviews load error:', e);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => { load(page); }, [load, page]);

//     const handleDelete = async (id) => {
//         if (!confirm('Delete this review?')) return;
//         try {
//             await api.delete(`/reviews/${id}`);
//             setReviews(prev => prev.filter(r => r.id !== id));
//         } catch (e) {
//             console.error(e);
//         }
//     };

//     const avgRating = reviews.length
//         ? (reviews.reduce((s, r) => s + Number(r.note), 0) / reviews.length).toFixed(1)
//         : '—';

//     return (
//         <div className="space-y-6">
//             {/* Summary Cards */}
//             <div className="grid grid-cols-3 gap-4">
//                 {[
//                     { label: 'Total Reviews', value: meta.total ?? reviews.length, sub: null },
//                     { label: 'Avg. Rating', value: avgRating, sub: <div className="text-[#C8A96A] text-base mt-1">{'★'.repeat(Math.round(Number(avgRating) || 0))}</div> },
//                     { label: '5-Star Reviews', value: reviews.filter(r => Number(r.note) === 5).length, sub: null },
//                 ].map((card, i) => (
//                     <motion.div
//                         key={card.label}
//                         initial={{ opacity: 0, y: 16 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: i * 0.08 }}
//                         className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-sm"
//                     >
//                         <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">{card.label}</p>
//                         <h4 className="text-3xl font-bold text-[#1B3022]">{card.value}</h4>
//                         {card.sub}
//                     </motion.div>
//                 ))}
//             </div>

//             <div className="bg-white rounded-3xl border border-gray-100/80 overflow-hidden shadow-sm">
//                 <div className="px-7 py-5 border-b border-gray-50 flex justify-between items-center">
//                     <h3 className="font-serif text-lg text-[#1B3022]">Guest Reviews</h3>
//                     <button onClick={() => load(page)} className="flex items-center gap-2 text-[9px] bg-[#1B3022] text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-all duration-200">
//                         <RefreshCw size={10} className={loading ? 'animate-spin' : ''} /> Refresh
//                     </button>
//                 </div>

//                 {loading ? (
//                     <div className="flex justify-center py-12">
//                         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1B3022]" />
//                     </div>
//                 ) : reviews.length === 0 ? (
//                     <div className="text-center py-12 text-gray-400 text-sm italic">No reviews yet.</div>
//                 ) : (
//                     reviews.map((r, i) => {
//                         const guestName = r.user
//                             ? `${r.user.prenom ?? ''} ${r.user.nom ?? ''}`.trim() || r.user.name
//                             : 'Guest';
//                         const roomTitle = r.room?.type?.title ?? r.room?.name ?? 'Room';
//                         return (
//                             <motion.div
//                                 key={r.id}
//                                 initial={{ opacity: 0 }}
//                                 animate={{ opacity: 1 }}
//                                 transition={{ delay: i * 0.04 }}
//                                 className="px-7 py-5 border-b border-gray-50/80 last:border-b-0 hover:bg-gray-50/40 transition-colors"
//                             >
//                                 <div className="flex justify-between items-start mb-2">
//                                     <div>
//                                         <p className="font-semibold text-sm text-gray-900">{guestName}</p>
//                                         <p className="text-[10px] text-gray-400 italic mt-0.5">
//                                             {roomTitle} · {r.created_at ? new Date(r.created_at).toLocaleDateString() : ''}
//                                         </p>
//                                     </div>
//                                     <div className="flex items-center gap-3">
//                                         <Stars rating={Number(r.note)} />
//                                         <button
//                                             onClick={() => handleDelete(r.id)}
//                                             className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 text-xs font-bold transition-all"
//                                         >
//                                             ✕
//                                         </button>
//                                     </div>
//                                 </div>
//                                 {r.commentaire && (
//                                     <p className="text-xs text-gray-500 italic leading-relaxed border-l-2 border-[#C8A96A]/40 pl-3 mt-2">
//                                         "{r.commentaire}"
//                                     </p>
//                                 )}
//                             </motion.div>
//                         );
//                     })
//                 )}

//                 {meta.last_page > 1 && (
//                     <div className="flex justify-center gap-2 p-5 border-t border-gray-50">
//                         {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(p => (
//                             <button
//                                 key={p}
//                                 onClick={() => setPage(p)}
//                                 className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 ${
//                                     page === p
//                                         ? 'bg-[#1B3022] text-white shadow-sm'
//                                         : 'bg-gray-100 text-gray-500 hover:bg-[#C8A96A]/20 hover:text-[#1B3022]'
//                                 }`}
//                             >
//                                 {p}
//                             </button>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// // ─── Main AdminDashboard ──────────────────────────────────────────────────────
// const AdminDashboard = () => {
//     const [activeTab, setActiveTab]   = useState('Overview');
//     const [stats, setStats]           = useState([]);
//     const [recentActivity, setRecent] = useState([]);
//     const [loading, setLoading]       = useState(true);
//     const navigate = useNavigate();

//     const loadStats = useCallback(async () => {
//         setLoading(true);
//         try {
//             const res = await api.get('/admin/stats');
//             if (res.data.success) {
//                 setStats(res.data.stats);
//                 setRecent(res.data.recentActivity);
//             }
//         } catch (e) {
//             console.error('Stats error:', e);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => { loadStats(); }, [loadStats]);

//     const handleLogout = async () => {
//         try { await api.post('/logout'); } catch (_) {}
//         localStorage.removeItem('auth_token');
//         delete api.defaults.headers.common['Authorization'];
//         navigate('/auth');
//     };

//     const tabs = [
//         { name: 'Overview',   Icon: LayoutDashboard },
//         { name: 'Bookings',   Icon: BedDouble },
//         { name: 'Messages',   Icon: MessageSquare },
//         { name: 'Reviews',    Icon: Star },
//         { name: 'Analytics',  Icon: TrendingUp },
//     ];

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE]">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B3022] mx-auto mb-4" />
//                     <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em]">Loading Console…</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="flex min-h-screen bg-[#F5F3EE]">

//             {/* ── Sidebar ── */}
//             <aside className="w-60 bg-[#1B3022] text-white hidden md:flex flex-col shadow-2xl flex-shrink-0">
//                 {/* Logo */}
//                 <div className="p-8 border-b border-white/10">
//                     <h1 className="text-lg font-serif tracking-[0.2em] uppercase text-[#C8A96A]">Le Musée</h1>
//                     <span className="text-[9px] opacity-40 tracking-[0.3em] uppercase">Management Console</span>
//                 </div>

//                 {/* Nav */}
//                 <nav className="flex-1 p-5 space-y-1">
//                     {tabs.map(({ name, Icon }) => (
//                         <button
//                             key={name}
//                             onClick={() => setActiveTab(name)}
//                             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs transition-all duration-200 ${
//                                 activeTab === name
//                                     ? 'bg-[#C8A96A] text-[#1B3022] font-bold shadow-md'
//                                     : 'hover:bg-white/8 opacity-60 hover:opacity-100'
//                             }`}
//                         >
//                             <Icon size={15} />
//                             {name}
//                             {name === 'Analytics' && (
//                                 <span className="ml-auto text-[7px] font-bold uppercase tracking-widest bg-[#C8A96A]/20 text-[#C8A96A] px-1.5 py-0.5 rounded-full">
//                                     New
//                                 </span>
//                             )}
//                         </button>
//                     ))}
//                 </nav>

//                 {/* Footer */}
//                 <div className="p-5 border-t border-white/10 space-y-3">
//                     <div className="flex items-center gap-2.5 px-2">
//                         <div className="w-7 h-7 bg-[#C8A96A] rounded-full flex items-center justify-center text-[10px] font-bold text-[#1B3022]">
//                             AD
//                         </div>
//                         <div>
//                             <p className="text-[9px] font-bold uppercase tracking-tight text-white/80">Administrator</p>
//                             <div className="flex items-center gap-1">
//                                 <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
//                                 <span className="text-[8px] text-emerald-400 font-bold">ONLINE</span>
//                             </div>
//                         </div>
//                     </div>
//                     <button
//                         onClick={handleLogout}
//                         className="flex items-center gap-2.5 px-2 text-xs text-red-300/80 hover:text-red-300 transition-colors w-full"
//                     >
//                         <LogOut size={13} /> Exit System
//                     </button>
//                 </div>
//             </aside>

//             {/* ── Main ── */}
//             <main className="flex-1 overflow-y-auto">
//                 {/* Topbar */}
//                 <header className="flex justify-between items-center px-8 pt-8 pb-4">
//                     <div>
//                         <h2 className="text-2xl font-serif text-[#1B3022] tracking-tight">{activeTab}</h2>
//                         <p className="text-[10px] text-gray-400 italic mt-0.5">
//                             {activeTab === 'Analytics'
//                                 ? 'Performance insights & revenue trends'
//                                 : 'Live data from Le Musée database.'}
//                         </p>
//                     </div>
//                 </header>

//                 {/* Tab Content */}
//                 <div className="px-8 pb-10">
//                     <AnimatePresence mode="wait">
//                         <motion.div
//                             key={activeTab}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -6 }}
//                             transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
//                         >
//                             {activeTab === 'Overview'  && <OverviewTab stats={stats} activity={recentActivity} onRefresh={loadStats} loading={loading} />}
//                             {activeTab === 'Bookings'  && <BookingsTab />}
//                             {activeTab === 'Messages'  && <MessagesTab />}
//                             {activeTab === 'Reviews'   && <ReviewsTab />}
//                             {activeTab === 'Analytics' && <AnalyticsPage />}
//                             {activeTab === 'Settings'  && <SettingsPage />}
//                         </motion.div>
//                     </AnimatePresence>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default AdminDashboard;

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SettingsPage from "./SettingsPage"; 
import { Settings } from 'lucide-react';
import {
    LayoutDashboard, BedDouble, MessageSquare,
    Star, Users, LogOut, RefreshCw, TrendingUp
} from 'lucide-react';
import api from '../api';
import AnalyticsPage from './AnalyticsPage';

// ─── Status Badge ─────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const map = {
        confirmed:  'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
        completed:  'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
        pending:    'bg-amber-50 text-amber-700 ring-1 ring-amber-200',
        cancelled:  'bg-red-50 text-red-600 ring-1 ring-red-200',
    };
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${map[status] ?? 'bg-gray-100 text-gray-500'}`}>
            {status?.replace('_', ' ')}
        </span>
    );
};

// ─── Stars ────────────────────────────────────────────────────────────────────
const Stars = ({ rating }) => (
    <span className="text-[#C8A96A] text-sm tracking-tight">
        {'★'.repeat(Math.round(rating))}
        <span className="opacity-20">{'★'.repeat(5 - Math.round(rating))}</span>
    </span>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ stat, index, iconMap }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl p-6 border border-gray-100/80 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
    >
        <div className={`w-11 h-11 ${stat.color} text-white rounded-xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
            {iconMap[stat.icon]}
        </div>
        <p className="text-[9px] uppercase tracking-[0.18em] text-gray-400 mb-1 font-medium">{stat.label}</p>
        <h4 className="text-3xl font-bold text-[#1B3022] tabular-nums">{stat.value}</h4>
    </motion.div>
);

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ stats, activity, onRefresh, loading }) {
    const iconMap = {
        BedDouble:     <BedDouble size={20} />,
        MessageSquare: <MessageSquare size={20} />,
        Star:          <Star size={20} />,
        Users:         <Users size={20} />,
    };

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((s, i) => (
                    <StatCard key={s.label} stat={s} index={i} iconMap={iconMap} />
                ))}
            </div>

            {/* Recent Bookings */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-3xl border border-gray-100/80 overflow-hidden shadow-sm"
            >
                <div className="px-7 py-5 border-b border-gray-50 flex justify-between items-center">
                    <div>
                        <h3 className="font-serif text-lg text-[#1B3022]">Latest Reservations</h3>
                        <p className="text-[10px] text-gray-400 mt-0.5">Most recent guest activity</p>
                    </div>
                    <button
                        onClick={onRefresh}
                        className="flex items-center gap-2 text-[9px] bg-[#1B3022] text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-all duration-200"
                    >
                        <RefreshCw size={10} className={loading ? 'animate-spin' : ''} />
                        Refresh
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-[9px] uppercase tracking-[0.15em] text-gray-400 bg-gray-50/40">
                            <tr>
                                {['Guest', 'Room Type', 'Arrival', 'Status'].map(h => (
                                    <th key={h} className="px-7 py-4 font-bold">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
                            {activity.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-7 py-10 text-center text-gray-400 text-sm italic">
                                        No recent activity
                                    </td>
                                </tr>
                            ) : activity.map((row, i) => (
                                <motion.tr
                                    key={row.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.35 + i * 0.04 }}
                                    className="hover:bg-gray-50/80 group transition-colors"
                                >
                                    <td className="px-7 py-4 font-medium text-gray-900 group-hover:text-[#C8A96A] transition-colors">{row.name}</td>
                                    <td className="px-7 py-4 text-gray-500 italic">{row.room}</td>
                                    <td className="px-7 py-4 font-light text-gray-500">{row.date}</td>
                                    <td className="px-7 py-4"><StatusBadge status={row.status} /></td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
}

// ─── Bookings Tab ─────────────────────────────────────────────────────────────
function BookingsTab() {
    const [bookings, setBookings] = useState([]);
    const [filter, setFilter]     = useState('all');
    const [loading, setLoading]   = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/bookings');
            setBookings(res.data?.data ?? res.data ?? []);
        } catch (e) {
            console.error('Bookings load error:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const handleStatusChange = async (booking, newStatus) => {
        try {
            await api.patch(`/admin/bookings/${booking.id}`, { status_payment: newStatus });
            setBookings(prev => prev.map(b => b.id === booking.id ? { ...b, status_payment: newStatus } : b));
        } catch (e) {
            console.error('Status update error:', e);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this booking?')) return;
        try {
            await api.delete(`/admin/bookings/${id}`);
            setBookings(prev => prev.filter(b => b.id !== id));
        } catch (e) {
            console.error('Delete error:', e);
        }
    };

    const statuses = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];
    const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status_payment === filter);

    return (
        <div className="space-y-5">
            {/* Filter Pills */}
            <div className="flex gap-2 flex-wrap">
                {statuses.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all duration-200 ${
                            filter === f
                                ? 'bg-[#1B3022] text-white shadow-sm'
                                : 'bg-white border border-gray-200 text-gray-500 hover:border-[#C8A96A] hover:text-[#1B3022]'
                        }`}
                    >
                        {f} ({f === 'all' ? bookings.length : bookings.filter(b => b.status_payment === f).length})
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100/80 overflow-hidden shadow-sm">
                <div className="px-7 py-5 border-b border-gray-50 flex justify-between items-center">
                    <div>
                        <h3 className="font-serif text-lg text-[#1B3022]">All Bookings</h3>
                        <p className="text-[10px] text-gray-400 mt-0.5">{filtered.length} reservation{filtered.length !== 1 ? 's' : ''}</p>
                    </div>
                    <button onClick={load} className="flex items-center gap-2 text-[9px] bg-[#1B3022] text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-all duration-200">
                        <RefreshCw size={10} className={loading ? 'animate-spin' : ''} /> Refresh
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-14">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1B3022]" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-14 text-gray-400 text-sm italic">No bookings found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="text-[9px] uppercase tracking-[0.15em] text-gray-400 bg-gray-50/40">
                                <tr>
                                    {['#', 'Guest', 'Room', 'Check-in', 'Check-out', 'Total', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="px-5 py-4 font-bold">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
                                {filtered.map((b, i) => (
                                    <motion.tr
                                        key={b.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="hover:bg-gray-50/80 transition-colors"
                                    >
                                        <td className="px-5 py-4 text-gray-400 text-xs font-mono">#{b.id}</td>
                                        <td className="px-5 py-4 font-medium text-gray-900">
                                            {b.user ? `${b.user.prenom ?? ''} ${b.user.nom ?? ''}`.trim() : 'Guest'}
                                        </td>
                                        <td className="px-5 py-4 text-gray-500 italic">{b.room?.type?.title ?? b.room?.name ?? 'N/A'}</td>
                                        <td className="px-5 py-4 text-gray-500">{b.date_debut}</td>
                                        <td className="px-5 py-4 text-gray-500">{b.date_fin}</td>
                                        <td className="px-5 py-4 font-semibold text-[#1B3022]">
                                            {b.prix_total ? `${Number(b.prix_total).toLocaleString()} MAD` : '—'}
                                        </td>
                                        <td className="px-5 py-4"><StatusBadge status={b.status_payment} /></td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <select
                                                    value={b.status_payment}
                                                    onChange={e => handleStatusChange(b, e.target.value)}
                                                    className="text-[10px] border border-gray-200 rounded-lg px-2 py-1.5 bg-white cursor-pointer focus:outline-none focus:border-[#C8A96A] focus:ring-1 focus:ring-[#C8A96A]/30 transition-all"
                                                >
                                                    {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                                <button
                                                    onClick={() => handleDelete(b.id)}
                                                    className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 text-xs font-bold transition-all"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Messages Tab ─────────────────────────────────────────────────────────────
function MessagesTab() {
    const [messages, setMessages] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        api.get('/admin/messages')
            .then(r => setMessages(r.data?.data ?? r.data ?? []))
            .catch(e => console.error(e))
            .finally(() => setLoading(false));
    }, []);

    const openMessage = async (msg) => {
        setSelected(msg);
        if (!msg.is_read) {
            try {
                await api.put(`/admin/messages/${msg.id}/read`);
                setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, is_read: true } : m));
            } catch (e) {
                console.error(e);
            }
        }
    };

    const getInitials = (msg) => {
        const name = (msg.name ?? msg.full_name ?? msg.nom ?? '').trim() || '??';
        return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    };

    const getDisplayName = (msg) => {
        const full = msg.name ?? msg.full_name ?? `${msg.prenom ?? ''} ${msg.nom ?? ''}`.trim();
        return full || 'Guest';
    };

    const unreadCount = messages.filter(m => !m.is_read).length;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 h-[680px]">
            {/* Inbox */}
            <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100/80 overflow-hidden shadow-sm flex flex-col">
                <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center flex-shrink-0">
                    <h3 className="font-serif text-lg text-[#1B3022]">Inbox</h3>
                    {unreadCount > 0 && (
                        <span className="text-[9px] bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold ring-1 ring-amber-200">
                            {unreadCount} unread
                        </span>
                    )}
                </div>
                <div className="overflow-y-auto flex-1">
                    {loading ? (
                        <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1B3022]" />
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-10 text-gray-400 text-sm italic">No messages yet.</div>
                    ) : messages.map(msg => (
                        <button
                            key={msg.id}
                            onClick={() => openMessage(msg)}
                            className={`w-full text-left flex gap-3 px-5 py-4 border-b border-gray-50 transition-all ${
                                selected?.id === msg.id ? 'bg-[#F5F3EE] border-l-2 border-l-[#C8A96A]' : 'hover:bg-gray-50/80'
                            }`}
                        >
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                                msg.is_read ? 'bg-gray-100 text-gray-500' : 'bg-[#1B3022] text-[#C8A96A]'
                            }`}>
                                {getInitials(msg)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm ${msg.is_read ? 'font-medium text-gray-700' : 'font-bold text-gray-900'}`}>
                                    {getDisplayName(msg)}
                                </p>
                                <p className="text-xs text-gray-400 truncate mt-0.5">
                                    {msg.message ?? msg.body ?? msg.content ?? '—'}
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                                <span className="text-[9px] text-gray-400">
                                    {msg.created_at ? new Date(msg.created_at).toLocaleDateString() : ''}
                                </span>
                                {!msg.is_read && <span className="w-2 h-2 rounded-full bg-[#C8A96A]" />}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Detail */}
            <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100/80 overflow-hidden shadow-sm flex flex-col">
                {selected ? (
                    <AnimatePresence mode="wait">
                        
                        <motion.div
                            key={selected.id}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="flex flex-col h-full"
                        >
                            <div className="px-7 py-5 border-b border-gray-50 bg-gray-50/40 flex-shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#1B3022] text-[#C8A96A] rounded-full flex items-center justify-center text-xs font-bold">
                                        {getInitials(selected)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#1B3022]">{getDisplayName(selected)}</h3>
                                        {selected.email && <p className="text-[10px] text-gray-400">{selected.email}</p>}
                                        {selected.telephone && <p className="text-[10px] text-gray-400">📞 {selected.telephone}</p>}
                                    </div>
                                    <div className="ml-auto flex items-center gap-2">
                                        <span className="text-[9px] text-gray-400">
                                            {selected.created_at ? new Date(selected.created_at).toLocaleString() : ''}
                                        </span>
                                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ring-1 ${
                                            selected.is_read ? 'bg-green-50 text-green-700 ring-green-200' : 'bg-orange-50 text-orange-600 ring-orange-200'
                                        }`}>
                                            {selected.is_read ? 'Read' : 'Unread'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 p-7">
                                <div className="bg-[#F5F3EE] rounded-2xl p-6 text-sm text-gray-700 leading-relaxed">
                                    {selected.message ?? selected.body ?? selected.content ?? '—'}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-300 gap-3">
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center">
                            <MessageSquare size={28} />
                        </div>
                        <p className="text-sm italic text-gray-400">Select a message to read</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Reviews Tab ──────────────────────────────────────────────────────────────
function ReviewsTab() {
    const [reviews, setReviews] = useState([]);
    const [meta, setMeta]       = useState({});
    const [loading, setLoading] = useState(true);
    const [page, setPage]       = useState(1);

    const load = useCallback(async (p = 1) => {
        setLoading(true);
        try {
            const res = await api.get(`/reviews?per_page=10&page=${p}`);
            const data = res.data;
            setReviews(data.data ?? data ?? []);
            setMeta({ total: data.total, last_page: data.last_page, current_page: data.current_page });
        } catch (e) {
            console.error('Reviews load error:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(page); }, [load, page]);

    const handleDelete = async (id) => {
        if (!confirm('Delete this review?')) return;
        try {
            await api.delete(`/reviews/${id}`);
            setReviews(prev => prev.filter(r => r.id !== id));
        } catch (e) {
            console.error(e);
        }
    };

    const avgRating = reviews.length
        ? (reviews.reduce((s, r) => s + Number(r.note), 0) / reviews.length).toFixed(1)
        : '—';

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Reviews', value: meta.total ?? reviews.length, sub: null },
                    { label: 'Avg. Rating', value: avgRating, sub: <div className="text-[#C8A96A] text-base mt-1">{'★'.repeat(Math.round(Number(avgRating) || 0))}</div> },
                    { label: '5-Star Reviews', value: reviews.filter(r => Number(r.note) === 5).length, sub: null },
                ].map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-sm"
                    >
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">{card.label}</p>
                        <h4 className="text-3xl font-bold text-[#1B3022]">{card.value}</h4>
                        {card.sub}
                    </motion.div>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100/80 overflow-hidden shadow-sm">
                <div className="px-7 py-5 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-serif text-lg text-[#1B3022]">Guest Reviews</h3>
                    <button onClick={() => load(page)} className="flex items-center gap-2 text-[9px] bg-[#1B3022] text-white px-4 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-all duration-200">
                        <RefreshCw size={10} className={loading ? 'animate-spin' : ''} /> Refresh
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1B3022]" />
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 text-sm italic">No reviews yet.</div>
                ) : (
                    reviews.map((r, i) => {
                        const guestName = r.user
                            ? `${r.user.prenom ?? ''} ${r.user.nom ?? ''}`.trim() || r.user.name
                            : 'Guest';
                        const roomTitle = r.room?.type?.title ?? r.room?.name ?? 'Room';
                        return (
                            <motion.div
                                key={r.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.04 }}
                                className="px-7 py-5 border-b border-gray-50/80 last:border-b-0 hover:bg-gray-50/40 transition-colors"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="font-semibold text-sm text-gray-900">{guestName}</p>
                                        <p className="text-[10px] text-gray-400 italic mt-0.5">
                                            {roomTitle} · {r.created_at ? new Date(r.created_at).toLocaleDateString() : ''}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Stars rating={Number(r.note)} />
                                        <button
                                            onClick={() => handleDelete(r.id)}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 text-xs font-bold transition-all"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </div>
                                {r.commentaire && (
                                    <p className="text-xs text-gray-500 italic leading-relaxed border-l-2 border-[#C8A96A]/40 pl-3 mt-2">
                                        "{r.commentaire}"
                                    </p>
                                )}
                            </motion.div>
                        );
                    })
                )}

                {meta.last_page > 1 && (
                    <div className="flex justify-center gap-2 p-5 border-t border-gray-50">
                        {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-8 h-8 rounded-full text-xs font-bold transition-all duration-200 ${
                                    page === p
                                        ? 'bg-[#1B3022] text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-500 hover:bg-[#C8A96A]/20 hover:text-[#1B3022]'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Main AdminDashboard ──────────────────────────────────────────────────────
const AdminDashboard = () => {
    const [activeTab, setActiveTab]   = useState('Overview');
    const [stats, setStats]           = useState([]);
    const [recentActivity, setRecent] = useState([]);
    const [loading, setLoading]       = useState(true);
    const navigate = useNavigate();

    const loadStats = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/stats');
            if (res.data.success) {
                setStats(res.data.stats);
                setRecent(res.data.recentActivity);
            }
        } catch (e) {
            console.error('Stats error:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { loadStats(); }, [loadStats]);

    const handleLogout = async () => {
        try { await api.post('/logout'); } catch (_) {}
        localStorage.removeItem('auth_token');
        delete api.defaults.headers.common['Authorization'];
        navigate('/auth');
    };

    const tabs = [
        { name: 'Overview',   Icon: LayoutDashboard },
        { name: 'Bookings',   Icon: BedDouble },
        { name: 'Messages',   Icon: MessageSquare },
        { name: 'Reviews',    Icon: Star },
        { name: 'Analytics',  Icon: TrendingUp },
        { name: 'Settings',   Icon: Settings },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B3022] mx-auto mb-4" />
                    <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em]">Loading Console…</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#F5F3EE]">

            {/* ── Sidebar ── */}
            <aside className="w-60 bg-[#1B3022] text-white hidden md:flex flex-col shadow-2xl flex-shrink-0">
                {/* Logo */}
                <div className="p-8 border-b border-white/10">
                    <h1 className="text-lg font-serif tracking-[0.2em] uppercase text-[#C8A96A]">Le Musée</h1>
                    <span className="text-[9px] opacity-40 tracking-[0.3em] uppercase">Management Console</span>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-5 space-y-1">
                    {tabs.map(({ name, Icon }) => (
                        <button
                            key={name}
                            onClick={() => setActiveTab(name)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs transition-all duration-200 ${
                                activeTab === name
                                    ? 'bg-[#C8A96A] text-[#1B3022] font-bold shadow-md'
                                    : 'hover:bg-white/8 opacity-60 hover:opacity-100'
                            }`}
                        >
                            <Icon size={15} />
                            {name}
                            {name === 'Analytics' && (
                                <span className="ml-auto text-[7px] font-bold uppercase tracking-widest bg-[#C8A96A]/20 text-[#C8A96A] px-1.5 py-0.5 rounded-full">
                                    New
                                </span>
                            )}
                            {name === 'Settings' && (
                                <span className="ml-auto text-[7px] font-bold uppercase tracking-widest bg-white/10 text-white/50 px-1.5 py-0.5 rounded-full">
                                    Admin
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer */}
                <div className="p-5 border-t border-white/10 space-y-3">
                    <div className="flex items-center gap-2.5 px-2">
                        <div className="w-7 h-7 bg-[#C8A96A] rounded-full flex items-center justify-center text-[10px] font-bold text-[#1B3022]">
                            AD
                        </div>
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-tight text-white/80">Administrator</p>
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                                <span className="text-[8px] text-emerald-400 font-bold">ONLINE</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2.5 px-2 text-xs text-red-300/80 hover:text-red-300 transition-colors w-full"
                    >
                        <LogOut size={13} /> Exit System
                    </button>
                </div>
            </aside>

            {/* ── Main ── */}
            <main className="flex-1 overflow-y-auto">
                {/* Topbar */}
                <header className="flex justify-between items-center px-8 pt-8 pb-4">
                    <div>
                        <h2 className="text-2xl font-serif text-[#1B3022] tracking-tight">{activeTab}</h2>
                        <p className="text-[10px] text-gray-400 italic mt-0.5">
                            {activeTab === 'Analytics'
                                ? 'Performance insights & revenue trends'
                                : activeTab === 'Settings'
                                ? 'Manage hotel application configuration'
                                : 'Live data from Le Musée database.'}
                        </p>
                    </div>
                </header>

                {/* Tab Content */}
                <div className="px-8 pb-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {activeTab === 'Overview'  && <OverviewTab stats={stats} activity={recentActivity} onRefresh={loadStats} loading={loading} />}
                            {activeTab === 'Bookings'  && <BookingsTab />}
                            {activeTab === 'Messages'  && <MessagesTab />}
                            {activeTab === 'Reviews'   && <ReviewsTab />}
                            {activeTab === 'Analytics' && <AnalyticsPage />}
                            {activeTab === 'Settings'  && <SettingsPage />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;