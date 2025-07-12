// src/components/JobDetailModal.jsx

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FavoriteToggle from "./FavoriteToggle";
import "../styles/JobDetailModal.css";

const JobDetailModal = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="modal-wrapper" onClose={onClose}>
        <div className="modal-overlay" />
        <div className="modal-container">
          <Dialog.Panel className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <Dialog.Title className="modal-title">{project.title}</Dialog.Title>
              <XMarkIcon className="close-icon" onClick={onClose} />
            </div>

            {/* Meta Information */}
            <div className="modal-meta">
              <span className="meta-tag">
                Budget: ${project.min_budget} - ${project.max_budget}
              </span>
              <span className="meta-tag">
                Location: {project.location || "Remote"}
              </span>
              <FavoriteToggle
                projectId={project.id}
                isInitiallyFavorited={project.isFavorited}
              />
            </div>

            {/* Description */}
            <div className="modal-section">
              <h3>Description</h3>
              <p>{project.description || "No description provided."}</p>
            </div>

            {/* Requirements */}
            {project.requirements && (
              <div className="modal-section">
                <h3>Requirements</h3>
                <p>{project.requirements}</p>
              </div>
            )}

            {/* Responsibilities */}
            {project.responsibilities && (
              <div className="modal-section">
                <h3>Responsibilities</h3>
                <p>{project.responsibilities}</p>
              </div>
            )}

            {/* Skills */}
            {project.skills && project.skills.length > 0 && (
              <div className="modal-section">
                <h3>Skills Required</h3>
                <ul className="skills-list">
                  {project.skills.map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Action Buttons */}
            <div className="modal-actions">
              <button className="btn-secondary" onClick={onClose}>
                Close
              </button>
              <button className="btn-primary">Apply Now</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default JobDetailModal;
