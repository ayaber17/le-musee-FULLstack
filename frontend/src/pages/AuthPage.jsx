// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { Eye, EyeOff, ArrowRight } from 'lucide-react';
// import api from '../api';
// import Navbar from '../components/Navbar';

// // Helper: extract token from response — supports Sanctum, JWT, and nested structures
// const extractToken = (obj, depth = 0) => {
//     if (!obj || depth > 4) return null;
//     if (typeof obj !== 'object') return null;

//     // Check known token keys at this level first
//     const tokenKeys = ['access_token', 'token', 'jwt', 'bearer', 'auth_token', 'accessToken'];
//     for (const key of tokenKeys) {
//         const val = obj[key];
//         if (val && typeof val === 'string' && val.trim().length > 0) {
//             return val.trim();
//         }
//     }
//     // Recurse into nested objects
//     for (const key of Object.keys(obj)) {
//         if (typeof obj[key] === 'object') {
//             const found = extractToken(obj[key], depth + 1);
//             if (found) return found;
//         }
//     }
//     return null;
// };

// const AuthPage = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         nom: '',
//         prenom: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//         telephone: ''
//     });

//     const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);

//         try {
//             const endpoint = isLogin ? '/login' : '/register';
//             const res = await api.post(endpoint, form);
            
//             // 1. استخراج وحفظ التوكن
//             const token = extractToken(res.data);

//             if (token) {
//                 localStorage.setItem('auth_token', token);
                
//                 // 2. التحقق من بيانات المستخدم والـ Role
//                 // الـ API ديالنا كيرجع المستخدم وسط res.data.user
//                 const user = res.data.user;

//                 if (user) {
//                     localStorage.setItem('user_role', user.role);
//                     localStorage.setItem('user_name', `${user.prenom} ${user.nom}`);

//                     // 3. التوجيه الصحيح (أهم جزء)
//                     if (user.role === 'admin') {
//                     navigate('/admin');
//                 } else if (user.role === 'staff') {
//                     navigate('/reception');
//                 } else {
//                     navigate('/profile');
//                 }

//                 } else {
//                     // حالة احتياطية إيلا لم نجد بيانات المستخدم
//                     navigate('/');
//                 }
//             } else {
//                 throw new Error('Authentication failed: No token received.');
//             }
//         } catch (err) {
//             console.error("=== AUTH ERROR ===");
//             const message = err.response?.data?.message || 'Email or password incorrect. Please try again.';
//             setError(message);
//         } finally {
//             setLoading(false);
//         }
//     };    return (
//         <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
//             <Navbar />

//             <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-6">
//                 <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden min-h-[650px] border border-black/5 rounded-sm">

//                     {/* Left decorative panel */}
//                     <div className="relative hidden lg:block overflow-hidden bg-[#1B3022]">
//                         <motion.div
//                             initial={{ scale: 1.2 }}
//                             animate={{ scale: 1 }}
//                             transition={{ duration: 1.5 }}
//                             className="absolute inset-0 bg-[url('https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg')] bg-cover bg-center opacity-50"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-[#1B3022] via-transparent to-transparent" />
//                         <div className="relative z-10 h-full flex flex-col justify-center px-16 text-white">
//                             <motion.span
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 className="text-[#C8A96A] text-[10px] tracking-[0.5em] uppercase mb-4 block"
//                             >
//                                 Welcome to Le Musée
//                             </motion.span>
//                             <h2 className="text-5xl font-serif mb-8 leading-tight uppercase tracking-widest">
//                                 The Art of <br /> Hospitality
//                             </h2>
//                             <div className="w-12 h-[1px] bg-[#C8A96A] mb-8" />
//                             <p className="text-xs font-light tracking-[0.2em] leading-relaxed opacity-70 max-w-xs">
//                                 Every stay is a masterpiece. Your journey into the extraordinary starts here.
//                             </p>
//                         </div>
//                     </div>

//                     {/* Form panel */}
//                     <div className="p-10 md:p-20 flex flex-col justify-center relative bg-white">
//                         <div className="mb-12">
//                             <h3 className="text-3xl font-serif uppercase tracking-[0.2em] text-[#1B3022]">
//                                 {isLogin ? 'Sign In' : 'Create Account'}
//                             </h3>
//                             <p className="text-[9px] text-gray-400 uppercase tracking-[0.3em] mt-2">
//                                 Please enter your details below
//                             </p>
//                         </div>

//                         <form onSubmit={handleSubmit} className="space-y-8">
//                             <AnimatePresence mode="wait">
//                                 <motion.div
//                                     key={isLogin ? 'login-fields' : 'signup-fields'}
//                                     initial={{ opacity: 0, x: 10 }}
//                                     animate={{ opacity: 1, x: 0 }}
//                                     exit={{ opacity: 0, x: -10 }}
//                                     transition={{ duration: 0.3 }}
//                                     className="space-y-6"
//                                 >
//                                     {!isLogin && (
//                                         <>
//                                             <div className="grid grid-cols-2 gap-6">
//                                                 <input
//                                                     name="prenom"
//                                                     required
//                                                     value={form.prenom}
//                                                     onChange={handleChange}
//                                                     placeholder="First Name"
//                                                     className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-[#C8A96A] transition-colors text-sm"
//                                                 />
//                                                 <input
//                                                     name="nom"
//                                                     required
//                                                     value={form.nom}
//                                                     onChange={handleChange}
//                                                     placeholder="Last Name"
//                                                     className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-[#C8A96A] transition-colors text-sm"
//                                                 />
//                                             </div>
//                                             <input
//                                                 name="telephone"
//                                                 required
//                                                 value={form.telephone}
//                                                 onChange={handleChange}
//                                                 placeholder="Phone Number"
//                                                 className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-[#C8A96A] transition-colors text-sm"
//                                             />
//                                         </>
//                                     )}

//                                     <input
//                                         name="email"
//                                         type="email"
//                                         required
//                                         value={form.email}
//                                         onChange={handleChange}
//                                         placeholder="Email Address"
//                                         className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-[#C8A96A] transition-colors text-sm"
//                                     />

//                                     <div className="relative">
//                                         <input
//                                             name="password"
//                                             type={showPassword ? 'text' : 'password'}
//                                             required
//                                             value={form.password}
//                                             onChange={handleChange}
//                                             placeholder="Password"
//                                             className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-[#C8A96A] transition-colors text-sm pr-10"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowPassword(!showPassword)}
//                                             className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#C8A96A] transition-colors"
//                                         >
//                                             {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
//                                         </button>
//                                     </div>

//                                     {!isLogin && (
//                                         <input
//                                             name="password_confirmation"
//                                             type={showPassword ? 'text' : 'password'}
//                                             required
//                                             value={form.password_confirmation}
//                                             onChange={handleChange}
//                                             placeholder="Confirm Password"
//                                             className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-[#C8A96A] transition-colors text-sm"
//                                         />
//                                     )}
//                                 </motion.div>
//                             </AnimatePresence>

//                             {error && (
//                                 <motion.p
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     className="text-red-500 text-[10px] uppercase tracking-widest font-medium"
//                                 >
//                                     {error}
//                                 </motion.p>
//                             )}

//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="w-full relative bg-[#1B3022] text-white py-5 text-[10px] uppercase tracking-[0.5em] font-bold overflow-hidden group transition-all duration-500"
//                             >
//                                 <span className="relative z-10 flex items-center justify-center gap-2">
//                                     {loading ? 'Authenticating...' : isLogin ? 'Sign In' : 'Register'}
//                                     {!loading && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
//                                 </span>
//                                 <div className="absolute inset-0 bg-[#C8A96A] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
//                             </button>
//                         </form>

//                         <div className="mt-12 text-center">
//                             <button
//                                 onClick={() => { setIsLogin(!isLogin); setError(null); }}
//                                 className="text-[9px] uppercase tracking-[0.3em] text-gray-400 hover:text-[#C8A96A] transition-colors"
//                             >
//                                 {isLogin ? 'New to the museum? Create account' : 'Member of le musée? Login here'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default AuthPage;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, Mail, Lock, User, Phone } from 'lucide-react';
import api from '../api';
import Navbar from '../components/Navbar';

const extractToken = (obj, depth = 0) => {
    if (!obj || depth > 4 || typeof obj !== 'object') return null;
    const tokenKeys = ['access_token', 'token', 'jwt', 'bearer', 'auth_token', 'accessToken'];
    for (const key of tokenKeys) {
        const val = obj[key];
        if (val && typeof val === 'string' && val.trim().length > 0) return val.trim();
    }
    for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'object') {
            const found = extractToken(obj[key], depth + 1);
            if (found) return found;
        }
    }
    return null;
};

const FloatingField = ({ icon: Icon, label, name, type = 'text', value, onChange, required, rightSlot }) => (
    <div style={{ position: 'relative', marginBottom: '8px' }}>
        <div style={{
            position: 'relative',
            background: 'rgba(27,48,34,0.04)',
            border: '1px solid rgba(27,48,34,0.1)',
            borderRadius: '2px',
            transition: 'border-color 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '0 16px',
        }}
            onFocusCapture={e => e.currentTarget.style.borderColor = '#C8A96A'}
            onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(27,48,34,0.1)'}
        >
            <Icon size={14} color="#C8A96A" style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, position: 'relative', paddingTop: '20px', paddingBottom: '8px' }}>
                <label style={{
                    position: 'absolute',
                    top: value ? '6px' : '50%',
                    transform: value ? 'translateY(0) scale(0.75)' : 'translateY(-50%)',
                    transformOrigin: 'left',
                    left: 0,
                    fontSize: '11px',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    color: '#C8A96A',
                    fontFamily: "'Cormorant Garamond', serif",
                    pointerEvents: 'none',
                    transition: 'all 0.25s ease',
                    fontWeight: 300,
                }}>
                    {label}
                </label>
                <input
                    name={name}
                    type={type}
                    required={required}
                    value={value}
                    onChange={onChange}
                    onFocus={e => {
                        const lbl = e.currentTarget.previousElementSibling;
                        if (lbl) { lbl.style.top = '6px'; lbl.style.transform = 'translateY(0) scale(0.75)'; }
                    }}
                    onBlur={e => {
                        if (!e.currentTarget.value) {
                            const lbl = e.currentTarget.previousElementSibling;
                            if (lbl) { lbl.style.top = '50%'; lbl.style.transform = 'translateY(-50%)'; }
                        }
                    }}
                    style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        color: '#1B3022',
                        fontFamily: "'Cormorant Garamond', serif",
                        letterSpacing: '0.05em',
                    }}
                />
            </div>
            {rightSlot}
        </div>
    </div>
);

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        password_confirmation: '',
        telephone: '',
    });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const endpoint = isLogin ? '/login' : '/register';
            const res = await api.post(endpoint, form);
            const token = extractToken(res.data);

            if (token) {
                // BUG FIX 1: حفظ بـ 'auth_token' منسجم مع Navbar
                localStorage.setItem('auth_token', token);
                const user = res.data.user;

                if (user) {
                    localStorage.setItem('user_role', user.role);
                    localStorage.setItem('user_name', `${user.prenom} ${user.nom}`);
                    // BUG FIX 3: dispatch event باش Navbar يتحدث فوراً
                    window.dispatchEvent(new Event('auth-change'));

                    if (user.role === 'admin') navigate('/admin');
                    else if (user.role === 'staff') navigate('/reception');
                    else navigate('/profile');
                } else {
                    window.dispatchEvent(new Event('auth-change'));
                    navigate('/');
                }
            } else {
                throw new Error('No token received.');
            }
        } catch (err) {
            const message = err.response?.data?.message || 'Email or password incorrect. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsLogin(!isLogin);
        setError(null);
        setForm({ nom: '', prenom: '', email: '', password: '', password_confirmation: '', telephone: '' });
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&display=swap');

                .auth-page-root {
                    min-height: 100vh;
                    background: #F7F4EF;
                    font-family: 'Cormorant Garamond', serif;
                    position: relative;
                }

                /* Subtle grain background */
                .auth-page-root::before {
                    content: '';
                    position: fixed;
                    inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.04'/%3E%3C/svg%3E");
                    pointer-events: none;
                    z-index: 0;
                }

                .auth-card {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    overflow: hidden;
                    box-shadow: 0 40px 100px rgba(27,48,34,0.18), 0 0 0 1px rgba(200,169,106,0.12);
                    border-radius: 2px;
                    min-height: 680px;
                }

                @media (max-width: 900px) {
                    .auth-card { grid-template-columns: 1fr; }
                    .auth-left-panel { display: none; }
                }

                /* ── Left decorative panel ── */
                .auth-left-panel {
                    position: relative;
                    overflow: hidden;
                    background: #1B3022;
                }
                .auth-left-bg {
                    position: absolute;
                    inset: 0;
                    background: url('https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg') center/cover;
                    opacity: 0.3;
                    transform: scale(1.05);
                    animation: subtleZoom 12s ease-in-out infinite alternate;
                }
                @keyframes subtleZoom {
                    from { transform: scale(1.05); }
                    to   { transform: scale(1.0); }
                }
                .auth-left-gradient {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(160deg, transparent 20%, rgba(27,48,34,0.85) 80%);
                }
                .auth-left-content {
                    position: relative;
                    z-index: 2;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    padding: 56px 52px;
                }
                .auth-eyebrow {
                    font-size: 8.5px;
                    letter-spacing: 0.55em;
                    text-transform: uppercase;
                    color: #C8A96A;
                    margin-bottom: 18px;
                    display: block;
                    font-weight: 300;
                }
                .auth-headline {
                    font-size: 3.2rem;
                    font-weight: 300;
                    color: #fff;
                    line-height: 1.12;
                    text-transform: uppercase;
                    letter-spacing: 0.06em;
                    margin-bottom: 24px;
                    font-style: italic;
                }
                .auth-rule {
                    width: 36px;
                    height: 1px;
                    background: linear-gradient(90deg, #C8A96A, transparent);
                    margin-bottom: 20px;
                }
                .auth-tagline {
                    font-size: 12.5px;
                    font-weight: 300;
                    letter-spacing: 0.15em;
                    line-height: 1.9;
                    color: rgba(255,255,255,0.5);
                    max-width: 240px;
                }

                /* Small decorative number */
                .auth-left-num {
                    position: absolute;
                    top: 52px;
                    right: 44px;
                    font-size: 100px;
                    font-weight: 300;
                    color: rgba(200,169,106,0.06);
                    line-height: 1;
                    user-select: none;
                    letter-spacing: -0.05em;
                }

                /* ── Right form panel ── */
                .auth-right-panel {
                    background: #FDFBF7;
                    padding: 56px 60px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    position: relative;
                }

                /* Mode tabs */
                .auth-tabs {
                    display: flex;
                    gap: 0;
                    border-bottom: 1px solid rgba(27,48,34,0.08);
                    margin-bottom: 38px;
                }
                .auth-tab {
                    padding: 10px 0;
                    margin-right: 28px;
                    font-size: 9px;
                    letter-spacing: 0.38em;
                    text-transform: uppercase;
                    color: #bbb;
                    cursor: pointer;
                    border-bottom: 1.5px solid transparent;
                    margin-bottom: -1px;
                    transition: all 0.3s ease;
                    font-family: 'Cormorant Garamond', serif;
                    font-weight: 400;
                    background: none;
                    border-left: none;
                    border-right: none;
                    border-top: none;
                }
                .auth-tab.active {
                    color: #1B3022;
                    border-bottom-color: #C8A96A;
                }
                .auth-tab:hover:not(.active) { color: #888; }

                .auth-form-title {
                    font-size: 2.1rem;
                    font-weight: 300;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #1B3022;
                    margin-bottom: 5px;
                    font-style: italic;
                }
                .auth-form-subtitle {
                    font-size: 8.5px;
                    letter-spacing: 0.35em;
                    text-transform: uppercase;
                    color: #b5a898;
                    margin-bottom: 32px;
                }

                .auth-field-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px;
                }

                .auth-error {
                    font-size: 9px;
                    letter-spacing: 0.22em;
                    text-transform: uppercase;
                    color: #c0392b;
                    padding: 10px 14px;
                    background: rgba(192,57,43,0.05);
                    border-left: 2px solid rgba(192,57,43,0.4);
                    margin-bottom: 16px;
                }

                .auth-submit {
                    width: 100%;
                    background: #1B3022;
                    color: #fff;
                    border: none;
                    padding: 18px 24px;
                    font-size: 9.5px;
                    letter-spacing: 0.5em;
                    text-transform: uppercase;
                    cursor: pointer;
                    font-family: 'Cormorant Garamond', serif;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    transition: background 0.45s ease;
                    border-radius: 2px;
                    margin-top: 8px;
                }
                .auth-submit::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: #C8A96A;
                    transform: translateY(100%);
                    transition: transform 0.45s ease;
                    z-index: 0;
                }
                .auth-submit:hover::after { transform: translateY(0); }
                .auth-submit:hover { color: #1B3022; }
                .auth-submit-inner {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    transition: color 0.45s;
                }
                .auth-submit:hover .auth-submit-inner { color: #1B3022; }
                .auth-submit:disabled { opacity: 0.6; cursor: not-allowed; }
                .auth-submit:disabled::after { display: none; }

                .auth-arrow {
                    transition: transform 0.3s ease;
                }
                .auth-submit:hover .auth-arrow {
                    transform: translateX(4px);
                }

                .auth-switch-btn {
                    font-size: 8.5px;
                    letter-spacing: 0.28em;
                    text-transform: uppercase;
                    color: #b5a898;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-family: 'Cormorant Garamond', serif;
                    transition: color 0.3s;
                    margin-top: 24px;
                    text-align: center;
                    display: block;
                    width: 100%;
                }
                .auth-switch-btn:hover { color: #C8A96A; }

                /* Divider between field sections */
                .fields-divider {
                    height: 1px;
                    background: rgba(27,48,34,0.06);
                    margin: 4px 0 12px;
                }

                /* Loading dots animation */
                @keyframes loadDot {
                    0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
                    40% { opacity: 1; transform: scale(1); }
                }
                .load-dot {
                    display: inline-block;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: currentColor;
                    animation: loadDot 1.2s infinite;
                }
                .load-dot:nth-child(2) { animation-delay: 0.2s; }
                .load-dot:nth-child(3) { animation-delay: 0.4s; }

                /* Eye toggle button */
                .pw-toggle {
                    background: none;
                    border: none;
                    padding: 4px;
                    cursor: pointer;
                    color: #bbb;
                    display: flex;
                    align-items: center;
                    transition: color 0.2s;
                    flex-shrink: 0;
                }
                .pw-toggle:hover { color: #C8A96A; }
            `}</style>

            <div className="auth-page-root">
                <Navbar />

                <main style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '120px 24px 60px',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    <div style={{ maxWidth: '920px', width: '100%' }}>

                        {/* Corner decorations */}
                        <div style={{
                            position: 'absolute',
                            top: '96px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '920px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            pointerEvents: 'none',
                        }}>
                            {['◆', '◆'].map((d, i) => (
                                <span key={i} style={{ color: '#C8A96A', opacity: 0.25, fontSize: '8px', letterSpacing: '0.3em' }}>{d}</span>
                            ))}
                        </div>

                        <div className="auth-card">

                            {/* ── LEFT PANEL ── */}
                            <div className="auth-left-panel">
                                <div className="auth-left-bg" />
                                <div className="auth-left-gradient" />
                                <span className="auth-left-num">01</span>
                                <div className="auth-left-content">
                                    <span className="auth-eyebrow">Welcome to Le Musée</span>
                                    <h2 className="auth-headline">
                                        The Art of<br />Hospitality
                                    </h2>
                                    <div className="auth-rule" />
                                    <p className="auth-tagline">
                                        Every stay is a masterpiece.<br />
                                        Your journey into the<br />
                                        extraordinary starts here.
                                    </p>
                                </div>
                            </div>

                            <div className="auth-right-panel">
                                <h3 className="auth-form-title">
                                    {isLogin ? 'Sign In' : 'Register'}
                                </h3>
                                <p className="auth-form-subtitle" style={{fontFamily : "ui-monospace"}}>
                                    {isLogin ? 'Welcome back — please authenticate' : 'Create your membership account'}
                                </p>

                                <div className="auth-tabs">
                                    <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError(null); }} style={{fontFamily : "-apple-system" , fontSize : "10px"}}>
                                        Sign In
                                    </button>
                                    <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError(null); }}  style={{fontFamily : "-apple-system" , fontSize : "10px"}}>
                                        Create Account
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={isLogin ? 'login' : 'register'}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            transition={{ duration: 0.28 }}
                                        >
                                            {/* Register-only fields */}
                                            {!isLogin && (
                                                <>
                                                    <div className="auth-field-row" style={{ marginBottom: '12px' }}>
                                                        <FloatingField
                                                            icon={User}
                                                            label="First Name"
                                                            name="prenom"
                                                            value={form.prenom}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <FloatingField
                                                            icon={User}
                                                            label="Last Name"
                                                            name="nom"
                                                            value={form.nom}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                    </div>
                                                    <FloatingField
                                                        icon={Phone}
                                                        label="Phone Number"
                                                        name="telephone"
                                                        value={form.telephone}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <div className="fields-divider" />
                                                </>
                                            )}

                                            {/* Email */}
                                            <FloatingField
                                                icon={Mail}
                                                label="Email Address"
                                                name="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                required
                                            />

                                            {/* Password */}
                                            <div style={{ marginTop: '12px' }}>
                                                <FloatingField
                                                    icon={Lock}
                                                    label="Password"
                                                    name="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={form.password}
                                                    onChange={handleChange}
                                                    required
                                                    rightSlot={
                                                        <button
                                                            type="button"
                                                            className="pw-toggle"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                                        >
                                                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                                        </button>
                                                    }
                                                />
                                            </div>

                                            {/* Confirm password */}
                                            {!isLogin && (
                                                <div style={{ marginTop: '12px' }}>
                                                    <FloatingField
                                                        icon={Lock}
                                                        label="Confirm Password"
                                                        name="password_confirmation"
                                                        type={showPassword ? 'text' : 'password'}
                                                        value={form.password_confirmation}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Error */}
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                style={{ marginTop: '14px' }}
                                            >
                                                <div className="auth-error">{error}</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="auth-submit"
                                    >
                                        <span className="auth-submit-inner">
                                            {loading ? (
                                                <>
                                                    Authenticating
                                                    <span style={{ display: 'flex', gap: '3px', alignItems: 'center', marginLeft: '4px' }}>
                                                        <span className="load-dot" />
                                                        <span className="load-dot" />
                                                        <span className="load-dot" />
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    {isLogin ? 'Sign In' : 'Create Account'}
                                                    <ArrowRight size={13} className="auth-arrow" />
                                                </>
                                            )}
                                        </span>
                                    </button>
                                </form>

                                <button className="auth-switch-btn" onClick={switchMode} style={{fontFamily : "ui-monospace"}}>
                                    {isLogin
                                        ? 'New to the museum? — Create account'
                                        : 'Already a member? — Sign in here'}
                                </button>
                            </div>
                        </div>

                        {/* Bottom label */}
                        <div style={{
                            textAlign: 'center',
                            marginTop: '24px',
                            fontSize: '8px',
                            letterSpacing: '0.4em',
                            textTransform: 'uppercase',
                            color: '#b5a898',
                            fontFamily: "'Cormorant Garamond', serif",
                        }}>
                            Le Musée · Secured Authentication · Est. 2024
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
};

export default AuthPage;