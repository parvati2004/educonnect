// src/components/MySubmissions.jsx
import React, { useEffect, useState } from "react";
import { getMySubmissions } from "../api/submissions";

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await getMySubmissions();
        setSubmissions(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch submissions");
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">My Submissions</h2>
      {error && <p className="text-red-500">{error}</p>}
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <ul className="space-y-3">
          {submissions.map((sub) => (
            <li
              key={sub._id}
              className="p-3 border rounded shadow-sm bg-gray-50"
            >
              <p><strong>Homework:</strong> {sub.homework?.title}</p>
              <p><strong>File:</strong> <a href={sub.fileUrl} target="_blank" rel="noreferrer">{sub.fileName}</a></p>
              <p><strong>Submitted At:</strong> {new Date(sub.submittedAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MySubmissions;
