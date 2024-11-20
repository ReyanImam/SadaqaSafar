import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const sendMessage = async (conversationId, message, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await api.post('/messages/send', {
      conversationId,
      message
    }, config);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
    throw error;
  }
};

export const getConversations = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await api.get('/messages/conversations', config);
    return response.data;
  } catch (error) {
    console.error('Error fetching conversations:', error.response?.data || error.message);
    throw error;
  }
};

export const getMessages = async (conversationId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await api.get(`/messages/messages/${conversationId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error.response?.data || error.message);
    throw error;
  }
};

export const createConversation = async (participantId, participantType, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    
    const response = await api.post('/messages/conversations', {
      participantId,
      participantType
    }, config);
    return response.data;
  } catch (error) {
    console.error('Error creating conversation:', error.response?.data || error.message);
    throw error;
  }
};