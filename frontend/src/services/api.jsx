import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weddingAPI = {
  getWeddingInfo: async () => {
    const response = await api.get('/wedding-info/current/');
    return response.data;
  },
};

export const activitiesAPI = {
  getActivities: async () => {
    const response = await api.get('/activities/');
    return response.data;
  },
  
  getActivity: async (id) => {
    const response = await api.get(`/activities/${id}/`);
    return response.data;
  },
  
  updateDonation: async (id, amount) => {
    const response = await api.post(`/activities/${id}/update_donation/`, {
      amount: amount,
    });
    return response.data;
  },
};

export default api;
