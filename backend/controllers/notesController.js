import Note from "../models/Note.js";

// Upload note (teacher only)
export const uploadNote = async (req, res) => {
  try {
    const { title, subject } = req.body;
    const fileUrl = req.file?.path; // Cloudinary gives secure URL in `path`

    if (!fileUrl) return res.status(400).json({ message: "File required" });

    const note = new Note({
      title,
      subject,
      fileUrl,
      uploadedBy: req.user.id,
    });

    await note.save();
    res.status(201).json({ message: "Note uploaded successfully", note });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload note", error });
  }
};

// Get all notes
export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("uploadedBy", "username role");
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes", error });
  }
};
