import { v2 as cloudinary } from 'cloudinary';
import playlistModel from '../models/playlist';
import upload from '../middleware/multer';

export const addPlaylist = async (req, res) => {
    try{

    }

    catch(error)
    {
        console.error('Error adding the playlist', error);

    }

};

export const listPlaylist = aync(req, res) => {
    try
    {

    }

    catch(error)
    {
        console.error('Error listing the playlist', error);
        res.status(500).json({success:false, message: 'Error listing the playlist'})
    }
};

export const removePlaylist = async(req, res) => 
{
    try
    {

    }
    
    catch(error)
    {
        console.error('Error removing the playlist', error);
        res.status(500).json({success:false, message: 'Error removing the playlist'})
    }
};