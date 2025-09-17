import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // ✅ Show toast for success
      toast.success("✅ Registered successfully!", { autoClose: 1000 });

      // Redirect to login after 1 second
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      setError("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#c8d8e4" }}
    >
      <form
        onSubmit={handleRegister}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-800">
          Create Account
        </h1>

        {/* Error message */}
        {error && (
          <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
        )}

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Role selection */}
        <select
          className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {/* Register button */}
        <button
          type="submit"
          className="w-full bg-blue-800 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Register
        </button>

        {/* Login redirect */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-800 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>

      {/* Toast container */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Register;
