import apiClient from "../api/apiClient";

const API = "/api/auth";

//  Register a new user
export const registerUser = async (formData) => {
  try {
    const res = await apiClient.post(`${API}/register`, formData);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Registration failed");
  }
};

//  Login user
export const loginUser = async (formData) => {
  try {
    const res = await apiClient.post(`${API}/login`, formData);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

//  Send reset OTP
// Send Reset OTP for password reset
export const sendResetOtp = async (email) => {
  try {
    const res = await apiClient.post(`${API}/forgot-password`, { email });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to send reset code");
  }
};

//  Verify OTP
export const verifyOtp = async ({ email, otp }) => {
  try {
    const res = await apiClient.post(`${API}/verify-otp`, { email, otp });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "OTP verification failed");
  }
};

//  Resend OTP
export const resendOtp = async (email) => {
  try {
    const res = await apiClient.post(`${API}/resend-otp`, { email });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Failed to resend OTP");
  }
};

// Confirm password reset using OTP
export const confirmResetPassword = async ({ email, otp, newPassword }) => {
  try {
    const res = await apiClient.post(`${API}/reset-password`, {
      email,
      otp,
      newPassword,
    });
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Password reset failed");
  }
};

//  Logout user
export const logoutUser = async () => {
  try {
    const res = await apiClient.post(`${API}/logout`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Logout failed");
  }
};

//  Refresh auth token (used in interceptors)
export const refreshAuthToken = async () => {
  try {
    const res = await apiClient.post(`${API}/refresh-token`);
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Token refresh failed");
  }
};

export const loginWithGoogle = async (googleToken) => {
  try {
    const res = await apiClient.post("/api/auth/google/token", {
      id_token: googleToken,
    });

    return res.data;
  } catch (error) {
    console.error("Google login failed:", error);
    throw error;
  }
};


