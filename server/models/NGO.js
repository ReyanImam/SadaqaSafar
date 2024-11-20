import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ngoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password:{
    type: String,
    required: true,
  
  },
  description: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    
    enum: ['education', 'health', 'environment', 'poverty', 'other']
  },
  role: {
    type: String,
    enum: ['user', 'ngo', 'admin'],
    default:"ngo"
  },
  logo: {
    type: String,
    default: ''
  },
  
  documents: [{
    type: String
  }],
  causes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cause'
  }],
  verified: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    default:"karachi"

  },
  contactNumber: {
    type: String,
  
  },
  socialMedia: {
    website: String,
    facebook: String,
    twitter: String,
    instagram: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
ngoSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
ngoSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

const NGO = mongoose.model('NGO', ngoSchema);

export default NGO;