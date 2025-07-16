import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import ApplyModal from "./ApplyModal";
import { FaMapMarkerAlt, FaEye } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import "../styles/ProjectCard.css";

const ProjectCard = ({
  project,
  onSelect,
  isSelected,
  isFavorite,
  onToggleFavorite,
}) => {
  const {
    id,
    title,
    description,
    min_budget,
    max_budget,
    currency,
    created_at,
    requirements,
    skills,
    posted_by,
    attachments,
    views,
    location = "Lagos, Nigeria",
  } = project;

  const shortDescription = description.slice(0, 100) + "...";
  const budget = `${currency} ${min_budget} - ${max_budget}`;
  const postedDate = new Date(created_at).toLocaleDateString();
  const { userData } = useContext(AppContext);
  const [showApplyModal, setShowApplyModal] = useState(false);

  return (
    <div
      onClick={() => onSelect(project)}
      className={`project-card ${isSelected ? "selected" : ""}`}
    >
      <div className="project-header">
        <div className="logo-placeholder">G</div>

        <button
          className="favorite-button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(project.id);
          }}
        >
          {isFavorite ? <BsHeartFill /> : <BsHeart />}
        </button>
      </div>

      <div className="mt-2">
        <p className="project-company">{posted_by?.name || "Google Inc."}</p>
        <h3 className="project-title">{title}</h3>
      </div>

      <p className="project-description">{shortDescription}</p>

      <div className="project-skills">
        {skills.slice(0, 3).map((skill, index) => (
          <span key={index} className="project-skill">
            {skill}
          </span>
        ))}
      </div>

      <div className="project-meta">
        <div className="project-meta-item">
          <FaMapMarkerAlt />
          <span>{location}</span>
        </div>
        <div className="project-meta-item">
          <FaEye />
          <span>{views || 240} views</span>
        </div>
        <span className="project-budget">{budget}/year</span>
      </div>

      <div className="project-date">Posted: {postedDate}</div>

      {userData?.role === "FREELANCER" && (
        <div className="project-apply">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowApplyModal(true);
            }}
            className="apply-btn"
          >
            Apply Now
          </button>
        </div>
      )}

      {showApplyModal && (
        <ApplyModal projectId={id} onClose={() => setShowApplyModal(false)} />
      )}
    </div>
  );
};

export default ProjectCard;
