import React, { useEffect, useState } from "react";
import axios from "axios";

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); // Make sure token exists
        if (!token) {
          setError("You are not logged in.");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/submissions/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSubmissions(res.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load your submissions");
      }
    };

    fetchData();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-3">My Submissions</h2>
      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <ul className="space-y-2">
          {submissions.map((s) => (
            <li key={s._id} className="border p-2 rounded">
              <p><b>Homework:</b> {s.homework?.title}</p>
              <a
                href={s.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View My File
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MySubmissions;
