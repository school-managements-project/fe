import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
    const token = JSON.parse(localStorage.getItem('accessToken') || 'null');

    if (!token) return <Navigate to={`/auth/login`} />;
    return children;
};
export default PrivateRoutes;
