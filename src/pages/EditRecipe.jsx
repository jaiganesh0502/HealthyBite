import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Edit3, ArrowLeft } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import RecipeForm from '../components/RecipeForm';
import EmptyState from '../components/EmptyState';

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRecipeById, updateRecipe } = useRecipes();

  const recipe = getRecipeById(id);

  if (!recipe) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <EmptyState
          icon="utensils"
          title="Recipe Not Found"
          message="We could not find the recipe you wish to edit."
          actionText="Back to Recipes"
          actionLink="/recipes"
        />
      </div>
    );
  }

  const handleUpdateRecipe = (updatedData) => {
    const success = updateRecipe(recipe.id, updatedData);
    if (success) {
      navigate(`/recipe/${recipe.id}`);
    }
  };

  return (
    <div className="form-page-container container">
      {/* Back button */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to={`/recipe/${recipe.id}`} className="btn btn-outline btn-sm">
          <ArrowLeft size={16} />
          <span>Back to Recipe</span>
        </Link>
      </div>

      <div className="form-card">
        <div className="form-header">
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-full)',
            background: 'var(--accent-orange-light)',
            color: 'var(--accent-orange-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem'
          }}>
            <Edit3 size={24} />
          </div>
          <h1>Edit Recipe</h1>
          <p>Update ingredients, cooking steps, or dietary information for "{recipe.name}".</p>
        </div>

        <RecipeForm
          initialData={recipe}
          onSubmit={handleUpdateRecipe}
          submitButtonText="Save Changes"
          isEditing={true}
        />
      </div>
    </div>
  );
}
