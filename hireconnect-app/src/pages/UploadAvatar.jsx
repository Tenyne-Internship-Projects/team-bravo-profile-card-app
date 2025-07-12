// src/pages/UploadAvatar.jsx

import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/UploadPage.css";

const UploadAvatar = () => {
  const { backendUrl, getUserData } = useContext(AppContext);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a valid image");
    }
  };

  const handleUpload = async () => {
    if (!avatar) return toast.error("Please select an image first");

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      await axios.post(`${backendUrl}/api/profile/upload-avatar`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Avatar updated successfully");
      await getUserData();
      navigate("/profile");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Avatar upload failed");
    }
  };

  return (
    <div className="upload-wrapper">
      <h2 className="upload-title">Upload New Avatar</h2>

      <label htmlFor="avatar-upload" className="upload-preview">
        <img
          src={preview || "/assets/default-avatar.png"}
          alt="Preview"
          className="upload-img"
        />
      </label>

      <input
        type="file"
        id="avatar-upload"
        accept="image/*"
        onChange={handleChange}
      />

      <button onClick={handleUpload} className="upload-btn">
        Upload Avatar
      </button>
    </div>
  );
};

export default UploadAvatar;
