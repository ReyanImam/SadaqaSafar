import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  participants: [{
    participantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    participantType: {
      type: String,
      enum: ['USER', 'NGO'],
      required: true
    }
  }],
  lastMessage: {
    type: String,
    default: ''
  },
  lastMessageDate: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true 
});

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;