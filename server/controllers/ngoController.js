import NGO from '../models/NGO.js';



export const getNGOs = async (req, res) => {
  try {
    const ngos = await NGO.find().select('-documents');
    res.json(ngos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNGOById = async (req, res) => {
  try {
    const ngo = await NGO.findById(req.params.id).select('-documents');
    if (!ngo) {
      return res.status(404).json({ message: 'NGO not found' });
    }
    res.json(ngo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};