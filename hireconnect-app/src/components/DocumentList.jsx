import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/DocumentList.css";

const DocumentList = ({ documents = [], backendUrl, getUserData }) => {
  const handleDelete = async (filename) => {
    if (!window.confirm(`Delete "${filename}"?`)) return;

    try {
      await axios.delete(`${backendUrl}/api/profile/documents/${filename}`, {
        withCredentials: true,
      });
      toast.success("Deleted successfully");
      await getUserData();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Delete failed");
    }
  };

  if (!documents.length)
    return <p className="no-documents">No documents uploaded.</p>;

  return (
    <ul className="document-list">
      {documents.map((doc, idx) => (
        <li key={idx} className="document-item">
          <a
            href={`${backendUrl}/uploads/documents/${doc}`}
            target="_blank"
            rel="noopener noreferrer"
            className="document-link"
          >
            {doc}
          </a>
          <button onClick={() => handleDelete(doc)} className="delete-button">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DocumentList;
