const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Interview = sequelize.define('interviews', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

        date: { type: DataTypes.DATE, allowNull: false },

        type: {
            type: DataTypes.ENUM('HR', 'Technical', 'managerial'),
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM('scheduled', 'cleared', 'failed'),
            defaultValue: 'scheduled',
        },

        roundNumber: DataTypes.INTEGER,
        feedback: DataTypes.TEXT,

        jobId: { type: DataTypes.INTEGER, allowNull: false },
    });

    return Interview;
};