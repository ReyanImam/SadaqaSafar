import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getNGOs = async () => {
  const response = await axios.get(`${API_URL}/ngos`);
  return response.data;
};

export const getNGOById = async (id) => {
  const response = await axios.get(`${API_URL}/ngos/${id}`);
  return response.data;
};