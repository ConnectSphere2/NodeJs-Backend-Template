import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
};
