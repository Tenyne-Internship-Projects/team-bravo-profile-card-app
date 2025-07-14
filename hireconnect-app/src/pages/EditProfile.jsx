// src/pages/EditProfile.jsx

import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import {
  createProfile,
  updateProfile,
  uploadAvatar,
  uploadDocuments,
} from "../api/profileApi";
import "../styles/profilecard.css";
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
    city: "",
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
        city: userData.city || "",
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
      city: form.city,
      bio: form.about,
      skills: form.skills.trim(),
      tools: form.tools.trim(),
      github: form.github,
      portfolio: form.portfolio,
      linkedin: form.linkedin,
    };

    try {
      // Try update first
      await updateProfile(payload);
      toast.success("Profile updated");
    } catch (err) {
      if (
        err?.response?.status === 403 ||
        err?.response?.data?.message === "Profile not found"
      ) {
        // First create a profile
        try {
          await createProfile(payload);
          toast.success("Great Job! Profile created");
        } catch (createErr) {
          toast.error(
            createErr?.response?.data?.message || "Failed to create profile"
          );
          return;
        }
      } else {
        toast.error(err?.response?.data?.message || "Profile update failed");
        return;
      }
    }

    await getUserData();
    navigate("/profile");
  };

  const [step, setStep] = useState(1);
  // Add refs and handlers
  const avatarInputRef = useRef();
  const documentInputRef = useRef();

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await uploadAvatar(file);
        toast.success("Avatar uploaded");
        await getUserData();
      } catch (err) {
        toast.error("Avatar upload failed");
      }
    }
  };

  const handleStepOneContinue = () => {
    if (
      !form.fullName ||
      !form.username ||
      !form.email ||
      !form.country ||
      !form.state
    ) {
      toast.error("Please fill all required fields");
      return;
    }
    setStep(2);
  };

  const handleDocumentUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      try {
        await uploadDocuments(files);
        toast.success("Resume(s) uploaded");
        await getUserData();
      } catch (err) {
        toast.error("Document upload failed");
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="edit-profile-title">Edit Profile Info</h2>

        {/* Avatar + Document Upload */}
        {step === 1 && (
          <>
            <div className="profile-image-section vertical">
              <img
                src={userData?.avatar_url || "/assets/user.png"}
                alt="Avatar"
                className="profile-avatar"
              />
              <div className="upload-actions">
                <button
                  onClick={() => avatarInputRef.current.click()}
                  className="upload-btn"
                  type="button"
                >
                  Update Avatar
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarUpload}
                />

                <button
                  onClick={() => documentInputRef.current.click()}
                  className="upload-btn"
                  type="button"
                >
                  Upload Resume
                </button>
                <input
                  ref={documentInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  style={{ display: "none" }}
                  onChange={handleDocumentUpload}
                />
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
              className="edit-profile-form"
            >
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <input
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Phone / Contact"
              />
              <div className="edit-profile-flex-row">
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                />
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </div>
              <button
                type="button"
                className="edit-profile-submit"
                onClick={handleStepOneContinue}
              >
                Continue
              </button>
            </form>
          </>
        )}

        {/* Page 2: Bio, Skills, Links */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="edit-profile-form">
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <textarea
              name="about"
              value={form.about}
              onChange={handleChange}
              placeholder="Short Bio (About You)"
              required
            />
            <input
              type="text"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="Skills (comma-separated)"
            />
            <input
              type="text"
              name="tools"
              value={form.tools}
              onChange={handleChange}
              placeholder="Tools / Software (comma-separated)"
            />
            <input
              type="text"
              name="github"
              value={form.github}
              onChange={handleChange}
              placeholder="GitHub URL"
            />
            <input
              type="text"
              name="portfolio"
              value={form.portfolio}
              onChange={handleChange}
              placeholder="Portfolio URL"
            />
            <input
              type="text"
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn URL"
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                className="upload-btn"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button type="submit" className="header-btn">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
