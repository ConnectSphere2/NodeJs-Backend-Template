import { createClient } from 'redis';
import log from './logger';

// Define the Redis configuration
const redisConfig = {
    url: 'redis://127.0.0.1:6379', // Redis server URL
    password: '', // Password if your Redis server requires authentication
};

// Create a Redis client
export const redisClient = createClient(redisConfig);

redisClient.on('error', (err) => {
    log.error('Redis error:', 'redis-connection/redisConfig', err);
});

// redisClient.on('connect', () => {
//    log.info('Redis database is connected');
// });

// Example usage with async/await
export const runRedisOperations = async () => {
    try {
        await redisClient.connect();

        log.info('Performing Redis operations...');

        // Set a value in a specific database (index 0 by default)
        await redisClient.select(0);
        const setResponse = await redisClient.set('key', 'value');
        console.log('Set key response:', setResponse);

        // Get the value
        const value = await redisClient.get('key');
        console.log('Get key response:', value);

        // You can perform additional operations here
    } catch (err) {
        console.error('Redis operation error:', err);
        log.error('Redis operation error:', 'redis-connection/runRedisOperations', err);
    }
};

// Ensure client is closed properly when shutting down the application
process.on('SIGINT', async () => {
    // console.log('Shutting down...');
    log.info('Shutting down...');
    await redisClient.quit();
    process.exit(0);
});
