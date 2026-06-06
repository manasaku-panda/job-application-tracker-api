const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Note = sequelize.define('notes', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    content: { type: DataTypes.TEXT, allowNull: false },

    type: {
      type: DataTypes.ENUM('general', 'interview', 'hr'),
      defaultValue: 'general',
    },

    jobId: { type: DataTypes.INTEGER, allowNull: false },
  });

  return Note;
};