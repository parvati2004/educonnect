import React from "react";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div>
      <h2>Teacher Dashboard</h2>
      <ul>
        <li><Link to="/createhomework">Create Homework</Link></li>
        <li><Link to="/allsubmission">All Submissions</Link></li>
        <li><Link to="/homeworklist">Homework List</Link></li>
      </ul>
    </div>
  );
};

export default TeacherDashboard;
