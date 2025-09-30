import axios from "axios";

const API_URL = "http://localhost:5000/api/notes"; // backend base URL


export const uploadNote = async (formData, token) => {
  return await axios.post(`${API_URL}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};


export const getNotes = async (token) => {
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
