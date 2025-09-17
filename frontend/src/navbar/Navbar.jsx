import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login"); // Redirect to login
  };

  const renderLinks = (isMobile = false) => {
    const linkClasses = `text-blue-300 hover:text-blue-100 ${
      isMobile ? "block mb-2" : "mx-2"
    }`;

    if (!user) {
      return (
        <>
          <Link to="/register" className={linkClasses}>Register</Link>
          <Link to="/login" className={linkClasses}>Login</Link>
        </>
      );
    }

    if (user.role === "teacher") {
      return (
        <>
          <Link to="/register" className={linkClasses}>Register</Link>
          <Link to="/login" className={linkClasses}>Login</Link>
          <Link to="/teacher-dashboard" className={linkClasses}>Teacher</Link>
          <button onClick={handleLogout} className={linkClasses}>Logout</button>
        </>
      );
    }

    if (user.role === "student") {
      return (
        <>
          <Link to="/register" className={linkClasses}>Register</Link>
          <Link to="/login" className={linkClasses}>Login</Link>
          <Link to="/student-dashboard" className={linkClasses}>Student</Link>
          <button onClick={handleLogout} className={linkClasses}>Logout</button>
        </>
      );
    }
  };

  return (
    <nav className="relative bg-[#2b6777]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link className="font-bold text-xl text-blue-300 hover:text-blue-100" to="/home">
            EduConnect
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">{renderLinks()}</div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
              {isOpen ? <X size={28} className="text-gray-300 hover:text-blue-100" /> 
                       : <Menu size={28} className="text-blue-300 hover:text-blue-100" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown (vertical column) */}
      {isOpen && (
        <div className="absolute right-0 mt-0 top-16 md:hidden w-56 rounded-lg shadow-lg px-6 py-4 space-y-3 z-50 bg-[#2b6777]">
          {renderLinks(true)} {/* Pass true to make items vertical */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
