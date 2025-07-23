import apiClient from "../api/apiClient";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// GitHub: Redirects to passport GitHub strategy (correct)
export const loginWithGitHub = () => {
  window.location.href = `${BASE_URL}/api/oauth/github`;
};

/**
 * Check if user is redirected from GitHub OAuth
 * and retrieve user + access token if valid
 */
export const checkOAuthAuth = async () => {
  try {
    const res = await apiClient.get(`${API}/github/callback`, {
      withCredentials: true,
    });

    return res.data; // { user, accessToken }
  } catch (err) {
    throw new Error(err.response?.data?.message || "OAuth login failed");
  }
};
