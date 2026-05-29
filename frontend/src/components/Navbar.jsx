// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import { Link, useNavigate } from 'react-router-dom';
// import api from '../api'; // تأكد أن المسار صحيح

// const Navbar = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isScrolled, setIsScrolled] = useState(false);
//     const navigate = useNavigate();
    
//     // التحقق واش المستخدم مسجل الدخول
//     const isAuthenticated = !!localStorage.getItem('token');

//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 50);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const handleLogout = async () => {
//         try {
//             await api.post('/logout');
//             localStorage.removeItem('token');
//             navigate('/auth'); // استعملنا navigate أحسن من window.location
//         } catch (err) {
//             localStorage.removeItem('token');
//             navigate('/auth');
//         }
//     };

//     return (
//         <>
//             <nav className={`fixed top-0 w-full z-[500] px-8 md:px-12 transition-all duration-700 ${
//                 isScrolled 
//                 ? 'py-4 bg-black/90 backdrop-blur-md shadow-2xl' 
//                 : 'py-5 bg-[#1B3022]' 
//             }`}>
//                 {!isScrolled && (
//                     <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A96A]/30 to-transparent"></div>
//                 )}

//                 <div className="max-w-[1800px] mx-auto flex justify-between items-center text-white">
                    
//                     {/* 1. Left: Menu */}
//                     <div className="flex-1 flex items-center">
//                         <button 
//                             onClick={() => setIsMenuOpen(true)}
//                             className="group flex items-center gap-4 cursor-pointer"
//                         >
//                             <div className="flex flex-col gap-[5px]">
//                                 <span className={`h-[1px] transition-all duration-300 ${isScrolled ? 'w-8 bg-[#C8A96A]' : 'w-10 bg-white'}`}></span>
//                                 <span className={`h-[1px] transition-all duration-300 ${isScrolled ? 'w-12 bg-white' : 'w-6 bg-[#C8A96A]'}`}></span>
//                             </div>
//                             <span className="hidden md:block text-[9px] uppercase tracking-[0.5em] font-light">
//                                 Discover
//                             </span>
//                         </button>
//                     </div>

//                     {/* 2. Center: Logo */}
//                     <div className="flex-1 text-center">
//                         <Link to="/" className="inline-block group">
//                             <h1 className="text-2xl md:text-3xl font-serif tracking-[0.4em] uppercase font-light transition-all duration-500 group-hover:tracking-[0.5em]">
//                                 Le Musée
//                                 <span className="block text-[7px] tracking-[1em] mt-2 text-[#C8A96A] font-sans">EXPERIENCE LUXURY</span>
//                             </h1>
//                         </Link>
//                     </div>

//                     {/* 3. Right: Action (Dynamic) */}
//                     <div className="flex-1 flex items-center justify-end gap-6 md:gap-10">
//                         <div className="hidden lg:flex gap-6 text-[10px] tracking-widest font-light opacity-80">
//                             <span className="cursor-pointer hover:text-[#C8A96A] transition-colors">EN</span>
//                             <span className="cursor-pointer text-[#C8A96A]">FR</span>
//                         </div>

//                         {isAuthenticated ? (
//                             /* فاش كيكون مسجل الدخول */
//                             <div className="flex items-center gap-4">
//                                 <Link to="/profile" className="text-[10px] uppercase tracking-widest hover:text-[#C8A96A] transition-all">
//                                     Profile
//                                 </Link>
//                                 <button 
//                                     onClick={handleLogout}
//                                     className="px-6 py-2 border border-white/20 text-[10px] uppercase tracking-widest hover:bg-red-900/20 transition-all"
//                                 >
//                                     Logout
//                                 </button>
//                             </div>
//                         ) : (
//                             /* فاش كيكون خارج */
//                             <Link 
//                                 to="/auth" 
//                                 className="relative px-8 py-3 bg-transparent border border-[#C8A96A] overflow-hidden group transition-all duration-500"
//                             >
//                                 <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-bold group-hover:text-white transition-colors">
//                                     Login
//                                 </span>
//                                 <div className="absolute inset-0 bg-[#C8A96A] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
//                             </Link>
//                         )}
//                     </div>
//                 </div>
//             </nav>

//             <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
//         </>
//     );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    // BUG FIX 3: useState بدل const باش يكون reactive
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem('auth_token') // BUG FIX 1: 'auth_token' بدل 'token'
    );
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // BUG FIX 3: sync مع storage events باش يتحدث بعد login/logout
    useEffect(() => {
        const syncAuth = () => {
            setIsAuthenticated(!!localStorage.getItem('auth_token'));
        };
        window.addEventListener('storage', syncAuth);
        window.addEventListener('auth-change', syncAuth);
        return () => {
            window.removeEventListener('storage', syncAuth);
            window.removeEventListener('auth-change', syncAuth);
        };
    }, []);

    const handleLogout = async () => {
        try {
            await api.post('/logout');
        } catch (err) {
            // نكملو حتى لو فشل الطلب
        } finally {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_role');
            localStorage.removeItem('user_name');
            // BUG FIX 3: dispatch event باش navbar يتحدث فوراً
            window.dispatchEvent(new Event('auth-change'));
            setIsAuthenticated(false);
            navigate('/auth');
        }
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&display=swap');
                .navbar-root { font-family: 'Cormorant Garamond', serif; }
                .nav-logo-text {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 1.35rem;
                    font-weight: 300;
                    letter-spacing: 0.45em;
                    text-transform: uppercase;
                    transition: letter-spacing 0.5s ease;
                }
                .nav-logo-text:hover { letter-spacing: 0.55em; }
                .nav-logo-sub {
                    display: block;
                    font-size: 6.5px;
                    letter-spacing: 0.9em;
                    margin-top: 5px;
                    color: #C8A96A;
                    font-family: 'Cormorant Garamond', serif;
                    font-weight: 300;
                }
                .nav-hamburger-line {
                    display: block;
                    height: 1px;
                    transition: all 0.35s ease;
                }
                .nav-btn-login {
                    position: relative;
                    overflow: hidden;
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 9.5px;
                    letter-spacing: 0.3em;
                    text-transform: uppercase;
                    transition: color 0.45s ease;
                }
                .nav-btn-login::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: #C8A96A;
                    transform: translateX(-100%);
                    transition: transform 0.45s ease;
                    z-index: 0;
                }
                .nav-btn-login:hover::after { transform: translateX(0); }
                .nav-btn-login:hover .login-label { color: #1B3022; }
                .login-label {
                    position: relative;
                    z-index: 1;
                    transition: color 0.45s ease;
                    color: #C8A96A;
                }
                .nav-btn-logout {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 9.5px;
                    letter-spacing: 0.28em;
                    text-transform: uppercase;
                    transition: all 0.3s ease;
                }
                .nav-btn-logout:hover {
                    background: rgba(180,30,30,0.12);
                    border-color: rgba(180,30,30,0.4);
                    color: #e05555;
                }
                .nav-profile-link {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 9.5px;
                    letter-spacing: 0.28em;
                    text-transform: uppercase;
                    transition: color 0.3s ease;
                }
                .nav-profile-link:hover { color: #C8A96A; }
                .nav-lang-item {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 9px;
                    letter-spacing: 0.18em;
                    cursor: pointer;
                    transition: opacity 0.3s ease;
                    opacity: 0.6;
                }
                .nav-lang-item:hover { opacity: 1; }
                .nav-lang-active { color: #C8A96A; opacity: 1 !important; }
            `}</style>

            <nav
                className={`navbar-root fixed top-0 w-full z-[500] px-8 md:px-14 transition-all duration-700 ${
                    isScrolled
                        ? 'py-3 bg-black/92 backdrop-blur-lg shadow-2xl'
                        : 'py-5 bg-[#1B3022]'
                }`}
            >
                {!isScrolled && (
                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C8A96A]/25 to-transparent" />
                )}

                <div className="max-w-[1800px] mx-auto flex justify-between items-center text-white">

                    {/* Left */}
                    <div className="flex-1 flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="group flex items-center gap-4 cursor-pointer"
                            aria-label="Open menu"
                        >
                            <div className="flex flex-col gap-[5px]">
                                <span
                                    className="nav-hamburger-line"
                                    style={{
                                        width: isScrolled ? '28px' : '36px',
                                        background: isScrolled ? '#C8A96A' : '#fff',
                                    }}
                                />
                                <span
                                    className="nav-hamburger-line"
                                    style={{
                                        width: isScrolled ? '36px' : '20px',
                                        background: isScrolled ? 'rgba(255,255,255,0.55)' : '#C8A96A',
                                    }}
                                />
                            </div>
                            <span className="hidden md:block text-[8.5px] uppercase tracking-[0.5em] font-light opacity-60 group-hover:opacity-100 transition-opacity">
                                Discover
                            </span>
                        </button>
                    </div>

                    {/* Center */}
                    <div className="flex-1 text-center">
                        <Link to="/" className="inline-block">
                            <h1 className="nav-logo-text">
                                Le Musée
                                <span className="nav-logo-sub">Experience Luxury</span>
                            </h1>
                        </Link>
                    </div>

                    {/* Right */}
                    <div className="flex-1 flex items-center justify-end gap-6 md:gap-10">
                        <div className="hidden lg:flex items-center gap-5">
                            <span className="nav-lang-item">FR</span>
                            <span className="inline-block w-[1px] h-3 bg-white/20" />
                            <span className="nav-lang-item nav-lang-active">ENG</span>
                        </div>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <Link to="/profile" className="nav-profile-link text-white/75">
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="nav-btn-logout px-5 py-2 border border-white/20 text-white/65"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/auth"
                                className="nav-btn-login px-8 py-[10px] border border-[#C8A96A]/55"
                            >
                                <span className="login-label">Login</span>
                            </Link>
                        )}
                    </div>
                    
                    
                </div>
            </nav>

            <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Navbar;