// src/pages/ClientDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animations";
import "../styles/ClientDashboard.css";

const ClientDashboard = () => {
  const { userData, getUserData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [clientProfile, setClientProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!userData) await getUserData();
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/client/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        if (data.success) {
          setClientProfile(data.profile);
        }
      } catch (err) {
        console.error("Failed to fetch client profile", err);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleEdit = () => navigate("/edit-client-profile");

  if (isLoading || !clientProfile) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="spinner" />
          <p>Loading client profile...</p>
        </div>
      </div>
    );
  }

  const {
    company_name,
    logo,
    description,
    industry,
    website,
    location,
    created_at,
  } = clientProfile;

  return (
    <div className="profile-container">
      {showModal && (
        <div className="welcome-modal-overlay">
          <div className="welcome-modal">
            <p>👋 Welcome to your dashboard!</p>
            <p>
              Please click on the <strong>Edit Profile</strong> button to
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
          {/* Logo and Company Name */}
          <div className="profile-image-section vertical">
            <div className="avatar-wrapper">
              <img
                src={
                  logo
                    ? `${import.meta.env.VITE_BACKEND_URL}/${logo.replace(
                        /^\/+/,
                        ""
                      )}`
                    : "/assets/company.png"
                }
                alt="Company Logo"
                className="profile-avatar"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/assets/company.png";
                }}
              />
            </div>

            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Company Name</span>
                <span className="field-value">
                  {company_name || <span className="empty">Not provided</span>}
                </span>
              </div>
            </div>

            {/* Industry */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Industry</span>
                <span className="field-value">
                  {industry || <span className="empty">Not provided</span>}
                </span>
              </div>
            </div>

            {/* Website */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Website</span>
                <span className="field-value">
                  {website ? (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                      {website}
                    </a>
                  ) : (
                    <span className="empty">Not provided</span>
                  )}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Location</span>
                <span className="field-value">
                  {location || <span className="empty">Not provided</span>}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">About Company</span>
                <span className="field-value">
                  {description || <span className="empty">Not provided</span>}
                </span>
              </div>
            </div>

            {/* Joined Date */}
            <div className="profile-section">
              <div className="field-row">
                <span className="field-label">Joined On</span>
                <span className="field-value">
                  {new Date(created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClientDashboard;
