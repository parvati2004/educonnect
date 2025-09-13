import express from "express";
import multer from "multer";
import { uploadNote, getNotes } from "../controllers/notesController.js";
import { protect, isTeacher } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup for file uploads
const upload = multer({ dest: "uploads/" });

// Teacher uploads note
router.post("/upload", protect, isTeacher, upload.single("file"), uploadNote);

// Students & teachers can view notes
router.get("/", protect, getNotes);

export default router;
