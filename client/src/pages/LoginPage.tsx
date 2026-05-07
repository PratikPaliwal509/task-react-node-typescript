import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { encryptData } from "../utils/crypto";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email.includes("@")) {
    alert("Invalid Email");
    return;
  }

  if (password.length < 4) {
    alert("Password must be at least 4 characters");
    return;
  }

  try {
    // 🔐 Encrypt login data (same style as register)
    const encryptedData = encryptData({ email, password });

    console.log("Encrypted Login Data:", encryptedData);

    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: encryptedData, // ✅ now encrypted like register
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed");
      return;
    }

    localStorage.setItem("auth", "true");
    alert("Login Successfully ✅");

    navigate("/");
  } catch (error) {
    console.error(error);
    alert("Server error during login");
  }
};

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="p-6 border rounded w-[350px] space-y-3"
      >
        <h2 className="text-xl font-bold">Login</h2>

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full p-2">
          Login
        </button>
      </form>
    </div>
  );
}