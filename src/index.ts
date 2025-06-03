import express, { Request, Response } from 'express';
import { connectDB } from './config/database';
import { redisClient } from './config/redis';
import log from './config/logger';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Server is working!');
});

// Wrap everything in an async function
const startServer = async () => {
  try {
    await connectDB();
    log.info('✅ Database Connected Successfully...', 'startServer');

    if (!redisClient.isOpen) {
      await redisClient.connect();
      log.info('✅ Redis connected', 'startServer');
    } else {
      log.info('ℹ️ Redis already connected', 'startServer');
    }

    app.listen(3000, () => {
      log.info('🚀 Server is running on port 3000', 'startServer');
    });
  } catch (error) {
    log.error('❌ Failed to start server', 'startServer', error);
    process.exit(1);
  }
};

// Call the function
startServer();

// Graceful shutdown
// process.on('SIGINT', async () => {
//   log.info('🛑 Shutting down gracefully...', 'SIGINT');
//   await redisClient.quit();
//   process.exit(0);
// });

process.on('SIGINT', async () => {
  try {
    log.info('Shutting down...');

    if (redisClient?.isOpen) {
      await redisClient.quit();
      log.info('🛑 Redis connection closed.');
    }

    await mongoose.disconnect(); // ✅ Correct way to close MongoDB connection
    log.info('🛑 Database connection closed.');

    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      log.error('Error during shutdown', error.message);
    } else {
      log.error('Error during shutdown', String(error));
    }
    process.exit(1);
  }
});
