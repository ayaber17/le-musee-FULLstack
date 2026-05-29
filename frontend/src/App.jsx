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


import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import LuxuryHotel from './pages/LuxuryHotel';
import RoomsPage from './pages/RoomsPage';
import HotelExperience from './pages/HotelExperience';
import DiningPage from './pages/DiningPage';
import ContactPage from './pages/ContactPage';
import RoomsGallery from './pages/RoomsGallery';
import AuthPage from './pages/AuthPage';
import LeaveReview from './pages/LeaveReview';
import Profile from './pages/Profile';
import RoomDetailsPage from './pages/RoomDetailsPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import AnalyticsPage from './pages/Analyticspage';
import ReceptionistDashboard from './pages/Receptionistdashboard';
import UserSettingsPage from "./pages/Usersettingspage";
import StaffRoomDashboard from "./pages/StaffRoomDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<LuxuryHotel />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="rooms/:id" element={<RoomDetailsPage />} />
        <Route path="experience" element={<HotelExperience />} />
        <Route path="restaurant" element={<DiningPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="gallery" element={<RoomsGallery />} />
        <Route path="leave-review/:id" element={<LeaveReview />} />
        <Route path="settings" element={<ProtectedRoute><UserSettingsPage /></ProtectedRoute>} />
        <Route path="auth" element={<GuestRoute><AuthPage /></GuestRoute>} />
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>
      <Route path="admin" element={<ProtectedRoute roleRequired="admin"><AdminDashboard /></ProtectedRoute>}>
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
      <Route path="reception" element={<ProtectedRoute roleRequired="staff"><ReceptionistDashboard /></ProtectedRoute>} />
      <Route path="staff/rooms" element={<ProtectedRoute roleRequired="staff"><StaffRoomDashboard /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;