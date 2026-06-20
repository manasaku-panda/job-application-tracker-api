require('dotenv').config();
const app = require('./app');

const { sequelize } = require('./models');


sequelize.authenticate().then(() => {
    console.log('Database connected...');
    return sequelize.sync();
}).catch(err => {
    console.log('Error: ' + err);
});

const PORT = process.env.PORT || 3005;

const server = app.listen(PORT, () => {
    const address = server.address();

    const host = process.env.BASE_URL;

    console.log(`Server is running at ${host}:${address.port}`);
});
