import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateHomework = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deadline", deadline);
    if (file) formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/homework/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Homework created successfully!");
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

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold mb-4">📘 Create Homework</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <input
          type="file"
          className="w-full"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateHomework;
