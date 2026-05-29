import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
            {/* الـ Navbar ديجا فيه الـ Sidebar وسط منو كما شرحنا */}
            <Navbar />

            {/* Main Content Area */}
            {/* درنا flex-1 باش الـ Footer ديما يبقى لاصق لتحت وخا تكون الصفحة خاوية */}
            <main className="flex-1">
                {/* Outlet هي البلاصة فين غاتبان LuxuryHotel و RoomsPage */}
                <Outlet />
            </main>

            {/* الـ Footer غايكون فـ كاع الصفحات لتحت */}
            <Footer />
        </div>
    );
};

export default MainLayout;