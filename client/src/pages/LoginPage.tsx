import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { encryptData } from "../utils/crypto";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes("@")) {
      toast.error("Invalid Email");
      return;
    }

    if (password.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }

    try {
      const encryptedData = encryptData({ email, password });

      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: encryptedData }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // ✅ Store login info
      localStorage.setItem("auth", "true");
      localStorage.setItem("user", JSON.stringify(data.student));
      // or localStorage.setItem("token", data.token);

      toast.success("Login Successfully");
      // force refresh router
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      toast.error("Server error during login");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-[350px]">

        <h2 className="text-2xl font-semibold text-center mb-5 text-gray-800">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-600 mt-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-gray-800 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}