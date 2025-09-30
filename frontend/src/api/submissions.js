import axios from "axios";

const API_URL = "https://educonnect-backend-ao93.onrender.com/api/submissions";

// Submit homework (with FormData)
export const submitHomework = async (homeworkId, formData) => {
  const token = localStorage.getItem("token");

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

//  Get current user's submissions
export const getMySubmissions = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_URL}/mine`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching submissions:", err.response?.data || err.message);
    throw err;
  }
};

// Get all submissions (for teacher/admin)
export const getSubmissions = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.get(`${API_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching all submissions:", err.response?.data || err.message);
    throw err;
  }
};

