import Message from '../models/message.js';
import Conversation from '../models/conversation.js';
import mongoose from 'mongoose';

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, message } = req.body;
    const senderId = req.auth.id;
    const senderType = req.auth.type;

    if (!conversationId || !message) {
      return res.status(400).json({ message: 'Conversation ID and message are required' });
    }

    // Find the conversation
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Create and save the message
    const newMessage = new Message({
      sender: {
        id: senderId,
        type: senderType
      },
      receiver: {
        id: conversation.participants.find(p => 
          p.participantId.toString() !== senderId.toString()
        ).participantId,
        type: conversation.participants.find(p => 
          p.participantId.toString() !== senderId.toString()
        ).participantType
      },
      message,
      conversationId
    });

    const savedMessage = await newMessage.save();

    // Update conversation with last message
    conversation.lastMessage = message;
    conversation.lastMessageDate = new Date();
    await conversation.save();

    res.status(201).json({ message: savedMessage });
  } catch (error) {
    console.error('Error in sendMessage:', error);
    res.status(500).json({ message: 'Error sending message', error: error.message });
  }
};

export const getConversations = async (req, res) => {
  try {
    const userId = req.auth.id;
    const userType = req.auth.type;

    const conversations = await Conversation.aggregate([
      {
        $match: {
          'participants': {
            $elemMatch: {
              participantId: new mongoose.Types.ObjectId(userId),
              participantType: userType
            }
          }
        }
      },
      {
        $lookup: {
          from: userType === 'USER' ? 'ngos' : 'users',
          localField: 'participants.participantId',
          foreignField: '_id',
          as: 'participantDetails'
        }
      },
      {
        $project: {
          _id: 1,
          participants: 1,
          lastMessage: 1,
          lastMessageDate: 1,
          otherParticipant: {
            $filter: {
              input: '$participantDetails',
              as: 'participant',
              cond: { 
                $ne: ['$$participant._id', new mongoose.Types.ObjectId(userId)]
              }
            }
          }
        }
      },
      {
        $unwind: '$otherParticipant'
      },
      {
        $project: {
          _id: 1,
          lastMessage: 1,
          lastMessageDate: 1,
          'otherParticipant._id': 1,
          'otherParticipant.name': 1,
          'otherParticipant.email': 1
        }
      }
    ]);

    res.json({ conversations });
  } catch (error) {
    console.error('Error in getConversations:', error);
    res.status(500).json({ message: 'Error fetching conversations', error: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.auth.id;

    // Verify the user is part of the conversation
    const conversation = await Conversation.findOne({
      _id: conversationId,
      'participants.participantId': userId
    });

    if (!conversation) {
      return res.status(403).json({ message: 'Not authorized to access these messages' });
    }

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .select('sender receiver message createdAt');

    res.json({ messages });
  } catch (error) {
    console.error('Error in getMessages:', error);
    res.status(500).json({ message: 'Error fetching messages', error: error.message });
  }
};

export const createConversation = async (req, res) => {
  try {
    const { participantId, participantType } = req.body;
    const userId = req.auth.id;
    const userType = req.auth.type;

    // Check if conversation already exists
    const existingConversation = await Conversation.findOne({
      participants: {
        $all: [
          { 
            $elemMatch: { 
              participantId: new mongoose.Types.ObjectId(userId),
              participantType: userType
            }
          },
          { 
            $elemMatch: { 
              participantId: new mongoose.Types.ObjectId(participantId),
              participantType
            }
          }
        ]
      }
    });

    if (existingConversation) {
      return res.json(existingConversation);
    }

    // Create new conversation
    const newConversation = new Conversation({
      participants: [
        { participantId: userId, participantType: userType },
        { participantId, participantType }
      ]
    });

    const savedConversation = await newConversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    console.error('Error in createConversation:', error);
    res.status(500).json({ message: 'Error creating conversation', error: error.message });
  }
};