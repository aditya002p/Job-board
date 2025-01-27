import express from 'express';
import {
  createJob,
  getCompanyJobs
} from '../controllers/jobController.js';
import { protect } from '../middleware/auth.js';
import {
  validateJobPosting,
  validate
} from '../middleware/validator.js';

const router = express.Router();

router.use(protect); // Protect all job routes

router.post('/', validateJobPosting, validate, createJob);
router.get('/', getCompanyJobs);

export default router;