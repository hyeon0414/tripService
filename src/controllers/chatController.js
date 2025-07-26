const Chat = require('../models/Chat');
const User = require('../models/User');
const { redisClient } = require('../config/redis');

// @desc    Get chat history
// @route   GET /api/chat/history/:roomId
// @access  Private
const getChatHistory = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    const offset = (page - 1) * limit;

    const messages = await Chat.findAndCountAll({
      where: { room_id: roomId },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'name', 'profile_image']
        }
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      success: true,
      data: {
        messages: messages.rows.reverse(),
        total: messages.count,
        page: parseInt(page),
        totalPages: Math.ceil(messages.count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Send message
// @route   POST /api/chat/send
// @access  Private
const sendMessage = async (req, res) => {
  try {
    const { room_id, message, message_type = 'text' } = req.body;
    const sender_id = req.user.id;

    const newMessage = await Chat.create({
      room_id,
      message,
      message_type,
      sender_id
    });

    // Get message with sender info
    const messageWithSender = await Chat.findByPk(newMessage.id, {
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'name', 'profile_image']
        }
      ]
    });

    // Emit to socket room
    const io = req.app.get('io');
    io.to(room_id).emit('new_message', messageWithSender);

    // Store in Redis for real-time access
    await redisClient.lPush(`chat:${room_id}`, JSON.stringify(messageWithSender));
    await redisClient.lTrim(`chat:${room_id}`, 0, 99); // Keep last 100 messages

    res.status(201).json({
      success: true,
      data: messageWithSender
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Mark message as read
// @route   PUT /api/chat/read/:messageId
// @access  Private
const markAsRead = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user.id;

    const message = await Chat.findByPk(messageId);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    if (message.sender_id !== userId) {
      await message.update({ is_read: true });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getChatHistory,
  sendMessage,
  markAsRead
}; 