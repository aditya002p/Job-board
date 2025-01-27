import crypto from 'crypto';
import Company from '../models/Company.js';

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

export const createVerificationToken = async (company) => {
  const token = generateVerificationToken();
  
  company.verificationToken = token;
  company.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
  await company.save();
  return token;
};

export const verifyEmail = async (token) => {
  const company = await Company.findOne({
    verificationToken: token,
    verificationTokenExpiry: { $gt: Date.now() }
  });

  if (!company) {
    throw new Error('Invalid or expired verification token');
  }

  company.isEmailVerified = true;
  company.verificationToken = undefined;
  company.verificationTokenExpiry = undefined;
  
  await company.save();
  return company;
};