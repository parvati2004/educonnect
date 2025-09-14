import React, { useEffect, useState } from "react";
import { getSubmissions } from "../api/submissions";

const AllSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSubmissions();
        setSubmissions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load submissions");
      }
    };
    fetchData();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-3">All Submissions</h2>
      <ul className="space-y-2">
        {submissions.map((s) => (
          <li key={s._id} className="border p-2 rounded">
            <p><b>Student:</b> {s.student?.name} ({s.student?.email})</p>
            <p><b>Homework:</b> {s.homework?.title}</p>
            <a
              href={s.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View File
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllSubmissions;
