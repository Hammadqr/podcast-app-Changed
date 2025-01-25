import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    
    name: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    
    
});

const playlistModel = mongoose.model("playlist", playlistSchema);
export default playlistModel;