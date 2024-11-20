import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

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
    console.log('API: Created cause:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Error creating cause:', error.response?.data || error.message);
    throw error;
  }
};



export const getNGOCauses = async (ngoId) => {
  try {
    console.log('API: Fetching causes for NGO ID:', ngoId);
    const response = await api.get(`/causes/ngo/${ngoId}`);
    console.log('API: Fetched NGO causes:', response.data);
    return response.data;
  } catch (error) {
    console.error('API: Error fetching NGO causes:', error.response?.data || error.message);
    throw error;
  }
};
