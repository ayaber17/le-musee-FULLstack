import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roleRequired }) => {
    const token    = localStorage.getItem('auth_token');
    const userRole = localStorage.getItem('user_role');

    if (!token) return <Navigate to="/auth" replace />;

    if (roleRequired && userRole !== roleRequired) {
        if (userRole === 'admin')  return <Navigate to="/admin"     replace />;
        if (userRole === 'staff')  return <Navigate to="/reception" replace />;
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default ProtectedRoute;