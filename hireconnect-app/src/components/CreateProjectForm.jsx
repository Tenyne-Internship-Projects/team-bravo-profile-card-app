// src/pages/CreateProjectForm.jsx
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
      const res = await axios.post("/api/projects", data);
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-purple-800">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded h-28"
          required
        />
        <textarea
          name="responsibilities"
          placeholder="Responsibilities"
          value={form.responsibilities}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded h-20"
        />
        <textarea
          name="requirements"
          placeholder="Requirements"
          value={form.requirements}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded h-20"
        />
        <input
          name="skills"
          type="text"
          placeholder="Skills (comma-separated)"
          value={form.skills}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <div className="flex gap-4">
          <input
            name="min_budget"
            type="number"
            placeholder="Min Budget"
            value={form.min_budget}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="max_budget"
            type="number"
            placeholder="Max Budget"
            value={form.max_budget}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>
        <select
          name="currency"
          value={form.currency}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="USD">USD</option>
          <option value="NGN">NGN</option>
          <option value="EUR">EUR</option>
        </select>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
        />
        <div className="flex justify-between mt-4">
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
            className="border px-6 py-2 rounded text-purple-800 hover:bg-purple-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-700 text-white px-6 py-2 rounded shadow hover:bg-purple-800"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
