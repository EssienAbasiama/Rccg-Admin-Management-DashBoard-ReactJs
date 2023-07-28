import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api'; // Replace this with your API base URL

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const login = async(email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        console.log("loggedIn" + response.data.token);
        return response.data.token;
    } catch (error) {
        throw new Error('Login failed. Please check your credentials.');
    }
};

// export const createUser = async(userData, token) => {
//     try {
//         const response = await api.post('/create-user', userData, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error('Failed to create user. Please try again.');
//     }
// };

export const fetchNewComerData = async(token) => {
    try {
        const response = await api.get('/newcomers', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch protected data. Please log in again.');
    }
};