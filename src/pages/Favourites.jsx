import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, BookOpen, ArrowRight } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import RecipeCard from '../components/RecipeCard';
import EmptyState from '../components/EmptyState';
import ConfirmModal from '../components/ConfirmModal';

export default function Favourites() {
  const { recipes, favourites, deleteRecipe } = useRecipes();
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  // Filter all recipes that are in the favourites array
  const favouriteRecipes = recipes.filter(r => favourites.includes(String(r.id)));

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
    <div className="favourites-page container" style={{ padding: '2.5rem 1.5rem 4rem' }}>
      {/* Header */}
      <div className="recipes-header">
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'var(--heart-active-bg)',
          color: 'var(--heart-active)',
          padding: '0.35rem 0.9rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '0.85rem'
        }}>
          <Heart size={16} fill="#E11D48" />
          <span>Saved Collection</span>
        </div>
        <h1>My Favourite Recipes</h1>
        <p>Quickly access your saved healthy meals, bowls, smoothies, and snacks anytime.</p>
      </div>

      {/* Grid or Empty State */}
      {favouriteRecipes.length > 0 ? (
        <>
          <div className="recipe-count-info">
            <span>
              You have <strong>{favouriteRecipes.length}</strong> saved {favouriteRecipes.length === 1 ? 'recipe' : 'recipes'}
            </span>
          </div>

          <div className="recipes-grid">
            {favouriteRecipes.map(recipe => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onDeleteRequest={handleDeleteRequest}
              />
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          icon="heart"
          title="No favourite recipes yet."
          message="Explore healthy recipes and tap the heart to save your favourites."
          actionText="Explore Recipes"
          actionLink="/recipes"
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!recipeToDelete}
        title="Delete Custom Recipe"
        message={`Are you sure you want to delete "${recipeToDelete?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setRecipeToDelete(null)}
      />
    </div>
  );
}
