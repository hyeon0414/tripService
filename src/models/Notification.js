const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Notification = sequelize.define('Notification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('trip_update', 'chat', 'system', 'reminder'),
    defaultValue: 'system'
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  data: {
    type: DataTypes.JSONB,
    allowNull: true
  }
}, {
  tableName: 'notifications'
});

// Define associations
Notification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications' });

module.exports = Notification; 