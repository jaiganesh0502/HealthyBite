import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Sparkles } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import RecipeForm from '../components/RecipeForm';

export default function AddRecipe() {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();

  const handleCreateRecipe = (recipeData) => {
    const created = addRecipe(recipeData);
    if (created) {
      navigate('/recipes');
    }
  };

  return (
    <div className="form-page-container container">
      <div className="form-card">
        <div className="form-header">
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-green-light)',
            color: 'var(--primary-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem'
          }}>
            <PlusCircle size={26} />
          </div>
          <h1>Add New Healthy Recipe</h1>
          <p>Share your favorite wholesome recipe with customized ingredients and preparation steps.</p>
        </div>

        <RecipeForm
          onSubmit={handleCreateRecipe}
          submitButtonText="Publish Recipe"
          isEditing={false}
        />
      </div>
    </div>
  );
}
