// src/components/forms/ProjectEditForm.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProject } from "@/api/projectApi";
import toast from "react-hot-toast";

const ProjectEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [formData, setFormData] = useState({
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data);
        setFormData({
          ...data,
          skills: data.skills.join(", "),
        });
      } catch (err) {
        toast.error("Failed to fetch project.");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "skills") {
        payload.append(
          key,
          value.split(",").map((s) => s.trim())
        );
      } else {
        payload.append(key, value);
      }
    });
    attachments.forEach((file) => payload.append("attachments", file));

    try {
      await updateProject(id, payload);
      toast.success("Project updated successfully!");
      navigate("/projects");
    } catch (err) {
      toast.error("Update failed.");
    }
  };

  if (loading) return <p>Loading project...</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white shadow rounded space-y-4"
    >
      <h2 className="text-2xl font-semibold text-purple-700">Edit Project</h2>

      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Project Title"
        className="input"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Short Description"
        rows={3}
        className="textarea"
      />

      <textarea
        name="responsibilities"
        value={formData.responsibilities}
        onChange={handleChange}
        placeholder="Responsibilities"
        rows={3}
        className="textarea"
      />

      <textarea
        name="requirements"
        value={formData.requirements}
        onChange={handleChange}
        placeholder="Requirements"
        rows={3}
        className="textarea"
      />

      <input
        name="skills"
        value={formData.skills}
        onChange={handleChange}
        placeholder="Skills (comma separated)"
        className="input"
      />

      <div className="flex space-x-4">
        <input
          type="number"
          name="min_budget"
          value={formData.min_budget}
          onChange={handleChange}
          placeholder="Min Budget"
          className="input"
        />
        <input
          type="number"
          name="max_budget"
          value={formData.max_budget}
          onChange={handleChange}
          placeholder="Max Budget"
          className="input"
        />
      </div>

      <select
        name="currency"
        value={formData.currency}
        onChange={handleChange}
        className="input"
      >
        <option value="USD">USD</option>
        <option value="NGN">NGN</option>
        <option value="EUR">EUR</option>
      </select>

      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="input"
      />

      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Update Project
        </button>
      </div>
    </form>
  );
};

export default ProjectEditForm;
