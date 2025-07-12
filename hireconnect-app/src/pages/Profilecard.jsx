// src/components/ProfileCard.jsx

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animations";
import "../styles/profilecard.css";

const ProfileCard = () => {
  const { userData, getUserData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userData) await getUserData();
      setIsLoading(false);
    };
    fetchProfile();
  }, []);

  const handleEdit = () => navigate("/edit-profile");

  const profile = {
    username: userData?.username || "freelancer",
    fullName: userData?.fullName || "John Doe",
    state: userData?.state || "Lagos",
    country: userData?.country || "Nigeria",
    bio: userData?.bio || "No bio provided yet.",
    avatar: userData?.avatar_url || "/assets/kconnect.png",
    skills: userData?.skills || [],
    tools: userData?.tools || [],
    email: userData?.email || "user@email.com",
    phone: userData?.phone || "",
    github: userData?.github || "",
    linkedin: userData?.linkedin || "",
    portfolio: userData?.portfolio || "",
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
          <div className="profile-image-section">
            <img src={profile.avatar} alt="Avatar" className="profile-avatar" />
            <div>
              <h1 className="name">{profile.fullName}</h1>
              <h2 className="username">@{profile.username}</h2>
            </div>
          </div>

          {/* Bio + Location */}
          <p className="bio">{profile.bio}</p>
          <p className="location">{profile.state}, {profile.country}</p>

          {/* Contact Info */}
          <h3 className="section-title">Contact</h3>
          <div className="info-list">
            {[
              { label: "Email", value: profile.email, link: `mailto:${profile.email}` },
              { label: "Phone", value: profile.phone, link: `tel:${profile.phone}` },
              { label: "Portfolio", value: profile.portfolio, link: profile.portfolio },
              { label: "GitHub", value: profile.github, link: profile.github },
              { label: "LinkedIn", value: profile.linkedin, link: profile.linkedin },
            ].map(
              ({ value, link }, i) =>
                value && (
                  <p key={i} className="info-item">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                      {value}
                    </a>
                  </p>
                )
            )}
          </div>

          {/* Skills */}
          <div className="section-box">
            <h3 className="section-title">Main Skill Categories</h3>
            <div className="badge-list">
              {profile.skills.length > 0 ? (
                profile.skills.map((skill, i) => (
                  <span key={i} className="badge">{skill}</span>
                ))
              ) : (
                <span className="empty">Not provided</span>
              )}
            </div>
          </div>

          {/* Tools */}
          <div className="section-box">
            <h3 className="section-title">Tools / Software</h3>
            <div className="badge-list">
              {profile.tools.length > 0 ? (
                profile.tools.map((tool, i) => (
                  <span key={i} className="badge">{tool}</span>
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

export default ProfileCard;
