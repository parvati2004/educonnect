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
    <form onSubmit={handleSubmit} className="mt-2 space-y-2">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border p-1 rounded"
      />
      <button
        type="submit"
        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  );
};

export default HomeworkUpload;
