import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Cover image for the playlist
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", // Reference to the User model
    required: true 
  },
  podcasts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcast", // Reference to the Podcast model
    }
  ],
  createdAt: { type: Date, default: Date.now }, // Track when the playlist was created
});

const playlistModel = mongoose.model("Playlist", playlistSchema);

export default playlistModel;
