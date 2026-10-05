import React from 'react';

export const CATEGORY_OPTIONS = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Salads',
  'Smoothies'
];

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="category-pills" role="tablist" aria-label="Recipe categories">
      {CATEGORY_OPTIONS.map((cat) => (
        <button
          key={cat}
          type="button"
          role="tab"
          aria-selected={selectedCategory === cat}
          className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
