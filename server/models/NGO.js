import mongoose from 'mongoose';

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

const NGO = mongoose.model('NGO', ngoSchema);

export default NGO;