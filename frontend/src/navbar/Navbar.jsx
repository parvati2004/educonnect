import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="font-bold text-xl">EduConnect</div>
      <div className="space-x-4">
        <Link to="/home">Home</Link>
        <Link to="/homeworklist">Homework List</Link>

        {user?.role === "student" && (
          <>
            <Link to="/latesthomework">Latest Homework</Link>
            <Link to="/hmupload">Upload Homework</Link>
            <Link to="/mysubmission">My Submissions</Link>
          </>
        )}

        {user?.role === "teacher" && (
          <>
            <Link to="/createhomework">Create Homework</Link>
            <Link to="/allsubmission">All Submissions</Link>
          </>
        )}

        <Link to="/login">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
