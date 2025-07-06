import axios from "axios";
import apiClient from "../api/apiClient";

// Example: fetch user profile
export const getProfile = async () => {
  const res = await apiClient.get("/api/user/profile");
  return res.data;
};

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Get all projects with optional filters and pagination
 * @param {Object} params - e.g., { search, location, tags, min_budget, max_budget, page }
 */
export const getProjects = async (params = {}) => {
  try {
    const res = await axios.get(BASE_URL, { params });
    return res.data;
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw err.response?.data || { message: "Failed to fetch projects." };
  }
};

/**
 * Get a single project by ID
 * @param {number|string} id
 */
export const getProjectById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching project:", err);
    throw err.response?.data || { message: "Failed to fetch project." };
  }
};

/**
 * Create a new project (must be authenticated + authorized)
 * @param {FormData} formData - include all fields + file attachments
 * @param {string} token - JWT token
 */
export const createProject = async (formData, token) => {
  try {
    const res = await axios.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error creating project:", err);
    throw err.response?.data || { message: "Failed to create project." };
  }
};

/**
 * Update an existing project by ID
 * @param {number|string} id
 * @param {Object} updatedData
 * @param {string} token
 */
export const updateProject = async (id, updatedData, token) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error updating project:", err);
    throw err.response?.data || { message: "Failed to update project." };
  }
};

/**
 * Delete a project by ID
 * @param {number|string} id
 * @param {string} token
 */
export const deleteProject = async (id, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting project:", err);
    throw err.response?.data || { message: "Failed to delete project." };
  }
};
/**
 * Apply to a project
 * @param {number|string} projectId
 * @param {Object} data - e.g., { coverLetter, resume }
 */
export async function applyToProject(projectId, data) {
  try {
    const res = await axios.post(`/api/projects/${projectId}/apply`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    throw new Error(err?.response?.data?.message || "Application failed");
  }
}
