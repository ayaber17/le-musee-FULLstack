import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../api'; // استعملي الـ instance ديالك لي فيه baseURL و withCredentials

const LeaveReview = () => {
    const { id } = useParams(); // كياخد الـ ID من الرابط
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [commentaire, setCommentaire] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (rating === 0) {
            setError('من فضلك اختار النجوم أولاً');
            return;
        }

        // تأكدي أن الـ ID كاين قبل ما تصيفطي
        if (!id) {
            setError('رقم الغرفة ناقص في الرابط (URL)');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('auth_token');

            await api.post('/reviews', 
                {
                    note: rating,
                    commentaire: commentaire,
                    room_id: id, // صيفطنا الـ id الديناميكي
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                    },
                }
            );

            setSuccess(true);
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            if (err.response?.status === 401) {
                setError('يجب تسجيل الدخول أولاً');
            } else if (err.response?.status === 422) {
                setError(err.response.data.message || 'بيانات غير صالحة');
            } else {
                setError('حدث خطأ، حاول مرة أخرى');
            }
        } finally {
            setLoading(false);
        }
    };
    console.log("Room ID being sent:", id);

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Navbar />
            <section className="pt-40 pb-24 px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.h4
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="text-[#C8A966] text-[10px] uppercase tracking-[0.5em] mb-4 font-bold"
                    >
                        Your Voice Matters
                    </motion.h4>
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        className="text-5xl md:text-7xl font-serif italic text-[#1a1a1a] mb-12"
                    >
                        Share Your Experience
                    </motion.h1>

                    {success && (
                        <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded">
                            ✅ تم تسجيل تقييمك بنجاح!
                        </div>
                    )}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded text-sm">
                            ❌ {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-12 text-left bg-white p-10 md:p-16 shadow-sm border border-black/5">
                        <div className="flex flex-col items-center gap-4 mb-8">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400">Rate your stay</span>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        className="text-3xl transition-colors duration-200"
                                    >
                                        <span className={(hover || rating) >= star ? 'text-[#C8A966]' : 'text-gray-200'}>★</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold">Your Story</label>
                            <textarea
                                rows="5"
                                value={commentaire}
                                onChange={(e) => setCommentaire(e.target.value)}
                                className="w-full bg-transparent border-b border-gray-200 py-3 outline-none focus:border-[#C8A966] transition-colors font-light resize-none"
                                placeholder="Tell us about your stay..."
                            />
                        </div>

                        <div className="text-center pt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#1a1a1a] text-white px-16 py-4 uppercase text-[10px] tracking-[0.3em] font-bold hover:bg-[#C8A966] transition-all duration-500 disabled:opacity-50"
                            >
                                {loading ? 'جاري الإرسال...' : 'Submit Review'}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default LeaveReview;