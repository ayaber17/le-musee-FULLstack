// import { Routes, Route } from 'react-router-dom';
// import MainLayout from './components/MainLayout';
// import LuxuryHotel from './pages/LuxuryHotel';
// import RoomsPage from './pages/RoomsPage';
// import HotelExperience from './pages/HotelExperience';
// import DiningPage from './pages/DiningPage';
// import ContactPage from './pages/ContactPage';
// import RoomsGallery from './pages/RoomsGallery';
// import AuthPage from './pages/AuthPage';
// import LeaveReview from './pages/LeaveReview';
// import Profile from './pages/Profile';
// import RoomDetailsPage from './pages/RoomDetailsPage';
// import AdminDashboard from './pages/AdminDashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import GuestRoute from './components/GuestRoute';
// import AnalyticsPage from './pages/AnalyticsPage';
// import ReceptionistDashboard from './pages/ReceptionistDashboard';
// import SettingsPage from "./pages/SettingsPage";
// import UserSettingsPage from "./pages/UserSettingsPage";
// import StaffRoomDashboard from "./pages/Staffroomdashboard";

// function App() {
//   return (
//     <Routes>
//       {/* 1. Client pages (avec Navbar et Footer) */}
//       <Route path="/" element={<MainLayout />}>
//         <Route index element={<LuxuryHotel />} />
//         <Route path="rooms" element={<RoomsPage />} />
//         <Route path="experience" element={<HotelExperience />} />
//         <Route path="restaurant" element={<DiningPage />} />
//         <Route path="contact" element={<ContactPage />} />
//         <Route path="gallery" element={<RoomsGallery />} />
//         <Route path="/leave-review/:id" element={<LeaveReview />} />
//         <Route path="/rooms/:id" element={<RoomDetailsPage />} />

//         <Route path="settings" element={
//           <ProtectedRoute>
//             <UserSettingsPage />
//           </ProtectedRoute>
//         } />

//         <Route path="auth" element={
//           <GuestRoute>
//             <AuthPage />
//           </GuestRoute>
//         } />

//         <Route path="profile" element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         } />
//       </Route>

//       {/* 2. Admin Dashboard */}
//       <Route path="admin" element={
//         <ProtectedRoute roleRequired="admin">
//           <AdminDashboard />
//         </ProtectedRoute>
//       }>
//         <Route path="analytics" element={<AnalyticsPage />} />
//       </Route>

//       {/* 3. Receptionist Dashboard */}
//       <Route path="reception" element={
//         <ProtectedRoute roleRequired="staff">
//           <ReceptionistDashboard />
//         </ProtectedRoute>
//       } />


//       {/* 4. Staff Room Management */}
//       <Route path="staff/rooms" element={
//         <ProtectedRoute roleRequired="staff">
//           <StaffRoomDashboard />
//         </ProtectedRoute>
//       } />

//     </Routes>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ─── Layouts & Routes ────────────────────────────────────────────────────────
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';

// ─── Pages ───────────────────────────────────────────────────────────────────
import LuxuryHotel from './pages/LuxuryHotel';
import AuthPage from './pages/AuthPage';
import Profile from './pages/Profile';
import ContactPage from './pages/ContactPage';
import DiningPage from './pages/DiningPage';
import HotelExperience from './pages/HotelExperience';
import LeaveReview from './pages/LeaveReview';
import RoomsPage from './pages/RoomsPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import RoomsGallery from './pages/RoomsGallery';

import AdminDashboard from './pages/AdminDashboard';
import Analyticspage from './pages/Analyticspage'; // p صغيرة
import Receptionistdashboard from './pages/Receptionistdashboard'; // d صغيرة
import StaffRoomDashboard from './pages/StaffRoomDashboard'; // S, R, D كبار
import Usersettingspage from './pages/Usersettingspage'; // s, p صغار

function App() {
    return (
        <Router>
            <Routes>
                {/* الصفحات العامة اللي كيبان فيها الـ Navbar والـ Footer */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<LuxuryHotel />} />
                    <Route path="/rooms" element={<RoomsPage />} />
                    <Route path="/rooms/:id" element={<RoomDetailsPage />} />
                    <Route path="/gallery" element={<RoomsGallery />} />
                    <Route path="/dining" element={<DiningPage />} />
                    <Route path="/experience" element={<HotelExperience />} />
                    <Route path="/contact" element={<ContactPage />} />
                    
                    {/* بروفايل المستخدم محمي (خاصو يكون مسجل الدخول) */}
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />
                    
                    {/* كتابة مراجعة محمية */}
                    <Route path="/leave-review/:id" element={
                        <ProtectedRoute>
                            <LeaveReview />
                        </ProtectedRoute>
                    } />
                </Route>

                {/* صفحة الـ Login والـ Register (إيلا كان مسجل ديجا كيمشي نيشان للبروفايل عبر GuestRoute) */}
                <Route path="/auth" element={
                    <GuestRoute>
                        <AuthPage />
                    </GuestRoute>
                } />

                {/* لوحات التحكم الخاصة بالموزفين (Admin / Staff) */}
                <Route path="/admin" element={
                    <ProtectedRoute roleRequired="admin">
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                
                <Route path="/reception" element={
                    <ProtectedRoute roleRequired="staff">
                        <Receptionistdashboard />
                    </ProtectedRoute>
                } />

                <Route path="/staffroom" element={
                    <ProtectedRoute roleRequired="staff">
                        <StaffRoomDashboard />
                    </ProtectedRoute>
                } />

                {/* إعادة توجيه أي مسار مخربق للصفحة الرئيسية */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;