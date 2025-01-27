import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';
import logger from '../utils/logger.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized - no token' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const company = await Company.findById(decoded.id).select('-password');

    if (!company) {
      return res.status(401).json({ 
        success: false, 
        message: 'Company not found' 
      });
    }

    if (!company.isEmailVerified) {
      return res.status(401).json({ 
        success: false, 
        message: 'Email not verified' 
      });
    }

    req.company = company;
    next();
  } catch (error) {
    logger.error('Auth middleware error:', error);
    return res.status(401).json({ 
      success: false, 
      message: 'Not authorized - token failed' 
    });
  }
};