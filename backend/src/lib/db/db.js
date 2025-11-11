import mongoose from 'mongoose';

export const connectDb = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected: ', conn.connection.host);
  } catch (err) {
    console.log('MongoDB connection failed: ', err);
  }
};
