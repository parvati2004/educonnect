import React, { useEffect, useState } from "react";
import axios from "axios";

const HomeworkUpload = () => {
  const [homework, setHomework] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token"); // must exist

  // Fetch latest homework
  useEffect(() => {
    const fetchLatestHomework = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/homework/latest", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHomework(res.data);
      } catch (err) {
        console.error("Error fetching latest homework:", err.response?.data || err.message);
        setMessage("Failed to fetch latest homework.");
      }
    };

    fetchLatestHomework();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !homework) {
      setMessage("Please select a file and ensure homework exists.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        `http://localhost:5000/api/submissions/${homework._id}/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Homework submitted successfully!");
    } catch (err) {
      console.error("Error submitting homework:", err.response?.data || err.message);
      setMessage("Submission failed.");
    }
  };

  return (
    <div>
      <h2>Upload Homework</h2>
      {homework ? (
        <div>
          <p>
            Latest Homework: <strong>{homework.title}</strong>
          </p>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button type="submit">Upload</button>
          </form>
        </div>
      ) : (
        <p>Loading latest homework...</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default HomeworkUpload;
