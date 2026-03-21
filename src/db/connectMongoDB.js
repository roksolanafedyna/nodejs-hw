import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    console.log('ПЕРЕВІРКА URL:', mongoUrl);

    await mongoose.connect(mongoUrl);

    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};
