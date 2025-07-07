import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import AuthLayout from "../layout/AuthLayout";
import "../styles/EditProfile.css";

const EditProfile = () => {
  const { userData, getUserData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    contact: "",
    country: "",
    state: "",
    about: "",
    skills: "",
    tools: "",
    github: "",
    portfolio: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (userData) {
      setForm({
        username: userData.username || "",
        email: userData.email || "",
        contact: userData.contact || "",
        country: userData.country || "",
        state: userData.state || "",
        about: userData.about || "",
        skills: userData.skills?.join(", ") || "",
        tools: userData.tools?.join(", ") || "",
        github: userData.github || "",
        portfolio: userData.portfolio || "",
      });
      setPreview(userData.image || "");
    } else {
      getUserData();
    }
  }, [userData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.warning("Please upload a valid image");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["username", "email", "country", "state", "about"];
    for (const field of requiredFields) {
      if (!form[field]) {
        toast.error(`Please fill in the ${field} field`);
        return;
      }
    }

    try {
      const formData = new FormData();
      for (const key in form) {
        formData.append(key, form[key]);
      }
      if (image) formData.append("image", image);

      const { data } = await axios.put(
        `${backendUrl}/api/user/edit-profile`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully");
        await getUserData();
        navigate("/profile");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    }
  };

  return (
    <AuthLayout>
      <div className="edit-profile-wrapper">
        <h2 className="edit-profile-title">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="edit-profile-avatar">
            <label htmlFor="image">
              <img
                src={preview || "https://via.placeholder.com/150"}
                alt="Profile"
              />
            </label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="edit-profile-note">Click image to change</p>
          </div>

          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="edit-profile-input"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="edit-profile-input"
            required
          />

          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            placeholder="Phone/Contact"
            className="edit-profile-input"
          />

          <div className="edit-profile-flex-row">
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country"
              className="edit-profile-input"
              required
            />
            <input
              type="text"
              name="state"
              value={form.state}
              onChange={handleChange}
              placeholder="State"
              className="edit-profile-input"
              required
            />
          </div>

          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            placeholder="About Me"
            className="edit-profile-textarea"
            required
          />

          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Skills (comma-separated)"
            className="edit-profile-input"
          />

          <input
            type="text"
            name="tools"
            value={form.tools}
            onChange={handleChange}
            placeholder="Tools (comma-separated)"
            className="edit-profile-input"
          />

          <input
            type="text"
            name="github"
            value={form.github}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="edit-profile-input"
          />

          <input
            type="text"
            name="portfolio"
            value={form.portfolio}
            onChange={handleChange}
            placeholder="Portfolio URL"
            className="edit-profile-input"
          />

          <button type="submit" className="edit-profile-submit">
            Save Changes
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default EditProfile;
