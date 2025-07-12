import apiClient from "../api/apiClient";

const PROJECT_BASE = "/api/projects";

//  Get all projects (with optional filters, pagination, search)
export const getProjects = async (params = {}) => {
  try {
    const res = await apiClient.get(PROJECT_BASE, { params });
    return res.data;
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw err.response?.data || { message: "Failed to fetch projects." };
  }
};

//  Get a single project by ID
export const getProjectById = async (id) => {
  try {
    const res = await apiClient.get(`${PROJECT_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching project:", err);
    throw err.response?.data || { message: "Failed to fetch project." };
  }
};

//  Create new project (must be authenticated)
export const createProject = async (formData) => {
  try {
    const res = await apiClient.post(PROJECT_BASE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (err) {
    console.error("Error creating project:", err);
    throw err.response?.data || { message: "Failed to create project." };
  }
};

//  Update project by ID
export const updateProject = async (id, updatedData) => {
  try {
    const res = await apiClient.put(`${PROJECT_BASE}/${id}`, updatedData);
    return res.data;
  } catch (err) {
    console.error("Error updating project:", err);
    throw err.response?.data || { message: "Failed to update project." };
  }
};

//  Delete project by ID
export const deleteProject = async (id) => {
  try {
    const res = await apiClient.delete(`${PROJECT_BASE}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting project:", err);
    throw err.response?.data || { message: "Failed to delete project." };
  }
};

/**
 * Apply to a project
 * @param {string | number} projectId
 * @param {Object} formData - e.g. { coverLetter, resume }
 */
export const applyToProject = async (projectId, formData) => {
  try {
    const res = await apiClient.post(
      `${PROJECT_BASE}/${projectId}/apply`,
      formData,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error applying to project:", err);
    throw err.response?.data || { message: "Failed to apply to project." };
  }
};
