import Image from "../models/Image.js";
import cloudinary from "../config/cloudinary.js";
import { getRecommendations } from "../utils/gemini.js";

const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "image-app" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Please attach an image" });

    const result = await uploadToCloudinary(req.file.buffer);

    let recommendations = [];
    try {
      recommendations = await getRecommendations(req.file.buffer, req.file.mimetype);
    } catch (err) {
      console.error("Gemini failed:", err.message);
    }

    const image = await Image.create({
      owner: req.user._id,
      title: req.body.title || "",
      imageUrl: result.secure_url,
      publicId: result.public_id,
      recommendations,
    });

    res.status(201).json(image);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await Image.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch images" });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findOne({ _id: req.params.id, owner: req.user._id });
    if (!image) return res.status(404).json({ message: "Image not found" });

    await cloudinary.uploader.destroy(image.publicId);
    await image.deleteOne();
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};