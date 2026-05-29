// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

// زيد التوكن فـ كاع الطلبات
api.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

/* |--------------------------------------------------------------------------
| Authentication
|--------------------------------------------------------------------------
*/
export const login    = (credentials) => api.post('/login', credentials);
export const register = (userData)    => api.post('/register', userData);
export const logout   = ()            => api.post('/logout');

/* |--------------------------------------------------------------------------
| Admin — Stats & Messages
|--------------------------------------------------------------------------
*/
export const fetchStats          = ()      => api.get('/admin/stats');
export const fetchMessages       = ()      => api.get('/admin/messages');
export const markMessageAsRead   = (id)    => api.put(`/admin/messages/${id}/read`);

/* |--------------------------------------------------------------------------
| Bookings Management (Admin / Staff)
|--------------------------------------------------------------------------
*/
export const fetchBookings  = (params) => api.get('/admin/bookings', { params });
export const updateBooking  = (id, data) => api.patch(`/admin/bookings/${id}`, data);
export const deleteBooking  = (id)       => api.delete(`/admin/bookings/${id}`);

/* |--------------------------------------------------------------------------
| Settings
|--------------------------------------------------------------------------
*/
export const fetchSettings = ()      => api.get('/admin/settings');
export const saveSettings  = (data)  => api.post('/admin/settings', data);
export const deleteSetting = (key)   => api.delete(`/admin/settings/${encodeURIComponent(key)}`);

/* |--------------------------------------------------------------------------
| Reviews
|--------------------------------------------------------------------------
*/
export const fetchReviews = () => api.get('/reviews');

export default api;