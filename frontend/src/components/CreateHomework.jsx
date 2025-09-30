import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateHomework = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [homeworks, setHomeworks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchHomework();
  }, []);

  // Fetch all homework
  const fetchHomework = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/homework", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setHomeworks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  // Create or Update homework
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deadline", deadline);
    if (file) formData.append("file", file);

    try {
      const url = editingId
        ? `http://localhost:5000/api/homework/${editingId}`
        : "http://localhost:5000/api/homework/create";

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(editingId ? "✅ Homework updated!" : "✅ Homework created!", {
          autoClose: 1000,
        });
        setTitle("");
        setDescription("");
        setDeadline("");
        setFile(null);
        setEditingId(null);
        fetchHomework();
      } else {
        toast.error(`❌ ${data.message || "Failed"}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error while saving homework");
    }
  };

  // Delete homework directly (no browser confirm)
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/homework/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        toast.success("🗑️ Homework deleted!", { autoClose: 1000 });
        setHomeworks(homeworks.filter((hw) => hw._id !== id));
      } else {
        const data = await res.json();
        toast.error(`❌ ${data.message || "Failed to delete homework"}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Error deleting homework");
    }
  };

  // Fill form for editing
  const handleEdit = (hw) => {
    setTitle(hw.title);
    setDescription(hw.description);
    setDeadline(hw.deadline.split("T")[0]);
    setEditingId(hw._id);
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
    <div className="p-3 sm:p-4 max-w-lg mx-auto mt-6">
      {/* Form Section */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-gray-800">
          {editingId ? "✏️ Update Homework" : "📘 Create Homework"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 p-2 sm:p-3 rounded-md text-sm sm:text-base"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full border border-gray-300 p-2 sm:p-3 rounded-md text-sm sm:text-base"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            required
          />
          <input
            type="date"
            className="w-full border border-gray-300 p-2 sm:p-3 rounded-md text-sm sm:text-base"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
          <input
            type="file"
            className="w-full text-sm sm:text-base text-gray-700"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all text-sm sm:text-base"
          >
            {editingId ? "Update Homework" : "Create Homework"}
          </button>
        </form>
      </div>

      {/* Homework List */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold mb-3">📚 Your Homeworks</h3>
        {homeworks.length === 0 ? (
          <p className="text-gray-600 text-sm sm:text-base">No homework created yet.</p>
        ) : (
          <ul className="space-y-3">
            {homeworks.map((hw) => (
              <li
                key={hw._id}
                className="p-3 border rounded-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0"
              >
                <div>
                  <p className="font-bold text-sm sm:text-base">{hw.title}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{hw.description}</p>
                  <p className="text-xs text-gray-500">
                    Deadline: {new Date(hw.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(hw)}
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-yellow-500 text-white rounded text-xs sm:text-sm hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(hw._id)}
                    className="px-2 py-1 sm:px-3 sm:py-1 bg-red-500 text-white rounded text-xs sm:text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Toasts */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default CreateHomework;
