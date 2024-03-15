// src/services/userService.ts
import axios from 'axios';

export const getUserInfo = async () => {
    try {
        const response = await axios.get('/api/v1/user/me');
        return response.data;
    } catch (error) {
        console.error('Error fetching user information:', error);
        throw error;
    }
};
