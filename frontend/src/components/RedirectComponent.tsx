import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

interface RedirectProps {
    component: React.ComponentType<any>;
    mode?: 'create' | 'edit';
}

const RedirectComponent: React.FC<RedirectProps> = ({ component: Component, mode }) => {
    const { user } = useUserContext();
    return user ? <Component mode={mode} /> : <Navigate to="/" replace />;
};

export default RedirectComponent;
