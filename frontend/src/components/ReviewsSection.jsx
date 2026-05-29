import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

// ─── Helper: render stars m3a support dyal decimal (ex: 4.5) ─────────────────
const StarRating = ({ note }) => {
    return (
        <div className="flex gap-1 mb-6" aria-label={`Rating: ${note} out of 5`}>
            {[1, 2, 3, 4, 5].map((star) => {
                // Full star
                if (star <= Math.floor(note)) {
                    return <span key={star} className="text-sm text-[#E9C496]">★</span>;
                }
                // Half star — ila kan l-decimal >= 0.5
                if (star === Math.ceil(note) && note % 1 >= 0.5) {
                    return <span key={star} className="text-sm text-[#E9C496] opacity-60">★</span>;
                }
                // Empty star
                return <span key={star} className="text-sm text-black/10">★</span>;
            })}
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ReviewsSection = () => {
    const [reviews, setReviews]   = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    useEffect(() => {
        const getReviews = async () => {
            try {
                // L-base URL: ghayerha ila production
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'}/api/reviews`,
                    { params: { per_page: 6 } } // affiche 6 reviews f l-homepage
                );

                // Laravel paginate() ki-rj3 { data: [...], total: ..., ... }
                setReviews(response.data.data ?? []);
            } catch (err) {
                console.error('Erreur fetch reviews:', err);
                setError('Unable to load reviews. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        getReviews();
    }, []);

    // ── Loading State ──
    if (loading) {
        return (
            <div className="py-32 text-center font-serif italic text-gray-400">
                Loading guest voices...
            </div>
        );
    }

    // ── Error State ──
    if (error) {
        return (
            <div className="py-32 text-center text-red-400 text-sm">
                {error}
            </div>
        );
    }

    // ── Empty State ──
    if (reviews.length === 0) {
        return (
            <section className="bg-[#FDFBF7] py-32 px-8 md:px-24 border-t border-black/5">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="font-serif italic text-gray-400 text-xl">
                        No reviews yet. Be the first to share your experience.
                    </p>
                    <Link
                        to="/leave-review"
                        className="inline-block mt-10 border border-black/20 px-12 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-700"
                    >
                        Share Your Experience
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-[#FDFBF7] py-32 px-8 md:px-24 border-t border-black/5">
            <div className="max-w-7xl mx-auto">

                {/* ── Title Section ── */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-8xl font-serif text-[#1a1a1a]"
                    >
                        Guest <br /> <span className="italic">Voices</span>
                    </motion.h2>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-black/40 max-w-xs text-right">
                        Real experiences from our distinguished guests.
                    </p>
                </div>

                {/* ── Reviews Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {reviews.map((rev, index) => (
                        <motion.div
                            key={rev.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="bg-white p-10 border border-black/5 hover:shadow-xl transition-all duration-500 group"
                        >
                            {/* Stars — ki-support decimal (4.5, 3.0, etc.) */}
                            <StarRating note={rev.note} />

                            {/* Commentaire */}
                            <p className="text-lg font-serif italic text-[#2D2D2D] leading-relaxed mb-8">
                                "{rev.commentaire ?? 'No comment provided.'}"
                            </p>

                            {/* Author & Date */}
                            <div className="border-t border-black/5 pt-6 flex justify-between items-center">
                                <span className="text-[11px] uppercase tracking-widest font-bold">
                                    {/* rev.user relation — loaded m3a with(['user']) f Controller */}
                                    {rev.user?.name ?? `Guest #${rev.user_id}`}
                                </span>
                                <span className="text-[10px] text-black/30">
                                    {new Date(rev.created_at).toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* ── CTA Button ── */}
                <div className="mt-20 text-center">
                    <Link
                        to="/leave-review"
                        className="inline-block border border-black/20 px-12 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-700"
                    >
                        Share Your Experience
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default ReviewsSection;
