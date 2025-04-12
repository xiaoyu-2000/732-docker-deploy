// src/Login.js
import "./Login.css"; 
import React, { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom"; // ✅ 导入导航钩子

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ 初始化导航对象

  const handleLogin = async () => {
    try {
      const res = await api.post("/login", {
        email,
        password,
      });

      alert("登录成功：" + res.data.user.name);

      // ✅ 登录成功后跳转到 /products 页面
      navigate("/products");

    } catch (err) {
      alert("登录失败：" + (err.response?.data?.error || "未知错误"));
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>登录</h2>
      <input
        type="text"
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>登录</button>
    </div>
  );
}

export default Login;
