// src/context/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the user object
interface User {
    name: string;
    email: string;
}

// Define the context type
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the context provider component
interface UserProviderProps {
    children: ReactNode; // Explicitly type children prop
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

// Custom hook to consume the user context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
