import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const getNGOById = async (id) => {
  try {
    const response = await api.get(`/ngos/${id}`);
    console.log('NGO data fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching NGO:', error.response?.data || error.message);
    throw error;
  }
};

export const getNGOs = async () => {
  try {
    const response = await api.get('/ngos');
    return response.data;
  } catch (error) {
    console.error('Error fetching NGOs:', error.response?.data || error.message);
    throw error;
  }
};
