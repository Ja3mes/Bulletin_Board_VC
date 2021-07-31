JavaScript
//rateLimiter.js
const ms = require('ms');
const redis = require('redis');
const ExpressBrute = require('express-brute'),
    RedisStore = require('express-brute-redis');

const handleStoreError = function(error) {
    console.error(error);
    throw {
        message: error.message,
        parent: error.parent
    };
};

const redisClient = redis.createClient();

redisClient.on('connect', function() {
    console.log("Connected to redis")
});

redisClient.on('error', function() {
    console.log("Redis crashed.")

})

const store = new RedisStore({
    client: redisClient,
});

module.exports = new ExpressBrute(store, {
    freeRetries: 5,
    minWait: ms('10s'),
    maxWait: ms('1min'),
    handleStoreError
});