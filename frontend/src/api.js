import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8001/api',
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    timeout: 120000, // 120 seconds for comprehensive AI analysis
});

export const analyzeResume = async (formData) => {
    const response = await api.post('/analyze', formData);
    return response.data;
};

export default api;
