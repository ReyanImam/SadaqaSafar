import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
});

export const createCause = async (causeData, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await api.post('/causes', causeData, config);
    return response.data;
  } catch (error) {
    console.error('Error creating cause:', error.response?.data || error.message);
    throw error;
  }
};

export const getCauses = async () => {
  try {
    const response = await api.get('/causes');
    return response.data;
  } catch (error) {
    console.error('Error fetching causes:', error.response?.data || error.message);
    throw error;
  }
};

export const getNGOCauses = async (ngoId) => {
  try {
    const response = await api.get(`/causes/ngo/${ngoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching NGO causes:', error.response?.data || error.message);
    throw error;
  }
};