const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getChatHistory,
  sendMessage,
  markAsRead
} = require('../controllers/chatController');

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/history/:roomId', getChatHistory);
router.post('/send', sendMessage);
router.put('/read/:messageId', markAsRead);

module.exports = router; 