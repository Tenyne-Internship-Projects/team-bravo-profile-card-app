import apiClient from "../api/apiClient";

const API = "/api/favorites";

//  Favorite a project
export async function favoriteProject(projectId) {
  try {
    const res = await apiClient.post(`${API}/${projectId}`);
    return res.data;
  } catch (err) {
    console.error("Error favoriting project:", err);
    throw err;
  }
}

//  Unfavorite a project
export async function unfavoriteProject(projectId) {
  try {
    const res = await apiClient.delete(`${API}/${projectId}`);
    return res.data;
  } catch (err) {
    console.error("Error unfavoriting project:", err);
    throw err;
  }
}
