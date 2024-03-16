// src/components/RegisterModal.tsx
import React, { useState } from 'react';
import { registerUser } from '../services/userServices';

interface RegisterModalProps {
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await registerUser(email, password);
            console.log('Registered successfully');
            onClose(); // Close the modal after successful registration
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="modal">
            <h2>Register Modal</h2>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterModal;
