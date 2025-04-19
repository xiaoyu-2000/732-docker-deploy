import axios from "axios";

const protocol = process.env.REACT_APP_API_PROTOCOL || "http";
const host = process.env.REACT_APP_API_HOST || "localhost";
const port = process.env.REACT_APP_API_PORT || "5000";

export const BASE_URL = `${protocol}://${host}:${port}`;


const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export default api;
