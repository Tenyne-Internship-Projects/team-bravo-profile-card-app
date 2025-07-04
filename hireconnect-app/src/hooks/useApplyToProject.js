// /src/hooks/useApplyToProject.js

import { useState } from "react";
import { applyToProject } from "../api/projectApi";
import { toast } from "react-toastify";

export function useApplyToProject() {
  const [loading, setLoading] = useState(false);

  const submitApplication = async (projectId, applicationData, onSuccess) => {
    setLoading(true);
    try {
      await applyToProject(projectId, applicationData);
      toast.success("Application submitted successfully!");
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { submitApplication, loading };
}
