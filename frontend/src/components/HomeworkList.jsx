// src/components/HomeworkList.jsx
import React, { useEffect, useState } from "react";
import HomeworkUpload from "./HomeworkUpload"; // ✅ import upload component

const HomeworkList = () => {
  const [homeworks, setHomeworks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/homework", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setHomeworks(data);
      } catch (err) {
        console.error("Error fetching homework:", err);
      }
    };
    fetchHomework();
  }, [token]);

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold mb-4">📚 Homework List</h2>
      {homeworks.length === 0 ? (
        <p>No homework available</p>
      ) : (
        <ul className="space-y-3">
          {homeworks.map((hw) => (
            <li key={hw._id} className="p-3 border rounded">
              <h3 className="font-semibold">{hw.title}</h3>
              <p>{hw.description}</p>
              <p>
                <strong>Deadline:</strong>{" "}
                {new Date(hw.deadline).toLocaleDateString()}
              </p>
              <p>
                <strong>Teacher:</strong> {hw.uploadedBy?.username}
              </p>
              {hw.fileUrl && (
                <a
                  href={hw.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View File
                </a>
              )}

              {/* ✅ Add homework upload form here */}
              <div className="mt-3">
                <HomeworkUpload homeworkId={hw._id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomeworkList;
