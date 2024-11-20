import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  sendMessage, 
  getConversations, 
  getMessages,
  createConversation 
} from '../controllers/messageController.js';

const router = express.Router();

router.post('/send', protect, sendMessage);
router.get('/conversations', protect, getConversations);
router.get('/messages/:conversationId', protect, getMessages);
router.post('/conversations', protect, createConversation);

export default router;