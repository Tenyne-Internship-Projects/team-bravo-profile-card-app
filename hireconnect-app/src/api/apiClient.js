// apiClient.js
import axios from "axios";
import { refreshAuthToken, logoutUser } from "./authApi";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", import.meta.env.VITE_BACKEND_URL);

if (!BASE_URL) {
  throw new Error("VITE_BACKEND_URL is not defined in .env");
}

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Optional: only if using cookies
});

// Request: attach access token from localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response: handle 401 errors by trying refresh
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login")
    ) {
      originalRequest._retry = true;
      try {
        const data = await refreshAuthToken();
        localStorage.setItem("token", data.token);
        originalRequest.headers.Authorization = `Bearer ${data.token}`;
        return apiClient(originalRequest); // retry original request
      } catch (refreshError) {
        await logoutUser(); // optional: clear server session
        localStorage.removeItem("token");
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
