import Homework from "../models/Homework.js";
import cloudinary from "../config/cloudinary.js"; // make sure you have configured this

// ✅ Teacher creates homework
export const createHomework = async (req, res) => {
  try {
    const { title, description, deadline } = req.body;
    console.log("📩 Incoming Homework Data:", { title, description, deadline, file: req.file });

    let fileUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "homework_files",
        resource_type: "auto",
      });
      fileUrl = result.secure_url;
    }

    const homework = new Homework({
      title,
      description,
      deadline,
      fileUrl,
      uploadedBy: req.user?._id,
    });

    await homework.save();
    res.status(201).json({ message: "Homework created", homework });
  } catch (error) {
    console.error("❌ Error in createHomework:", error);
    res.status(500).json({ message: "Failed to create homework", error: error.message });
  }
};

// ✅ Get all homework
export const getHomework = async (req, res) => {
  try {
    const homework = await Homework.find()
      .populate("uploadedBy", "username role")
      .sort({ createdAt: -1 });

    res.json(homework);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch homework", error: error.message });
  }
};

// ✅ Get latest homework (important for student submissions)
export const getLatestHomework = async (req, res) => {
  try {
    const latest = await Homework.findOne()
      .populate("uploadedBy", "username role")
      .sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({ message: "No homework found" });
    }

    res.json(latest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch latest homework", error: error.message });
  }
};
