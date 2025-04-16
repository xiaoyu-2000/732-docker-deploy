import axios from "axios";

// ✅ 从 .env 文件中读取配置项
const protocol = process.env.REACT_APP_API_PROTOCOL || "http";
const host = process.env.REACT_APP_API_HOST || "localhost";
const port = process.env.REACT_APP_API_PORT || "5000";

// ✅ 构造完整 API 地址
export const BASE_URL = `${protocol}://${host}:${port}`;

// ✅ 创建 Axios 实例
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true // ✅ 支持 Cookie
});

export default api;
