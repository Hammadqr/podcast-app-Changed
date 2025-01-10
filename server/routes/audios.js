// filepath: /c:/Users/Hammad/Documents/podcast-app/server/routes/audios.js
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import Audio from '../models/audio.js';  // Import the Audio model
import upload from '../middleware/multer.js';  // Import the custom multer configuration

const router = express.Router();

// Route to upload audio files
router.post('/upload', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video',  // Specify the resource type as 'video' for audio files
    });

    // Save file information to the database
    const newAudio = new Audio({
      title: req.body.title,
      description: req.body.description,
      filePath: req.file.path,
      fileName: req.file.filename,
      cloudinaryUrl: result.secure_url,  // Save the Cloudinary URL to the database
    });

    await newAudio.save();
    res.status(200).json({ message: 'Audio uploaded successfully', audio: newAudio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading audio' });
  }
});

export default router;