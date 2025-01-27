import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';
import { sendVerificationEmail } from '../services/emailService.js';
import { createVerificationToken, verifyEmail } from '../services/verificationService.js';
import logger from '../utils/logger.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const companyExists = await Company.findOne({ email });
    if (companyExists) {
      return res.status(400).json({
        success: false,
        message: 'Company already exists'
      });
    }

    const company = await Company.create({
      name,
      email,
      password,
      phone
    });

    const verificationToken = await createVerificationToken(company);
    await sendVerificationEmail(email, verificationToken);

    const token = generateToken(company._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    res.status(201).json({
      success: true,
      data: {
        _id: company._id,
        name: company.name,
        email: company.email,
        isEmailVerified: company.isEmailVerified
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering company'
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });
    if (!company || !(await company.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(company._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.json({
      success: true,
      data: {
        _id: company._id,
        name: company.name,
        email: company.email,
        isEmailVerified: company.isEmailVerified
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error logging in'
    });
  }
};

export const verifyEmailToken = async (req, res) => {
  try {
    const { token } = req.params;
    const company = await verifyEmail(token);

    res.json({
      success: true,
      message: 'Email verified successfully',
      data: {
        _id: company._id,
        name: company.name,
        email: company.email,
        isEmailVerified: company.isEmailVerified
      }
    });
  } catch (error) {
    logger.error('Email verification error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};