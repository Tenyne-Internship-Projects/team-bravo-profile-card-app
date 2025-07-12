import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DocumentUploader from "../components/DocumentUploader";
import DocumentList from "../components/DocumentList";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../utils/animations";

const EditProfileForm = () => {
  const { userData, backendUrl, getUserData } = useContext(AppContext);
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    bio: "",
    skills: "",
    tools: "",
    github: "",
    portfolio: "",
    linkedin: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setForm({
        fullName: userData.fullname || "",
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
        country: userData.country || "",
        state: userData.state || "",
        city: userData.city || "",
        bio: userData.bio || "",
        skills: userData.skills || "",
        tools: userData.tools || "",
        github: userData.github || "",
        portfolio: userData.portfolio || "",
        linkedin: userData.linkedin || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${backendUrl}/api/profile`, form, {
        withCredentials: true,
      });
      toast.success("Profile updated!");
      await getUserData();
      navigate("/profile");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      await axios.post(`${backendUrl}/api/profile/upload-avatar`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Avatar uploaded");
      await getUserData();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Avatar upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6 rounded shadow space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-2xl font-semibold text-[#302B63]"
          variants={itemVariants}
        >
          Edit Profile
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { name: "fullName", placeholder: "Full Name" },
            { name: "username", placeholder: "Username" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "phone", placeholder: "Phone Number", type: "tel" },
            { name: "country", placeholder: "Country" },
            { name: "state", placeholder: "State" },
            { name: "city", placeholder: "City" },
            { name: "skills", placeholder: "Skills (comma-separated)" },
            { name: "tools", placeholder: "Tools (comma-separated)" },
            { name: "portfolio", placeholder: "Portfolio URL" },
            { name: "github", placeholder: "GitHub URL" },
            { name: "linkedin", placeholder: "LinkedIn URL" },
          ].map(({ name, placeholder, type = "text" }) => (
            <motion.input
              key={name}
              type={type}
              name={name}
              placeholder={placeholder}
              value={form[name]}
              onChange={handleChange}
              className="input"
              variants={itemVariants}
            />
          ))}
        </div>

        <motion.textarea
          name="bio"
          placeholder="Bio / About"
          value={form.bio}
          onChange={handleChange}
          rows={4}
          className="w-full border p-2 rounded text-sm"
          variants={itemVariants}
        />

        <motion.div
          className="flex justify-between items-center flex-wrap gap-4"
          variants={itemVariants}
        >
          <label className="bg-gray-300 text-[#302B63] px-4 py-2 rounded cursor-pointer">
            Upload Avatar
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="bg-[#302B63] text-white px-6 py-2 rounded"
          >
            Save Changes
          </button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <DocumentUploader backendUrl={backendUrl} getUserData={getUserData} />
          <DocumentList
            documents={userData?.documents || []}
            backendUrl={backendUrl}
            getUserData={getUserData}
          />
        </motion.div>
      </motion.form>
    </div>
  );
};

export default EditProfileForm;
