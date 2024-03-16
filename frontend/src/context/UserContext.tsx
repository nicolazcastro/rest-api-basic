// src/context/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { login } from '../services/userServices';

// Define the shape of the user object
interface User {
    name: string;
    email: string;
}

// Define the context type
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the context provider component
interface UserProviderProps {
    children: ReactNode; // Explicitly type children prop
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    const handleLogin = async (email: string, password: string) => {
        try {
            const token = await login(email, password);
            localStorage.setItem('token', token);
            // Fetch user data if needed
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        // Additional cleanup if needed
    };

    return (
        <UserContext.Provider value={{ user, setUser, isAuthenticated, login: handleLogin, logout: handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to consume the user context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
