import React, { useEffect, useState } from "react";
import { getSubmissions } from "../api/submissions";

const AllSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.role !== "teacher") return;
        const data = await getSubmissions();
        setSubmissions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load submissions");
      }
    };
    if (user) fetchData();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  if (user.role !== "teacher") {
    return (
      <div className="p-4 max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 mt-10 rounded-lg shadow-md text-center">
        🚫 Access Denied: Only teachers can view all submissions.
      </div>
    );
  }

  if (error)
    return (
      <p className="p-4 text-red-600 max-w-md mx-auto font-medium text-center">{error}</p>
    );

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        All Submissions
      </h2>

      {submissions.length === 0 ? (
        <p className="text-center text-gray-600">No submissions found.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {submissions.map((s) => (
            <div
              key={s._id}
              className="bg-white shadow-md rounded-lg p-4 w-64 h-36 flex flex-col justify-center items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              <p className="font-semibold text-gray-800 mb-1">
                Student: <span className="font-normal">{s.student?.name}</span>
              </p>
              <p className="text-gray-600 mb-1">{s.student?.email}</p>
              <p className="font-semibold text-gray-800 mb-2">
                Homework: <span className="font-normal">{s.homework?.title}</span>
              </p>
              <a
                href={s.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                View File
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllSubmissions;
