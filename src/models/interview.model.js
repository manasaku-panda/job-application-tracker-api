const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Interview = sequelize.define('interviews', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

        date: { type: DataTypes.DATE, allowNull: false },

        type: {
            type: DataTypes.ENUM('hr', 'technical', 'managerial'),
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM('scheduled', 'cleared', 'failed'),
            defaultValue: 'scheduled',
        },

        roundNumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },

        feedback: {
            type: DataTypes.TEXT,
            defaultValue: ''
        },

        jobId: { type: DataTypes.INTEGER, allowNull: false },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['jobId', 'roundNumber'] 
            }
        ]
    });

    return Interview;
};