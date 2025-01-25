import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/mongodb.js';  // Import the MongoDB connection
import User from './models/users.js';  // Import the User model
import registrationRoute from './routes/registration.js';  // Import the registration route
import loginRoutes from './routes/login.js'; // Import login routes
import audioRoutes from './routes/audios.js';
import connectCloudinary from './config/cloudinary.js';  // Import the Cloudinary connection
import podcastRoutes from './routes/podcast-route.js';
import playlistRouter from './routes/playlist-route.js';

const app = express();
app.use(express.json());  // To parse JSON requests
app.use(cors());  // Enable CORS for cross-origin requests

// Connect to MongoDB
connectDB();
connectCloudinary();

// Route to check if users exist in the database
app.get('/check-db', async (req, res) => {
  try {
    const users = await User.find();  // Query the User collection
    if (users.length > 0) {
      res.json({ message: 'Users found:', users });
    } else {
      res.json({ message: 'No users found in the database.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error accessing the database', error });
  }
});


app.use('/api/auth/register', registrationRoute);  // This will map to the registration route
app.use("/api/auth", loginRoutes); // Login route

// app.use('/api/audios', audiosRoute);  // Ensure this line is correctly added
app.use('/', podcastRoutes);  // Add this line to use podcast routes
app.use('/api/audios', audioRoutes);
app.use('/', playlistRouter)
// Define routes
app.get('/', (req, res) => {
  res.send('Portfolio Backend is Running');
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, 'username password'); // Fetch only username and password fields
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users', details: err.message });
  }
});


// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
