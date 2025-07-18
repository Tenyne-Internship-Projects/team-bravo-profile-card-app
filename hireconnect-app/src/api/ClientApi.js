import apiClient from "../api/apiClient";

/**
 * Get logged-in client's profile
 */
export const fetchClientProfile = async () => {
  const res = await apiClient.get("/client-profile/me");
  return res.data.profile;
};

/**
 * Update client profile (e.g., company name, description, etc.)
 * @param {Object} data
 */
export const updateClientProfile = async (data) => {
  const res = await apiClient.put("/client-profile", data);
  return res.data.profile;
};

/**
 * Upload a company logo (multipart/form-data)
 * @param {File} file - Image file object
 */
export const uploadClientLogo = async (file) => {
  const formData = new FormData();
  formData.append("logo", file);

  const res = await apiClient.post("/client-profile/logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
