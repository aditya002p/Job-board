import transporter from '../config/nodemailer.js';
import logger from '../utils/logger.js';

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
  
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Verify Your Email',
    html: `
      <h1>Email Verification</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">${verificationUrl}</a>
      <p>This link will expire in 24 hours.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Verification email sent to ${email}`);
  } catch (error) {
    logger.error('Error sending verification email:', error);
    throw new Error('Error sending verification email');
  }
};

export const sendJobNotification = async (job, candidate) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: candidate.email,
    subject: `New Job Opportunity: ${job.title}`,
    html: `
      <h1>${job.title}</h1>
      <p>Hello,</p>
      <p>A new job opportunity matching your profile has been posted:</p>
      <h2>Job Details:</h2>
      <p><strong>Company:</strong> ${job.company.name}</p>
      <p><strong>Experience Level:</strong> ${job.experienceLevel}</p>
      <p><strong>Description:</strong></p>
      <p>${job.description}</p>
      <p><strong>Application Deadline:</strong> ${new Date(job.endDate).toLocaleDateString()}</p>
      <p>Please visit our platform to apply or learn more about this opportunity.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Job notification sent to ${candidate.email}`);
    return true;
  } catch (error) {
    logger.error('Error sending job notification:', error);
    return false;
  }
};