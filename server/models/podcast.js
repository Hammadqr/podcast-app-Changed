// filepath: /e:/University/podcast-app-branch_1/server/models/podcast.js
import mongoose from 'mongoose';

const podcastSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  album: { type: String, required: true },
  audioUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const podcastModel = mongoose.model('Podcast', podcastSchema);

export default podcastModel;