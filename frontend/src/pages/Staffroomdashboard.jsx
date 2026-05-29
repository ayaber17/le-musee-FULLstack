// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//     Home, Wrench, Sparkles, CheckCircle, RefreshCw,
//     Bell, X, BedDouble, ChevronDown, AlertCircle, LogOut
// } from 'lucide-react';
// import api from '../api';
// import { useNavigate } from 'react-router-dom';

// // ─── Config statuts ────────────────────────────────────────────────────────────
// const STATUS = {
//     available: {
//         label: 'Disponible',
//         bg: 'bg-emerald-50',
//         border: 'border-emerald-200',
//         badge: 'bg-emerald-100 text-emerald-700',
//         dot: 'bg-emerald-500',
//         icon: CheckCircle,
//         iconColor: 'text-emerald-500',
//     },
//     occupied: {
//         label: 'Occupée',
//         bg: 'bg-blue-50',
//         border: 'border-blue-200',
//         badge: 'bg-blue-100 text-blue-700',
//         dot: 'bg-blue-500',
//         icon: BedDouble,
//         iconColor: 'text-blue-500',
//     },
//     cleaning: {
//         label: 'Nettoyage',
//         bg: 'bg-amber-50',
//         border: 'border-amber-200',
//         badge: 'bg-amber-100 text-amber-700',
//         dot: 'bg-amber-400',
//         icon: Sparkles,
//         iconColor: 'text-amber-500',
//     },
//     maintenance: {
//         label: 'Maintenance',
//         bg: 'bg-red-50',
//         border: 'border-red-200',
//         badge: 'bg-red-100 text-red-600',
//         dot: 'bg-red-400',
//         icon: Wrench,
//         iconColor: 'text-red-500',
//     },
// };

// // ─── Toast ─────────────────────────────────────────────────────────────────────
// const Toast = ({ message, onHide }) => {
//     useEffect(() => {
//         const t = setTimeout(onHide, 3000);
//         return () => clearTimeout(t);
//     }, []);
//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full shadow-xl flex items-center gap-2">
//             <CheckCircle size={13} /> {message}
//         </motion.div>
//     );
// };

// // ─── Stat Card ─────────────────────────────────────────────────────────────────
// const StatCard = ({ status, count, active, onClick }) => {
//     const cfg = STATUS[status];
//     const Icon = cfg.icon;
//     return (
//         <motion.button
//             whileTap={{ scale: 0.97 }}
//             onClick={onClick}
//             className={`flex flex-col items-start gap-2 p-4 rounded-2xl border transition-all text-left w-full
//                 ${active ? `${cfg.bg} ${cfg.border} shadow-sm` : 'bg-white border-gray-100 hover:border-gray-200'}`}>
//             <Icon size={18} className={active ? cfg.iconColor : 'text-gray-300'} />
//             <div>
//                 <p className="text-[9px] uppercase tracking-widest text-gray-400">{cfg.label}</p>
//                 <p className="text-2xl font-bold text-[#1B3022]">{count}</p>
//             </div>
//         </motion.button>
//     );
// };

// // ─── Room Card ─────────────────────────────────────────────────────────────────
// const RoomCard = ({ room, selected, onToggle, onStatusChange, saving }) => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const cfg = STATUS[room.status] ?? STATUS.available;
//     const Icon = cfg.icon;

//     return (
//         <motion.div
//             layout
//             initial={{ opacity: 0, y: 8 }}
//             animate={{ opacity: 1, y: 0 }}
//             className={`relative bg-white rounded-2xl border-2 overflow-visible transition-all cursor-pointer
//                 ${selected
//                     ? 'border-[#1B3022] shadow-md'
//                     : `border-gray-100 hover:border-gray-200`}`}
//             onClick={() => !menuOpen && onToggle(room.id)}>

//             {/* Checkbox indicator */}
//             <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all z-10
//                 ${selected ? 'bg-[#1B3022] border-[#1B3022]' : 'bg-white border-gray-200'}`}>
//                 {selected && <CheckCircle size={10} className="text-white" />}
//             </div>

//             <div className="p-4">
//                 {/* Header */}
//                 <div className="flex justify-between items-start mb-3">
//                     <div>
//                         <p className="text-[9px] uppercase tracking-widest text-gray-400">Chambre</p>
//                         <p className="text-2xl font-bold text-[#1B3022] leading-none">{room.num_room}</p>
//                         <p className="text-[10px] text-gray-400 mt-0.5">Étage {room.floor ?? '—'}</p>
//                     </div>
//                     <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cfg.bg}`}>
//                         <Icon size={16} className={cfg.iconColor} />
//                     </div>
//                 </div>

//                 {/* Type */}
//                 <p className="text-[10px] text-gray-500 mb-3">{room.type?.name ?? '—'}</p>

//                 {/* Status badge + dropdown */}
//                 <div className="relative" onClick={e => e.stopPropagation()}>
//                     <button
//                         onClick={() => setMenuOpen(o => !o)}
//                         disabled={saving}
//                         className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${cfg.badge} ${cfg.border}`}>
//                         <span className="flex items-center gap-1.5">
//                             <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
//                             {cfg.label}
//                         </span>
//                         <ChevronDown size={10} className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
//                     </button>

//                     <AnimatePresence>
//                         {menuOpen && (
//                             <motion.div
//                                 initial={{ opacity: 0, y: -4, scale: 0.97 }}
//                                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                                 exit={{ opacity: 0, y: -4, scale: 0.97 }}
//                                 transition={{ duration: 0.12 }}
//                                 className="absolute bottom-full mb-1 left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
//                                 {Object.entries(STATUS).map(([key, s]) => {
//                                     if (key === room.status) return null;
//                                     const SI = s.icon;
//                                     return (
//                                         <button key={key}
//                                             onClick={() => { onStatusChange(room.id, key); setMenuOpen(false); }}
//                                             className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors text-left">
//                                             <SI size={12} className={s.iconColor} />
//                                             {s.label}
//                                         </button>
//                                     );
//                                 })}
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// // ─── Action Bar ────────────────────────────────────────────────────────────────
// const ActionBar = ({ count, onApply, onClear, saving }) => (
//     <motion.div
//         initial={{ y: 60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         exit={{ y: 60, opacity: 0 }}
//         className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 px-6 py-4 flex items-center gap-3 shadow-2xl flex-wrap">
//         <p className="text-sm font-bold text-[#1B3022] mr-2">
//             {count} chambre{count > 1 ? 's' : ''} sélectionnée{count > 1 ? 's' : ''}
//         </p>
//         <div className="flex-1" />
//         <button onClick={() => onApply('available')} disabled={saving}
//             className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-100 transition-colors disabled:opacity-50">
//             <CheckCircle size={12} /> Disponible
//         </button>
//         <button onClick={() => onApply('cleaning')} disabled={saving}
//             className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors disabled:opacity-50">
//             <Sparkles size={12} /> Nettoyage
//         </button>
//         <button onClick={() => onApply('maintenance')} disabled={saving}
//             className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-red-100 transition-colors disabled:opacity-50">
//             <Wrench size={12} /> Maintenance
//         </button>
//         <button onClick={onClear} disabled={saving}
//             className="flex items-center gap-1.5 px-3 py-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider hover:text-gray-600 transition-colors">
//             <X size={12} /> Annuler
//         </button>
//     </motion.div>
// );

// // ─── Main ──────────────────────────────────────────────────────────────────────
// const StaffRoomDashboard = () => {
//     const [rooms, setRooms]         = useState([]);
//     const [loading, setLoading]     = useState(true);
//     const [saving, setSaving]       = useState(false);
//     const [selected, setSelected]   = useState(new Set());
//     const [filter, setFilter]       = useState('all');
//     const [toast, setToast]         = useState(null);
//     const [unread, setUnread]       = useState(0);
//     const navigate = useNavigate();

//     const userName = localStorage.getItem('user_name') ?? 'Staff';
//     const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

//     // ── Fetch ────────────────────────────────────────────────────────────────
//     const loadRooms = useCallback(async () => {
//         try {
//             const res = await api.get('/rooms');
//             setRooms(res.data?.data ?? res.data ?? []);
//         } catch (e) { console.error(e); }
//         finally { setLoading(false); }
//     }, []);

//     const loadUnread = useCallback(async () => {
//         try {
//             const res = await api.get('/notifications/unread-count');
//             setUnread(res.data?.count ?? res.data ?? 0);
//         } catch (e) {}
//     }, []);

//     useEffect(() => {
//         loadRooms();
//         loadUnread();
//         const interval = setInterval(loadUnread, 30000);
//         return () => clearInterval(interval);
//     }, []);

//     // ── Single room status change ────────────────────────────────────────────
//     const handleSingleStatus = async (roomId, newStatus) => {
//         setSaving(true);
//         try {
//             await api.patch(`/admin/rooms/${roomId}`, { status: newStatus });
//             setRooms(prev => prev.map(r =>
//                 r.id === roomId ? { ...r, status: newStatus } : r
//             ));
//             showToast(`Chambre mise en ${STATUS[newStatus].label}`);
//         } catch (e) {
//             console.error(e);
//             showToast('Erreur lors de la mise à jour');
//         } finally { setSaving(false); }
//     };

//     // ── Bulk status change ───────────────────────────────────────────────────
//     const handleBulkStatus = async (newStatus) => {
//         if (selected.size === 0) return;
//         setSaving(true);
//         try {
//             await Promise.all(
//                 [...selected].map(id =>
//                     api.patch(`/admin/rooms/${id}`, { status: newStatus })
//                 )
//             );
//             setRooms(prev => prev.map(r =>
//                 selected.has(r.id) ? { ...r, status: newStatus } : r
//             ));
//             const count = selected.size;
//             setSelected(new Set());
//             showToast(`${count} chambre${count > 1 ? 's' : ''} → ${STATUS[newStatus].label}`);
//         } catch (e) {
//             console.error(e);
//             showToast('Erreur lors de la mise à jour');
//         } finally { setSaving(false); }
//     };

//     // ── Selection ────────────────────────────────────────────────────────────
//     const toggleSelect = (id) => {
//         setSelected(prev => {
//             const next = new Set(prev);
//             next.has(id) ? next.delete(id) : next.add(id);
//             return next;
//         });
//     };

//     const clearSelection = () => setSelected(new Set());

//     // ── Toast ────────────────────────────────────────────────────────────────
//     const showToast = (msg) => setToast(msg);

//     // ── Stats ────────────────────────────────────────────────────────────────
//     const stats = Object.keys(STATUS).reduce((acc, key) => {
//         acc[key] = rooms.filter(r => r.status === key).length;
//         return acc;
//     }, {});

//     // ── Filtered rooms ───────────────────────────────────────────────────────
//     const visible = filter === 'all' ? rooms : rooms.filter(r => r.status === filter);

//     const handleLogout = async () => {
//         try { await api.post('/logout'); } catch (_) {}
//         localStorage.removeItem('auth_token');
//         localStorage.removeItem('user_role');
//         localStorage.removeItem('user_name');
//         navigate('/auth');
//     };

//     if (loading) return (
//         <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE]">
//             <div className="text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B3022] mx-auto mb-4" />
//                 <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em]">Chargement…</p>
//             </div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#F5F3EE]">

//             {/* ── Header ── */}
//             <header className="bg-[#1B3022] text-white px-6 py-4 flex items-center gap-4 shadow-xl">
//                 <div className="flex-1">
//                     <h1 className="text-lg font-serif tracking-[0.15em] text-[#C8A96A]">Le Musée</h1>
//                     <p className="text-[9px] text-white/40 uppercase tracking-[0.3em]">Gestion des chambres</p>
//                 </div>

//                 {/* Bell */}
//                 <button onClick={() => navigate('/notifications')}
//                     className="relative w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
//                     <Bell size={15} className="text-white" />
//                     {unread > 0 && (
//                         <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8A96A] text-[#1B3022] text-[8px] font-bold rounded-full flex items-center justify-center">
//                             {unread}
//                         </span>
//                     )}
//                 </button>

//                 {/* Refresh */}
//                 <button onClick={loadRooms}
//                     className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
//                     <RefreshCw size={14} className="text-white" />
//                 </button>

//                 {/* Avatar + logout */}
//                 <div className="flex items-center gap-2.5 ml-1">
//                     <div className="w-8 h-8 bg-[#C8A96A] rounded-full flex items-center justify-center text-[10px] font-bold text-[#1B3022]">
//                         {initials}
//                     </div>
//                     <button onClick={handleLogout}
//                         className="text-white/50 hover:text-white transition-colors">
//                         <LogOut size={14} />
//                     </button>
//                 </div>
//             </header>

//             <div className="px-5 pt-6 pb-32">

//                 {/* ── Stats ── */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
//                     {Object.entries(stats).map(([status, count]) => (
//                         <StatCard
//                             key={status}
//                             status={status}
//                             count={count}
//                             active={filter === status}
//                             onClick={() => {
//                                 setFilter(f => f === status ? 'all' : status);
//                                 clearSelection();
//                             }}
//                         />
//                     ))}
//                 </div>

//                 {/* ── Filter bar ── */}
//                 <div className="flex items-center gap-2 mb-5 flex-wrap">
//                     <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 flex-wrap">
//                         {[
//                             { v: 'all',         l: `Toutes (${rooms.length})` },
//                             { v: 'available',   l: `Disponibles (${stats.available})` },
//                             { v: 'cleaning',    l: `Nettoyage (${stats.cleaning})` },
//                             { v: 'maintenance', l: `Maintenance (${stats.maintenance})` },
//                             { v: 'occupied',    l: `Occupées (${stats.occupied})` },
//                         ].map(({ v, l }) => (
//                             <button key={v} onClick={() => { setFilter(v); clearSelection(); }}
//                                 className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${
//                                     filter === v ? 'bg-[#1B3022] text-white' : 'text-gray-400 hover:text-[#1B3022]'
//                                 }`}>
//                                 {l}
//                             </button>
//                         ))}
//                     </div>
//                     {selected.size > 0 && (
//                         <p className="text-[10px] text-[#1B3022] font-bold uppercase tracking-widest ml-1">
//                             {selected.size} sélectionnée{selected.size > 1 ? 's' : ''}
//                         </p>
//                     )}
//                 </div>

//                 {/* ── Rooms grid ── */}
//                 {visible.length === 0 ? (
//                     <div className="text-center py-20 text-gray-300">
//                         <Home size={36} className="mx-auto mb-3" />
//                         <p className="text-sm italic">Aucune chambre trouvée.</p>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//                         <AnimatePresence mode="popLayout">
//                             {visible.map(room => (
//                                 <RoomCard
//                                     key={room.id}
//                                     room={room}
//                                     selected={selected.has(room.id)}
//                                     onToggle={toggleSelect}
//                                     onStatusChange={handleSingleStatus}
//                                     saving={saving}
//                                 />
//                             ))}
//                         </AnimatePresence>
//                     </div>
//                 )}
//             </div>

//             {/* ── Action bar (bulk) ── */}
//             <AnimatePresence>
//                 {selected.size > 0 && (
//                     <ActionBar
//                         count={selected.size}
//                         onApply={handleBulkStatus}
//                         onClear={clearSelection}
//                         saving={saving}
//                     />
//                 )}
//             </AnimatePresence>

//             {/* ── Toast ── */}
//             <AnimatePresence>
//                 {toast && <Toast message={toast} onHide={() => setToast(null)} />}
//             </AnimatePresence>
//         </div>
//     );
// };

// export default StaffRoomDashboard;


import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
    Home, Wrench, Sparkles, CheckCircle, RefreshCw,
    Bell, X, BedDouble, ChevronDown, AlertCircle, LogOut, ArrowLeft
} from 'lucide-react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

// ─── Config statuts ────────────────────────────────────────────────────────────
const STATUS = {
    available: {
        label: 'Disponible',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-700',
        dot: 'bg-emerald-500',
        icon: CheckCircle,
        iconColor: 'text-emerald-500',
    },
    occupied: {
        label: 'Occupée',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        badge: 'bg-blue-100 text-blue-700',
        dot: 'bg-blue-500',
        icon: BedDouble,
        iconColor: 'text-blue-500',
    },
    cleaning: {
        label: 'Nettoyage',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-700',
        dot: 'bg-amber-400',
        icon: Sparkles,
        iconColor: 'text-amber-500',
    },
    maintenance: {
        label: 'Maintenance',
        bg: 'bg-red-50',
        border: 'border-red-200',
        badge: 'bg-red-100 text-red-600',
        dot: 'bg-red-400',
        icon: Wrench,
        iconColor: 'text-red-500',
    },
};

// ─── Toast ─────────────────────────────────────────────────────────────────────
const Toast = ({ message, onHide }) => {
    useEffect(() => {
        const t = setTimeout(onHide, 3000);
        return () => clearTimeout(t);
    }, []);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1B3022] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-full shadow-xl flex items-center gap-2">
            <CheckCircle size={13} /> {message}
        </motion.div>
    );
};

// ─── Stat Card ─────────────────────────────────────────────────────────────────
const StatCard = ({ status, count, active, onClick }) => {
    const cfg = STATUS[status];
    const Icon = cfg.icon;
    return (
        <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
            className={`flex flex-col items-start gap-2 p-4 rounded-2xl border transition-all text-left w-full
                ${active ? `${cfg.bg} ${cfg.border} shadow-sm` : 'bg-white border-gray-100 hover:border-gray-200'}`}>
            <Icon size={18} className={active ? cfg.iconColor : 'text-gray-300'} />
            <div>
                <p className="text-[9px] uppercase tracking-widest text-gray-400">{cfg.label}</p>
                <p className="text-2xl font-bold text-[#1B3022]">{count}</p>
            </div>
        </motion.button>
    );
};

// ─── Room Card ─────────────────────────────────────────────────────────────────
const RoomCard = ({ room, selected, onToggle, onStatusChange, saving }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const cfg = STATUS[room.status] ?? STATUS.available;
    const Icon = cfg.icon;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative bg-white rounded-2xl border-2 overflow-visible transition-all cursor-pointer
                ${selected
                    ? 'border-[#1B3022] shadow-md'
                    : `border-gray-100 hover:border-gray-200`}`}
            onClick={() => !menuOpen && onToggle(room.id)}>

            {/* Checkbox indicator */}
            <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all z-10
                ${selected ? 'bg-[#1B3022] border-[#1B3022]' : 'bg-white border-gray-200'}`}>
                {selected && <CheckCircle size={10} className="text-white" />}
            </div>

            <div className="p-4">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <p className="text-[9px] uppercase tracking-widest text-gray-400">Chambre</p>
                        <p className="text-2xl font-bold text-[#1B3022] leading-none">{room.num_room}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">Étage {room.floor ?? '—'}</p>
                    </div>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cfg.bg}`}>
                        <Icon size={16} className={cfg.iconColor} />
                    </div>
                </div>

                {/* Type */}
                <p className="text-[10px] text-gray-500 mb-3">{room.type?.name ?? '—'}</p>

                {/* Status badge + dropdown */}
                <div className="relative" onClick={e => e.stopPropagation()}>
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        disabled={saving}
                        className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${cfg.badge} ${cfg.border}`}>
                        <span className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {cfg.label}
                        </span>
                        <ChevronDown size={10} className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                                transition={{ duration: 0.12 }}
                                className="absolute bottom-full mb-1 left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-lg z-20 overflow-hidden">
                                {Object.entries(STATUS).map(([key, s]) => {
                                    if (key === room.status) return null;
                                    const SI = s.icon;
                                    return (
                                        <button key={key}
                                            onClick={() => { onStatusChange(room.id, key); setMenuOpen(false); }}
                                            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors text-left">
                                            <SI size={12} className={s.iconColor} />
                                            {s.label}
                                        </button>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

// ─── Action Bar ────────────────────────────────────────────────────────────────
const ActionBar = ({ count, onApply, onClear, saving }) => (
    <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 px-6 py-4 flex items-center gap-3 shadow-2xl flex-wrap">
        <p className="text-sm font-bold text-[#1B3022] mr-2">
            {count} chambre{count > 1 ? 's' : ''} sélectionnée{count > 1 ? 's' : ''}
        </p>
        <div className="flex-1" />
        <button onClick={() => onApply('available')} disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-emerald-100 transition-colors disabled:opacity-50">
            <CheckCircle size={12} /> Disponible
        </button>
        <button onClick={() => onApply('cleaning')} disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-50 text-amber-700 border border-amber-200 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-amber-100 transition-colors disabled:opacity-50">
            <Sparkles size={12} /> Nettoyage
        </button>
        <button onClick={() => onApply('maintenance')} disabled={saving}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-red-100 transition-colors disabled:opacity-50">
            <Wrench size={12} /> Maintenance
        </button>
        <button onClick={onClear} disabled={saving}
            className="flex items-center gap-1.5 px-3 py-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider hover:text-gray-600 transition-colors">
            <X size={12} /> Annuler
        </button>
    </motion.div>
);

// ─── Main ──────────────────────────────────────────────────────────────────────
const StaffRoomDashboard = () => {
    const [rooms, setRooms]         = useState([]);
    const [loading, setLoading]     = useState(true);
    const [saving, setSaving]       = useState(false);
    const [selected, setSelected]   = useState(new Set());
    const [filter, setFilter]       = useState('all');
    const [toast, setToast]         = useState(null);
    const [unread, setUnread]       = useState(0);
    const navigate = useNavigate();

    const userName = localStorage.getItem('user_name') ?? 'Staff';
    const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    // ── Fetch ────────────────────────────────────────────────────────────────
    const loadRooms = useCallback(async () => {
        try {
            const res = await api.get('/rooms');
            setRooms(res.data?.data ?? res.data ?? []);
        } catch (e) { console.error(e); }
        finally { setLoading(false); }
    }, []);

    const loadUnread = useCallback(async () => {
        try {
            const res = await api.get('/notifications/unread-count');
            setUnread(res.data?.count ?? res.data ?? 0);
        } catch (e) {}
    }, []);

    useEffect(() => {
        loadRooms();
        loadUnread();
        const interval = setInterval(loadUnread, 30000);
        return () => clearInterval(interval);
    }, []);

    // ── Single room status change ────────────────────────────────────────────
    const handleSingleStatus = async (roomId, newStatus) => {
        setSaving(true);
        try {
            await api.patch(`/admin/rooms/${roomId}`, { status: newStatus });
            setRooms(prev => prev.map(r =>
                r.id === roomId ? { ...r, status: newStatus } : r
            ));
            showToast(`Chambre mise en ${STATUS[newStatus].label}`);
        } catch (e) {
            console.error(e);
            showToast('Erreur lors de la mise à jour');
        } finally { setSaving(false); }
    };

    // ── Bulk status change ───────────────────────────────────────────────────
    const handleBulkStatus = async (newStatus) => {
        if (selected.size === 0) return;
        setSaving(true);
        try {
            await Promise.all(
                [...selected].map(id =>
                    api.patch(`/admin/rooms/${id}`, { status: newStatus })
                )
            );
            setRooms(prev => prev.map(r =>
                selected.has(r.id) ? { ...r, status: newStatus } : r
            ));
            const count = selected.size;
            setSelected(new Set());
            showToast(`${count} chambre${count > 1 ? 's' : ''} → ${STATUS[newStatus].label}`);
        } catch (e) {
            console.error(e);
            showToast('Erreur lors de la mise à jour');
        } finally { setSaving(false); }
    };

    // ── Selection ────────────────────────────────────────────────────────────
    const toggleSelect = (id) => {
        setSelected(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const clearSelection = () => setSelected(new Set());

    // ── Toast ────────────────────────────────────────────────────────────────
    const showToast = (msg) => setToast(msg);

    // ── Stats ────────────────────────────────────────────────────────────────
    const stats = Object.keys(STATUS).reduce((acc, key) => {
        acc[key] = rooms.filter(r => r.status === key).length;
        return acc;
    }, {});

    // ── Filtered rooms ───────────────────────────────────────────────────────
    const visible = filter === 'all' ? rooms : rooms.filter(r => r.status === filter);

    const handleLogout = async () => {
        try { await api.post('/logout'); } catch (_) {}
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_name');
        navigate('/auth');
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B3022] mx-auto mb-4" />
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em]">Chargement…</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F5F3EE]">

            {/* ── Header ── */}
            <header className="bg-[#1B3022] text-white px-6 py-4 flex items-center gap-4 shadow-xl">
                {/* ← Retour Réception */}
                <button
                    onClick={() => navigate('/reception')}
                    className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0"
                    title="Retour à la réception">
                    <ArrowLeft size={15} className="text-white" />
                </button>

                <div className="flex-1">
                    <h1 className="text-lg font-serif tracking-[0.15em] text-[#C8A96A]">Le Musée</h1>
                    <p className="text-[9px] text-white/40 uppercase tracking-[0.3em]">Gestion des chambres</p>
                </div>

                {/* Bell */}
                <button onClick={() => navigate('/notifications')}
                    className="relative w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                    <Bell size={15} className="text-white" />
                    {unread > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C8A96A] text-[#1B3022] text-[8px] font-bold rounded-full flex items-center justify-center">
                            {unread}
                        </span>
                    )}
                </button>

                {/* Refresh */}
                <button onClick={loadRooms}
                    className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                    <RefreshCw size={14} className="text-white" />
                </button>

                {/* Avatar + logout */}
                <div className="flex items-center gap-2.5 ml-1">
                    <div className="w-8 h-8 bg-[#C8A96A] rounded-full flex items-center justify-center text-[10px] font-bold text-[#1B3022]">
                        {initials}
                    </div>
                    <button onClick={handleLogout}
                        className="text-white/50 hover:text-white transition-colors">
                        <LogOut size={14} />
                    </button>
                </div>
            </header>

            <div className="px-5 pt-6 pb-32">

                {/* ── Stats ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {Object.entries(stats).map(([status, count]) => (
                        <StatCard
                            key={status}
                            status={status}
                            count={count}
                            active={filter === status}
                            onClick={() => {
                                setFilter(f => f === status ? 'all' : status);
                                clearSelection();
                            }}
                        />
                    ))}
                </div>

                {/* ── Filter bar ── */}
                <div className="flex items-center gap-2 mb-5 flex-wrap">
                    <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 flex-wrap">
                        {[
                            { v: 'all',         l: `Toutes (${rooms.length})` },
                            { v: 'available',   l: `Disponibles (${stats.available})` },
                            { v: 'cleaning',    l: `Nettoyage (${stats.cleaning})` },
                            { v: 'maintenance', l: `Maintenance (${stats.maintenance})` },
                            { v: 'occupied',    l: `Occupées (${stats.occupied})` },
                        ].map(({ v, l }) => (
                            <button key={v} onClick={() => { setFilter(v); clearSelection(); }}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${
                                    filter === v ? 'bg-[#1B3022] text-white' : 'text-gray-400 hover:text-[#1B3022]'
                                }`}>
                                {l}
                            </button>
                        ))}
                    </div>
                    {selected.size > 0 && (
                        <p className="text-[10px] text-[#1B3022] font-bold uppercase tracking-widest ml-1">
                            {selected.size} sélectionnée{selected.size > 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                {/* ── Rooms grid ── */}
                {visible.length === 0 ? (
                    <div className="text-center py-20 text-gray-300">
                        <Home size={36} className="mx-auto mb-3" />
                        <p className="text-sm italic">Aucune chambre trouvée.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        <AnimatePresence mode="popLayout">
                            {visible.map(room => (
                                <RoomCard
                                    key={room.id}
                                    room={room}
                                    selected={selected.has(room.id)}
                                    onToggle={toggleSelect}
                                    onStatusChange={handleSingleStatus}
                                    saving={saving}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* ── Action bar (bulk) ── */}
            <AnimatePresence>
                {selected.size > 0 && (
                    <ActionBar
                        count={selected.size}
                        onApply={handleBulkStatus}
                        onClear={clearSelection}
                        saving={saving}
                    />
                )}
            </AnimatePresence>

            {/* ── Toast ── */}
            <AnimatePresence>
                {toast && <Toast message={toast} onHide={() => setToast(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default StaffRoomDashboard;