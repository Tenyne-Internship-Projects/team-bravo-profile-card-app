// src/components/FilterBar.jsx
import { useState } from "react";

const TAG_OPTIONS = ["Marketing", "Fulltime", "Freelance", "Remote"];

const FilterBar = ({ filters, onFilterChange }) => {
  const [search, setSearch] = useState(filters.search || "");
  const [minBudget, setMinBudget] = useState(filters.min_budget || "");
  const [maxBudget, setMaxBudget] = useState(filters.max_budget || "");
  const [tags, setTags] = useState(filters.tags || []);

  const handleTagToggle = (tag) => {
    const updated = tags.includes(tag)
      ? tags.filter((t) => t !== tag)
      : [...tags, tag];
    setTags(updated);
    onFilterChange({
      search,
      min_budget: minBudget,
      max_budget: maxBudget,
      tags: updated,
    });
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    onFilterChange({
      search: e.target.value,
      min_budget: minBudget,
      max_budget: maxBudget,
      tags,
    });
  };

  const handleBudgetChange = (type, value) => {
    const val = value === "" ? "" : parseInt(value);
    if (type === "min") setMinBudget(val);
    if (type === "max") setMaxBudget(val);
    onFilterChange({
      search,
      min_budget: type === "min" ? val : minBudget,
      max_budget: type === "max" ? val : maxBudget,
      tags,
    });
  };

  const handleClear = () => {
    setSearch("");
    setMinBudget("");
    setMaxBudget("");
    setTags([]);
    onFilterChange({ search: "", min_budget: "", max_budget: "", tags: [] });
  };

  return (
    <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 border-b border-gray-200">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by title, company, keywords"
        value={search}
        onChange={handleSearchChange}
        className="flex-1 min-w-[200px] px-3 py-2 border rounded-md"
      />

      {/* Budget Filter */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min budget"
          value={minBudget}
          onChange={(e) => handleBudgetChange("min", e.target.value)}
          className="w-24 px-2 py-1 border rounded-md"
        />
        <span className="text-gray-500">–</span>
        <input
          type="number"
          placeholder="Max budget"
          value={maxBudget}
          onChange={(e) => handleBudgetChange("max", e.target.value)}
          className="w-24 px-2 py-1 border rounded-md"
        />
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {TAG_OPTIONS.map((tag) => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full text-sm border ${
              tags.includes(tag)
                ? "bg-purple-600 text-white border-purple-600"
                : "text-gray-600 border-gray-300"
            }`}
            onClick={() => handleTagToggle(tag)}
          >
            {tag}
          </button>
        ))}
        {tags.length > 0 && (
          <button
            className="text-sm text-red-500 underline ml-2"
            onClick={handleClear}
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
