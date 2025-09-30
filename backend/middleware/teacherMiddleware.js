const teacherMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "teacher") {
    return next();
  }
  return res.status(403).json({ message: "Access denied: Teachers only" });
};

export default teacherMiddleware;
