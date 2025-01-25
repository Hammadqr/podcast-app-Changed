import { v2 as cloudinary } from 'cloudinary';
import podcastModel from '../models/podcast.js';

export const addsong = async (req, res) => {
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

export const listPodcasts = async(req, res) =>{
  try{
    const allPodcasts = await podcastModel.find({});
    res.json({success:true, podcasts: allPodcasts})
  }

  catch(error){
    console.error('Error Listing the podcast', error);
    res.status(500).json({success:false , message: 'Error listing the podcasts'})
  }
}

export const removePodcast = async (req, res) => {
  try {
    const podcastId = req.body.id;  // Changed from req.params.id to req.body.id
    
    const deletedPodcast = await podcastModel.findByIdAndDelete(podcastId);

    if (!deletedPodcast) {
      return res.status(404).json({ success: false, message: 'Podcast not found' });
    }

    else{
      console.log("Podcast is deleted successfully with ID:" , {podcastId})
    }

    res.status(200).json({ success: true, message: 'Podcast removed successfully' });
  } catch (error) {
    console.error('Error removing the podcast', error);
    res.status(500).json({ success: false, message: 'Error removing the podcast' });
  }
};


// export default {addsong, listPodcasts, removePodcast};
// export default listPodcasts;
// export default removePodcast;