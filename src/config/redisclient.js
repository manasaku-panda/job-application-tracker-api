const { createClient } = require("redis");

const redisClient = createClient({
    url: process.env.REDIS_URL,

    socket:{
        reconnectStrategy: (retries) =>{
            const delay = Math.min(100 * Math.pow(2, retries), 5000);

            console.log(`Redis reconnecting in ${delay}ms...`);

            return delay;
        }
    }
});

redisClient.on('connect', ()=>{
    console.log('Redis connecting...');
})

redisClient.on('ready', ()=>{
    console.log('Redis ready');
});

redisClient.on('reconnecting', () => {
    console.log('Redis reconnecting...');
});

redisClient.on('error', (error)=>{
    console.error(`Redis error:${error.message}`);
});

module.exports = redisClient;