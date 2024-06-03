import { Request, Response } from 'express';
import cloudinary from 'cloudinary';
import Singer, { ISinger } from '../models/singer';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const getAllSingers = async (req: Request, res: Response) => {
  try {
    const singers = await Singer.find();
    if (!singers || singers.length === 0) {
      return res.status(404).json({ message: 'Singers not found' });
    }
    return res.status(200).json(singers);
  } catch (error : any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getOneSinger = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const singer = await Singer.findOne({ name });
    if (!singer) {
      return res.status(404).json({ message: 'Singer not found' });
    }
    return res.status(200).json(singer);
  } catch (error : any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
export const createSinger = async (req: Request, res: Response) => {
  const { name, genre } = req.body;
  const file = req.file;

  try {
    if (!file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.path);
    const imageUrl = result.secure_url;

    // Create singer with image URL
    const newSinger: ISinger = new Singer({ name, genre, imageUrl });
    await newSinger.save();

    res.status(201).json(newSinger);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

