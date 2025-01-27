import logger from '../utils/logger.js';

export const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: Object.values(err.errors).map(e => e.message).join(', ')
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value entered'
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
};