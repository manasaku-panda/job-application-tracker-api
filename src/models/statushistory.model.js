const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const StatusHistory = sequelize.define('statushistory', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    oldStatus: {
      type: DataTypes.ENUM('applied', 'interview', 'rejected', 'selected'),
      allowNull: false
    },

    newStatus: {
      type: DataTypes.ENUM('applied', 'interview', 'rejected', 'selected'),
      allowNull: false
    },

    changedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    jobId: { type: DataTypes.INTEGER, allowNull: false },
  });

  return StatusHistory;
};