import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts';
import { TrendingUp, RefreshCw, BedDouble, CheckCircle, XCircle, Clock } from 'lucide-react';
import api from '../api';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const buildTrends = (bookings, groupBy) => {
    const map = {};
    bookings.forEach(b => {
        if (!b.date_debut) return;
        const d = new Date(b.date_debut);
        let key, label;
        if (groupBy === 'week') {
            const start = new Date(d);
            start.setDate(start.getDate() - start.getDay() + 1);
            key   = start.toISOString().slice(0, 10);
            label = `${start.getDate()} ${MONTHS[start.getMonth()]}`;
        } else if (groupBy === 'month') {
            key   = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            label = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
        } else {
            key = label = `${d.getFullYear()}`;
        }
        if (!map[key]) map[key] = { key, label, total: 0, confirmed: 0, cancelled: 0, pending: 0 };
        map[key].total++;
        const s = b.status_payment ?? '';
        if (['confirmed','completed'].includes(s)) map[key].confirmed++;
        else if (s === 'cancelled') map[key].cancelled++;
        else map[key].pending++;
    });
    return Object.values(map).sort((a, b) => a.key.localeCompare(b.key)).slice(-12);
};

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl px-5 py-4 text-xs">
            <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-3 font-bold">{label}</p>
            {payload.map((p, i) => (
                <div key={i} className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                    <span className="text-gray-500 capitalize">{p.name}:</span>
                    <span className="font-bold text-[#1B3022]">{p.value}</span>
                </div>
            ))}
        </div>
    );
};

// ─── Mini Stat Card ───────────────────────────────────────────────────────────
const MiniStat = ({ label, value, icon: Icon, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        className="bg-white rounded-2xl px-6 py-5 border border-gray-100 flex items-center gap-4"
    >
        <div className={`w-10 h-10 ${color} text-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}>
            <Icon size={18} />
        </div>
        <div>
            <p className="text-[9px] uppercase tracking-widest text-gray-400">{label}</p>
            <p className="text-2xl font-bold text-[#1B3022]">{value}</p>
        </div>
    </motion.div>
);

// ─── Lines Config ─────────────────────────────────────────────────────────────
const LINE_CONFIG = [
    { key: 'total',     label: 'Total',    color: '#1B3022', dash: false },
    { key: 'confirmed', label: 'Confirmed', color: '#4A7C59', dash: false },
    { key: 'cancelled', label: 'Cancelled', color: '#C8A96A', dash: true  },
    { key: 'pending',   label: 'Pending',   color: '#94A3B8', dash: true  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
const AnalyticsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [groupBy, setGroupBy]   = useState('month');
    const [lines, setLines]       = useState({ total: true, confirmed: true, cancelled: true, pending: false });

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get('/admin/bookings');
            setBookings(res.data?.data ?? res.data ?? []);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const chartData      = buildTrends(bookings, groupBy);
    const totalBookings  = bookings.length;
    const totalConfirmed = bookings.filter(b => ['confirmed','completed'].includes(b.status_payment)).length;
    const totalCancelled = bookings.filter(b => b.status_payment === 'cancelled').length;
    const totalPending   = bookings.filter(b => b.status_payment === 'pending').length;
    const peak           = [...chartData].sort((a, b) => b.total - a.total)[0]?.label ?? '—';
    const avgPerPeriod   = chartData.length ? Math.round(chartData.reduce((s, d) => s + d.total, 0) / chartData.length) : 0;
    const confirmRate    = totalBookings ? `${Math.round(totalConfirmed / totalBookings * 100)}%` : '—';

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B3022] mx-auto mb-4" />
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">Loading Analytics…</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F5F3EE]">

            {/* Header */}
            <header className="px-8 pt-8 pb-2 mb-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#1B3022] rounded-xl flex items-center justify-center shadow">
                        <TrendingUp size={17} className="text-[#C8A96A]" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-serif text-[#1B3022] leading-none">Bookings Analytics</h2>
                        <p className="text-[10px] text-gray-400 italic mt-0.5">Trends over time — Le Musée</p>
                    </div>
                </div>
                <button onClick={load} className="flex items-center gap-2 text-[9px] bg-[#1B3022] text-white px-4 py-2.5 rounded-full font-bold uppercase tracking-widest hover:bg-[#C8A96A] hover:text-[#1B3022] transition-colors">
                    <RefreshCw size={11} /> Refresh
                </button>
            </header>

            <div className="px-8 pb-12 space-y-6">

                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <MiniStat delay={0}    label="Total Bookings" value={totalBookings}  icon={BedDouble}   color="bg-[#1B3022]" />
                    <MiniStat delay={0.06} label="Confirmed"      value={totalConfirmed} icon={CheckCircle} color="bg-[#4A7C59]" />
                    <MiniStat delay={0.12} label="Cancelled"      value={totalCancelled} icon={XCircle}     color="bg-[#C8A96A]" />
                    <MiniStat delay={0.18} label="Pending"        value={totalPending}   icon={Clock}       color="bg-slate-400" />
                </div>

                {/* Chart Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 }}
                    className="bg-white rounded-3xl border border-gray-100 overflow-hidden"
                >
                    {/* Card Header */}
                    <div className="px-7 py-5 border-b border-gray-50 bg-gray-50/60 flex flex-wrap justify-between items-center gap-4">
                        <h3 className="font-serif text-lg text-[#1B3022]">Bookings Over Time</h3>
                        <div className="flex items-center gap-3 flex-wrap">

                            {/* Group By Toggle */}
                            <div className="flex gap-1 bg-gray-100 rounded-full p-1">
                                {[['week','Weekly'],['month','Monthly'],['year','Yearly']].map(([v, l]) => (
                                    <button key={v} onClick={() => setGroupBy(v)}
                                        className={`px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${
                                            groupBy === v ? 'bg-[#1B3022] text-white shadow' : 'text-gray-500 hover:text-[#1B3022]'
                                        }`}
                                    >
                                        {l}
                                    </button>
                                ))}
                            </div>

                            {/* Line Toggles */}
                            <div className="flex gap-2 flex-wrap">
                                {LINE_CONFIG.map(({ key, label, color }) => (
                                    <button key={key}
                                        onClick={() => setLines(p => ({ ...p, [key]: !p[key] }))}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border transition-all ${
                                            lines[key] ? 'border-transparent text-white' : 'border-gray-200 text-gray-400 bg-white'
                                        }`}
                                        style={lines[key] ? { background: color } : {}}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: lines[key] ? 'white' : color }} />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="p-7">
                        {chartData.length < 2 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-gray-300 gap-3">
                                <TrendingUp size={36} />
                                <p className="text-sm italic">Not enough data to display a trend.</p>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height={340}>
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                                    <defs>
                                        {LINE_CONFIG.map(({ key, color }) => (
                                            <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%"  stopColor={color} stopOpacity={0.15} />
                                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                                            </linearGradient>
                                        ))}
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F0EDE8" vertical={false} />
                                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: '#aaa' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 10, fill: '#aaa' }} axisLine={false} tickLine={false} allowDecimals={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    {LINE_CONFIG.map(({ key, label, color, dash }) =>
                                        lines[key] ? (
                                            <Area key={key} type="monotone" dataKey={key} name={label}
                                                stroke={color} strokeWidth={key === 'total' ? 2.5 : 2}
                                                strokeDasharray={dash ? '5 4' : undefined}
                                                fill={`url(#grad-${key})`}
                                                dot={false}
                                                activeDot={{ r: 5, fill: color, strokeWidth: 0 }}
                                            />
                                        ) : null
                                    )}
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>

                    {/* Summary Footer */}
                    {chartData.length > 0 && (
                        <div className="px-7 py-4 border-t border-gray-50 bg-gray-50/40 grid grid-cols-3 divide-x divide-gray-100">
                            {[
                                { label: 'Peak Period',        value: peak },
                                { label: 'Avg / Period',       value: avgPerPeriod },
                                { label: 'Confirmation Rate',  value: confirmRate },
                            ].map(s => (
                                <div key={s.label} className="text-center px-4">
                                    <p className="text-[9px] uppercase tracking-widest text-gray-400">{s.label}</p>
                                    <p className="text-xl font-bold text-[#1B3022] mt-0.5">{s.value}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

            </div>
        </div>
    );
};

export default AnalyticsPage;