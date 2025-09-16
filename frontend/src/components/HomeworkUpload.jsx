import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const HomeworkUpload = () => {
  const [homework, setHomework] = useState(null);
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch latest homework
  useEffect(() => {
    const fetchLatestHomework = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/homework/latest", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHomework(res.data);
      } catch (err) {
        console.error("Error fetching latest homework:", err.response?.data || err.message);
        toast.error("❌ Failed to fetch latest homework");
      }
    };

    fetchLatestHomework();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !homework) {
      toast.warning("⚠️ Please select a file and ensure homework exists");
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

      toast.success("✅ Homework submitted successfully!");
      setFile(null);
    } catch (err) {
      console.error("Error submitting homework:", err.response?.data || err.message);
      toast.error("❌ Submission failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          📤 Upload Homework
        </h2>

        {homework ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-700 text-center">
              Latest Homework:{" "}
              <span className="font-semibold text-gray-900">{homework.title}</span>
            </p>

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Submit Homework
            </button>
          </form>
        ) : (
          <p className="text-center text-gray-600">⏳ Loading latest homework...</p>
        )}
      </div>
    </div>
  );
};

export default HomeworkUpload;
