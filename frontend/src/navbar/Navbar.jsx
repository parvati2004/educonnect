import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold tracking-wide">
        EduConnect
      </Link>

      {/* Dynamic Links */}
      <div className="space-x-6 flex items-center">
        <Link to="/">Home</Link>

        {/* Guest Links */}
        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* Teacher Links */}
        {token && role === "teacher" && (
          <>
            <Link to="/create-homework">Create Homework</Link>
            <Link to="/submissions">Submissions</Link>
          </>
        )}

        {/* Student Links */}
        {token && role === "student" && (
          <>
            <Link to="/homeworks">Homework</Link>
            <Link to="/my-submissions">My Submissions</Link>
          </>
        )}

        {/* User Info + Logout */}
        {token && (
          <>
            <span className="font-semibold">Hi, {username || "User"}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
