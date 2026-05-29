import { Navigate } from 'react-router-dom';

const GuestRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    // إيلا كاين توكن، صيفطو نيشان للبروفايل بلا ما يشوف صفحة Login
    return token ? <Navigate to="/profile" replace /> : children;
};

export default GuestRoute;