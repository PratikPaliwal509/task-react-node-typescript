import { useState } from "react";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

export default function LoginForm({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields required");
      return;
    }

    onLogin(email, password);
  };

  return (
    <div className="p-4 border rounded w-80">
      <h2 className="text-xl font-bold mb-3">Login</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-500 text-white p-2 mt-2">
          Login
        </button>
      </form>
    </div>
  );
}