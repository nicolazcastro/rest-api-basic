// src/context/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
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
    token: string | null;
    login: (email: string, password: string, setToken: (token: string | null) => void, setIsAuthenticated: (isAuthenticated: boolean) => void) => Promise<void>;
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
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        console.log('Updated isAuthenticated:', isAuthenticated);
        console.log('Updated storedToken:', token);
    }, [isAuthenticated, token]);

    const handleLogin = async (email: string, password: string, setToken: (token: string | null) => void, setIsAuthenticated: (isAuthenticated: boolean) => void) => {
        try {
            const token = await login(email, password);
            localStorage.setItem('token', token);

            console.log('At Login token:', token);
            setToken(token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <UserContext.Provider value={{ user, setUser, isAuthenticated, token, login: handleLogin, logout: handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to consume the user context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        console.log('useUserContext must be used within a UserProvider');
        throw new Error('useUserContext must be used within a UserProvider');
    } else {
        console.log('useUserContext called');
    }
    return context;
};

// Export handleLogin function
export const handleLogin = (email: string, password: string, setToken: (token: string | null) => void, setIsAuthenticated: (isAuthenticated: boolean) => void) => {
    const { login } = useUserContext();
    return login(email, password, setToken, setIsAuthenticated);
};
