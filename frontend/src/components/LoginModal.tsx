// src/components/LoginModal.tsx
import React, { useState } from 'react';
import axios from 'axios';

const LoginModal: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post('/api/v1/user/login', { username, password })
            .then(response => {
                // Handle successful login
                console.log('Logged in:', response.data);
            })
            .catch(error => {
                // Handle login error
                console.error('Error logging in:', error);
            });
    };

    return (
        <div className="modal">
            <h2>Login Modal</h2>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginModal;
