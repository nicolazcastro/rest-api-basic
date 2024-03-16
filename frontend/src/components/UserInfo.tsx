import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../services/userServices';

const UserInfo: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener el token de acceso del localStorage
                const token = localStorage.getItem('token');
                // Verificar si el token es null antes de llamar a getUserInfo
                if (token !== null) {
                    // Llamar a getUserInfo con el token de acceso
                    const userInfo = await getUserInfo(token);
                    setUser(userInfo);
                } else {
                    console.error('Token de acceso no encontrado en localStorage');
                }
            } catch (error) {
                // Manejar el error
                console.error('Error fetching user information:', error);
            }
        };

        fetchData(); // Llamar a la función fetchData al montar el componente
    }, []); // Vacío para que se ejecute solo una vez al montar el componente

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserInfo;
