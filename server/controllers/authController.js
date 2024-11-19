import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import NGO from '../models/NGO.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'user'
    });

    const token = generateToken(user._id, user.role);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerNGO = async (req, res) => {
  try {
    const { name, email, password, description, domain, location,registrationNumber, contactNumber,logo } = req.body;
    const ngoExists = await NGO.findOne({ email });

    if (ngoExists) {
      return res.status(400).json({ message: 'NGO already exists' });
    }

  

    const ngo = await NGO.create({
      name,
      email,
      description,
      domain,
      location,
      contactNumber,
      registrationNumber,
      logo,
      
    });

    const token = generateToken(ngo._id,"ngo");
    res.status(201).json({
      _id: ngo._id,
      name: ngo.name,
      email: ngo.email,
      role: "ngo",
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id, user.role);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};