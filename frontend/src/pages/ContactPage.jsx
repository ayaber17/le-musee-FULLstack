// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

// // ─── CSRF helper ──────────────────────────────────────────────────────────────
// function getCsrfToken() {
//     const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
//     return match ? decodeURIComponent(match[1]) : null;
// }

// // ─── ContactPage ──────────────────────────────────────────────────────────────
// const ContactPage = () => {
//     const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
//     const [errors, setErrors]             = useState({});
//     const [status, setStatus]             = useState('idle');
//     const [serverError, setServerError]   = useState('');
//     const [retryAfter, setRetryAfter]     = useState(null);
//     const [focusedField, setFocusedField] = useState(null);

//     // Parallax hero
//     const heroRef = useRef(null);
//     const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
//     const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
//     const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

//     // Auto-dismiss success toast after 6s
//     useEffect(() => {
//         if (status === 'success') {
//             const t = setTimeout(() => setStatus('idle'), 6000);
//             return () => clearTimeout(t);
//         }
//     }, [status]);

//     // Countdown for rate limit
//     useEffect(() => {
//         if (!retryAfter) return;
//         if (retryAfter <= 0) { setRetryAfter(null); return; }
//         const t = setTimeout(() => setRetryAfter(s => s - 1), 1000);
//         return () => clearTimeout(t);
//     }, [retryAfter]);

//     // ─── Handlers ─────────────────────────────────────────────────────────────
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//         if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (status === 'loading') return;

//         setStatus('loading');
//         setErrors({});
//         setServerError('');
//         setRetryAfter(null);

//         try {
//             const response = await fetch('http://127.0.0.1:8000/api/contact', {
//     method: 'POST',
//     headers: {
//         'Content-Type':  'application/json',
//         'Accept':        'application/json',
//         // 'X-XSRF-TOKEN': getCsrfToken() ?? '', // تقدر تحيد هادي مؤقتاً إلا جربتي بـ API عادي
//     },
//     body: JSON.stringify(formData),
// })

//             // Safe JSON parse — Laravel peut renvoyer du HTML (419, 500)
//             const contentType = response.headers.get('Content-Type') ?? '';
//             const data = contentType.includes('application/json')
//                 ? await response.json()
//                 : null;

//             if (response.status === 419) {
//                 setServerError('Session expirée. Veuillez rafraîchir la page et réessayer.');
//                 setStatus('error');
//                 return;
//             }

//             if (response.status === 422) {
//                 const fieldErrors = {};
//                 Object.keys(data?.errors ?? {}).forEach(field => {
//                     fieldErrors[field] = data.errors[field][0];
//                 });
//                 setErrors(fieldErrors);
//                 setStatus('idle');
//                 return;
//             }

//             if (response.status === 429) {
//                 const seconds = data?.retry_after ?? 60;
//                 setRetryAfter(seconds);
//                 setServerError(`Trop de tentatives. Réessayez dans ${seconds}s.`);
//                 setStatus('error');
//                 return;
//             }

//             if (!response.ok) {
//                 throw new Error(data?.message || `Erreur serveur (${response.status}). Veuillez réessayer.`);
//             }

//             setStatus('success');
//             setFormData({ name: '', email: '', subject: '', message: '' });

//         } catch (err) {
//             setServerError(err.message || 'Impossible de joindre le serveur. Vérifiez votre connexion.');
//             setStatus('error');
//         }
//     };

//     const isRateLimited = status === 'error' && retryAfter > 0;

//     // ─── Floating-label field ─────────────────────────────────────────────────
//     const Field = ({ name, type = 'text', placeholder, autoComplete, multiline }) => {
//         const hasError  = !!errors[name];
//         const isFocused = focusedField === name;
//         const hasValue  = !!formData[name];

//         const inputClass = [
//             'w-full bg-transparent pt-6 pb-2 text-[#1a1a1a] font-light text-base',
//             'focus:outline-none transition-all duration-300 placeholder-transparent',
//             multiline ? 'resize-none' : '',
//         ].join(' ');

//         const sharedProps = {
//             id: name, name,
//             value: formData[name],
//             onChange: handleChange,
//             onFocus: () => setFocusedField(name),
//             onBlur:  () => setFocusedField(null),
//             placeholder,
//             autoComplete,
//             className: inputClass,
//         };

//         return (
//             <div className="relative group">
//                 {/* Floating label */}
//                 <label
//                     htmlFor={name}
//                     className={[
//                         'absolute left-0 transition-all duration-300 pointer-events-none font-sans',
//                         isFocused || hasValue
//                             ? 'top-0 text-[9px] uppercase tracking-[0.25em] text-[#C8A966]'
//                             : 'top-5 text-sm text-gray-400 font-light',
//                     ].join(' ')}
//                 >
//                     {placeholder}
//                 </label>

//                 {multiline
//                     ? <textarea rows={5} {...sharedProps} />
//                     : <input type={type} {...sharedProps} />
//                 }

//                 {/* Animated border */}
//                 <div className="relative h-px mt-1">
//                     <div className={`absolute inset-0 ${hasError ? 'bg-red-200' : 'bg-gray-200'}`} />
//                     <motion.div
//                         className={`absolute inset-0 origin-left ${hasError ? 'bg-red-400' : 'bg-[#C8A966]'}`}
//                         initial={false}
//                         animate={{ scaleX: (isFocused || hasValue) ? 1 : 0 }}
//                         transition={{ duration: 0.35, ease: 'easeOut' }}
//                     />
//                 </div>

//                 <AnimatePresence>
//                     {hasError && (
//                         <motion.p
//                             initial={{ opacity: 0, y: -4 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -4 }}
//                             className="mt-2 text-[10px] text-red-500 font-sans tracking-wide"
//                         >
//                             {errors[name]}
//                         </motion.p>
//                     )}
//                 </AnimatePresence>
//             </div>
//         );
//     };

//     // ─── Render ───────────────────────────────────────────────────────────────
//     return (
//         <div
//             className="min-h-screen bg-[#FDFBF7]"
//             style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
//         >
//             <Navbar />

//             {/* ── Hero ─────────────────────────────────────────────────────── */}
//             <section ref={heroRef} className="relative h-[65vh] flex items-end overflow-hidden bg-[#0e0e0e]">
//                 <motion.div style={{ y: heroY }} className="absolute inset-0">
//                     <img
//                         src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1600"
//                         className="w-full h-full object-cover"
//                         alt="Hôtel Le Musée"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent" />
//                 </motion.div>

//                 {/* Vertical accent line */}
//                 <div className="absolute left-16 top-0 bottom-0 w-px bg-white/8 hidden lg:block" />

//                 <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full px-8 md:px-16 pb-16">
//                     <motion.p
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.1 }}
//                         className="text-[#C8A966] text-[9px] uppercase tracking-[0.5em] mb-5 font-sans"
//                     >
//                         Hôtel Le Musée — Rabat
//                     </motion.p>
//                     <motion.h1
//                         initial={{ opacity: 0, y: 24 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.2, duration: 0.8 }}
//                         className="text-white text-6xl md:text-8xl italic font-light leading-none"
//                     >
//                         Écrivez-nous
//                     </motion.h1>
//                     <motion.div
//                         initial={{ scaleX: 0 }}
//                         animate={{ scaleX: 1 }}
//                         transition={{ delay: 0.7, duration: 0.9, ease: 'easeOut' }}
//                         className="mt-6 h-px w-28 bg-[#C8A966] origin-left"
//                     />
//                 </motion.div>

//                 <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 1.3 }}
//                     className="absolute bottom-8 right-16 text-white/25 text-[9px] uppercase tracking-[0.35em] font-sans hidden lg:block"
//                 >
//                     Défiler ↓
//                 </motion.p>
//             </section>

//             {/* ── Ticker band ──────────────────────────────────────────────── */}
//             <div className="bg-[#1a1a1a] py-4 px-8 md:px-16 border-b border-white/5">
//                 <p className="text-[#C8A966]/50 text-[10px] uppercase tracking-[0.4em] font-sans">
//                     Réponse sous 24 heures &nbsp;·&nbsp; Réservations &nbsp;·&nbsp; Demandes spéciales &nbsp;·&nbsp; Informations
//                 </p>
//             </div>

//             {/* ── Main ─────────────────────────────────────────────────────── */}
//             <section className="py-28 px-8 md:px-16 max-w-7xl mx-auto">
//                 <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-24 xl:gap-32">

//                     {/* ── Form column ────────────────────────────────────── */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 28 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.7 }}
//                     >
//                         <div className="mb-16">
//                             <p className="text-[#C8A966] text-[9px] uppercase tracking-[0.4em] font-sans mb-5">
//                                 Formulaire de contact
//                             </p>
//                             <h2 className="text-4xl md:text-5xl italic font-light text-[#1a1a1a] leading-snug">
//                                 Un message,<br />
//                                 <span className="text-[#C8A966]">une attention.</span>
//                             </h2>
//                         </div>

//                         {/* Toasts */}
//                         <AnimatePresence mode="wait">
//                             {status === 'success' && (
//                                 <motion.div
//                                     key="toast-success"
//                                     initial={{ opacity: 0, y: -8 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -8 }}
//                                     className="flex items-start gap-4 mb-12 p-5 border-l-2 border-[#C8A966] bg-[#C8A966]/5"
//                                 >
//                                     <CheckCircle size={15} className="text-[#C8A966] shrink-0 mt-0.5" strokeWidth={1.5} />
//                                     <div>
//                                         <p className="text-[#1a1a1a] text-sm font-sans font-medium tracking-wide">
//                                             Message envoyé avec succès
//                                         </p>
//                                         <p className="text-gray-400 text-xs font-sans mt-1">
//                                             Notre équipe vous répondra dans les 24 heures.
//                                         </p>
//                                     </div>
//                                 </motion.div>
//                             )}
//                             {status === 'error' && (
//                                 <motion.div
//                                     key="toast-error"
//                                     initial={{ opacity: 0, y: -8 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -8 }}
//                                     className="flex items-start gap-4 mb-12 p-5 border-l-2 border-red-300 bg-red-50/40"
//                                 >
//                                     <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" strokeWidth={1.5} />
//                                     <p className="text-red-600 text-sm font-sans">
//                                         {isRateLimited
//                                             ? `Trop de tentatives. Réessayez dans ${retryAfter}s.`
//                                             : serverError
//                                         }
//                                     </p>
//                                 </motion.div>
//                             )}
//                         </AnimatePresence>

//                         {/* Fields */}
//                         <form onSubmit={handleSubmit} noValidate className="space-y-10">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                                 <Field name="name"    placeholder="Nom complet"    autoComplete="name" />
//                                 <Field name="email"   placeholder="Adresse e-mail" autoComplete="email" type="email" />
//                             </div>
//                             <Field name="subject" placeholder="Sujet" />
//                             <Field name="message" placeholder="Votre message" multiline />

//                             {/* Submit button */}
//                             <div className="pt-6">
//                                 <button
//                                     type="submit"
//                                     disabled={status === 'loading' || isRateLimited}
//                                     className="group relative inline-flex items-center gap-4 bg-[#1a1a1a] text-white px-10 py-4 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-500"
//                                 >
//                                     {/* Gold hover fill */}
//                                     <span className="absolute inset-0 bg-[#C8A966] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
//                                     <span className="relative z-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-sans group-hover:text-[#1a1a1a] transition-colors duration-300">
//                                         {status === 'loading'
//                                             ? <><Loader2 size={13} className="animate-spin" /> Envoi…</>
//                                             : isRateLimited
//                                             ? `Attendre ${retryAfter}s`
//                                             : <>Envoyer <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" /></>
//                                         }
//                                     </span>
//                                 </button>

//                                 <p className="mt-5 text-[10px] text-gray-400 font-sans tracking-wide">
//                                     En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
//                                 </p>
//                             </div>
//                         </form>
//                     </motion.div>

//                     {/* ── Info column ────────────────────────────────────── */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 28 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.7, delay: 0.15 }}
//                         className="lg:pt-[168px]"
//                     >
//                         <div className="w-full h-px bg-[#1a1a1a]/10 mb-0 hidden lg:block" />

//                         {[
//                             { Icon: MapPin,  label: 'Adresse',    lines: ['Rue Benghazi, Hassan, 10000', 'Rabat, Maroc'] },
//                             { Icon: Phone,   label: 'Téléphone',  lines: ['+212 5 37 70 70 50'] },
//                             { Icon: Mail,    label: 'E-mail',     lines: ['contact@hotellemusee.com'] },
//                             { Icon: Clock,   label: 'Réception',  lines: ['Ouverte 24h/24 — 7j/7'] },
//                         ].map(({ Icon, label, lines }, i) => (
//                             <motion.div
//                                 key={label}
//                                 initial={{ opacity: 0, x: 12 }}
//                                 whileInView={{ opacity: 1, x: 0 }}
//                                 viewport={{ once: true }}
//                                 transition={{ delay: 0.1 * i, duration: 0.5 }}
//                                 className="group flex gap-5 py-7 border-b border-[#1a1a1a]/8 last:border-0"
//                             >
//                                 <div className="w-7 shrink-0 pt-0.5">
//                                     <Icon
//                                         size={15}
//                                         strokeWidth={1.5}
//                                         className="text-[#C8A966] transition-transform duration-300 group-hover:scale-110"
//                                     />
//                                 </div>
//                                 <div>
//                                     <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-sans mb-2">
//                                         {label}
//                                     </p>
//                                     {lines.map(line => (
//                                         <p key={line} className="text-[#1a1a1a] text-[17px] font-light leading-relaxed">
//                                             {line}
//                                         </p>
//                                     ))}
//                                 </div>
//                             </motion.div>
//                         ))}

//                         {/* Pull quote */}
//                         <p className="mt-10 pt-10 border-t border-[#1a1a1a]/8 text-2xl italic font-light text-[#1a1a1a]/20 leading-relaxed">
//                             « L'hospitalité, c'est l'art<br /> de faire sentir l'autre<br /> chez lui. »
//                         </p>
//                     </motion.div>

//                 </div>
//             </section>

//             {/* ── Map ──────────────────────────────────────────────────────── */}
//             <div className="relative overflow-hidden">
//                 {/* Floating label chip */}
//                 <div className="absolute top-8 left-8 md:left-16 z-10 bg-[#1a1a1a]/80 backdrop-blur-sm px-5 py-3 pointer-events-none">
//                     <p className="text-[#C8A966] text-[9px] uppercase tracking-[0.3em] font-sans">Nous trouver</p>
//                     <p className="text-white/80 text-sm font-light mt-0.5" style={{ fontFamily: 'Georgia, serif' }}>
//                         Hassan, Rabat
//                     </p>
//                 </div>

//                 <section className="h-[480px] w-full grayscale hover:grayscale-0 transition-all duration-1000">
//                     <iframe
//                         src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.878502288058!2d-6.8331524!3d34.0213198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76b86ff6c4493d%3A0xac60c0642c7f8b50!2sH%C3%B4tel-restaurant%20le%20mus%C3%A9e!5e0!3m2!1sen!2sma!4v1713264000000!5m2!1sen!2sma"
//                         width="100%"
//                         height="100%"
//                         style={{ border: 0, display: 'block' }}
//                         allowFullScreen=""
//                         loading="lazy"
//                         title="Hôtel le Musée — Rabat"
//                         referrerPolicy="no-referrer-when-downgrade"
//                     />
//                 </section>
//             </div>

//             <Footer />
//         </div>
//     );
// };

// export default ContactPage;

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ─── Component Field (msa7a7 dyal focus) ────────────────────────────────
const Field = ({ name, type = 'text', placeholder, value, onChange, error, focusedField, setFocusedField, multiline }) => {
    const isFocused = focusedField === name;
    const hasValue = !!value;

    return (
        <div className="relative mb-8">
            <label
                htmlFor={name}
                className={`absolute left-0 transition-all duration-300 pointer-events-none tracking-widest uppercase text-[10px] ${isFocused || hasValue ? '-top-4 text-[#C8A966]' : 'top-2 text-gray-400'
                    }`}
            >
                {placeholder}
            </label>
            {multiline ? (
                <textarea
                    id={name} name={name} value={value} onChange={onChange}
                    onFocus={() => setFocusedField(name)} onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#C8A966] transition-colors resize-none font-light"
                    rows="4"
                />
            ) : (
                <input
                    id={name} name={name} type={type} value={value} onChange={onChange}
                    onFocus={() => setFocusedField(name)} onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent border-b border-gray-200 py-2 focus:outline-none focus:border-[#C8A966] transition-colors font-light"
                />
            )}
            {error && <p className="text-[10px] text-red-500 mt-1 uppercase tracking-tighter">{error}</p>}
        </div>
    );
};

// ─── Main Page ──────────────────────────────────────────────────────────
const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');
    const [focusedField, setFocusedField] = useState(null);

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const response = await fetch('http://127.0.0.1:8000/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.status === 422) {
                setErrors(Object.fromEntries(Object.entries(data.errors).map(([k, v]) => [k, v[0]])));
                setStatus('idle');
            } else if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-serif">
            <Navbar />

            {/* Hero Section with Parallax */}
            <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
                <motion.img
                    style={{ y }}
                    src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="relative z-10 text-center">
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#C8A966] uppercase tracking-[0.5em] text-[10px]">L'art de l'hospitalité</motion.span>
                    <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-white text-5xl md:text-7xl mt-4 font-light italic">Nous Contacter</motion.h1>
                </div>
            </section>

            <section className="max-w-7xl mx-auto py-24 px-8 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* Left: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="lg:col-span-7"
                    >
                        <h2 className="text-4xl mb-2 font-light">Envoyez-nous un <span className="italic text-[#C8A966]">Message</span></h2>
                        <p className="text-gray-400 mb-12 font-sans text-sm tracking-widest">NOUS VOUS RÉPONDONS SOUS 24H</p>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                <Field name="name" placeholder="Nom Complet" value={formData.name} onChange={handleChange} error={errors.name} focusedField={focusedField} setFocusedField={setFocusedField} />
                                <Field name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} error={errors.email} focusedField={focusedField} setFocusedField={setFocusedField} />
                            </div>
                            <Field name="subject" placeholder="Sujet" value={formData.subject} onChange={handleChange} error={errors.subject} focusedField={focusedField} setFocusedField={setFocusedField} />
                            <Field name="message" placeholder="Votre Message" multiline value={formData.message} onChange={handleChange} error={errors.message} focusedField={focusedField} setFocusedField={setFocusedField} />

                            <button
                                type="submit" disabled={status === 'loading'}
                                className="mt-6 flex items-center gap-3 bg-[#1a1a1a] text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] hover:bg-[#C8A966] transition-all duration-500 group"
                            >
                                {status === 'loading' ? 'Envoi en cours...' : 'Envoyer le Message'}
                                <Send size={12} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-green-600 flex items-center gap-2 text-sm uppercase tracking-widest">
                                        <CheckCircle size={16} /> Message envoyé avec succès.
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>

                    {/* Right: Info Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="lg:col-span-5 space-y-12"
                    >
                        <div className="bg-white p-12 shadow-xl shadow-gray-100 border border-gray-50">
                            <h3 className="text-xl mb-8 italic">Coordonnées</h3>

                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <MapPin className="text-[#C8A966] shrink-0" size={20} strokeWidth={1.5} />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Localisation</p>
                                        <p className="text-sm font-light leading-relaxed">Rue Benghazi, Hassan, 10000<br />Rabat, Maroc</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <Phone className="text-[#C8A966] shrink-0" size={20} strokeWidth={1.5} />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Téléphone</p>
                                        <p className="text-sm font-light leading-relaxed">+212 5 37 70 70 50</p>
                                    </div>
                                </div>

                                <div className="flex gap-6">
                                    <Mail className="text-[#C8A966] shrink-0" size={20} strokeWidth={1.5} />
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Email</p>
                                        <p className="text-sm font-light leading-relaxed border-b border-gray-200 inline-block">contact@hotellemusee.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-gray-100 italic text-gray-400 text-sm">
                                "L'accueil est une science, l'hospitalité est un art."
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Subtle Map Divider */}
            <section className="relative h-[500px] w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 group">
    {/* Label عائم فوق الخريطة باش يعطي منظر زوين */}
    <div className="absolute top-8 left-8 md:left-16 z-10 bg-[#1a1a1a]/90 backdrop-blur-md px-6 py-4 shadow-2xl border border-[#C8A966]/30">
        <p className="text-[#C8A966] text-[10px] uppercase tracking-[0.4em] font-sans font-bold">Emplacement</p>
        <p className="text-white text-sm font-light mt-1 italic">
            Quartier Hassan, Rabat, Maroc
        </p>
    </div>

    {/* الخريطة الحقيقية */}
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.960249871615!2d-6.8319663!3d34.01915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76c666a7b21f9%3A0x6334f5934f828a2b!2sHassan%2C%20Rabat!5e0!3m2!1sfr!2sma!4v1714200000000!5m2!1sfr!2sma"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Hotel Location"
        className="opacity-80 group-hover:opacity-100 transition-opacity duration-500"
    ></iframe>
</section>

            <Footer />
        </div>
    );
};

export default ContactPage;