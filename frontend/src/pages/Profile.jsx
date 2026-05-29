
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import api from '../api'; // استعمل الـ axios instance اللي صاوبنا

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
    
//     // الحالة ديال الفورم
//     const [form, setForm] = useState({
//         nom: '',
//         prenom: '',
//         telephone: '',
//         nationality: '',
//         dob: '',
//         adresse: ''
//     });

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const response = await api.get('/profile');
//                 const data = response.data;
                
//                 setUser(data);
//                 // تعمير الفورم بالبيانات اللي جات من الباكيند
//                 setForm({
//                     nom: data.nom || '',
//                     prenom: data.prenom || '',
//                     telephone: data.telephone || '',
//                     nationality: data.nationality || '',
//                     // قص التاريخ باش يبان فـ input type="date" (YYYY-MM-DD)
//                     dob: data.dob ? data.dob.substring(0, 10) : '',
//                     adresse: data.adresse || '',
//                 });
//             } catch (err) {
//                 console.error("Error fetching profile:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     // دالة لتحديث الـ state فاش يكتب الـ user
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSave = async (e) => {
//         e.preventDefault();
//         try {
//             await api.put('/profile', {
//                 nom: form.nom,
//                 prenom: form.prenom,
//                 telephone: form.telephone,
//                 details: {
//                     nationality: form.nationality,
//                     dob: form.dob,
//                     adresse: form.adresse,
//                 }
//             });
//             alert('Profile updated successfully!');
//         } catch (err) {
//             alert(err.response?.data?.message || 'Update failed');
//         }
//     };

//     if (loading) return (
//         <div className="h-screen bg-[#1B3022] flex items-center justify-center text-[#C8A96A] tracking-[0.5em] uppercase text-xs">
//             Loading Experience...
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20 px-6 font-sans">
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
                
//                 <div className="text-center mb-16">
//                     <span className="text-[#C8A96A] text-[10px] tracking-[0.4em] uppercase font-bold">Personal Space</span>
//                     <h1 className="text-4xl md:text-5xl font-serif text-[#1B3022] mt-4 uppercase tracking-widest">Guest Profile</h1>
//                     <div className="w-24 h-[1px] bg-[#C8A96A] mx-auto mt-6 opacity-50"></div>
//                 </div>

//                 <div className="grid md:grid-cols-3 gap-12">
//                     <div className="md:col-span-1 text-center">
//                         <div className="w-32 h-32 bg-[#1B3022] rounded-full mx-auto flex items-center justify-center text-[#C8A96A] text-4xl font-serif border border-[#C8A96A]/30 mb-6 shadow-xl uppercase">
//                             {user?.prenom?.charAt(0)}
//                         </div>
//                         <h2 className="text-xl font-serif text-[#1B3022] capitalize">
//                             {user?.prenom} {user?.nom} 
//                         </h2>
//                         <p className="text-[#C8A96A] text-[10px] tracking-[0.2em] uppercase mt-2 font-bold">{user?.role}</p>
//                     </div>

//                     <div className="md:col-span-2 bg-white border border-black/5 p-8 md:p-12 shadow-sm relative overflow-hidden">
//                         <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B3022]/5 rounded-bl-full -mr-16 -mt-16"></div>
                        
//                         <form onSubmit={handleSave} className="space-y-8 relative z-10">
//                             <div className="grid md:grid-cols-2 gap-8">
//                                 <div className="space-y-2">
//                                     <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">First Name</label>
//                                     <input name="prenom" type="text" value={form.prenom} onChange={handleChange} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none text-sm" />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Last Name</label>
//                                     <input name="nom" type="text" value={form.nom} onChange={handleChange} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none text-sm" />
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Email Address</label>
//                                 <input type="email" disabled value={user?.email || ''} className="w-full bg-transparent border-b border-black/10 py-2 text-black/30 cursor-not-allowed outline-none text-sm" />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Phone Number</label>
//                                 <input name="telephone" type="text" value={form.telephone} onChange={handleChange} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none text-sm" />
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-8">
//                                 <div className="space-y-2">
//                                     <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Nationality</label>
//                                     <input name="nationality" type="text" value={form.nationality} onChange={handleChange} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none text-sm" />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Date of Birth</label>
//                                     <input name="dob" type="date" value={form.dob} onChange={handleChange} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none text-sm text-black/60" />
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Full Address</label>
//                                 <input name="adresse" type="text" value={form.adresse} onChange={handleChange} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none text-sm" />
//                             </div>

//                             <div className="pt-6">
//                                 <button type="submit" className="bg-[#1B3022] text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#C8A96A] transition-all duration-500 shadow-lg">
//                                     Save Changes
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default Profile;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import api from '../api'; // استعمل الـ axios instance اللي صاوبنا

// const Profile = () => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
    
//     // الحالة ديال الفورم
//     const [form, setForm] = useState({
//         nom: '',
//         prenom: '',
//         telephone: '',
//         nationality: '',
//         dob: '',
//         adresse: ''
//     });

//     useEffect(() => {
//         const fetchProfile = async () => {
//             try {
//                 const response = await api.get('/profile');
//                 const data = response.data;
                
//                 setUser(data);
//                 // تعمير الفورم بالبيانات اللي جات من الباكيند
//                 setForm({
//                     nom: data.nom || '',
//                     prenom: data.prenom || '',
//                     telephone: data.telephone || '',
//                     nationality: data.nationality || '',
//                     // قص التاريخ باش يبان فـ input type="date" (YYYY-MM-DD)
//                     dob: data.dob ? data.dob.substring(0, 10) : '',
//                     adresse: data.adresse || '',
//                 });
//             } catch (err) {
//                 console.error("Error fetching profile:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProfile();
//     }, []);

//     // دالة لتحديث الـ state فاش يكتب الـ user
//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSave = async (e) => {
//         e.preventDefault();
//         try {
//             await api.put('/profile', {
//                 nom: form.nom,
//                 prenom: form.prenom,
//                 telephone: form.telephone,
//                 details: {
//                     nationality: form.nationality,
//                     dob: form.dob,
//                     adresse: form.adresse,
//                 }
//             });
//             alert('Profile updated successfully!');
//         } catch (err) {
//             alert(err.response?.data?.message || 'Update failed');
//         }
//     };

//     if (loading) return (
//         <div className="h-screen bg-[#1B3022] flex items-center justify-center text-[#C8A96A] tracking-[0.5em] uppercase text-xs">
//             Loading Experience...
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20 px-6 font-sans">
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto">
                
//                 <div className="text-center mb-16">
//                     <span className="text-[#C8A96A] text-[10px] tracking-[0.4em] uppercase font-bold">Personal Space</span>
//                     <h1 className="text-4xl md:text-5xl font-serif text-[#1B3022] mt-4 uppercase tracking-widest">Guest Profile</h1>
//                     <div className="w-24 h-[1px] bg-[#C8A96A] mx-auto mt-6 opacity-50"></div>
//                 </div>

//                 <div className="grid md:grid-cols-3 gap-12">
//                     <div className="md:col-span-1 text-center">
//                         <div className="w-32 h-32 bg-[#1B3022] rounded-full mx-auto flex items-center justify-center text-[#C8A96A] text-4xl font-serif border border-[#C8A96A]/30 mb-6 shadow-xl uppercase">
//                             {user?.prenom?.charAt(0)}
//                         </div>
//                         <h2 className="text-xl font-serif text-[#1B3022] capitalize">
//                             {user?.prenom} {user?.nom} 
//                         </h2>
//                         <p className="text-[#C8A96A] text-[10px] tracking-[0.2em] uppercase mt-2 font-bold">{user?.role}</p>
//                     </div>

//                     <div className="md:col-span-2 bg-white border border-black/5 p-8 md:p-12 shadow-sm relative overflow-hidden">
//                         <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B3022]/5 rounded-bl-full -mr-16 -mt-16"></div>
                        
//                         <form onSubmit={handleSave} className="space-y-8 relative z-10">
//                             <div className="grid md:grid-cols-2 gap-8">
//                                 <div className="space-y-2">
//                                     <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">First Name</label>
//                                     <input name="prenom" type="text" value={form.prenom} onChange={handleChange} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none text-sm" />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Last Name</label>
//                                     <input name="nom" type="text" value={form.nom} onChange={handleChange} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none text-sm" />
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Email Address</label>
//                                 <input type="email" disabled value={user?.email || ''} className="w-full bg-transparent border-b border-black/10 py-2 text-black/30 cursor-not-allowed outline-none text-sm" />
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Phone Number</label>
//                                 <input name="telephone" type="text" value={form.telephone} onChange={handleChange} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none text-sm" />
//                             </div>

//                             <div className="grid md:grid-cols-2 gap-8">
//                                 <div className="space-y-2">
//                                     <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Nationality</label>
//                                     <input name="nationality" type="text" value={form.nationality} onChange={handleChange} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none text-sm" />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Date of Birth</label>
//                                     <input name="dob" type="date" value={form.dob} onChange={handleChange} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none text-sm text-black/60" />
//                                 </div>
//                             </div>

//                             <div className="space-y-2">
//                                 <label className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Full Address</label>
//                                 <input name="adresse" type="text" value={form.adresse} onChange={handleChange} className="w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none text-sm" />
//                             </div>

//                             <div className="pt-6">
//                                 <button type="submit" className="bg-[#1B3022] text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#C8A96A] transition-all duration-500 shadow-lg">
//                                     Save Changes
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default Profile;

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
    useEffect(() => {
        if (!message) return;
        const t = setTimeout(onClose, 3500);
        return () => clearTimeout(t);
    }, [message]);
    if (!message) return null;
    const isErr = type === 'error';
    return (
        <div style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
            background: isErr ? '#FEF2F2' : '#F0FDF4',
            color: isErr ? '#991B1B' : '#166534',
            border: `1px solid ${isErr ? '#FECACA' : '#BBF7D0'}`,
            borderRadius: 12, padding: '13px 20px',
            fontSize: 13, fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)', minWidth: 240,
            animation: 'slideUp .2s ease',
        }}>
            <span style={{ fontSize: 17 }}>{isErr ? '✕' : '✓'}</span>
            {message}
        </div>
    );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    const map = {
        confirmed:  { bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
        completed:  { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
        pending:    { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' },
        cancelled:  { bg: '#FEF2F2', color: '#B91C1C', border: '#FECACA' },
    };
    const c = map[status] || { bg: '#F8FAFC', color: '#64748B', border: '#E2E8F0' };
    return (
        <span style={{
            background: c.bg, color: c.color, border: `1px solid ${c.border}`,
            borderRadius: 20, padding: '3px 10px',
            fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
            whiteSpace: 'nowrap',
        }}>
            {status?.replace('_', ' ')}
        </span>
    );
}

// ─── Confirm Cancel Modal ─────────────────────────────────────────────────────
function ConfirmModal({ open, onConfirm, onCancel, loading }) {
    if (!open) return null;
    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }} onClick={onCancel}>
            <div onClick={e => e.stopPropagation()} style={{
                background: '#fff', borderRadius: 16, padding: '2rem',
                width: 380, maxWidth: '90vw',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}>
                <div style={{ fontSize: 36, textAlign: 'center', marginBottom: 12 }}>🚫</div>
                <h3 style={{ margin: '0 0 8px', textAlign: 'center', fontSize: 17, fontWeight: 700, color: '#1B3022' }}>
                    Cancel Booking?
                </h3>
                <p style={{ margin: '0 0 1.5rem', textAlign: 'center', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
                    This action cannot be undone. Your reservation will be permanently cancelled.
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={onCancel} style={{
                        flex: 1, padding: '10px', border: '1px solid #E5E7EB',
                        borderRadius: 10, background: '#fff', color: '#374151',
                        fontSize: 13, fontWeight: 500, cursor: 'pointer',
                    }}>Keep it</button>
                    <button onClick={onConfirm} disabled={loading} style={{
                        flex: 1, padding: '10px', border: 'none',
                        borderRadius: 10, background: '#B91C1C', color: '#fff',
                        fontSize: 13, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                    }}>
                        {loading ? 'Cancelling…' : 'Yes, Cancel'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── My Bookings Tab ──────────────────────────────────────────────────────────
function BookingsTab() {
    const [bookings,    setBookings]    = useState([]);
    const [loading,     setLoading]     = useState(true);
    const [cancelId,    setCancelId]    = useState(null);
    const [cancelling,  setCancelling]  = useState(false);
    const [filter,      setFilter]      = useState('all');
    const [toast,       setToast]       = useState({ message: '', type: 'success' });
    const notify = (msg, type = 'success') => setToast({ message: msg, type });

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/my-bookings');
            setBookings(res.data?.data ?? res.data ?? []);
        } catch {
            notify('Failed to load bookings.', 'error');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const handleCancel = async () => {
        setCancelling(true);
        try {
            await api.patch(`/bookings/${cancelId}`, { status_payment: 'cancelled' });
            setBookings(prev => prev.map(b =>
                b.id === cancelId ? { ...b, status_payment: 'cancelled' } : b
            ));
            setCancelId(null);
            notify('Booking cancelled successfully.');
        } catch (err) {
            const msg = err.response?.data?.message || 'Could not cancel booking.';
            notify(msg, 'error');
        } finally {
            setCancelling(false);
        }
    };

    const statuses = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];
    const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status_payment === filter);
    const canCancel = (b) => {
        if (!['pending', 'confirmed'].includes(b.status_payment)) return false;
        const hoursLeft = (new Date(b.date_debut) - new Date()) / 36e5;
        return hoursLeft >= 48;
    };

    return (
        <>
            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {statuses.map(s => (
                    <button key={s} onClick={() => setFilter(s)} style={{
                        padding: '6px 16px', borderRadius: 20,
                        border: filter === s ? 'none' : '1px solid #E5E7EB',
                        background: filter === s ? '#1B3022' : '#fff',
                        color: filter === s ? '#C8A96A' : '#6B7280',
                        fontSize: 11, fontWeight: 700, cursor: 'pointer',
                        textTransform: 'uppercase', letterSpacing: '0.07em',
                        transition: 'all .15s',
                    }}>
                        {s} ({s === 'all' ? bookings.length : bookings.filter(b => b.status_payment === s).length})
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#C8A96A' }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>⏳</div>
                    Loading your reservations…
                </div>
            ) : filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>🛎️</div>
                    <p style={{ color: '#1B3022', fontFamily: 'serif', fontSize: 18, marginBottom: 6 }}>No reservations found</p>
                    <p style={{ color: '#9CA3AF', fontSize: 13 }}>
                        {filter === 'all' ? "You haven't made any bookings yet." : `No ${filter} bookings.`}
                    </p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {filtered.map((b, i) => {
                        const checkIn  = b.date_debut ? new Date(b.date_debut) : null;
                        const checkOut = b.date_fin   ? new Date(b.date_fin)   : null;
                        const nights   = checkIn && checkOut
                            ? Math.round((checkOut - checkIn) / 86400000)
                            : null;
                        const roomName = b.room?.type?.title ?? b.room?.name ?? 'Room';

                        return (
                            <motion.div
                                key={b.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                                style={{
                                    background: '#fff',
                                    border: '1px solid #E7E5E0',
                                    borderRadius: 14,
                                    overflow: 'hidden',
                                    transition: 'box-shadow .2s',
                                }}
                            >
                                {/* Top bar with status */}
                                <div style={{
                                    background: '#F5F3EE',
                                    padding: '10px 20px',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    borderBottom: '1px solid #E7E5E0',
                                }}>
                                    <span style={{ fontSize: 11, color: '#9CA3AF', fontFamily: 'monospace' }}>
                                        Booking #{b.id}
                                    </span>
                                    <StatusBadge status={b.status_payment} />
                                </div>

                                <div style={{ padding: '1.25rem 1.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: '#1B3022', fontFamily: 'serif' }}>
                                                {roomName}
                                            </p>
                                            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 10 }}>
                                                <div>
                                                    <p style={{ margin: 0, fontSize: 9, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Check-in</p>
                                                    <p style={{ margin: '2px 0 0', fontSize: 13, color: '#374151', fontWeight: 500 }}>
                                                        {checkIn ? checkIn.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                                                    </p>
                                                </div>
                                                <div style={{ color: '#D1D5DB', fontSize: 20, alignSelf: 'center' }}>→</div>
                                                <div>
                                                    <p style={{ margin: 0, fontSize: 9, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Check-out</p>
                                                    <p style={{ margin: '2px 0 0', fontSize: 13, color: '#374151', fontWeight: 500 }}>
                                                        {checkOut ? checkOut.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                                                    </p>
                                                </div>
                                                {nights !== null && (
                                                    <div>
                                                        <p style={{ margin: 0, fontSize: 9, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Duration</p>
                                                        <p style={{ margin: '2px 0 0', fontSize: 13, color: '#374151', fontWeight: 500 }}>{nights} night{nights !== 1 ? 's' : ''}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div style={{ textAlign: 'right' }}>
                                            {b.prix_total && (
                                                <p style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 800, color: '#1B3022' }}>
                                                    {Number(b.prix_total).toLocaleString()} <span style={{ fontSize: 12, fontWeight: 500, color: '#C8A96A' }}>MAD</span>
                                                </p>
                                            )}
                                            {['pending', 'confirmed'].includes(b.status_payment) && !canCancel(b) && (
                                                <p style={{ fontSize: 10, color: '#9CA3AF', margin: '6px 0 0', textAlign: 'right' }}>
                                                    ⏰ Cannot cancel — less than 48h to check-in
                                                </p>
                                            )}
                                            {canCancel(b) && (
                                                <button
                                                    onClick={() => setCancelId(b.id)}
                                                    style={{
                                                        background: '#FEF2F2', color: '#B91C1C',
                                                        border: '1px solid #FECACA',
                                                        borderRadius: 8, padding: '7px 16px',
                                                        fontSize: 11, fontWeight: 700, cursor: 'pointer',
                                                        textTransform: 'uppercase', letterSpacing: '0.07em',
                                                        transition: 'all .15s',
                                                    }}
                                                >
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Services */}
                                    {b.services?.length > 0 && (
                                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F3F4F6' }}>
                                            <p style={{ margin: '0 0 6px', fontSize: 10, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>Services</p>
                                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                                {b.services.map(s => (
                                                    <span key={s.id} style={{
                                                        background: '#F5F3EE', color: '#1B3022',
                                                        borderRadius: 20, padding: '3px 10px',
                                                        fontSize: 11, fontWeight: 500,
                                                    }}>{s.nom ?? s.name}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            <ConfirmModal
                open={!!cancelId}
                loading={cancelling}
                onConfirm={handleCancel}
                onCancel={() => setCancelId(null)}
            />
            <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
        </>
    );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────
function ProfileTab({ user, onSaved }) {
    const [form, setForm] = useState({
        nom: '', prenom: '', telephone: '',
        nationality: '', dob: '', adresse: '',
    });
    const [saving,    setSaving]    = useState(false);
    const [pwdOpen,   setPwdOpen]   = useState(false);
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd,     setNewPwd]     = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [savingPwd,  setSavingPwd]  = useState(false);
    const [pwdErr,     setPwdErr]     = useState('');
    const [toast,      setToast]      = useState({ message: '', type: 'success' });
    const notify = (msg, type = 'success') => setToast({ message: msg, type });

    useEffect(() => {
        if (user) {
            setForm({
                nom:         user.nom         || '',
                prenom:      user.prenom       || '',
                telephone:   user.telephone    || '',
                nationality: user.nationality  || '',
                dob:         user.dob ? user.dob.substring(0, 10) : '',
                adresse:     user.adresse      || '',
            });
        }
    }, [user]);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = async e => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await api.put('/profile', {
                nom: form.nom, prenom: form.prenom, telephone: form.telephone,
                details: { nationality: form.nationality, dob: form.dob, adresse: form.adresse },
            });
            onSaved?.(res.data);
            notify('Profile updated successfully.');
        } catch (err) {
            notify(err.response?.data?.message || 'Update failed.', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async () => {
        setPwdErr('');
        if (!currentPwd || !newPwd || !confirmPwd) { setPwdErr('Please fill all fields.'); return; }
        if (newPwd !== confirmPwd)                  { setPwdErr("Passwords don't match."); return; }
        if (newPwd.length < 8)                      { setPwdErr('Min 8 characters.'); return; }
        setSavingPwd(true);
        try {
            await api.put('/profile/password', {
                current_password: currentPwd,
                password: newPwd,
                password_confirmation: confirmPwd,
            });
            setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
            setPwdOpen(false);
            notify('Password changed successfully.');
        } catch (err) {
            const errs = err?.response?.data?.errors;
            setPwdErr(errs ? Object.values(errs).flat().join(' ') : err?.response?.data?.message || 'Failed.');
        } finally {
            setSavingPwd(false);
        }
    };

    const fieldCls = "w-full bg-transparent border-b border-black/10 py-2 focus:border-[#C8A96A] outline-none transition-colors text-sm";
    const labelCls = "text-[10px] uppercase tracking-widest text-black/40 font-bold";

    return (
        <>
            <form onSubmit={handleSave} className="space-y-8 relative z-10">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className={labelCls}>First Name</label>
                        <input name="prenom" type="text" value={form.prenom} onChange={handleChange} className={fieldCls} />
                    </div>
                    <div className="space-y-2">
                        <label className={labelCls}>Last Name</label>
                        <input name="nom" type="text" value={form.nom} onChange={handleChange} className={fieldCls} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className={labelCls}>Email Address</label>
                    <input type="email" disabled value={user?.email || ''} className="w-full bg-transparent border-b border-black/10 py-2 text-black/30 cursor-not-allowed outline-none text-sm" />
                </div>

                <div className="space-y-2">
                    <label className={labelCls}>Phone Number</label>
                    <input name="telephone" type="text" value={form.telephone} onChange={handleChange} className={fieldCls} />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className={labelCls}>Nationality</label>
                        <input name="nationality" type="text" value={form.nationality} onChange={handleChange} className={fieldCls} />
                    </div>
                    <div className="space-y-2">
                        <label className={labelCls}>Date of Birth</label>
                        <input name="dob" type="date" value={form.dob} onChange={handleChange} className={`${fieldCls} text-black/60`} />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className={labelCls}>Full Address</label>
                    <input name="adresse" type="text" value={form.adresse} onChange={handleChange} className={fieldCls} />
                </div>

                <div className="pt-6">
                    <button type="submit" disabled={saving} className="bg-[#1B3022] text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#C8A96A] hover:text-[#1B3022] transition-all duration-500 shadow-lg disabled:opacity-60">
                        {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                </div>
            </form>

            {/* Change Password */}
            <div className="mt-12 pt-10 border-t border-black/5">
                <button
                    onClick={() => setPwdOpen(p => !p)}
                    className="text-[10px] uppercase tracking-[0.2em] text-[#C8A96A] font-bold hover:tracking-[0.3em] transition-all flex items-center gap-2"
                >
                    {pwdOpen ? '▲' : '▼'} Change Password
                </button>

                <AnimatePresence>
                    {pwdOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div className="mt-6 space-y-6">
                                {['Current password', 'New password', 'Confirm new password'].map((label, i) => {
                                    const vals   = [currentPwd, newPwd, confirmPwd];
                                    const setters = [setCurrentPwd, setNewPwd, setConfirmPwd];
                                    return (
                                        <div key={label} className="space-y-2">
                                            <label className={labelCls}>{label}</label>
                                            <input
                                                type="password"
                                                value={vals[i]}
                                                onChange={e => setters[i](e.target.value)}
                                                placeholder="••••••••"
                                                className={fieldCls}
                                            />
                                        </div>
                                    );
                                })}
                                {pwdErr && (
                                    <p style={{ fontSize: 12, color: '#B91C1C', margin: 0 }}>⚠️ {pwdErr}</p>
                                )}
                                <button
                                    type="button"
                                    onClick={handleChangePassword}
                                    disabled={savingPwd}
                                    className="bg-[#1B3022] text-white px-8 py-3 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#C8A96A] hover:text-[#1B3022] transition-all duration-500 disabled:opacity-60"
                                >
                                    {savingPwd ? 'Updating…' : 'Update Password'}
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
        </>
    );
}

// ─── Main Profile ─────────────────────────────────────────────────────────────
const Profile = () => {
    const [user,    setUser]    = useState(null);
    const [loading, setLoading] = useState(true);
    const [tab,     setTab]     = useState('profile'); // 'profile' | 'bookings'

    useEffect(() => {
        api.get('/profile')
            .then(res => setUser(res.data))
            .catch(err => console.error('Profile error:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className="h-screen bg-[#1B3022] flex items-center justify-center text-[#C8A96A] tracking-[0.5em] uppercase text-xs">
            Loading Experience...
        </div>
    );

    const tabs = [
        { id: 'profile',  label: 'My Profile',      icon: '👤' },
        { id: 'bookings', label: 'My Reservations',  icon: '🛎️' },
    ];

    return (
        <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-20 px-6 font-sans">
            <style>{`@keyframes slideUp{from{transform:translateY(10px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-14">
                    <span className="text-[#C8A96A] text-[10px] tracking-[0.4em] uppercase font-bold">Personal Space</span>
                    <h1 className="text-4xl md:text-5xl font-serif text-[#1B3022] mt-4 uppercase tracking-widest">Guest Profile</h1>
                    <div className="w-24 h-[1px] bg-[#C8A96A] mx-auto mt-6 opacity-50"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-12">

                    {/* Left — Avatar + tabs */}
                    <div className="md:col-span-1">
                        <div className="text-center mb-8">
                            <div className="w-32 h-32 bg-[#1B3022] rounded-full mx-auto flex items-center justify-center text-[#C8A96A] text-4xl font-serif border border-[#C8A96A]/30 mb-6 shadow-xl uppercase">
                                {user?.prenom?.charAt(0)}{user?.nom?.charAt(0)}
                            </div>
                            <h2 className="text-xl font-serif text-[#1B3022] capitalize">
                                {user?.prenom} {user?.nom}
                            </h2>
                            <p className="text-[#C8A96A] text-[10px] tracking-[0.2em] uppercase mt-2 font-bold">{user?.role}</p>
                            <p className="text-black/30 text-xs mt-1">{user?.email}</p>
                        </div>

                        {/* Tab buttons */}
                        <div className="space-y-2">
                            {tabs.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => setTab(t.id)}
                                    className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                                        tab === t.id
                                            ? 'bg-[#1B3022] text-[#C8A96A] shadow-md'
                                            : 'bg-white border border-black/5 text-black/40 hover:border-[#C8A96A]/30 hover:text-[#1B3022]'
                                    }`}
                                >
                                    <span>{t.icon}</span>
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right — tab content */}
                    <div className="md:col-span-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={tab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.18 }}
                            >
                                {tab === 'profile' ? (
                                    <div className="bg-white border border-black/5 p-8 md:p-12 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1B3022]/5 rounded-bl-full -mr-16 -mt-16"></div>
                                        <ProfileTab user={user} onSaved={updated => setUser(u => ({ ...u, ...updated }))} />
                                    </div>
                                ) : (
                                    <BookingsTab />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;