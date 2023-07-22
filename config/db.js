if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");

const { DB_URI, PORT } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process with a failure status
  }
};

const getAppPort = () => {
  return PORT || 3000;
};

module.exports = { connectDB, getAppPort };
