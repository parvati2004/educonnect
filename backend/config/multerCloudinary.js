// backend/config/multerCloudinary.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

// accepted mimetypes
const ALLOWED_MIMETYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
];

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIMETYPES.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type. Only PDF, DOCX, JPG, PNG allowed."), false);
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // folder: educonnect/homework_submissions/<homeworkId> (if homeworkId present)
    const homeworkId = req.params.homeworkId || "general";
    const userId = req.user?._id ?? "anon";

    // public_id: <userId>-<timestamp>-<originalFileNameWithoutExt>
    const originalBase = file.originalname.split(".").slice(0, -1).join(".");
    const publicId = `${userId}-${Date.now()}-${originalBase}`;

    return {
      folder: `educonnect/homework_submissions/${homeworkId}`,
      public_id: publicId,
      resource_type: "auto", // auto handles images/docs/videos
      // allowed_formats handled by fileFilter above
    };
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB file limit (adjust)
  fileFilter,
});

export default upload;
