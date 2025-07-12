import apiClient from "../api/apiClient";

const API = apiClient;
const PROFILE_BASE = "/api/profile";

//  Create user profile
export const createProfile = async (profileData) => {
  return await API.post(PROFILE_BASE, profileData);
};

//  Get logged-in user’s profile
export const getMyProfile = async () => {
  return await API.get(PROFILE_BASE);
};

//  Get all profiles (Admin/Recruiter only)
export const getAllProfiles = async (query = {}) => {
  return await API.get(`${PROFILE_BASE}/all`, { params: query });
};

//  Update profile
export const updateProfile = async (profileData) => {
  return await API.put(PROFILE_BASE, profileData);
};

//  Delete profile
export const deleteProfile = async () => {
  return await API.delete(PROFILE_BASE);
};

//  Update availability status
export const updateAvailability = async (availabilityData) => {
  return await API.put(`${PROFILE_BASE}/availability`, availabilityData);
};

//  Upload avatar image
export const uploadAvatar = async (avatarFile) => {
  const formData = new FormData();
  formData.append("avatar", avatarFile);
  return await API.post(`${PROFILE_BASE}/upload-avatar`, formData);
};

//  Upload document files
export const uploadDocuments = async (documentFiles) => {
  const formData = new FormData();
  documentFiles.forEach((file) => {
    formData.append("documents", file);
  });
  return await API.post(`${PROFILE_BASE}/upload-documents`, formData);
};

//  Delete a specific document by filename
export const deleteDocument = async (filename) => {
  return await API.delete(`${PROFILE_BASE}/documents/${filename}`);
};
