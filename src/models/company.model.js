const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Company = sequelize.define("Companys", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        website: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
        {
            indexes: [
                {
                    unique: true,
                    fields: ['name', 'createdBy'],
                },
            ],
        });

    return Company;
}
