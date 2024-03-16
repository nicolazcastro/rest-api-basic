import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1/diaries';

export const getDiaryEntries = async () => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        console.error('Error fetching diary entries:', error);
        throw error;
    }
};

export const getDiaryEntryById = async (id: string) => {
    try {
        const response = await axios.get(`${baseURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching diary entry by ID:', error);
        throw error;
    }
};

export const createDiaryEntry = async (data: any) => {
    try {
        const response = await axios.post(baseURL, data);
        return response.data;
    } catch (error) {
        console.error('Error creating diary entry:', error);
        throw error;
    }
};

export const updateDiaryEntry = async (id: string, data: any) => {
    try {
        const response = await axios.patch(`${baseURL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating diary entry:', error);
        throw error;
    }
};
