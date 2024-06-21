import mongoose from 'mongoose';
import env from '../utils/env.js';
const initMongoConnection = async () => {
  try {
    const DB_HOST = `mongodb+srv://${env('MONGODB_USER')}:${env(
      'MONGODB_PASSWORD',
    )}@${env('MONGODB_URL')}/${env(
      'MONGODB_DB',
    )}?retryWrites=true&w=majority&appName=Cluster0`;
    await mongoose.connect(DB_HOST);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.log(`Error connect to database ${error.message}`);
    throw error;
  }
};

export default initMongoConnection;
