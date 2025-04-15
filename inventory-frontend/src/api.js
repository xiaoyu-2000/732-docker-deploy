import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",  // Flask 后端地址
  withCredentials: true              // ✅ 允许携带 cookie 用于 session 验证
});

export default api;
