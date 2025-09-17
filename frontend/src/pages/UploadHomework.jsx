import React, { useState } from "react";
import { submitHomework } from "../api/submissions";

const HomeworkUpload = ({ homeworkId }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    if (!homeworkId) {
      setMessage("Homework ID is missing.");
      console.error("❌ HomeworkUpload received NO homeworkId");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to submit homework.");
      return;
    }

    try {
      const res = await submitHomework(homeworkId, file, token);
      setMessage(res.message || "Homework submitted successfully!");
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit homework");
      console.error("Error submitting homework:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📤 Upload Homework</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full text-gray-700 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Submit Homework
          </button>
        </form>
        {message && <p className="text-sm text-gray-700 mt-3 text-center">{message}</p>}
      </div>
    </div>
  );
};

export default HomeworkUpload;
