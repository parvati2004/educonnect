import express from "express";
import { submitHomework, getSubmissions, getMySubmission } from "../controllers/submissionController.js";
import { protect, isTeacher, isStudent } from "../middleware/authMiddleware.js";
import upload from "../config/multerCloudinary.js";

const router = express.Router();

router.post("/:homeworkId/submit", protect, isStudent, upload.single("file"), submitHomework);
router.get("/", protect, isTeacher, getSubmissions);
router.get("/mine", protect, isStudent, getMySubmission);


export default router;
