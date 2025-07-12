// src/components/ProjectCard.jsx

import React from "react";
import { Eye } from "lucide-react";
import FavoriteToggle from "./FavoriteToggle"; 
import "../styles/ProjectCard.css";

const ProjectCard = ({ project, onDetailsClick }) => {
  const {
    id,
    title,
    skills = [],
    jobId,
    isHiring = false,
    isFavorited = false, 
  } = project;

  return (
    <div className="project-card">
      <div className="project-card-top">
        <h2 className="job-title">{title}</h2>
        <div className="project-card-actions">
          <button
            onClick={onDetailsClick}
            className="details-btn"
            title="View Details"
          >
            <Eye size={18} />
          </button>

          {/*  Favorite Toggle Button */}
          <FavoriteToggle
            projectId={id}
            isInitiallyFavorited={isFavorited}
          />
        </div>
      </div>

      <p className="skills-label">Required Skills:</p>
      <div className="badge-list">
        {skills.map((skill, i) => (
          <span key={i} className="badge">{skill}</span>
        ))}
      </div>

      <p className="job-id">Job ID: {jobId}</p>

      {isHiring && <span className="project-badge">Actively Hiring</span>}

      <button
        className="project-btn"
        onClick={(e) => {
          e.stopPropagation();
          alert(`Apply to project: ${title}`);
        }}
      >
        Apply
      </button>
    </div>
  );
};

export default ProjectCard;
