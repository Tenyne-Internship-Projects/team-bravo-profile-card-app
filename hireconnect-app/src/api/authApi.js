import apiClient from "../api/apiClient";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

//  Fetch user profile using Axios
export const getProfile = async () => {
  const res = await apiClient.get("/api/user/profile");
  return res.data;
};

//  Register user
export const registerUser = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Registration failed");
  return data;
};

//  Login user
export const loginUser = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Login failed");
  return data;
};

//  Forgot password - send reset OTP
export const sendResetOtp = async (email) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to send reset OTP");
  return data;
};

//  Verify Email OTP
export const verifyOtp = async ({ email, otp }) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
      email,
      otp,
    });
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || "OTP verification failed";
    throw new Error(message);
  }
};

//  Resend OTP (with email in body)
export const resendOtp = async (email) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/resend-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to resend OTP");
  return data;
};

//  Reset password (token + new password)
export const confirmResetPassword = async ({ token, password }) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Password reset failed");
  return data;
};

//  Logout
export const logoutUser = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Logout failed");
  return data;
};

//  Refresh token (optional)
export const refreshAuthToken = async () => {
  const res = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Token refresh failed");
  return data;
};
