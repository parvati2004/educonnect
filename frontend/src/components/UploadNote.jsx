import React, { useState } from "react";
import { uploadNote } from "../api/notes";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UploadNote = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // ✅ Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("Please select a file");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token"); // JWT
      const res = await uploadNote(formData, token);

      setMessage(res.data.message);
      toast.success("✅ Notes uploaded successfully!", { autoClose: 1000 }); // <-- Toast added

      setTitle("");
      setSubject("");
      setFile(null);
    } catch (error) {
      setMessage("Failed to upload note",error);
      toast.error("❌ Failed to upload note", { autoClose: 1 }); // optional
    }
  };

  // 🚫 Access check
  if (!user || user.role !== "teacher") {
    return (
      <div className="p-4 max-w-lg mx-auto bg-red-100 border border-red-400 text-red-700 mt-10 rounded">
        🚫 Access Denied: Only teachers can access this page.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Upload Note</h2>
      {message && <p className="text-blue-600 mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default UploadNote;
