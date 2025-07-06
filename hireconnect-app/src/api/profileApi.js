import axios from "axios";
import apiClient from "../api/apiClient";

// Example: fetch user profile
export const getProfile = async () => {
  const res = await apiClient.get("/api/user/profile");
  return res.data;
};

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/profile`,
  withCredentials: true,
});

// 1. Create Profile
export const createProfile = async (profileData) => {
  return await API.post("/", profileData);
};

// 2. Get Logged-in User Profile
export const getMyProfile = async () => {
  return await API.get("/");
};

// 3. Get All Profiles (Admin/Recruiter only)
export const getAllProfiles = async (query = {}) => {
  return await API.get("/all", { params: query });
};

// 4. Update Profile
export const updateProfile = async (profileData) => {
  return await API.put("/", profileData);
};

// 5. Delete Profile
export const deleteProfile = async () => {
  return await API.delete("/");
};

// 6. Update Availability
export const updateAvailability = async (availabilityData) => {
  return await API.put("/availability", availabilityData);
};

// 7. Upload Avatar
export const uploadAvatar = async (avatarFile) => {
  const formData = new FormData();
  formData.append("avatar", avatarFile);
  return await API.post("/upload-avatar", formData);
};

// 8. Upload Documents
export const uploadDocuments = async (documentFiles) => {
  const formData = new FormData();
  documentFiles.forEach((file) => {
    formData.append("documents", file);
  });
  return await API.post("/upload-documents", formData);
};

// 9. Delete Document by filename
export const deleteDocument = async (filename) => {
  return await API.delete(`/documents/${filename}`);
};
