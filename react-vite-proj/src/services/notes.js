import axios from 'axios';

export const getNotes = async function () {
    try {
        const response = await axios.get(`https://localhost:7051/notes`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true 
        });
        return response.data;
    } catch (error) {
        throw new Error(`Request failed with status ${error.response?.status}: ${error.message}`);
    }
};

export const getLists = async function () {
    try {
        const response = await axios.get(`https://localhost:7051/lists`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true 
        });
        return response.data; 
    } catch (error) {
        throw new Error(`Request failed with status ${error.response?.status}: ${error.message}`);
    }
};
