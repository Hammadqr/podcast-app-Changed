import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: 'Ydo6z9erre',  // Replace with your cloud name
    api_key: '682973967446858', // Replace with your API key
    api_secret: '2bDWhpZ0G2K61CtKOyUIp5imnB8', // Replace with your API secret
  });
};

export default connectCloudinary;