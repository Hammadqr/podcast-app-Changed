import { v2 as cloudinary } from 'cloudinary';
import podcastModel from '../models/podcast.js';

const addsong = async (req, res) => {
  try {
    const title = req.body.title;
    const desc = req.body.description;
    const album = req.body.album;
    const audioFile = req.files.audio[0].path;
    const imageFile = req.files.image[0].path;

    const audioUpload = await cloudinary.uploader.upload(audioFile, { resource_type: 'video' });
    const imageUpload = await cloudinary.uploader.upload(imageFile, { resource_type: 'image' });

    console.log(title, desc, album, audioUpload, imageUpload);

    // Save the podcast details to the database
    const newPodcast = new podcastModel({
      title,
      description: desc,
      album,
      audioUrl: audioUpload.secure_url,
      imageUrl: imageUpload.secure_url,
    });

    await newPodcast.save();

    res.status(200).json({ message: 'Podcast uploaded successfully', podcast: newPodcast });
  } catch (error) {
    console.error('Error uploading audio:', error);
    res.status(500).json({ message: 'Error uploading audio' });
  }
};

export default addsong;