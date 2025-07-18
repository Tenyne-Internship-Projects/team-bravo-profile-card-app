import { useState } from "react";
import "../styles/FilterBar.css";

const TAG_OPTIONS = ["Marketing", "Fulltime", "Freelance", "Remote"];

const FilterBar = ({ filters, onChange }) => {
  const [keyword, setKeyword] = useState(filters.keyword || "");
  const [min, setMin] = useState(filters.min || "");
  const [max, setMax] = useState(filters.max || "");
  const [skills, setSkills] = useState(filters.skills || []);

  const updateFilters = (updates) => {
    onChange({
      keyword,
      min,
      max,
      skills,
      ...updates,
    });
  };

  const handleTagToggle = (tag) => {
    const updated = skills.includes(tag)
      ? skills.filter((t) => t !== tag)
      : [...skills, tag];
    setSkills(updated);
    updateFilters({ skills: updated });
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    updateFilters({ keyword: e.target.value });
  };

  const handleBudgetChange = (type, value) => {
    const val = value === "" ? "" : parseInt(value);
    if (type === "min") setMin(val);
    if (type === "max") setMax(val);
    updateFilters({
      min: type === "min" ? val : min,
      max: type === "max" ? val : max,
    });
  };

  const handleClear = () => {
    setKeyword("");
    setMin("");
    setMax("");
    setSkills([]);
    onChange({ keyword: "", min: "", max: "", skills: [] });
  };

  return (
    <div className="filterbar-container">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by title, company, keywords"
        value={keyword}
        onChange={handleSearchChange}
        className="filterbar-search"
      />

      {/* Budget Filter */}
      <div className="filterbar-budget-group">
        <input
          type="number"
          placeholder="Min budget"
          value={min}
          onChange={(e) => handleBudgetChange("min", e.target.value)}
          className="filterbar-budget-input"
        />
        <span className="filterbar-separator">–</span>
        <input
          type="number"
          placeholder="Max budget"
          value={max}
          onChange={(e) => handleBudgetChange("max", e.target.value)}
          className="filterbar-budget-input"
        />
      </div>

      {/* Tags */}
      <div className="filterbar-tags">
        {TAG_OPTIONS.map((tag) => (
          <button
            key={tag}
            className={`tag-button ${skills.includes(tag) ? "active" : ""}`}
            onClick={() => handleTagToggle(tag)}
          >
            {tag}
          </button>
        ))}
        {skills.length > 0 && (
          <button className="clear-tags-btn" onClick={handleClear}>
            Clear all
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
