// src/pages/CreateProjectForm.jsx
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CreateProjectForm.css";

const CreateProjectForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    responsibilities: "",
    requirements: "",
    skills: "",
    min_budget: "",
    max_budget: "",
    currency: "USD",
  });
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setAttachments([...e.target.files]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.entries(form).forEach(([key, val]) => data.append(key, val));
    attachments.forEach((file) => data.append("attachments", file));

    try {
      await axios.post("/api/projects", data);
      toast.success("Project posted successfully!");
      setForm({
        title: "",
        description: "",
        responsibilities: "",
        requirements: "",
        skills: "",
        min_budget: "",
        max_budget: "",
        currency: "USD",
      });
      setAttachments([]);
    } catch (err) {
      toast.error("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-project-wrapper">
      <h2 className="create-project-title">Post a Job</h2>
      <form onSubmit={handleSubmit} className="create-project-form">
        <input
          name="title"
          type="text"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="input"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="textarea"
          required
        />
        <textarea
          name="responsibilities"
          placeholder="Responsibilities"
          value={form.responsibilities}
          onChange={handleChange}
          className="textarea"
        />
        <textarea
          name="requirements"
          placeholder="Requirements"
          value={form.requirements}
          onChange={handleChange}
          className="textarea"
        />
        <input
          name="skills"
          type="text"
          placeholder="Skills (comma-separated)"
          value={form.skills}
          onChange={handleChange}
          className="input"
        />
        <div className="budget-fields">
          <input
            name="min_budget"
            type="number"
            placeholder="Min Budget"
            value={form.min_budget}
            onChange={handleChange}
            className="input"
          />
          <input
            name="max_budget"
            type="number"
            placeholder="Max Budget"
            value={form.max_budget}
            onChange={handleChange}
            className="input"
          />
        </div>
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="select"
        >
          <option value="USD">USD</option>
          <option value="NGN">NGN</option>
          <option value="EUR">EUR</option>
        </select>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />
        <div className="form-buttons">
          <button
            type="reset"
            onClick={() => {
              setForm({
                title: "",
                description: "",
                responsibilities: "",
                requirements: "",
                skills: "",
                min_budget: "",
                max_budget: "",
                currency: "USD",
              });
              setAttachments([]);
            }}
            className="cancel-button"
          >
            Cancel
          </button>
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
