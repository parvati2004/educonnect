import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./navbar/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

// Layouts
import TeacherDashboardLayout from "./components/TeacherDashboardLayout";
import StudentDashboardLayout from "./components/StudentDashboardLayout";

// Pages / Components
import CreateHomework from "./components/CreateHomework";
import HomeworkList from "./components/HomeworkList";
import LatestHomework from "./components/LatestHomework";
import HomeworkUpload from "./components/HomeworkUpload";
import AllSubmissions from "./components/AllSubmissions";
import MySubmissions from "./components/MySubmissions";
import UploadNote from "./components/UploadNote";   // ✅ Teacher-only
import NotesList from "./components/NotesList";     // ✅ Student-only

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />

        {/* Student dashboard layout */}
        <Route path="/student-dashboard" element={<StudentDashboardLayout />}>
          <Route
            index
            element={
              <div className="flex items-center justify-center h-screen">
                <h1 className="text-5xl font-bold">Welcome, Student!</h1>
              </div>
            }
          />
          <Route path="hmupload" element={<HomeworkUpload />} />
          <Route path="latesthomework" element={<LatestHomework />} />
          <Route path="homeworklist" element={<HomeworkList />} />
          <Route path="mysubmission" element={<MySubmissions />} />
          <Route path="notes" element={<NotesList />} />
        </Route>

        {/* Teacher dashboard layout */}
        <Route path="/teacher-dashboard" element={<TeacherDashboardLayout />}>
          <Route
            index
            element={
              <div className="flex items-center justify-center h-screen">
                <h1 className="text-5xl font-bold">Welcome, Teacher!</h1>
              </div>
            }
          />
          <Route path="createhomework" element={<CreateHomework />} />
          <Route path="allsubmission" element={<AllSubmissions />} />
          <Route path="homeworklist" element={<HomeworkList />} />
          <Route path="uploadnote" element={<UploadNote />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
