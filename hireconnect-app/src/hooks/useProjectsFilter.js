// src/hooks/useProjectsFilter.js
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const useProjectsFilter = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  // Filter state synced with URL
  const [filters, setFilters] = useState({
    search: params.get("search") || "",
    tags: params.getAll("tags") || [],
    min: params.get("min") || "",
    max: params.get("max") || "",
  });

  // Update URL when filters change
  useEffect(() => {
    const newParams = new URLSearchParams();
    if (filters.search) newParams.set("search", filters.search);
    if (filters.min) newParams.set("min", filters.min);
    if (filters.max) newParams.set("max", filters.max);
    filters.tags.forEach((tag) => newParams.append("tags", tag));
    setParams(newParams, { replace: true });
  }, [filters]);

  // Update individual filter fields
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const addTag = (tag) => {
    setFilters((prev) => ({
      ...prev,
      tags: [...new Set([...prev.tags, tag])],
    }));
  };

  const removeTag = (tag) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const clearAll = () => {
    setFilters({
      search: "",
      tags: [],
      min: "",
      max: "",
    });
    navigate("/projects"); // resets URL
  };

  return {
    filters,
    updateFilter,
    addTag,
    removeTag,
    clearAll,
  };
};

export default useProjectsFilter;
