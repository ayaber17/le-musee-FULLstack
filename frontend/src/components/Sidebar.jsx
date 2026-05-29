// import React from 'react';
    // import { motion, AnimatePresence } from 'framer-motion';
    // import { Link, useNavigate } from 'react-router-dom';

    // const Sidebar = ({ isOpen, onClose }) => {
    // // أنيميشن للمنيو
    // const sidebarVariants = {
    //     closed: { x: '100%', transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
    //     opened: { x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
    // };

    // const linkVariants = {
    //     hidden: { opacity: 0, y: 30 },
    //     visible: (i) => ({
    //     opacity: 1,
    //     y: 0,
    //     transition: { delay: 0.3 + i * 0.1, duration: 0.5 }
    //     })
    // };

    // const items = [
    //     { name: 'Home', path: '/' },
    //     { name: 'Hotel', path: '/experience' },
    //     { name: 'Rooms & Suites', path: '/rooms' },
    //     { name: 'Restaurant', path: '/restaurant' },
    //     { name: 'Gallery', path: '/gallery' },
    //     { name: 'Contact', path: '/contact' }
    // ];

    // return (
    //     <AnimatePresence>
    //     {isOpen && (
    //         <>
    //         {/* Overlay ضبابي خلف المنيو */}
    //         <motion.div
    //             initial={{ opacity: 0 }}
    //             animate={{ opacity: 1 }}
    //             exit={{ opacity: 0 }}
    //             onClick={onClose}
    //             className="fixed inset-0 bg-black/60 backdrop-blur-md z-[998]"
    //         />

    //         {/* القائمة الرئيسية */}
    //         <motion.div
    //             variants={sidebarVariants}
    //             initial="closed"
    //             animate="opened"
    //             exit="closed"
    //             className="fixed top-0 right-0 h-full w-full md:w-[550px] bg-[#0D0D0D] z-[999] shadow-2xl flex flex-col"
    //         >
    //             {/* زر الإغلاق (صناعة يدوية بـ CSS باش نتفاداو مشاكل الأيقونات) */}
    //             <button 
    //             onClick={onClose}
    //             className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center group"
    //             >
    //             <div className="relative w-6 h-6">
    //                 <span className="absolute block w-full h-[1px] bg-white/50 group-hover:bg-[#C8A966] rotate-45 top-1/2 transition-all"></span>
    //                 <span className="absolute block w-full h-[1px] bg-white/50 group-hover:bg-[#C8A966] -rotate-45 top-1/2 transition-all"></span>
    //             </div>
    //             </button>
                

    //             {/* محتوى المنيو */}
    //             <div className="flex-1 flex flex-col justify-center px-12 md:px-20">
    //             <nav className="space-y-4">
    //                 {items.map((item, i) => (
    //                 <motion.div
    //                     key={item.name}
    //                     custom={i}
    //                     initial="hidden"
    //                     animate="visible"
    //                     variants={linkVariants}
    //                 >
    //                     <Link
    //                     to={item.path}
    //                     onClick={onClose}
    //                     className="block text-4xl md:text-5xl font-serif text-white/90 hover:text-[#C8A966] transition-all duration-300 tracking-tight"
    //                     style={{ fontFamily: "'Playfair Display', serif" }}
    //                     >
    //                     {item.name}
    //                     </Link>
    //                 </motion.div>
    //                 ))}
    //             </nav>
    //             </div>

    //             {/* الجزء السفلي (Contact Info) */}
    //             <div className="p-12 md:p-20 border-t border-white/5 space-y-8">
    //             <div>
    //                 <h4 className="text-[#C8A966] text-[10px] uppercase tracking-[0.5em] mb-4 font-bold">Contact</h4>
    //                 <p className="text-sm text-white/40 font-light leading-relaxed">
    //                 Rue Benghazi, Hassan, Rabat<br/>
    //                 +212 5 37 70 70 50
    //                 </p>
    //             </div>
                
    //             <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-white/20">
    //                 <span className="hover:text-[#C8A966] cursor-pointer transition-colors">Instagram</span>
    //                 <span className="hover:text-[#C8A966] cursor-pointer transition-colors">Facebook</span>
    //             </div>
    //             </div>
    //         </motion.div>
    //         </>
    //     )}
    //     </AnimatePresence>
    // );
    // };

    // export default Sidebar;


    import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Settings } from 'lucide-react'; // 1. استيراد الأيقونة هنا

// 2. زدنا activeTab و setActiveTab فـ الـ props ديال المكون
const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    
    // أنيميشن للمنيو
    const sidebarVariants = {
        closed: { x: '100%', transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
        opened: { x: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
    };

    const linkVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.3 + i * 0.1, duration: 0.5 }
        })
    };

    const items = [
        { name: 'Home', path: '/' },
        { name: 'Hotel', path: '/experience' },
        { name: 'Rooms & Suites', path: '/rooms' },
        { name: 'Restaurant', path: '/restaurant' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact', path: '/contact' }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay ضبابي خلف المنيو */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[998]"
                    />

                    {/* القائمة الرئيسية */}
                    <motion.div
                        variants={sidebarVariants}
                        initial="closed"
                        animate="opened"
                        exit="closed"
                        className="fixed top-0 right-0 h-full w-full md:w-[550px] bg-[#0D0D0D] z-[999] shadow-2xl flex flex-col"
                    >
                        {/* زر الإغلاق */}
                        <button 
                            onClick={onClose}
                            className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center group"
                        >
                            <div className="relative w-6 h-6">
                                <span className="absolute block w-full h-[1px] bg-white/50 group-hover:bg-[#C8A966] rotate-45 top-1/2 transition-all"></span>
                                <span className="absolute block w-full h-[1px] bg-white/50 group-hover:bg-[#C8A966] -rotate-45 top-1/2 transition-all"></span>
                            </div>
                        </button>

                        {/* محتوى المنيو */}
                        <div className="flex-1 flex flex-col justify-center px-12 md:px-20 mt-16">
                            <nav className="space-y-4">
                                {items.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        custom={i}
                                        initial="hidden"
                                        animate="visible"
                                        variants={linkVariants}
                                    >
                                        <Link
                                            to={item.path}
                                            onClick={onClose}
                                            className="block text-4xl md:text-5xl font-serif text-white/90 hover:text-[#C8A966] transition-all duration-300 tracking-tight"
                                            style={{ fontFamily: "'Playfair Display', serif" }}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* 3. هنا حطينا البوتون ديالك ديال Settings تحت الروابط مع أنيميشن زوين */}
                            <motion.div
                                custom={items.length}
                                initial="hidden"
                                animate="visible"
                                variants={linkVariants}
                                className="mt-8 pt-6 border-t border-white/5"
                            >
                                <button
                                    onClick={() => {
                                        onClose();
                                        navigate('/settings');
                                    }}
                                    className="w-full max-w-[200px] flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-widest uppercase transition-all text-white/60 hover:bg-white/5 hover:text-[#C8A966]"
                                >
                                    <Settings className="w-4 h-4" />
                                    <span>Settings</span>
                                </button>
                            </motion.div>
                        </div>

                        {/* الجزء السفلي (Contact Info) */}
                        <div className="p-12 md:p-20 border-t border-white/5 space-y-8">
                            <div>
                                <h4 className="text-[#C8A966] text-[10px] uppercase tracking-[0.5em] mb-4 font-bold">Contact</h4>
                                <p className="text-sm text-white/40 font-light leading-relaxed">
                                    Rue Benghazi, Hassan, Rabat<br/>
                                    +212 5 37 70 70 50
                                </p>
                            </div>
                            
                            <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-white/20">
                                <span className="hover:text-[#C8A966] cursor-pointer transition-colors">Instagram</span>
                                <span className="hover:text-[#C8A966] cursor-pointer transition-colors">Facebook</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Sidebar;