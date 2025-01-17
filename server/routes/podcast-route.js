import express from 'express';
import addsong from '../controllers/podcast-controller.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.post('/api/podcasts/add', upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }]), addsong);

export default router;  