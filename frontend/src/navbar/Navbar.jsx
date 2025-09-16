import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons from lucide-react

const Navbar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative" style={{ backgroundColor: "#2b6777" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            className="font-bold text-xl text-blue-300 hover:text-blue-100"
            to="/home"
          >
            EduConnect
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/register" className="text-blue-300 hover:text-blue-100">
              Register
            </Link>
            <Link to="/login" className="text-blue-300 hover:text-blue-100">
              Login
            </Link>
            <Link
              to="/student-dashboard"
              className="text-blue-300 hover:text-blue-100"
            >
              Student
            </Link>
            <Link
              to="/teacher-dashboard"
              className="text-blue-300 hover:text-blue-100"
            >
              Teacher
            </Link>

            {user?.role === "student" && (
              <>
                <Link
                  to="/student-dashboard"
                  className="text-blue-300 hover:text-blue-100"
                >
                  Student Dashboard
                </Link>
                <Link
                  to="/latesthomework"
                  className="text-blue-300 hover:text-blue-100"
                >
                  Latest Homework
                </Link>
                <Link
                  to="/hmupload"
                  className="text-blue-300 hover:text-blue-100"
                >
                  Upload Homework
                </Link>
                <Link
                  to="/mysubmission"
                  className="text-blue-300 hover:text-blue-100"
                >
                  My Submissions
                </Link>
              </>
            )}

            {user?.role === "teacher" && (
              <>
                <Link
                  to="/teacher-dashboard"
                  className="text-blue-300 hover:text-blue-100"
                >
                  Teacher Dashboard
                </Link>
                <Link
                  to="/createhomework"
                  className="text-blue-300 hover:text-blue-100"
                >
                  Create Homework
                </Link>
                <Link
                  to="/allsubmission"
                  className="text-blue-300 hover:text-blue-100"
                >
                  All Submissions
                </Link>
              </>
            )}

            <Link to="/login" className="text-blue-300 hover:text-blue-100">
              Logout
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
            >
              {isOpen ? (
                <X size={28} className="text-blue-300 hover:text-blue-100" />
              ) : (
                <Menu size={28} className="text-blue-300 hover:text-blue-100" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-1 top-16 md:hidden w-56 rounded-lg shadow-lg px-6 py-4 space-y-3 z-60"
          style={{ backgroundColor: "#2b6777" }}
        >
          <Link to="/register" className="block text-blue-300 hover:text-blue-100">
            Register
          </Link>
          <Link to="/login" className="block text-blue-300 hover:text-blue-100">
            Login
          </Link>
          <Link
            to="/student-dashboard"
            className="block text-blue-300 hover:text-blue-100"
          >
            Student
          </Link>
          <Link
            to="/teacher-dashboard"
            className="block text-blue-300 hover:text-blue-100"
          >
            Teacher
          </Link>

          {user?.role === "student" && (
            <>
              <Link
                to="/student-dashboard"
                className="block text-blue-300 hover:text-blue-100"
              >
                Student Dashboard
              </Link>
              <Link
                to="/latesthomework"
                className="block text-blue-300 hover:text-blue-100"
              >
                Latest Homework
              </Link>
              <Link
                to="/hmupload"
                className="block text-blue-300 hover:text-blue-100"
              >
                Upload Homework
              </Link>
              <Link
                to="/mysubmission"
                className="block text-blue-300 hover:text-blue-100"
              >
                My Submissions
              </Link>
            </>
          )}

          {user?.role === "teacher" && (
            <>
              <Link
                to="/teacher-dashboard"
                className="block text-blue-300 hover:text-blue-100"
              >
                Teacher Dashboard
              </Link>
              <Link
                to="/createhomework"
                className="block text-blue-300 hover:text-blue-100"
              >
                Create Homework
              </Link>
              <Link
                to="/allsubmission"
                className="block text-blue-300 hover:text-blue-100"
              >
                All Submissions
              </Link>
            </>
          )}

          <Link to="/login" className="block text-blue-300 hover:text-blue-100">
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
