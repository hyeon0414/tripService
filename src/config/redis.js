const redis = require('redis');

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD || undefined
});

redisClient.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

redisClient.on('connect', () => {
  console.log('🔴 Redis Connected successfully.');
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error('❌ Redis connection error:', error);
    process.exit(1);
  }
};

module.exports = { redisClient, connectRedis }; 