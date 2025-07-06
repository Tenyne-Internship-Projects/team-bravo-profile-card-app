// src/components/JobDetailPanel.jsx
import { FaMapMarkerAlt, FaEye, FaFileAlt } from "react-icons/fa";
import { BsArrowLeft } from "react-icons/bs";

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
    <aside className="w-full md:w-[450px] h-full p-6 overflow-y-auto bg-white border-l border-gray-200 shadow-xl fixed md:relative right-0 top-0 z-40">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-purple-800">{title}</h2>
        <button
          className="text-gray-500 hover:text-purple-600"
          onClick={onClose}
        >
          <BsArrowLeft className="text-xl" />
        </button>
      </div>

      {/* Metadata */}
      <div className="mb-4 text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium">Posted by:</span>{" "}
          {posted_by?.name || "Google Inc."}
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt />
          <span>{location}</span>
        </p>
        <p className="flex items-center gap-2">
          <FaEye />
          <span>{views} views</span>
        </p>
        <p>
          <span className="font-medium">Posted on:</span> {postedDate}
        </p>
        <p>
          <span className="font-medium">Budget:</span>{" "}
          <span className="text-purple-700">{budgetRange}</span>
        </p>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h4 className="font-medium text-gray-800">Skills Required:</h4>
        <div className="flex gap-2 flex-wrap mt-1">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Responsibilities */}
      {responsibilities && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-1">Responsibilities</h4>
          <p className="text-gray-700 text-sm whitespace-pre-line">
            {responsibilities}
          </p>
        </div>
      )}

      {/* Requirements */}
      {requirements && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-1">Requirements</h4>
          <p className="text-gray-700 text-sm whitespace-pre-line">
            {requirements}
          </p>
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-1">Job Summary</h4>
          <p className="text-gray-700 text-sm whitespace-pre-line">
            {description}
          </p>
        </div>
      )}

      {/* Attachments */}
      {attachments?.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-1">Attachments</h4>
          <ul className="list-disc pl-5 text-sm text-blue-600 space-y-1">
            {attachments.map((fileUrl, idx) => (
              <li key={idx}>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  <FaFileAlt /> View file {idx + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Apply CTA */}
      <button className="mt-6 w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition">
        Apply to this Job
      </button>
    </aside>
  );
};

export default JobDetailPanel;
