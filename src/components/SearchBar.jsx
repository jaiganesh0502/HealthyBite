import React from 'react';
import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange, placeholder = "Search recipes, ingredients..." }) {
  return (
    <div className="search-input-wrapper">
      <Search size={19} className="search-icon" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
        aria-label="Search recipes and ingredients"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="search-clear-btn"
          aria-label="Clear search text"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
