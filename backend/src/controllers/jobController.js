import Job from '../models/Job.js';
import { sendJobNotification } from '../services/emailService.js';
import logger from '../utils/logger.js';

export const createJob = async (req, res) => {
  try {
    const { title, description, experienceLevel, candidates, endDate } = req.body;

    const job = await Job.create({
      company: req.company._id,
      title,
      description,
      experienceLevel,
      candidates: candidates.map(email => ({ email })),
      endDate
    });

    // Send notifications to candidates
    for (const candidate of job.candidates) {
      const notificationSent = await sendJobNotification(
        await job.populate('company', 'name'),
        candidate
      );
      if (notificationSent) {
        candidate.status = 'NOTIFIED';
      }
    }
    await job.save();

    res.status(201).json({
      success: true,
      data: job
    });
  } catch (error) {
    logger.error('Job creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating job posting'
    });
  }
};

export const getCompanyJobs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const jobs = await Job.find({ company: req.company._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Job.countDocuments({ company: req.company._id });

    res.json({
      success: true,
      data: jobs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    logger.error('Get company jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs'
    });
  }
};