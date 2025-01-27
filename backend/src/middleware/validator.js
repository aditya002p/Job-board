import { body, validationResult } from 'express-validator';

export const validateCompanyRegistration = [
  body('name').trim().notEmpty().withMessage('Company name is required'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone').notEmpty().withMessage('Phone number is required'),
];

export const validateJobPosting = [
  body('title').trim().notEmpty().withMessage('Job title is required'),
  body('description').notEmpty().withMessage('Job description is required'),
  body('experienceLevel')
    .isIn(['BEGINNER', 'INTERMEDIATE', 'EXPERT'])
    .withMessage('Invalid experience level'),
  body('endDate')
    .isISO8601()
    .withMessage('Invalid end date format'),
  body('candidates')
    .isArray()
    .withMessage('Candidates must be an array'),
  body('candidates.*.email')
    .isEmail()
    .withMessage('Invalid candidate email'),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  next();
};