import axios from 'axios';

// URL del backend
const baseURL = 'http://localhost:3000';

export const getUserInfo = async (token: string) => {
    try {
        const response = await axios.get(`${baseURL}/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user information:', error);
        throw error;
    }
};

export const registerUser = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${baseURL}/api/v1/user/register`, { email, password });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const login = async (email: string, password: string): Promise<string> => {
    try {
        const response = await axios.post(`${baseURL}/api/v1/user/login`, { email, password });
        return response.data.token; // Devolvemos el token si el inicio de sesión es exitoso
    } catch (error) {
        console.error('Error logging in:', error);
        throw error; // Lanzamos el error si ocurre un problema durante el inicio de sesión
    }
};
