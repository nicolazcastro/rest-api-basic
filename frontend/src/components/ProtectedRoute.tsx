// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

interface RedirectProps {
    component: React.ComponentType<any>;
    mode?: 'create' | 'edit';
}

const ProtectedRoute: React.FC<RedirectProps> = ({ component: Component, mode }) => {
    const { isAuthenticated, token } = useUserContext();

    console.log('ProtectedRoute IsAuthenticated:', isAuthenticated); // Add debugging statement
    console.log('ProtectedRoute token:', token); // Add debugging statement

    return isAuthenticated && token ? <Component mode={mode} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
