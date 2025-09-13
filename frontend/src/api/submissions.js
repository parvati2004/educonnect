// src/api/submissions.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/submissions"; // adjust if backend deployed

// ✅ Submit homework (with file)
export const submitHomework = async (homeworkId, file, token) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(`${API_URL}/${homeworkId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error submitting homework:", err.response?.data || err.message);
    throw err;
  }
};

// ✅ Get current user's submissions
export const getMySubmissions = async () => {
  const token = localStorage.getItem("token"); // assuming token is stored here
  try {
    const res = await axios.get(`${API_URL}/mine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // res.data should be an array of submissions
  } catch (err) {
    console.error("Error fetching submissions:", err.response?.data || err.message);
    throw err;
  }
};

// ✅ Get all submissions (for admin/teacher)
export const getSubmissions = async () => {
  const token = localStorage.getItem("token"); // assuming token is stored
  try {
    const res = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; // res.data should be an array of all submissions
  } catch (err) {
    console.error("Error fetching all submissions:", err.response?.data || err.message);
    throw err;
  }
};
