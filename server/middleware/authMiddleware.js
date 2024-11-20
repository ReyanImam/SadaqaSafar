import jwt from 'jsonwebtoken';
import NGO from '../models/NGO.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded.id || !decoded.role) {
        return res.status(401).json({ message: 'Invalid token structure' });
      }

      let authenticatedEntity;

      if (decoded.role === 'ngo') {
        authenticatedEntity = await NGO.findById(decoded.id).select('-password');
        if (!authenticatedEntity) {
          return res.status(401).json({ message: 'Not authorized as NGO' });
        }
      } else if (decoded.role === 'user') {
        authenticatedEntity = await User.findById(decoded.id).select('-password');
        if (!authenticatedEntity) {
          return res.status(401).json({ message: 'Not authorized as User' });
        }
      }

      if (!authenticatedEntity) {
        return res.status(401).json({ message: 'Authentication failed' });
      }

      req.auth = {
        id: authenticatedEntity._id,
        type: decoded.role.toUpperCase(),
        entity: authenticatedEntity
      };

      next();
    } else {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const ngoOnly = (req, res, next) => {
  if (req.auth && req.auth.type === 'NGO') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. NGOs only.' });
  }
};

// ... other middleware functions ...