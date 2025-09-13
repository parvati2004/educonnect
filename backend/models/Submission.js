import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  homework: { type: mongoose.Schema.Types.ObjectId, ref: "Homework", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileUrl: { type: String, required: true },       // Cloudinary secure URL
  fileName: { type: String, required: true },      // original filename (e.g., Math_Assignment.pdf)
  filePublicId: { type: String },                  // Cloudinary public_id (for deletions)
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
