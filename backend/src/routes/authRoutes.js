import express from 'express';
import {
  register,
  login,
  verifyEmailToken,
  logout
} from '../controllers/authController.js';
import {
  validateCompanyRegistration,
  validate
} from '../middleware/validator.js';

const router = express.Router();

router.post('/register', validateCompanyRegistration, validate, register);
router.post('/login', login);
router.get('/verify-email/:token', verifyEmailToken);
router.post('/logout', logout);

export default router;