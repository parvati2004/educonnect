import React, { useEffect, useState } from "react";

const LatestHomework = () => {
  const [homework, setHomework] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/homework/latest", {
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

  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!homework) return <p className="text-center mt-10">No homework available</p>;

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold mb-2">🆕 Latest Homework</h2>
      <h3 className="font-semibold">{homework.title}</h3>
      <p>{homework.description}</p>
      <p><strong>Deadline:</strong> {new Date(homework.deadline).toLocaleDateString()}</p>
      <p><strong>Teacher:</strong> {homework.uploadedBy?.username}</p>
      {homework.fileUrl && (
        <a href={homework.fileUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
          View File
        </a>
      )}
    </div>
  );
};

export default LatestHomework;
