// src/components/AllSubmissions.jsx
import React, { useEffect, useState } from "react";
import { getSubmissions } from "../api/submissions";

const AllSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await getSubmissions(); // getSubmissions already returns res.data
        setSubmissions(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch submissions");
        console.error("Error fetching submissions:", err.response?.data || err.message);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">All Submissions (Teacher View)</h2>
      {error && <p className="text-red-500">{error}</p>}
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <ul className="space-y-3">
          {submissions.map((sub) => (
            <li
              key={sub._id}
              className="p-3 border rounded shadow-sm bg-white"
            >
              <p>
                <strong>Student:</strong> {sub.student?.name} ({sub.student?.email})
              </p>
              <p>
                <strong>Homework:</strong> {sub.homework?.title}
              </p>
              <p>
                <strong>File:</strong>{" "}
                <a href={sub.fileUrl} target="_blank" rel="noreferrer">
                  {sub.fileName || "View File"}
                </a>
              </p>
              <p>
                <strong>Submitted At:</strong>{" "}
                {new Date(sub.submittedAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllSubmissions;
