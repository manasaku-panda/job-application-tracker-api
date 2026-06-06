const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Job = sequelize.define("jobs", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: DataTypes.STRING,
        salary: DataTypes.INTEGER,
        location: DataTypes.STRING,
        status: {
            type: DataTypes.ENUM('applied', 'interview', 'rejected', 'selected'),
            defaultValue: 'applied'
        },
        priority: {
            type: DataTypes.ENUM('low', 'medium', 'high'),
            defaultValue: 'medium',
        },

        source: DataTypes.STRING,
        resumeVersion: DataTypes.STRING,
        appliedDate: DataTypes.DATE,
        followUpDate: DataTypes.DATE,

        companyId: { type: DataTypes.INTEGER, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
    });

    return Job;
};