const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Chat = sequelize.define('Chat', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  message_type: {
    type: DataTypes.ENUM('text', 'image', 'file', 'location'),
    defaultValue: 'text'
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  room_id: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'chats'
});

// Define associations
Chat.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
User.hasMany(Chat, { foreignKey: 'sender_id', as: 'sent_messages' });

module.exports = Chat; 