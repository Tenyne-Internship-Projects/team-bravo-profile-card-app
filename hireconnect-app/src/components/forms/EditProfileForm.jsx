import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DocumentUploader from "../components/DocumentUploader";
import DocumentList from "../components/DocumentList";

const EditProfileForm = () => {
  const { userData, backendUrl, getUserData } = useContext(AppContext);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    bio: "",
    skills: "",
    tools: "",
    github: "",
    portfolio: "",
    linkedin: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setForm({
        fullName: userData.fullname || "",
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
        country: userData.country || "",
        state: userData.state || "",
        city: userData.city || "",
        bio: userData.bio || "",
        skills: userData.skills || "",
        tools: userData.tools || "",
        github: userData.github || "",
        portfolio: userData.portfolio || "",
        linkedin: userData.linkedin || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backendUrl}/api/profile`, form, {
        withCredentials: true,
      });
      toast.success("Profile updated!");
      await getUserData();
      navigate("/profile");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await axios.post(`${backendUrl}/api/profile/upload-avatar`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Avatar uploaded");
      await getUserData();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Avatar upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6 rounded shadow space-y-4"
      >
        <h2 className="text-2xl font-semibold text-[#302B63]">Edit Profile</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            value={form.skills}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="tools"
            placeholder="Tools (comma-separated)"
            value={form.tools}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="portfolio"
            placeholder="Portfolio URL"
            value={form.portfolio}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="github"
            placeholder="GitHub URL"
            value={form.github}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="linkedin"
            placeholder="LinkedIn URL"
            value={form.linkedin}
            onChange={handleChange}
            className="input"
          />
        </div>

        <textarea
          name="bio"
          placeholder="Bio / About"
          value={form.bio}
          onChange={handleChange}
          rows={4}
          className="w-full border p-2 rounded text-sm"
        />

        <div className="flex justify-between items-center flex-wrap gap-4">
          <label className="bg-gray-300 text-[#302B63] px-4 py-2 rounded cursor-pointer">
            Upload Avatar
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="bg-[#302B63] text-white px-6 py-2 rounded"
          >
            <DocumentUploader
              backendUrl={backendUrl}
              getUserData={getUserData}
            />
            <DocumentList
              documents={userData?.documents || []}
              backendUrl={backendUrl}
              getUserData={getUserData}
            />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
