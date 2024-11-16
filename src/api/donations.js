import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const createDonation = async (donationData, token) => {
  const response = await axios.post(`${API_URL}/donations`, donationData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getUserDonations = async (token) => {
  const response = await axios.get(`${API_URL}/donations/user`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};