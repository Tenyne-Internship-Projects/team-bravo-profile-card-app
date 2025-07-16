import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animations";
import "../styles/profilecard.css";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const { userData, getUserData } = useContext(AppContext);
  console.log("userData:", userData);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userData) {
        await getUserData();
      }
      setIsLoading(false);
    };
    fetchProfile();
  }, [userData]);

  useEffect(() => {
    if (userData) {
      const isProfileIncomplete =
        !userData.fullName?.trim() ||
        !userData.bio?.trim() ||
        !userData.state?.trim() ||
        !userData.country?.trim();

      const alreadySeen = sessionStorage.getItem("seenWelcomeModal");

      if (isProfileIncomplete && !alreadySeen) {
        setShowModal(true);
        sessionStorage.setItem("seenWelcomeModal", "true");
      }
    }
  }, [userData]);

  const handleEdit = () => navigate("/edit-profile");

  const profileData = userData?.profile || {};

  const profile = {
    username: profileData.username,
    fullName: profileData.fullName,
    state: profileData.state,
    country: profileData.country,
    bio: profileData.bio,
    avatar: profileData.avatar_url
      ? `${import.meta.env.VITE_BACKEND_URL}/${profileData.avatar_url.replace(
          /^\/+/,
          ""
        )}`
      : "/assets/user.png",
    skills: profileData.skills
      ? profileData.skills.split(",").map((s) => s.trim())
      : [],
    tools: profileData.tools
      ? profileData.tools.split(",").map((t) => t.trim())
      : [],
    email: profileData.email,
    phone: profileData.phone,
    github: profileData.github,
    linkedin: profileData.linkedin,
    portfolio: profileData.portfolio,
    documents: Array.isArray(profileData.documents)
      ? profileData.documents.map((doc, i) => ({
          name: `Document ${i + 1}`,
          url: `http://localhost:3000${doc}`,
        }))
      : [],
  };

  if (isLoading || !userData) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="spinner" />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {showModal && (
        <div className="welcome-modal-overlay">
          <div className="welcome-modal">
            <p>👋 Welcome to your dashboard!</p>
            <p>
              Let’s get started! Please click on the blue{" "}
              <strong>Edit Profile </strong> button to complete your setup.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="edit-now-btn"
            >
              Okay, Got It
            </button>
          </div>
        </div>
      )}

      <motion.div
        className="profile-card"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="card-header" variants={itemVariants}>
          <div className="header-actions">
            <button onClick={handleEdit} className="header-btn">
              Edit Profile
            </button>
          </div>
        </motion.div>
        <motion.div className="card-body" variants={itemVariants}>
          {/* Avatar + Name + Username */}
          <div className="profile-image-section vertical">
            <div className="avatar-wrapper">
              <img
                src={profile.avatar}
                alt="Avatar"
                className="profile-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/user.png";
                }}
              />
            </div>
            {/* Documents */}
            <div className="profile-section">
              <h3 className="section-title">Uploaded Documents</h3>
              <div className="document-list info-list">
                {profile.documents.length > 0 ? (
                  profile.documents.map((doc, i) => (
                    <p key={i} className="info-item">
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {doc.name || `Document ${i + 1}`}
                      </a>
                    </p>
                  ))
                ) : (
                  <p className="empty">No documents uploaded</p>
                )}
              </div>
            </div>

            {/* Full Name */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Full Name</span>
                <span className="field-value">
                  {profile.fullName || (
                    <span className="empty">Not provided</span>
                  )}
                </span>
              </div>
            </div>

            {/* Username */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Username</span>
                <span className="field-value">
                  @{profile.username || <span className="empty">N/A</span>}
                </span>
              </div>
            </div>

            {/* Bio */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Bio</span>
                <span className="field-value">
                  {profile.bio || <span className="empty">Not provided</span>}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Location</span>
                <span className="field-value">
                  {profile.state && profile.country ? (
                    `${profile.state}, ${profile.country}`
                  ) : (
                    <span className="empty">Not provided</span>
                  )}
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Email</span>
                <span className="field-value">
                  {profile.email ? (
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  ) : (
                    <span className="empty">Not provided</span>
                  )}
                </span>
              </div>

              <div className="field-row">
                <span className="field-label">Phone</span>
                <span className="field-value">
                  {profile.phone ? (
                    <a href={`tel:${profile.phone}`}>{profile.phone}</a>
                  ) : (
                    <span className="empty">Not provided</span>
                  )}
                </span>
              </div>
            </div>

            {/* Links */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Portfolio</span>
                <span className="field-value">
                  {profile.portfolio ? (
                    <a
                      href={profile.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile.portfolio}
                    </a>
                  ) : (
                    <span className="empty">Not provided</span>
                  )}
                </span>
              </div>

              <div className="field-row">
                <span className="field-label">GitHub</span>
                <span className="field-value">
                  {profile.github ? (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile.github}
                    </a>
                  ) : (
                    <span className="empty">Not provided</span>
                  )}
                </span>
              </div>

              <div className="field-row">
                <span className="field-label">LinkedIn</span>
                <span className="field-value">
                  {profile.linkedin ? (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile.linkedin}
                    </a>
                  ) : (
                    <span className="empty">Not provided</span>
                  )}
                </span>
              </div>
            </div>

            {/* Skills */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Main Skill Categories</span>
                <span className="field-value">
                  {profile.skills.length > 0 ? (
                    profile.skills.join(", ")
                  ) : (
                    <span className="empty">Not provided</span>
                  )}
                </span>
              </div>
            </div>

            {/* Tools */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Tools / Software</span>
                <span className="field-value">
                  {profile.tools.length > 0 ? (
                    profile.tools.join(", ")
                  ) : (
                    <span className="empty">Not provided</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
