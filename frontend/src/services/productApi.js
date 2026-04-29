import axios from "axios";

const PRODUCT_API = axios.create({
  baseURL: "http://localhost:8003/api",
});

// 🔥 AUTO ATTACH TOKEN
PRODUCT_API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default PRODUCT_API;