import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Flame, Heart, ArrowRight, Edit3, Trash2, Sparkles } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { fallbackCategoryImages } from '../data/recipes';

export default function RecipeCard({ recipe, onDeleteRequest }) {
  const { toggleFavourite, isFavourite } = useRecipes();
  const [imgSrc, setImgSrc] = useState(recipe.image);

  const favourited = isFavourite(recipe.id);

  const handleImageError = () => {
    // Fallback if image fails to load
    setImgSrc(fallbackCategoryImages[recipe.category] || fallbackCategoryImages.default);
  };

  const handleFavClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(recipe.id);
  };

  return (
    <div className="recipe-card">
      {/* Media & Badges */}
      <div className="recipe-card-media">
        <img 
          src={imgSrc} 
          alt={recipe.name} 
          className="recipe-card-img"
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* Category Badge */}
        <span className="recipe-badge-category">
          {recipe.category}
        </span>

        {/* Custom Recipe Badge */}
        {recipe.isCustom && (
          <span className="recipe-custom-badge" title="User created recipe">
            Custom
          </span>
        )}

        {/* Favourite Toggle Heart Button */}
        <button 
          className={`recipe-fav-btn ${favourited ? 'active' : ''}`}
          onClick={handleFavClick}
          aria-label={favourited ? "Remove from favourites" : "Add to favourites"}
          title={favourited ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart 
            size={18} 
            fill={favourited ? "#E11D48" : "none"} 
            color={favourited ? "#E11D48" : "currentColor"} 
          />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="recipe-card-body">
        <h3 className="recipe-card-title" title={recipe.name}>
          {recipe.name}
        </h3>
        
        <p className="recipe-card-desc">
          {recipe.description}
        </p>

        {/* Meta Stats: Prep Time, Difficulty, Calories */}
        <div className="recipe-meta-row">
          <div className="recipe-meta-item" title="Preparation Time">
            <Clock size={15} color="var(--primary-green)" />
            <span>{recipe.prepTime} min</span>
          </div>

          <div className="recipe-meta-item" title="Calories">
            <Flame size={15} color="var(--accent-orange-dark)" />
            <span>{recipe.calories} kcal</span>
          </div>

          <span className={`recipe-difficulty-badge ${recipe.difficulty?.toLowerCase() === 'medium' ? 'medium' : 'easy'}`}>
            {recipe.difficulty || 'Easy'}
          </span>
        </div>

        {/* Card Action Buttons */}
        <div className="recipe-card-footer">
          <Link to={`/recipe/${recipe.id}`} className="btn btn-primary btn-sm">
            <span>View Recipe</span>
            <ArrowRight size={15} />
          </Link>

          {/* If user created recipe, allow quick edit or delete action */}
          {recipe.isCustom && (
            <>
              <Link 
                to={`/edit-recipe/${recipe.id}`} 
                className="btn btn-secondary btn-sm" 
                title="Edit recipe"
                aria-label="Edit recipe"
              >
                <Edit3 size={15} />
              </Link>

              {onDeleteRequest && (
                <button 
                  onClick={() => onDeleteRequest(recipe)} 
                  className="btn btn-outline btn-sm text-rose-600" 
                  title="Delete recipe"
                  aria-label="Delete recipe"
                  style={{ color: 'var(--danger-color)', borderColor: '#FCA5A5' }}
                >
                  <Trash2 size={15} />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
