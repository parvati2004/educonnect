import React, { useState, useEffect } from "react";
import { uploadNote } from "../api/notes";
import { toast } from "react-toastify";

const UploadNote = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("❌ Please select a file");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subject", subject);
    formData.append("file", file);

    try {
      const res = await uploadNote(formData, token);

      if (res.status === 200) {
        toast.success("✅ Note uploaded successfully!");
        setTitle("");
        setSubject("");
        setFile(null);
      } else {
        toast.error("❌ Failed to upload note");
      }
    } catch (error) {
      console.error(error);
      toast.error("❌ Error uploading note");
    }
  };

  // Restrict access if not teacher
  if (user && user.role !== "teacher") {
    return (
      <div className="p-4 max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 mt-10 rounded-lg shadow-md text-center">
        🚫 Access Denied: Only teachers can access this page.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📄 Upload Note</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <input
            type="file"
            className="w-full text-gray-700"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Upload Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadNote;
