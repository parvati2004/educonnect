import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save user & token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      // Show toast message
      toast.success("✅ Login successful!", { autoClose: 1000 });

      // Redirect based on role after a short delay to let toast appear
      setTimeout(() => {
        if (data.user.role === "teacher") {
          navigate("/teacher-dashboard/homeworklist");
        } else {
          navigate("/student-dashboard/homeworklist");
        }
      }, 1000);

    } catch (err) {
      setError("Something went wrong. Try again.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: "#c8d8e4" }}>
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-blue-800">Login</h1>
        {error && <p className="text-red-500 mb-4 text-center font-medium">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                 className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                 required />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                 className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-800 focus:outline-none"
                 required />
        </div>

        <button type="submit" className="w-full bg-blue-800 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
          Login
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}
                className="text-blue-800 font-semibold cursor-pointer hover:underline">Register</span>
        </p>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
