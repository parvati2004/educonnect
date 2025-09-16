import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const TeacherDashboardLayout = () => {
  const location = useLocation();

  const navItems = [
    { path: "createhomework", label: "Create Homework" },
    { path: "allsubmission", label: "All Submissions" },
    { path: "homeworklist", label: "Homework List" },
    { path: "uploadnote", label: "Upload Notes" }, // ✅ Added here
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#c8d8e4]">
      {/* Header */}
      <header className="w-full p-4 shadow-md text-white bg-[#2b6777]">
        <h2 className="text-2xl font-bold text-center md:text-left">
          Teacher Dashboard
        </h2>

        {/* Navigation */}
        <nav className="mt-3 flex flex-wrap justify-center gap-4 md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-base md:text-lg transition ${
                location.pathname.includes(item.path)
                  ? "font-semibold underline"
                  : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Page content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default TeacherDashboardLayout;
