import Submission from "../models/Submission.js";
import Homework from "../models/Homework.js";
import cloudinary from "../config/cloudinary.js";

// student submits homework
export const submitHomework = async (req, res) => {
  try {
    const { homeworkId } = req.params;
    if (!homeworkId) return res.status(400).json({ message: "Homework ID required." });

    const homework = await Homework.findById(homeworkId);
    if (!homework) return res.status(404).json({ message: "Homework not found." });

    if (!req.user || !req.user._id) return res.status(401).json({ message: "Invalid token." });

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // multer-storage-cloudinary provides: req.file.path (url), req.file.originalname, req.file.filename (public_id)
    const fileUrl = req.file.path;                    // Cloudinary secure URL
    const fileName = req.file.originalname;           // original file name
    const filePublicId = req.file.filename || req.file.public_id || null;

    // OPTIONAL: if a student already submitted, you may want to replace it.
    const existing = await Submission.findOne({ homework: homeworkId, student: req.user._id });
    if (existing && existing.filePublicId) {
      try {
        // delete previous file from Cloudinary
        await cloudinary.uploader.destroy(existing.filePublicId, { resource_type: "auto" });
      } catch (err) {
        console.warn("Failed to delete old file from Cloudinary:", err.message);
      }

      // update existing record
      existing.fileUrl = fileUrl;
      existing.fileName = fileName;
      existing.filePublicId = filePublicId;
      existing.submittedAt = Date.now();
      await existing.save();

      return res.status(200).json({ message: "Submission updated", submission: existing });
    }

    // create new submission
    const submission = new Submission({
      homework: homeworkId,
      student: req.user._id,
      fileUrl,
      fileName,
      filePublicId,
    });

    await submission.save();
    return res.status(201).json({ message: "Homework submitted successfully", submission });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to submit homework" });
  }
};

// ✅ get all submissions (for teachers/admin)
export const getSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
      .populate("student", "name email")
      .populate("homework", "title description dueDate");

    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};

// ✅ get only logged-in student's submissions
export const getMySubmission = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const submissions = await Submission.find({ student: req.user._id })
      .populate("homework", "title description dueDate");

    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch your submissions" });
  }
};
