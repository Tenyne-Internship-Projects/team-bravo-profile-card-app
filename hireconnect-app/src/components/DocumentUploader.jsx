import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DocumentUploader = ({ backendUrl, getUserData }) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("documents", file);
    });

    try {
      setUploading(true);
      await axios.post(`${backendUrl}/api/profile/upload-documents`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Documents uploaded successfully");
      await getUserData();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      inputRef.current.value = null;
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#302B63]">
        Upload Documents
      </label>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.png,.jpg"
        onChange={handleFileUpload}
        className="block w-full border rounded p-2"
        disabled={uploading}
      />
    </div>
  );
};

export default DocumentUploader;
