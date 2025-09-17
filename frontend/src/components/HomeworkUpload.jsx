import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeworkUpload = () => {
  const [homework, setHomework] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Fetch latest homework on mount
  useEffect(() => {
    const fetchLatestHomework = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/homework/latest", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHomework(res.data);
      } catch (err) {
        console.error("Error fetching latest homework:", err.response?.data || err.message);
        setMessage("Failed to fetch latest homework.");
      }
    };

    fetchLatestHomework();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    if (!homework) {
      setMessage("No homework available to submit.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `http://localhost:5000/api/submissions/${homework._id}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Homework submitted successfully!");
      setFile(null);
    } catch (err) {
      console.error("Error submitting homework:", err.response?.data || err.message);
      setMessage("❌ Submission failed.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📤 Upload Homework</h2>

        {homework ? (
          <div className="mb-4">
            <p className="mb-2">
              Latest Homework: <strong>{homework.title}</strong>
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Submit Homework
              </button>
            </form>
          </div>
        ) : (
          <p className="text-center text-gray-600">Loading latest homework...</p>
        )}

        {message && (
          <p className="text-sm text-gray-700 mt-3 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default HomeworkUpload;
