import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data?.message) {
      error.message = error.response.data.message;
    }
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerNGO = async (ngoData) => {
  try {
    const response = await api.post('/auth/register-ngo', ngoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginNGO = async (email, password) => {
  try {
    const response = await api.post('/auth/login-ngo', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};