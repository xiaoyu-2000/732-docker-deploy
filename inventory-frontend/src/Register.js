
import "./Login.css"; 
import React, { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
      });

      alert("Registration successful: " + res.data.message);
      navigate("/login"); // ✅ Navigate to login after success
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br /><br />
      <input
        type="email"
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
      <button onClick={handleRegister}>Register</button>

      {/* ✅ Link to login page */}
      <p>Already have an account?</p>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}

export default Register;
