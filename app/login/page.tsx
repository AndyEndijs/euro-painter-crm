"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = () => {
    // Dummy login for now
    if (username === "worker" && password === "password") {
      router.push("/timesheets");
    } else {
      alert("Invalid credentials. Try again!");
    }
  };

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Worker Login</h1>
      <div style={{ margin: "1rem 0" }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "0.5rem", margin: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "0.5rem", margin: "0.5rem" }}
        />
        <button onClick={handleLogin} style={{ padding: "0.5rem 1rem" }}>
          Login
        </button>
      </div>
    </main>
  );
}
