import Submission from "../models/Submission.js";
import Homework from "../models/Homework.js";
import cloudinary from "../config/cloudinary.js";

// student submits homework
// student submits homework
export const submitHomework = async (req, res) => {
  try {
    const { homeworkId } = req.params;   // 🔹 Here you fetch the homeworkId from route params
    if (!homeworkId) {
      return res.status(400).json({ message: "Homework ID required." });
    }

    const homework = await Homework.findById(homeworkId); // 🔍 Check if exists
    if (!homework) {
      return res.status(404).json({ message: "Homework not found" });
    }

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "submissions",
      resource_type: "auto",
    });

    const submission = new Submission({
      homework: homeworkId,
      student: req.user._id,
      fileUrl: result.secure_url,
      fileName: req.file.originalname,
      filePublicId: result.public_id,
    });

    await submission.save();
    res.status(201).json({ message: "Submission successful", submission });
  } catch (error) {
    console.error("❌ Error in submitHomework:", error);
    res.status(500).json({ message: "Submission failed", error: error.message });
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
// submissionController.js
export const getMySubmission = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user._id })
      .populate("homework", "title description dueDate");
    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch your submissions" });
  }
};

