import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://www.lowcommissionqatar.com/backend/api/";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // VERY IMPORTANT
  headers: {
    "Content-Type": "application/json",
  },
});

/* Auto logout on 401 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      const skipRedirect = error?.config?.skipAuthRedirect;
      if (!skipRedirect && typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const apiForFiles = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
