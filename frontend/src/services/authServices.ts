import axios from 'axios';

const backendUrl = 'http://localhost:3000/api/v1';

export const login = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${backendUrl}/user/login`, { username, password });
        return response.data.token;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
