const mongoose = require("mongoose");

// This function connects to the MongoDB database using the provided URI
const connectDB = async () => {
  try {
    // Use Mongoose to establish a connection to the MongoDB database
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // If the connection is successful, log the host of the connected MongoDB instance
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // If there's an error during the connection attempt, log the error and exit the process
    console.error(err);
    process.exit(1);
  }
};

// Export the connectDB function to make it available for other parts of the application
module.exports = connectDB;
