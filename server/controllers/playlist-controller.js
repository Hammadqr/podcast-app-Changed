import { v2 as cloudinary } from 'cloudinary';
import playlistModel from '../models/playlist.js';

// Add a new playlist
export const addPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body; // Extract data from the request body
    const imageFile = req.file.path; // Assuming a single file upload for the playlist cover image

    // Upload the image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile, { resource_type: 'image' });

    // Create a new playlist
    const newPlaylist = new playlistModel({
      name,
      description,
      imageUrl: imageUpload.secure_url,
    });

    await newPlaylist.save();

    res.status(200).json({ message: 'Playlist created successfully', playlist: newPlaylist });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ message: 'Error creating playlist', error: error.message });
  }
};

// List all playlists for a user
export const listPlaylist = async (req, res) => {
    try {
      const allPlaylists = await playlistModel.find({});
      res.status(200).json({ success: true, playlists: allPlaylists });
    } catch (error) {
      console.error('Error listing playlists:', error);
      res.status(500).json({ success: false, message: 'Error listing playlists', error: error.message });
    }
  };

// Remove a playlist
  export const removePlaylist = async (req, res) => {
    try {
      const playlistId = req.body.id; // Change from req.params.id to req.body.id
      const deletedPlaylist = await playlistModel.findByIdAndDelete(playlistId);
  
      if (!deletedPlaylist) {
        return res.status(404).json({ success: false, message: 'Playlist not found' });
      }
  
      res.status(200).json({ success: true, message: 'Playlist removed successfully' });
    } catch (error) {
      console.error('Error removing playlist:', error);
      res.status(500).json({ success: false, message: 'Error removing playlist', error: error.message });
    }
  };
