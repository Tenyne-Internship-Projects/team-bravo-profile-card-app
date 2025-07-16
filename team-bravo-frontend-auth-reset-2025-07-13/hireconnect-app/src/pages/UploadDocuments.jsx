// src/pages/UploadDocuments.jsx

import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/UploadPage.css";

const UploadDocuments = () => {
  const { backendUrl, getUserData } = useContext(AppContext);
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDocuments(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (documents.length === 0) {
      toast.error("Select at least one document to upload");
      return;
    }

    const formData = new FormData();
    documents.forEach((file) => formData.append("documents", file));

    try {
      await axios.post(`${backendUrl}/api/profile/upload-documents`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Documents uploaded successfully");
      await getUserData();
      navigate("/profile");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="upload-wrapper">
      <h2 className="upload-title">Upload Documents</h2>

      <input
        type="file"
        id="document-upload"
        accept=".pdf,.doc,.docx,.jpg,.png"
        multiple
        onChange={handleChange}
      />

      <button onClick={handleUpload} className="upload-btn">
        Upload Files
      </button>
    </div>
  );
};

export default UploadDocuments;
