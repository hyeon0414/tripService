const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getNotifications,
  markAsRead,
  deleteNotification
} = require('../controllers/notificationController');

const router = express.Router();

// All routes are protected
router.use(protect);

router.get('/', getNotifications);
router.put('/read/:id', markAsRead);
router.delete('/:id', deleteNotification);

module.exports = router; 