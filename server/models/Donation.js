import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cause: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cause',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  message: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Donation = mongoose.model('Donation', donationSchema);

export default Donation;