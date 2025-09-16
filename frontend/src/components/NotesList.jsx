import React, { useEffect, useState } from "react";
import { getNotes } from "../api/notes";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getNotes(token);
        setNotes(res.data);
      } catch (err) {
        setError("Failed to fetch notes", err);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800 mb-6">
        📘 Available Notes
      </h2>

      {/* Error */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Notes List */}
      {notes.length === 0 ? (
        <p className="text-center text-gray-600">No notes available.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white border border-gray-200 shadow-md rounded-xl p-4 w-64 flex flex-col items-center text-center hover:shadow-lg transition-transform transform hover:-translate-y-1"
            >
              {/* Title */}
              <p className="text-gray-800 font-bold mb-1">
                Title: <span className="font-normal">{note.title}</span>
              </p>

              {/* Description */}
              <p className="text-gray-800 font-bold mb-2">
                Description: <span className="font-normal">{note.subject}</span>
              </p>

              {/* Uploaded By */}
              <p className="text-gray-800 font-bold text-xs mb-3">
                Uploaded by:{" "}
                <span className="font-normal">
                  {note.uploadedBy?.username} ({note.uploadedBy?.role})
                </span>
              </p>

              {/* Action Button */}
              <a
                href={note.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-xs font-bold bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
              >
                📥 View
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
