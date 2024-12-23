import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  sender: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    type: {
      type: String,
      enum: ['USER', 'NGO'],
      required: true
    }
  },
  receiver: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    type: {
      type: String,
      enum: ['USER', 'NGO'],
      required: true
    }
  },
  message: {
    type: String,
    required: true
  }
}, { 
  timestamps: true 
});

const Message = mongoose.model('Message', messageSchema);
export default Message;