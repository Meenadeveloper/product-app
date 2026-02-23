import axios from "axios";
import Cookies from "js-cookie";
const axiosInstance = axios.create({
  baseURL: "/api",
   withCredentials: true, // VERY IMPORTANT
  headers: {
    "Content-Type": "application/json",
  },
});

/* Attach token automatically */
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = Cookies.get("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

/* Auto logout on 401 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      const skipRedirect = error?.config?.skipAuthRedirect;
      Cookies.remove("access_token");
      if (!skipRedirect && typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const apiForFiles = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
