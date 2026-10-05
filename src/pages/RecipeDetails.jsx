import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Flame, 
  Heart, 
  ArrowLeft, 
  Edit3, 
  Trash2, 
  CheckSquare, 
  Square, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Tag,
  ChefHat,
  RotateCcw
} from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import ConfirmModal from '../components/ConfirmModal';
import EmptyState from '../components/EmptyState';
import { fallbackCategoryImages } from '../data/recipes';

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipeById, toggleFavourite, isFavourite, deleteRecipe } = useRecipes();

  const recipe = getRecipeById(id);

  // Ingredient Checklist state (store set of checked ingredient indices)
  const [checkedIngredients, setCheckedIngredients] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(recipe?.image);

  // If recipe not found, handle gracefully
  if (!recipe) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <EmptyState
          icon="utensils"
          title="Recipe Not Found"
          message="We couldn't locate the recipe you are looking for. It might have been deleted or the link is invalid."
          actionText="Back to Recipes"
          actionLink="/recipes"
        />
      </div>
    );
  }

  const favourited = isFavourite(recipe.id);

  const toggleIngredientCheck = (index) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleResetChecklist = () => {
    setCheckedIngredients({});
  };

  const handleCheckAll = () => {
    const all = {};
    recipe.ingredients.forEach((_, idx) => {
      all[idx] = true;
    });
    setCheckedIngredients(all);
  };

  const handleConfirmDelete = () => {
    deleteRecipe(recipe.id);
    navigate('/recipes');
  };

  const checkedCount = Object.values(checkedIngredients).filter(Boolean).length;
  const totalIngredients = recipe.ingredients.length;

  return (
    <div className="recipe-details-page container">
      {/* Breadcrumb Navigation */}
      <div className="breadcrumb-nav">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span>/</span>
        <Link to="/recipes" className="breadcrumb-link">Recipes</Link>
        <span>/</span>
        <span>{recipe.name}</span>
      </div>

      {/* Header Row */}
      <div className="recipe-details-header">
        <div className="recipe-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <span className="recipe-badge-category" style={{ position: 'static' }}>
              {recipe.category}
            </span>
            {recipe.isCustom && (
              <span className="recipe-custom-badge" style={{ position: 'static' }}>
                User Created
              </span>
            )}
            <span className={`recipe-difficulty-badge ${recipe.difficulty?.toLowerCase() === 'medium' ? 'medium' : 'easy'}`}>
              {recipe.difficulty || 'Easy'}
            </span>
          </div>

          <h1>{recipe.name}</h1>

          {/* Health Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="recipe-tags-row">
              {recipe.tags.map((tag, idx) => (
                <span key={idx} className="recipe-tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Header Action Buttons */}
        <div className="recipe-actions-bar">
          {/* Favourite Toggle Button */}
          <button
            type="button"
            onClick={() => toggleFavourite(recipe.id)}
            className={`btn ${favourited ? 'btn-danger' : 'btn-outline'}`}
            style={favourited ? { backgroundColor: '#E11D48', borderColor: '#E11D48' } : {}}
            title={favourited ? "Remove from favourites" : "Add to favourites"}
          >
            <Heart size={18} fill={favourited ? "#FFF" : "none"} color={favourited ? "#FFF" : "currentColor"} />
            <span>{favourited ? 'Saved in Favourites' : 'Add to Favourites'}</span>
          </button>

          {/* Custom Recipe Actions: Edit and Delete */}
          {recipe.isCustom && (
            <>
              <Link 
                to={`/edit-recipe/${recipe.id}`} 
                className="btn btn-secondary"
                title="Edit this recipe"
              >
                <Edit3 size={16} />
                <span>Edit</span>
              </Link>

              <button
                type="button"
                onClick={() => setDeleteModalOpen(true)}
                className="btn btn-outline"
                style={{ color: 'var(--danger-color)', borderColor: '#FCA5A5' }}
                title="Delete this recipe"
              >
                <Trash2 size={16} />
                <span>Delete</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Hero Overview Grid */}
      <div className="recipe-details-hero">
        {/* Main Recipe Image */}
        <div className="recipe-hero-image-box">
          <img 
            src={imgSrc || recipe.image} 
            alt={recipe.name} 
            onError={() => setImgSrc(fallbackCategoryImages[recipe.category] || fallbackCategoryImages.default)}
          />
        </div>

        {/* Overview Description & Key Metrics */}
        <div className="recipe-overview-panel">
          <div className="recipe-desc-box">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={18} color="var(--primary-green)" />
              About this recipe
            </h3>
            <p>{recipe.description}</p>
          </div>

          {/* 4 Information Cards */}
          <div className="key-metrics-grid">
            <div className="metric-card">
              <div className="metric-icon-wrap">
                <Clock size={20} />
              </div>
              <div>
                <div className="metric-label">Prep Time</div>
                <div className="metric-val">{recipe.prepTime} min</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-wrap" style={{ background: '#EFF6FF', color: '#2563EB' }}>
                <Users size={20} />
              </div>
              <div>
                <div className="metric-label">Servings</div>
                <div className="metric-val">{recipe.servings} {recipe.servings === 1 ? 'person' : 'servings'}</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-wrap" style={{ background: '#FFF7ED', color: '#EA580C' }}>
                <Flame size={20} />
              </div>
              <div>
                <div className="metric-label">Calories</div>
                <div className="metric-val">{recipe.calories} kcal</div>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-wrap" style={{ background: 'var(--primary-green-light)', color: 'var(--primary-green)' }}>
                <ChefHat size={20} />
              </div>
              <div>
                <div className="metric-label">Difficulty</div>
                <div className="metric-val">{recipe.difficulty || 'Easy'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Instructions: Ingredients Checklist & Numbered Steps */}
      <div className="recipe-instructions-grid">
        {/* Ingredients Checklist */}
        <div className="ingredients-box">
          <div className="box-title-row">
            <div className="box-title">
              <CheckCircle2 size={20} color="var(--primary-green)" />
              <span>Ingredients</span>
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {checkedCount > 0 ? (
                <button
                  type="button"
                  onClick={handleResetChecklist}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                  title="Reset checklist"
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleCheckAll}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                  title="Check all ingredients"
                >
                  <span>Select All</span>
                </button>
              )}
            </div>
          </div>

          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Tap ingredients as you prepare them ({checkedCount}/{totalIngredients} ready):
          </p>

          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => {
              const isChecked = !!checkedIngredients[index];
              return (
                <li
                  key={index}
                  className={`ingredient-item ${isChecked ? 'checked' : ''}`}
                  onClick={() => toggleIngredientCheck(index)}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleIngredientCheck(index)}
                    className="ingredient-checkbox"
                    aria-label={`Ingredient: ${ingredient}`}
                  />
                  <span className="ingredient-text">{ingredient}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Numbered Preparation Steps */}
        <div className="steps-box">
          <div className="box-title-row">
            <div className="box-title">
              <ChefHat size={20} color="var(--primary-green)" />
              <span>Preparation Steps</span>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {recipe.steps.length} Steps
            </span>
          </div>

          <ol className="steps-list">
            {recipe.steps.map((step, index) => (
              <li key={index} className="step-item">
                <div className="step-number">{index + 1}</div>
                <div className="step-text">{step}</div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Nutrition Breakdown Panel */}
      {recipe.nutrition && (
        <div className="nutrition-panel">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Flame size={18} color="var(--accent-orange-dark)" />
            <span>Estimated Nutritional Value (Per Serving)</span>
          </h3>

          <div className="nutrition-grid">
            <div className="nutrition-stat">
              <div className="nutrition-stat-val">{recipe.nutrition.protein || '12g'}</div>
              <div className="nutrition-stat-lbl">Protein</div>
            </div>

            <div className="nutrition-stat">
              <div className="nutrition-stat-val">{recipe.nutrition.carbs || '30g'}</div>
              <div className="nutrition-stat-lbl">Carbohydrates</div>
            </div>

            <div className="nutrition-stat">
              <div className="nutrition-stat-val">{recipe.nutrition.fat || '10g'}</div>
              <div className="nutrition-stat-lbl">Healthy Fats</div>
            </div>

            <div className="nutrition-stat">
              <div className="nutrition-stat-val">{recipe.nutrition.fiber || '6g'}</div>
              <div className="nutrition-stat-lbl">Dietary Fiber</div>
            </div>
          </div>
        </div>
      )}

      {/* Medical/Nutritional Disclaimer */}
      <div className="disclaimer-card">
        <AlertCircle size={18} style={{ flexShrink: 0 }} />
        <span>
          <strong>Disclaimer:</strong> The nutritional calculations and health tags provided are general approximations for dietary awareness and recipe exploration. Please consult a qualified health or nutrition professional for specific medical or dietary requirements.
        </span>
      </div>

      {/* Back Button */}
      <div style={{ marginTop: '2.5rem' }}>
        <Link to="/recipes" className="btn btn-outline">
          <ArrowLeft size={16} />
          <span>Back to All Recipes</span>
        </Link>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Custom Recipe"
        message={`Are you sure you want to delete "${recipe.name}"? This recipe will be permanently removed.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </div>
  );
}
