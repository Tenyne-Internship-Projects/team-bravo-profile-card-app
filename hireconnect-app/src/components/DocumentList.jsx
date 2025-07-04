import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    return <p className="text-sm text-gray-500">No documents uploaded.</p>;

  return (
    <ul className="space-y-2">
      {documents.map((doc, idx) => (
        <li
          key={idx}
          className="flex justify-between items-center border p-2 rounded"
        >
          <a
            href={`${backendUrl}/uploads/documents/${doc}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline truncate max-w-[80%]"
          >
            {doc}
          </a>
          <button
            onClick={() => handleDelete(doc)}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default DocumentList;
