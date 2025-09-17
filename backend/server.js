import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";
import homeworkRoutes from "./routes/homeworkRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";

// Load env variables
dotenv.config();

// Cloudinary config
import cloudinary from "./config/cloudinary.js"; // make sure cloudinary.js uses dotenv properly

// __dirname fix for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS setup
const corsOptions = {
  origin: "https://educonnect-frontend-15kg.onrender.com",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  credentials: true,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/homework", homeworkRoutes);
app.use("/api/submissions", submissionRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || "Server Error" });
});

// Connect DB + start server
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });
