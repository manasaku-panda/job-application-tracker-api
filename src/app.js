const express = require('express');
const routes = require('./routes');
const errorhandler = require('./middleware/error.middleware');
const limiter = require('./middleware/ratelimit.middleware');
const { swaggerUi, swaggerSpec } = require('./swagger');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());

app.use(limiter);
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/',(req,res) =>{
    res.end("app working.....");
});

app.use('',routes);

app.use(errorhandler);
module.exports = app;