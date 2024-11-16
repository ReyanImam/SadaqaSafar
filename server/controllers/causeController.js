import axios from 'axios';
import Cause from '../models/Cause.js';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Adjust this to match your backend port
});

export const createCause = async (req, res) => {
  try {
    const { title, description, goalAmount, category, endDate } = req.body;
    
    if (!title || !description || !goalAmount || !category || !endDate) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newCause = new Cause({
      title,
      description,
      goalAmount,
      category,
      endDate,
      ngo: req.user._id,
    });

    const savedCause = await newCause.save();
    res.status(201).json(savedCause);
  } catch (error) {
    console.error('Error in createCause:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getCauses = async () => {
  try {
    const response = await api.get('/causes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getNGOCauses = async (req, res) => {
  try {
    const { ngoId } = req.params;
    console.log('Fetching causes for NGO:', ngoId);
    
    if (!ngoId) {
      return res.status(400).json({ message: 'NGO ID is required' });
    }

    const causes = await Cause.find({ ngo: ngoId });
    console.log('Causes found:', causes.length);
    
    res.json(causes);
  } catch (error) {
    console.error('Error in getNGOCauses:', error);
    res.status(500).json({ message: 'Server error', error: error.message, stack: error.stack });
  }
};