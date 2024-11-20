import Cause from '../models/Cause.js';
import mongoose from 'mongoose';

export const createCause = async (req, res) => {
  try {
    const { title, description, goalAmount, category, endDate } = req.body;
    
    if (!title || !description || !goalAmount || !category || !endDate) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Ensure that req.auth exists and contains the NGO's ID
    if (!req.auth || !req.auth.id) {
      return res.status(401).json({ message: 'Authentication failed. NGO ID not found.' });
    }

    const newCause = new Cause({
      title,
      description,
      goalAmount,
      category,
      endDate,
      ngo: req.auth.id, // Use req.auth.id to set the NGO
      raisedAmount: 0,
    });

    console.log('Creating new cause for NGO:', req.auth.id);
    const savedCause = await newCause.save();
    console.log('Saved cause:', savedCause);
    res.status(201).json(savedCause);
  } catch (error) {
    console.error('Error in createCause:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ... other controller functions ...



export const getNGOCauses = async (req, res) => {
  try {
    const { ngoId } = req.params;
    console.log('Fetching causes for NGO:', ngoId);
    
    if (!mongoose.Types.ObjectId.isValid(ngoId)) {
      return res.status(400).json({ message: 'Invalid NGO ID format' });
    }

    const causes = await Cause.find({ ngo: ngoId });
    console.log('Found causes for NGO:', causes.length);
    res.json(causes);
  } catch (error) {
    console.error('Error in getNGOCauses:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};