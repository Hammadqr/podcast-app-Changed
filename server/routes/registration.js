import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/users.js'; // Import the User model

const router = express.Router();

// Route to register a new user and insert data into the database
router.post('/', async (req, res) => {
  const { name, username, email, password } = req.body;

  // Validate that all required fields are provided
  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields: name, username, email, and password.' });
  }

  try {
    // Check if a user already exists with the provided username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already in use' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message and the new user object
    res.status(201).json({ message: 'User registered successfully!', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', error });
  }
});

export default router;
