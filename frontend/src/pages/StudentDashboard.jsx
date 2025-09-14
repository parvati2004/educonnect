import React from "react";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div>
      <h2>Student Dashboard</h2>
      <ul>
        <li><Link to="/hmupload">Homework Upload</Link></li>
        <li><Link to="/latesthomework">Latest Homework</Link></li>
        <li><Link to="/homeworklist">Homework List</Link></li>
        <li><Link to="/mysubmission">My Submissions</Link></li>
      </ul>
    </div>
  );
};

export default StudentDashboard;
