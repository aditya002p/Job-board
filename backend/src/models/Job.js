import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
  },
  experienceLevel: {
    type: String,
    enum: ['BEGINNER', 'INTERMEDIATE', 'EXPERT'],
    required: true,
  },
  candidates: [{
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'NOTIFIED', 'RESPONDED'],
      default: 'PENDING',
    },
  }],
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'CLOSED', 'EXPIRED'],
    default: 'ACTIVE',
  },
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);
export default Job;