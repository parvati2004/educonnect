import React, { useEffect, useState } from "react";
import axios from "axios";

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("You are not logged in.");
          return;
        }

        const res = await axios.get("https://educonnect-backend-ao93.onrender.com/api/submissions/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Reverse the data so newest comes first
        setSubmissions(res.data.reverse());
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load your submissions");
      }
    };

    fetchData();
  }, []);

  if (error)
    return (
      <p className="text-red-500 mt-6 text-center font-medium">{error}</p>
    );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 mb-8">
        📂 My Submissions
      </h2>

      {/* Empty state */}
      {submissions.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No submissions yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {submissions.map((s) => (
            <div
              key={s._id}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-200 shadow-lg rounded-xl w-72 h-44 flex flex-col justify-center items-center text-center p-5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Homework Row */}
              <p className="text-gray-900 font-semibold text-base mb-3">
                Homework:{" "}
                <span className="font-normal text-gray-700">
                  {s.homework?.title}
                </span>
              </p>

              {/* Button */}
              <a
                href={s.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition-all duration-300"
              >
                📄 View My File
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySubmissions;
