import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import ConfirmModal from '../components/ConfirmModal';

export default function Recipes() {
  const { recipes, deleteRecipe } = useRecipes();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return searchParams.get('category') || 'All';
  });
  const [prepTimeFilter, setPrepTimeFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  // Deletion Modal State
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  // Sync category with URL search param if present
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPrepTimeFilter('All');
    setDifficultyFilter('All');
    setSearchParams({});
  };

  // Filter recipes dynamically
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // 1. Search term (matches name or any ingredient)
      const cleanSearch = searchTerm.toLowerCase().trim();
      const matchesName = recipe.name.toLowerCase().includes(cleanSearch);
      const matchesIngredient = recipe.ingredients.some(ing => 
        ing.toLowerCase().includes(cleanSearch)
      );
      const matchesSearch = cleanSearch === '' || matchesName || matchesIngredient;

      // 2. Category match
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;

      // 3. Prep time match
      let matchesPrepTime = true;
      const time = Number(recipe.prepTime) || 0;
      if (prepTimeFilter === 'under15') {
        matchesPrepTime = time < 15;
      } else if (prepTimeFilter === '15-30') {
        matchesPrepTime = time >= 15 && time <= 30;
      } else if (prepTimeFilter === '30-45') {
        matchesPrepTime = time > 30 && time <= 45;
      } else if (prepTimeFilter === 'above45') {
        matchesPrepTime = time > 45;
      }

      // 4. Difficulty match
      const matchesDifficulty = difficultyFilter === 'All' || 
        recipe.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesPrepTime && matchesDifficulty;
    });
  }, [recipes, searchTerm, selectedCategory, prepTimeFilter, difficultyFilter]);

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'All' || prepTimeFilter !== 'All' || difficultyFilter !== 'All';

  const handleDeleteRequest = (recipe) => {
    setRecipeToDelete(recipe);
  };

  const handleConfirmDelete = () => {
    if (recipeToDelete) {
      deleteRecipe(recipeToDelete.id);
      setRecipeToDelete(null);
    }
  };

  return (
    <div className="recipes-page container">
      {/* Page Header */}
      <div className="recipes-header">
        <h1>Healthy Recipes</h1>
        <p>Find nutritious recipes that match your taste, dietary preferences, and prep time.</p>
      </div>

      {/* Search & Filter Control Panel */}
      <div className="filter-bar">
        {/* Live Search Bar */}
        <SearchBar 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder="Search recipes by title (e.g. Avocado, Salmon) or ingredient (e.g. egg, spinach)..."
        />

        {/* Filter Controls Row */}
        <div className="filter-controls-row">
          {/* Category Pills */}
          <CategoryFilter 
            selectedCategory={selectedCategory} 
            onSelectCategory={handleCategorySelect} 
          />

          {/* Dropdown Filters & Clear Button */}
          <div className="filter-dropdowns">
            {/* Prep Time Dropdown */}
            <select
              value={prepTimeFilter}
              onChange={(e) => setPrepTimeFilter(e.target.value)}
              className="filter-select"
              aria-label="Filter by preparation time"
            >
              <option value="All">All Prep Times</option>
              <option value="under15">Under 15 Minutes</option>
              <option value="15-30">15–30 Minutes</option>
              <option value="30-45">30–45 Minutes</option>
              <option value="above45">Above 45 Minutes</option>
            </select>

            {/* Difficulty Dropdown */}
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="filter-select"
              aria-label="Filter by difficulty"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
            </select>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="btn btn-outline btn-sm"
                title="Reset all filters"
              >
                <RotateCcw size={14} />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header Info */}
      <div className="recipe-count-info">
        <span>
          Showing <strong>{filteredRecipes.length}</strong> of {recipes.length} healthy recipes
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </span>
      </div>

      {/* Recipe Cards Responsive Grid or Empty State */}
      {filteredRecipes.length > 0 ? (
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onDeleteRequest={handleDeleteRequest}
            />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon="search"
          title="No recipes found"
          message="We couldn't find any recipes matching your current search query or combination of filters. Try adjusting your keywords or clearing the filters."
          actionText="Clear All Filters"
          onActionClick={handleClearFilters}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!recipeToDelete}
        title="Delete Custom Recipe"
        message={`Are you sure you want to delete "${recipeToDelete?.name}"? This recipe will be permanently removed.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setRecipeToDelete(null)}
      />
    </div>
  );
}
