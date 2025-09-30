import React, { useEffect, useState } from "react";

const HomeworkList = () => {
  const [homeworks, setHomeworks] = useState([]); // array of homework
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        if (!token) {
          setError("You must be logged in to view homework.");
          return;
        }

        const res = await fetch("http://localhost:5000/api/homework", {
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch homework.");
          return;
        }

        setHomeworks(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        console.error("Error fetching homework:", err);
        setError("Something went wrong while fetching homework.");
      }
    };

    fetchHomework();
  }, [token]);

  if (error)
    return (
      <p className="text-red-500 mt-6 text-center font-medium">{error}</p>
    );
  if (homeworks.length === 0)
    return (
      <p className="text-center mt-6 text-gray-600 font-medium">
        No homework available
      </p>
    );

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
        📚 Homework List
      </h2>

      <div className="mt-4 grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {homeworks.map((hw) => (
          <div
            key={hw._id}
            className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col items-center text-center w-full max-w-sm mx-auto"
          >
            <p className="text-gray-800 text-lg font-semibold mb-2">
              Title:{" "}
              <span className="font-normal text-gray-700">{hw.title}</span>
            </p>
            <p className="text-gray-800 text-lg font-semibold mb-2">
              Description:{" "}
              <span className="font-normal text-gray-700">
                {hw.description}
              </span>
            </p>
            <p className="text-gray-800 text-base mb-1">
              <strong className="text-gray-800">Deadline:</strong>{" "}
              <span className="font-normal text-gray-700">
                {new Date(hw.deadline).toLocaleDateString()}
              </span>
            </p>
            <p className="text-gray-800 text-base mb-2">
              <strong className="text-gray-800">Teacher:</strong>{" "}
              <span className="font-normal text-gray-700">
                {hw.uploadedBy?.username || "N/A"}
              </span>
            </p>
            {hw.fileUrl && (
              <a
                href={hw.fileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-blue-600 underline text-base mb-2"
              >
                View File
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeworkList;
