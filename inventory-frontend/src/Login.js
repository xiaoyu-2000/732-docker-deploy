// src/Login.js
import "./Login.css"; 
import React, { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ Initialize navigator

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      alert("Login successful: " + res.data.user.name);

      // ✅ Navigate to /products after successful login
      navigate("/products");

    } catch (err) {
      alert("Login failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>Login</button>

      {/* ✅ Link to registration page */}
      <p>Don't have an account?</p>
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
}

export default Login;
