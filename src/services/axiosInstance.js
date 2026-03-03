import axios from "axios";
import { API_ENDPOINTS } from "./apiEndpoints";

/**
 * Create an Axios instance with the base URL from environment variables
 * and default headers for JSON communication.
 */
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://www.unicorn.amrithaa.net/backend/api/" ,

  // baseURL:
  //   import.meta.env.VITE_UNICORN_API_BASE_URL ||
  //   "https://www.lowcommissionqatar.com/backend/api/",

  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/**
 * Create a separate Axios instance for handling multipart file uploads
 * while sharing the same base URL and authorization mechanism.
 */
const apiForFiles = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

/**
 * Set Access Token
 */
export const setAccessToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    apiForFiles.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers["Authorization"];
    delete apiForFiles.defaults.headers["Authorization"];
  }
};

const AUTH_COOKIE_NAME = "access_token";

export const setAuthCookie = (token, options = {}) => {
  if (!token) return;
  const {
    maxAgeSeconds = 60 * 60 * 24 * 7,
    path = "/",
    sameSite = "Lax",
    secure = window.location.protocol === "https:",
  } = options;

  let cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; Max-Age=${maxAgeSeconds}; Path=${path}; SameSite=${sameSite}`;
  if (secure) cookie += "; Secure";
  document.cookie = cookie;
};

export const clearAuthCookie = (options = {}) => {
  const { path = "/" } = options;
  document.cookie = `${AUTH_COOKIE_NAME}=; Max-Age=0; Path=${path}; SameSite=Lax`;
};

/**
 * Add a request interceptor to include credentials with each request.
 */
const addAuthInterceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      config.withCredentials = true;
      return config;
    },
    (error) => Promise.reject(error)
  );
};

/**
 * Add a response interceptor to handle global error scenarios,
 * such as redirecting to the login page on a 401 Unauthorized error.
 */
const addErrorInterceptor = (instance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        const skipRedirect = error.config?.skipAuthRedirect;
        if (!skipRedirect) {
          if (typeof window !== "undefined" && window.location.pathname !== "/") {
            console.error("Unauthorized access - logging out...");
            window.location.href = "/";
          }
        }
      } else if (error.response && error.response.status === 403) {
        // if (window.location.pathname !== "/") {
        //   window.location.href = "/";
        // }
        // navigate("/");
      } else if (error.response && error.response.status === 404) {
        console.error("404 Error - Endpoint not found:", error.config?.url);
        // Don't redirect for 404, let component handle it
      } else if (error.response && error.response.status >= 500) {
        console.error("Server error:", error.response?.data);
      }
      return Promise.reject(error);
    }
  );
};

// Apply interceptors to both instances
addAuthInterceptor(axiosInstance);
addAuthInterceptor(apiForFiles);

addErrorInterceptor(axiosInstance);
addErrorInterceptor(apiForFiles);

/**
 * Clear all user data from the browser: localStorage, sessionStorage, and cookies.
 */
export const clearUserData = () => {
  try {
    // Clear localStorage
    localStorage.clear();

    // Clear sessionStorage
    sessionStorage.clear();

    // Clear cookies
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.split("=");
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
    });

    // Remove authorization headers from Axios instances
    delete axiosInstance.defaults.headers["Authorization"];
    delete apiForFiles.defaults.headers["Authorization"];

    console.log("User data cleared from browser.");
    // Add redirect to ensure all tabs show login page
    //  window.location.href = '/';
  } catch (error) {
    console.error("Error clearing user data:", error);
  }
};

export const urlToFile = async (url, filename = "file") => {
  try {
    // Use your axios instance to request the URL as a Blob
    const response = await apiForFiles.get(url, {
      responseType: "blob",
    });

    // Axios header keys are lowercase
    const contentType =
      response.headers["content-type"] ||
      (
        // Guess MIME type based on filename extension
        filename.toLowerCase().endsWith(".png")
          ? "image/png"
          : filename.toLowerCase().endsWith(".webp")
          ? "image/webp"
          : filename.toLowerCase().endsWith(".jpg") ||
            filename.toLowerCase().endsWith(".jpeg")
          ? "image/jpeg"
          : "application/octet-stream"
      );

    // Create and return a File object from the blob data
    return new File([response.data], filename, { type: contentType });
  } catch (error) {
    console.error("urlToFile axios error:", error);
    return null;
  }
};



/**
 * Get FCM token from localStorage
 */
const getFcmToken = () => {
  return localStorage.getItem("fcm_token");
};

/**
 * Clear FCM token from localStorage
 */
const clearFcmToken = () => {
  localStorage.removeItem("fcm_token");
};

export const logoutAPI = async () => {
  console.log("Calling logout API...");
  try {
    const res = await axiosInstance.post(API_ENDPOINTS.LOGOUT);
    return res.data; // assuming API returns { message: "Logout successful" }
  } catch (error) {
    console.error("Logout API failed:", error);
    // even if API fails, still clear local storage
  } finally {
    console.log("Clearing local storage...");
    // always clear local storage
    // No access token stored in localStorage when using HttpOnly cookies
    clearAuthCookie();
    // clearFcmToken();
  }
};

// Export both instances
export default axiosInstance;
export { apiForFiles };
