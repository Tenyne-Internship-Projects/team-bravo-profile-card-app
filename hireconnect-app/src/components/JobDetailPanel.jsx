// src/components/JobDetailPanel.jsx
import { FaMapMarkerAlt, FaEye, FaFileAlt } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";
import "../styles/JobDetailPanel.css";

const JobDetailPanel = ({ project, onClose }) => {
  if (!project) return null;

  const {
    title,
    description,
    responsibilities,
    requirements,
    skills,
    currency,
    min_budget,
    max_budget,
    attachments,
    created_at,
    posted_by,
    location = "Remote",
    views = 300,
  } = project;

  const budgetRange = `${currency} ${min_budget} - ${max_budget}`;
  const postedDate = new Date(created_at).toLocaleDateString();

  return (
    <aside className="job-detail-panel">
      <div className="job-detail-header">
        <h2 className="job-title">{title}</h2>
        <button className="job-close-btn" onClick={onClose}>
          <BsArrowLeft className="text-xl" />
        </button>
      </div>

      <div className="job-meta">
        <p>
          <span className="font-medium">Posted by:</span>{" "}
          {posted_by?.name || "Google Inc."}
        </p>
        <p>
          <FaMapMarkerAlt />
          <span>{location}</span>
        </p>
        <p>
          <FaEye />
          <span>{views} views</span>
        </p>
        <p>
          <span className="font-medium">Posted on:</span> {postedDate}
        </p>
        <p>
          <span className="font-medium">Budget:</span>{" "}
          <span className="job-budget">{budgetRange}</span>
        </p>
      </div>

      <div className="job-section">
        <h4 className="job-section-title">Skills Required:</h4>
        <div className="job-skills">
          {skills.map((skill, idx) => (
            <span key={idx} className="job-skill">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {responsibilities && (
        <div className="job-section">
          <h4 className="job-section-title">Responsibilities</h4>
          <p className="job-section-text">{responsibilities}</p>
        </div>
      )}

      {requirements && (
        <div className="job-section">
          <h4 className="job-section-title">Requirements</h4>
          <p className="job-section-text">{requirements}</p>
        </div>
      )}

      {description && (
        <div className="job-section">
          <h4 className="job-section-title">Job Summary</h4>
          <p className="job-section-text">{description}</p>
        </div>
      )}

      {attachments?.length > 0 && (
        <div className="job-attachments">
          <h4 className="job-section-title">Attachments</h4>
          <ul>
            {attachments.map((fileUrl, idx) => (
              <li key={idx}>
                <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                  <FaFileAlt /> View file {idx + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="job-apply-btn">Apply to this Job</button>
    </aside>
  );
};

export default JobDetailPanel;
