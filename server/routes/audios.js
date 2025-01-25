import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import Audio from '../models/audio.js';
import upload from '../middleware/multer.js';

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
      filePath: req.file.audio[0],
      fileName: req.file.filename,
      cloudinaryUrl: result.secure_url,
    });

    await newAudio.save();
    res.status(200).json({ message: 'Audio uploaded successfully', audio: newAudio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading audio' });
  }
});

// Route to get all audio files
router.get('/', async (req, res) => {
  try {
    const audios = await Audio.find().sort({ uploadDate: -1 }); // Sort by upload date, newest first
    res.status(200).json(audios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching audio files' });
  }
});

// Route to get a single audio file by ID
router.get('/:id', async (req, res) => {
  try {
    const audio = await Audio.findById(req.params.id);
    if (!audio) {
      return res.status(404).json({ message: 'Audio not found' });
    }
    res.status(200).json(audio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching audio file' });
  }
});

// Route to delete an audio file
router.delete('/:id', async (req, res) => {
  try {
    const audio = await Audio.findById(req.params.id);
    if (!audio) {
      return res.status(404).json({ message: 'Audio not found' });
    }

    // Delete from Cloudinary
    const publicId = audio.cloudinaryUrl.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });

    // Delete from database
    await Audio.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Audio deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting audio file' });
  }
});

// Route to update audio details
router.put('/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedAudio = await Audio.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    
    if (!updatedAudio) {
      return res.status(404).json({ message: 'Audio not found' });
    }
    
    res.status(200).json(updatedAudio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating audio details' });
  }
});

export default router;