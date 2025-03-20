const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI || 'mongodb://localhost:127.0.0.1:3025/schoolsDB';

const connectDB = async () => {
  try {
    
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } else {
      console.log('MongoDB connection already established');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    mongoose.disconnect();
    process.exit(1); 
  }
};

connectDB();

process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection');
  await mongoose.disconnect();
  process.exit(0); 
});

module.exports = connectDB;
