const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',

        dialectOptions:
            process.env.NODE_ENV === 'production'
            ? {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
            : {},

        logging: process.env.NODE_ENV !== 'production'? console.log : false
    }
);

module.exports = sequelize;