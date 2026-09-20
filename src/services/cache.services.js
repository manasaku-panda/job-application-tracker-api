const redisClient = require('../config/redisclient');

let redisAvailable = false;

redisClient.on('connect', ()=>{
    redisAvailable = true;
});

redisClient.on('end', ()=>{
    redisAvailable = false;
});

redisClient.on('error', ()=>{
    redisAvailable = false
});

const getCache = async (key) =>{
    if(!redisAvailable){
        console.error(`Redis is not available for key ${key}`);
        return null;
    }
    try {
        return await redisClient.get(key);
    } catch (error) {
        console.error(`Redis GET failed for key ${key}:`, error.message);
        return null;
    }
};

const setCache = async (key, value, ttl = 300) =>{
    if(!redisAvailable){
        console.error(`Redis is not available for key ${key}`);
        return null;
    }
    try {
        await redisClient.set(key, value, {
            EX: ttl
        });
    } catch (error) {
        console.error(`Redis SET failed for key ${key}:`, error.message);
    }
};

const deleteCache = async (key) =>{
    if (!redisAvailable) {
        console.error(`Redis is not available for key ${key}`);
        return;
    }
    try {
        await redisClient.del(key);
    } catch (error) {
        console.error(`Redis DELETE failed for key ${key}:`, error.message);
    }
};

const deleteCacheByPattern = async(pattern) =>{
    if(!redisAvailable){
        console.log('Redis unavailable');
        return;
    }

    try {
        let cursor = '0';

        do {
            const result = await redisClient.scan(cursor, {
                MATCH: pattern,
                COUNT: 100
            });

            cursor = result.cursor;

            if(result.keys.length > 0){
                await redisClient.del(result.keys);

                console.log(
                    `Deleted ${result.keys.length} keys for pattern: ${pattern}`
                );
            }
        } while (cursor !== '0');
        
    } catch (error) {
        console.error(
            `Redis pattern delete failed for ${pattern}:`,
            error.message
        );
    }
}


module.exports = {
    getCache,
    setCache,
    deleteCache,
    deleteCacheByPattern
};