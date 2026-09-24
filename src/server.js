require('dotenv').config();
const app = require('./app');
const redisClient = require('./config/redisclient');
// const cors = require('cors');

const { sequelize } = require('./models');

// app.use(cors());

// sequelize.authenticate().then(() => {
//     console.log('Database connected...');
//     return sequelize.sync();
// }).catch(err => {
//     console.log('Error: ' + err);
// });

// const PORT = process.env.PORT || 3005;

// const server = app.listen(PORT, () => {

//     const host = process.env.BASE_URL;

//     console.log(`Server is running at ${host}`);
// });

const PORT = process.env.PORT || 3005;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
        await sequelize.sync();

        const server = app.listen(PORT, () => {
            const host = process.env.BASE_URL;
            console.log(`Server is running at ${host}`);
        });

        
        try {
            await redisClient.connect();
            // console.log('Redis connected...');
        } catch (error) {
            console.error(
                'Redis connection failed:',
                error.message
            );

            console.log(
                'Starting server without Redis...'
            );
        }

    } catch (error) {
        console.error(
            'Server startup failed:',
            error
        );

        process.exit(1);
    }
};

startServer();
