import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes: only allow authenticated users
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user to request object (without password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Allow only teachers
const isTeacher = (req, res, next) => {
  if (req.user && req.user.role === "teacher") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Teacher only." });
  }
};

// Allow only students
const isStudent = (req, res, next) => {
  console.log("User role:", req.user?.role); // <-- add this
  if (req.user && req.user.role === "student") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Student only." });
  }
};


export { protect, isTeacher, isStudent };
