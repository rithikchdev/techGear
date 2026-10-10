import express from "express";
import { protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { uploadImage, getImages, deleteImage } from "../controllers/imageController.js";

const router = express.Router();

router.use(protect);

router.post("/", upload.single("image"), uploadImage);
router.get("/", getImages);
router.delete("/:id", deleteImage);

export default router;