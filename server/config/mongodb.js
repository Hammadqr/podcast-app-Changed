import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Replace with your actual MongoDB Atlas connection string
    const dbUri = "mongodb+srv://dexter:dexter@podcast.0yvm1.mongodb.net/?retryWrites=true&w=majority&appName=podcast";
    
    await mongoose.connect(dbUri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;
