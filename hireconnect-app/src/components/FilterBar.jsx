import { useState } from "react";
import "../styles/FilterBar.css";

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
    <div className="filterbar-container">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by title, company, keywords"
        value={search}
        onChange={handleSearchChange}
        className="filterbar-search"
      />

      {/* Budget Filter */}
      <div className="filterbar-budget-group">
        <input
          type="number"
          placeholder="Min budget"
          value={minBudget}
          onChange={(e) => handleBudgetChange("min", e.target.value)}
          className="filterbar-budget-input"
        />
        <span className="filterbar-separator">–</span>
        <input
          type="number"
          placeholder="Max budget"
          value={maxBudget}
          onChange={(e) => handleBudgetChange("max", e.target.value)}
          className="filterbar-budget-input"
        />
      </div>

      {/* Tags */}
      <div className="filterbar-tags">
        {TAG_OPTIONS.map((tag) => (
          <button
            key={tag}
            className={`tag-button ${tags.includes(tag) ? "active" : ""}`}
            onClick={() => handleTagToggle(tag)}
          >
            {tag}
          </button>
        ))}
        {tags.length > 0 && (
          <button className="clear-tags-btn" onClick={handleClear}>
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
