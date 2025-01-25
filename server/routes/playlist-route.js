import express from 'express';
import { addPlaylist, removePlaylist, listPlaylist } from '../controllers/playlist-controller.js';
import upload from '../middleware/multer.js'; // Ensure you import the upload middleware

const playlistRouter = express.Router();

playlistRouter.post('/api/playlists/add', upload.single('image'), addPlaylist);
playlistRouter.get('/api/playlists/list', listPlaylist);
playlistRouter.post('/api/playlists/remove', removePlaylist); // Changed to DELETE and added :id parameter

export default playlistRouter;