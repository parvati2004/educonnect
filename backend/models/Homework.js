import mongoose from "mongoose";

const homeworkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String }, // Homework document (optional)
    deadline: { type: Date, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Homework", homeworkSchema);
