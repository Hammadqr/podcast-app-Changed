// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is mandatory
  },
  username: {
    type: String,
    required: true,
    unique: true, // Ensure usernames are unique
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure emails are unique
  },
  password: {
    type: String,
    required: true, // Store the hashed password
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically add creation date
  },
});

const User = mongoose.model('User', userSchema);
export default User;
