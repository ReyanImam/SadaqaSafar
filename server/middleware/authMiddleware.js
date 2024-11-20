import jwt from 'jsonwebtoken';
import NGO from '../models/NGO.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Look for the NGO in the database
      const ngo = await NGO.findById(decoded._id).select('-password');
      if (!ngo) {
        return res.status(401).json({ message: 'Not authorized as NGO' });
      }

      // Attach NGO to the request object
      req.ngo = ngo;
      next();
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
