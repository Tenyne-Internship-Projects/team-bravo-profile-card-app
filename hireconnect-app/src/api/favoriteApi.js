// src/api/favoriteApi.js
import axios from "axios";

const API = "/api/favorites";

export async function favoriteProject(projectId) {
  try {
    const res = await axios.post(`${API}/${projectId}`);
    return res.data;
  } catch (err) {
    console.error("Error favoriting project", err);
    throw err;
  }
}

export async function unfavoriteProject(projectId) {
  try {
    const res = await axios.delete(`${API}/${projectId}`);
    return res.data;
  } catch (err) {
    console.error("Error unfavoriting project", err);
    throw err;
  }
}
