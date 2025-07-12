const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Start Google OAuth
 */
export const loginWithGoogle = () => {
  window.location.href = `${BASE_URL}/api/oauth/google`;
};

/**
 * Start GitHub OAuth
 */
export const loginWithGitHub = () => {
  window.location.href = `${BASE_URL}/api/oauth/github`;
};

/**
 * Check if OAuth login is authenticated (called after redirect)
 */
export const checkOAuthAuth = async () => {
  const res = await fetch(`${BASE_URL}/api/oauth/is-auth`, {
    credentials: "include",
  });
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Not authenticated");
  return data;
};
