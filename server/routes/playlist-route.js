import express from 'express';
import { addPlaylist, removePlaylist, listPlaylist } from '../controllers/playlist-controller';

const playlistRouter = express.Router();

playlistRouter.post('/api/playlists/add', upload.single('image'), addPlaylist);
playlistRouter.get('/api/playlists/list', listPlaylist);
playlistRouter.post('/api/playlists/remove', removePlaylist);

export default playlistRouter;