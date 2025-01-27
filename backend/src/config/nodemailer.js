import nodemailer from 'nodemailer';
import logger from '../utils/logger.js';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    logger.error('SMTP connection error:', error);
  } else {
    logger.info('SMTP server is ready to send emails');
  }
});

export default transporter;