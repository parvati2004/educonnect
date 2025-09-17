import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateHomework = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deadline", deadline);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("https://educonnect-backend-ao93.onrender.com/api/homework/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Homework created successfully!",{ autoClose: 1000 });
        setTitle("");
        setDescription("");
        setDeadline("");
        setFile(null);
      } else {
        toast.error(`❌ ${data.message || "Failed to create homework"}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error creating homework");
    }
  };

  // Restrict access if not teacher
  if (user && user.role !== "teacher") {
    return (
      <div className="p-4 max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 mt-10 rounded-lg shadow-md text-center">
        🚫 Access Denied: Only teachers can access this page.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto mt-10">
      <div className="bg-white shadow-lg rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">📘 Create Homework</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
          <input
            type="date"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <input
            type="file"
            className="w-full text-gray-700"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Create Homework
          </button>
        </form>
      </div>

      {/* Toast container for success/error messages */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default CreateHomework;
