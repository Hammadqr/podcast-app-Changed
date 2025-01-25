import express from 'express';
import { addsong, listPodcasts, removePodcast } from '../controllers/podcast-controller.js';

// import addsong from '../controllers/podcast-controller.js';
// import listPodcasts from '../controllers/podcast-controller.js';
// import removePodcast from '../controllers/podcast-controller.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/api/podcasts/add', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }]), addsong);
router.get('/api/podcasts/list', listPodcasts);
router.post('/api/podcasts/remove', removePodcast);
export default router;    