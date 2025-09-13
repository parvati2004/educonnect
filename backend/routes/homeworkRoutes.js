import express from "express";
import multer from "multer";
import { createHomework, getHomework, getLatestHomework } from "../controllers/homeworkController.js";
import { protect, isTeacher, isStudent } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "tmp/" });

// Teacher creates homework
router.post("/create", protect, isTeacher, upload.single("file"), createHomework);

// Students fetch all homework
router.get("/", protect, getHomework);

// 🆕 Students fetch latest homework
router.get("/latest", protect, isStudent, getLatestHomework);

export default router;
