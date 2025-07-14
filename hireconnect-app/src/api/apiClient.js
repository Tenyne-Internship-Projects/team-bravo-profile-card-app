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

// // Request: attach access token from localStorage
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// Handle 401 errors by attempting refresh
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh-token")
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        // retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
