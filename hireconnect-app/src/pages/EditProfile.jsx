// src/pages/EditProfile.jsx

import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { userData, getUserData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    contact: "",
    country: "",
    state: "",
    about: "",
    skills: "",
    tools: "",
    github: "",
    portfolio: "",
    linkedin: "",
  });

  useEffect(() => {
    if (userData) {
      setForm({
        fullName: userData.fullName || "",
        username: userData.username || "",
        email: userData.email || "",
        contact: userData.phone || "",
        country: userData.country || "",
        state: userData.state || "",
        about: userData.bio || "",
        skills: userData.skills?.join(", ") || "",
        tools: userData.tools?.join(", ") || "",
        github: userData.github || "",
        portfolio: userData.portfolio || "",
        linkedin: userData.linkedin || "",
      });
    } else {
      getUserData();
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: form.fullName,
      username: form.username,
      email: form.email,
      phone: form.contact,
      country: form.country,
      state: form.state,
      bio: form.about,
      skills: form.skills.split(",").map((s) => s.trim()),
      tools: form.tools.split(",").map((t) => t.trim()),
      github: form.github,
      portfolio: form.portfolio,
      linkedin: form.linkedin,
    };

    try {
      await axios.put(`${backendUrl}/api/profile`, payload, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Profile updated");
      await getUserData();
      navigate("/profile");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="edit-profile-wrapper">
      <h2 className="edit-profile-title">Edit Profile Info</h2>

      {/* Avatar + Name + Upload Buttons */}
      <div className="profile-image-section">
        <img
          src={userData?.avatar_url || "/assets/kconnect.png"}
          alt="Avatar"
          className="profile-avatar"
        />
        <div>
          <h1 className="name">{form.fullName || "Your Name"}</h1>
          <h2 className="username">@{form.username || "yourusername"}</h2>
          <div className="upload-actions">
            <button
              onClick={() => navigate("/upload-avatar")}
              className="upload-btn"
              type="button"
            >
              Update Avatar
            </button>
            <button
              onClick={() => navigate("/upload-documents")}
              className="upload-btn"
              type="button"
            >
              Manage Documents
            </button>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <input type="text" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required />
        <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Username" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="contact" value={form.contact} onChange={handleChange} placeholder="Phone / Contact" />
        <div className="edit-profile-flex-row">
          <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Country" required />
          <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State" required />
        </div>
        <textarea name="about" value={form.about} onChange={handleChange} placeholder="Short Bio (About You)" required />
        <input type="text" name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (comma-separated)" />
        <input type="text" name="tools" value={form.tools} onChange={handleChange} placeholder="Tools / Software (comma-separated)" />
        <input type="text" name="github" value={form.github} onChange={handleChange} placeholder="GitHub URL" />
        <input type="text" name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="Portfolio URL" />
        <input type="text" name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default EditProfile;
