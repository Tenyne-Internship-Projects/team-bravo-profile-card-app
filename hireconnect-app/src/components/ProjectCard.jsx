import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import JobDetailModal from "./JobDetailModal";
import ApplyModal from "./ApplyModal";
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
    min_budget,
    max_budget,
    currency,
    created_at,
    skills,
    posted_by,
    views,
  } = project;

  const { userData } = useContext(AppContext);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const budget = `${currency} ${min_budget} - ${max_budget}`;
  const posterInitial = posted_by?.name?.charAt(0).toUpperCase() || "C";
  const posterName = posted_by?.name || "Client";

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`project-card ${isSelected ? "selected" : ""}`}>
      {/* Top row: Logo, Title, Details icon, Apply */}
      <div className="project-top-row">
        <div className="logo-placeholder">{posterInitial}</div>

        <div className="project-title-section">
          <p className="project-company">{posterName}</p>
          <h3 className="project-title">{title}</h3>
        </div>

        <div className="project-actions">
          <button
            className="details-icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(true);
            }}
            title="View Job Details"
          >
            📄
          </button>

          <JobDetailModal
            isOpen={showDetails}
            onClose={() => setShowDetails(false)}
            onApply={() => {
              setShowDetails(false);
              setShowApplyModal(true);
            }}
            project={project}
          />

          {userData?.role === "FREELANCER" && (
            <button
              className="apply-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowApplyModal(true);
              }}
            >
              Resume Application
            </button>
          )}
        </div>
      </div>

      {/* Skills */}
      {Array.isArray(skills) && skills.length > 0 && (
        <div className="project-skills-row">
          <strong>Required Skills:</strong>{" "}
          {skills.map((skill, idx) => (
            <span key={idx} className="project-skill">
              {skill}
              {idx < skills.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      )}

      {/* Bottom row: Job ID & Views */}
      <div className="project-meta-bottom">
        <span className="job-id">Job Id: {id}</span>
        <span className="project-views">{views ?? 0} views</span>
      </div>

      {showApplyModal && (
        <ApplyModal projectId={id} onClose={() => setShowApplyModal(false)} />
      )}
    </div>
  );
};

export default ProjectCard;
