// src/pages/Profile.jsx

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animations";
import "../styles/profilecard.css";

const Profile = () => {
  const { userData, getUserData } = useContext(AppContext);
  console.log("userData:", userData);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userData) await getUserData();
      setIsLoading(false);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (userData) {
      const incomplete =
        !userData.fullName ||
        !userData.bio ||
        !userData.state ||
        !userData.country;
      if (incomplete) {
        setShowModal(true);
      }
    }
  }, [userData]);

  const handleEdit = () => navigate("/edit-profile");

  const profile = {
    username: userData?.username,
    fullName: userData?.fullName,
    state: userData?.state,
    country: userData?.country,
    bio: userData?.bio,
    avatar: userData?.avatar_url || "/assets/user.png",
    skills: userData?.skills || [],
    tools: userData?.tools || [],
    email: userData?.email,
    phone: userData?.phone,
    github: userData?.github,
    linkedin: userData?.linkedin,
    portfolio: userData?.portfolio,
    documents: userData?.documents || [],
  };

  if (isLoading) {
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
              Let’s get started! Please <strong>edit your profile</strong> to
              complete your setup.
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
              />
            </div>
            <div className="text-center">
              <h3 className="section-title">Full Name</h3>
              <p className="name">
                {profile.fullName || (
                  <span className="empty">Not provided</span>
                )}
              </p>

              <h3 className="section-title">Username</h3>
              <p className="username">
                @{profile.username || <span className="empty">N/A</span>}
              </p>
            </div>
          </div>

          {/* Documents */}
          <div className="profile-section">
            <h3 className="section-title">Uploaded Documents</h3>
            <div className="document-list info-list">
              {profile.documents.length > 0 ? (
                profile.documents.map((doc, i) => (
                  <p key={i} className="info-item">
                    <a href={doc.url} target="_blank" rel="noopener noreferrer">
                      {doc.name || `Document ${i + 1}`}
                    </a>
                  </p>
                ))
              ) : (
                <p className="empty">No documents uploaded</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="profile-section">
            <h3 className="section-title">Bio</h3>
            <p className="bio">
              {profile.bio || <span className="empty">Not provided</span>}
            </p>
          </div>

          {/* Location */}
          <div className="profile-section">
            <h3 className="section-title">Location</h3>
            <p className="location">
              {profile.state && profile.country ? (
                <>
                  {profile.state}, {profile.country}
                </>
              ) : (
                <span className="empty">Not provided</span>
              )}
            </p>
          </div>

          {/* Contact Info */}
          <div className="profile-section">
            <h3 className="section-title">Contact Info</h3>
            <div className="info-list">
              {profile.email && (
                <p className="info-item">
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </p>
              )}
              {profile.phone && (
                <p className="info-item">
                  <a href={`tel:${profile.phone}`}>{profile.phone}</a>
                </p>
              )}
              {!profile.email && !profile.phone && (
                <p className="empty">Not provided</p>
              )}
            </div>
          </div>

          {/* Profile Links */}
          <div className="profile-section">
            <h3 className="section-title">Links</h3>
            <div className="info-list">
              {profile.portfolio && (
                <p className="info-item">
                  <a
                    href={profile.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.portfolio}
                  </a>
                </p>
              )}
              {profile.github && (
                <p className="info-item">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.github}
                  </a>
                </p>
              )}
              {profile.linkedin && (
                <p className="info-item">
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {profile.linkedin}
                  </a>
                </p>
              )}
              {!profile.portfolio && !profile.github && !profile.linkedin && (
                <p className="empty">No links provided</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="profile-section">
            <h3 className="section-title">Main Skill Categories</h3>
            <div className="badge-list">
              {profile.skills.length > 0 ? (
                profile.skills.map((skill, i) => (
                  <span key={i} className="badge">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="empty">Not provided</span>
              )}
            </div>
          </div>

          {/* Tools */}
          <div className="profile-section">
            <h3 className="section-title">Tools / Software</h3>
            <div className="badge-list">
              {profile.tools.length > 0 ? (
                profile.tools.map((tool, i) => (
                  <span key={i} className="badge">
                    {tool}
                  </span>
                ))
              ) : (
                <span className="empty">Not provided</span>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
