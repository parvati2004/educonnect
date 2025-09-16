import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

import { uploadNote, getNotes } from "../controllers/notesController.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";

const router = express.Router();

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "notes", // folder name in Cloudinary
    resource_type: "auto", // handles pdf, docs, images, etc.
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage });

// Teacher uploads note
router.post("/upload", protect, isTeacher, upload.single("file"), uploadNote);

// Students & teachers can view notes
router.get("/", protect, getNotes);

export default router;
