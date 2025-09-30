import React, { useEffect, useState } from "react";

const LatestHomework = () => {
  const [homework, setHomework] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLatest = async () => {
      if (!token) {
        setError("You must be logged in to view homework.");
        return;
      }

      try {
        const res = await fetch("https://educonnect-backend-ao93.onrender.com/api/homework/latest", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch latest homework");
          return;
        }

        setHomework(data);
      } catch (err) {
        console.error("Error fetching latest homework:", err);
        setError("Something went wrong while fetching latest homework");
      }
    };

    fetchLatest();
  }, [token]);

  if (error)
    return (
      <div className="p-4 max-w-lg mx-auto mt-10">
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-lg shadow-md text-center">
          {error}
        </div>
      </div>
    );

  if (!homework)
    return (
      <p className="text-center text-gray-600 font-medium mt-10">
        ⏳ No homework available
      </p>
    );

  return (
    <div className="p-6 max-w-lg mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">📘 Latest Homework</h2>

        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold text-gray-800">Title:</span> {homework.title}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Description:</span> {homework.description}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Deadline:</span>{" "}
            {new Date(homework.deadline).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold text-gray-800">Teacher:</span>{" "}
            {homework.uploadedBy?.username || "Unknown"}
          </p>
        </div>

        {homework.fileUrl && (
          <div className="flex justify-center mt-6">
            <a
              href={homework.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-all shadow-sm"
            >
              📂 View File
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestHomework;
