import mongoose from 'mongoose';

const causeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  ngo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NGO',
    required: true
  },
  goalAmount: {
    type: Number,
    required: true
  },
  raisedAmount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ['healthcare', 'education', 'environment', 'disaster-relief', 'poverty-alleviation']
  },
  images: [{
    type: String
  }],
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  donations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donation'
  }]
});

const Cause = mongoose.model('Cause', causeSchema);

export default Cause;