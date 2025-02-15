// Load environment variables from .env file
require('dotenv').config();
const mongoose = require("mongoose"); // MongoDB object modeling tool

const isDBConnected = async (maxRetries = 5, retryDelay = 1500) => {
    let retryCount = 0;
  
    while (retryCount < maxRetries) {
      try {
        await mongoose.connect(process.env.MONGODB_URI);
        return true;
      } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        retryCount++;
        console.log(`Retrying connection (${retryCount}/${maxRetries}) in ${retryDelay} milliseconds...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
    console.error('Failed to connect to MongoDB after maximum retries.');
    return false;
  };

  module.exports = {
    isDBConnected
  }