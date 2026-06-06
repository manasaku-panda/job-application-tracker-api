const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {isEmail: true}
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            length: 255
        },
        role: {
            type: DataTypes.ENUM("admin","user"),
            allowNull: false,
            defaultValue: "user"
        }
    });

    return User;
}
