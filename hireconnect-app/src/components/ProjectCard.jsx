import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import ApplyModal from "./ApplyModal";
import { FaMapMarkerAlt, FaEye } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";

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
    location = "Lagos, Nigeria", // Default for mockup
  } = project;

  const shortDescription = description.slice(0, 100) + "...";

  const budget = `${currency} ${min_budget} - ${max_budget}`;

  const postedDate = new Date(created_at).toLocaleDateString();

  const { userData } = useContext(AppContext);

  const [showApplyModal, setShowApplyModal] = useState(false);

  return (
    <div
      onClick={() => onSelect(project)}
      className={`cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md transition ${
        isSelected ? "border-purple-600 shadow-md" : "border-gray-200"
      }`}
    >
      <div className="flex justify-between items-start">
        {/* Logo Placeholder */}
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-lg font-bold text-purple-600">
          G
        </div>

        {/* Favorite */}
        <button
          className="text-purple-600 text-xl"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(project.id);
          }}
        >
          {isFavorite ? <BsHeartFill /> : <BsHeart />}
        </button>
      </div>

      {/* Company & Title */}
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          {posted_by?.name || "Google Inc."}
        </p>
        <h3 className="text-lg font-semibold text-purple-800">{title}</h3>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-2">{shortDescription}</p>

      {/* Skills */}
      <div className="flex gap-1 flex-wrap mt-2 text-xs text-purple-700">
        {skills.slice(0, 3).map((skill, index) => (
          <span key={index} className="bg-purple-100 px-2 py-1 rounded-full">
            {skill}
          </span>
        ))}
      </div>

      {/* Meta Data */}
      <div className="flex justify-between mt-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaEye />
          <span>{views || 240} views</span>
        </div>
        <span className="text-purple-700 font-medium">{budget}/year</span>
      </div>

      {/* Date & Status */}
      <div className="text-right mt-2 text-xs text-gray-400">
        Posted: {postedDate}
      </div>
      {userData?.role === "FREELANCER" && (
        <div className="mt-4 text-right">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering onSelect
              setShowApplyModal(true);
            }}
            className="bg-[#302B63] text-white px-4 py-2 rounded hover:bg-[#241a4f]"
          >
            Apply Now
          </button>
        </div>
      )}
      {/* Modal */}
      {showApplyModal && (
        <ApplyModal projectId={id} onClose={() => setShowApplyModal(false)} />
      )}
    </div>
  );
};

export default ProjectCard;
