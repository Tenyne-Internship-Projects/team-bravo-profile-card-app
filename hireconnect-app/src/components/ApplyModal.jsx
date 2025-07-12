// src/components/ApplyModal.jsx
import React, { useState } from "react";
import { useApplyToProject } from "../hooks/useApplyToProject";
import "../styles/ApplyModal.css";

const ApplyModal = ({ projectId, onClose }) => {
  const [form, setForm] = useState({
    availability_type: "",
    notice_period: "",
    timezone: "",
    can_overlap_hours: false,
    expected_salary_hourly: "",
    expected_salary_monthly: "",
    project_experience_summary: "",
    understands_commitment: false,
    ready_for_interview: false,
    comfortable_with_validation: false,
    comfortable_with_ai_job: false,
  });

  const { submitApplication, loading } = useApplyToProject();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitApplication(projectId, form, onClose);
  };

  return (
    <div className="apply-modal-overlay">
      <form onSubmit={handleSubmit} className="apply-modal-form">
        <h2 className="apply-modal-title">Apply to Project</h2>

        <input
          type="text"
          name="availability_type"
          placeholder="Availability Type (Full Time / Part Time)"
          value={form.availability_type}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="text"
          name="notice_period"
          placeholder="Notice Period"
          value={form.notice_period}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="text"
          name="timezone"
          placeholder="Your Timezone (e.g., UTC+1)"
          value={form.timezone}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="number"
          name="expected_salary_hourly"
          placeholder="Expected Hourly Rate (USD)"
          value={form.expected_salary_hourly}
          onChange={handleChange}
          className="input"
        />

        <input
          type="number"
          name="expected_salary_monthly"
          placeholder="Expected Monthly Salary (USD)"
          value={form.expected_salary_monthly}
          onChange={handleChange}
          className="input"
        />

        <textarea
          name="project_experience_summary"
          placeholder="Brief summary of your experience related to this project"
          value={form.project_experience_summary}
          onChange={handleChange}
          rows={4}
        />

        {[
          "can_overlap_hours",
          "understands_commitment",
          "ready_for_interview",
          "comfortable_with_validation",
          "comfortable_with_ai_job",
        ].map((field) => (
          <label key={field} className="checkbox-label">
            <input
              type="checkbox"
              name={field}
              checked={form[field]}
              onChange={handleChange}
            />
            {field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </label>
        ))}

        <div className="apply-modal-buttons">
          <button type="button" onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyModal;
