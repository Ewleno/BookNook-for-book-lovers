const mongoose = require('mongoose');

const connectDB = async () => {
  try {
  
    const dbURI = process.env.MONGODB_URI || process.env.MONGO_URI;

    if (!dbURI) {
      console.error('ERROR: No MongoDB connection string found in ENV variables.');
      process.exit(1);
    }

    // 2. Connect without the deprecated options
    const conn = await mongoose.connect(dbURI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error details:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;