import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpiry: Date,
}, {
  timestamps: true,
});

// Hash password before saving
companySchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
companySchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Company = mongoose.model('Company', companySchema);
export default Company;