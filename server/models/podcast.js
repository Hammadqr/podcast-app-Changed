import mongoose from 'mongoose';

const AudioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    filePath: { type: String, required: true },
    fileName: { type: String, required: true },
    uploadDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Audio = mongoose.model('Audio', AudioSchema);

export default Audio;
