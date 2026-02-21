import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 
"https://www.lowcommissionqatar.com/backend/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: interceptors for logging or error handling
api.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
);

export default api;