import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  PlusCircle, 
  BookOpen, 
  Heart, 
  Sparkles, 
  CheckCircle, 
  Apple, 
  Flame, 
  Layers, 
  ChevronRight,
  ShieldCheck,
  Utensils
} from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { categories } from '../data/recipes';
import RecipeCard from '../components/RecipeCard';
import ConfirmModal from '../components/ConfirmModal';

export default function Home() {
  const { recipes, stats, deleteRecipe } = useRecipes();
  const navigate = useNavigate();

  // Delete modal state
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  const handleDeleteRequest = (recipe) => {
    setRecipeToDelete(recipe);
  };

  const handleConfirmDelete = () => {
    if (recipeToDelete) {
      deleteRecipe(recipeToDelete.id);
      setRecipeToDelete(null);
    }
  };

  // Get 4 popular/featured recipes (prefers featured === true, or first 4)
  const popularRecipes = recipes
    .filter(r => r.featured || r.isCustom)
    .slice(0, 4);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-badge">
                <Sparkles size={16} />
                <span>100% Fresh, Clean & Nutritious</span>
              </div>
              
              <h1 className="hero-title">
                Eat Better. <br />
                <span>Live Better.</span>
              </h1>

              <p className="hero-subtitle">
                Discover simple, nutritious and delicious recipes for a healthier lifestyle. From quick breakfast bowls to wholesome dinners, eating well has never been easier.
              </p>

              <div className="hero-buttons">
                <Link to="/recipes" className="btn btn-primary btn-lg">
                  <span>Explore Recipes</span>
                  <ArrowRight size={18} />
                </Link>

                <Link to="/add-recipe" className="btn btn-secondary btn-lg">
                  <PlusCircle size={18} />
                  <span>Add Recipe</span>
                </Link>
              </div>
            </div>

            {/* Desktop Hero Image with Floating Badge */}
            <div className="hero-image-wrapper">
              <img 
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=80" 
                alt="Nutritious Mediterranean Salad Platter"
                className="hero-image"
              />
              <div className="hero-floating-badge">
                <div className="hero-floating-icon">
                  <CheckCircle size={20} />
                </div>
                <div className="hero-floating-text">
                  <h4>Wholesome Choices</h4>
                  <p>Hand-crafted & calorie balanced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC STATISTICS SECTION */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <BookOpen size={26} />
              </div>
              <div>
                <div className="stat-number">{stats.totalRecipes}</div>
                <div className="stat-label">Healthy Recipes</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--accent-orange-light)', color: 'var(--accent-orange-dark)' }}>
                <Layers size={26} />
              </div>
              <div>
                <div className="stat-number">{stats.uniqueCategories}</div>
                <div className="stat-label">Categories</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'var(--heart-active-bg)', color: 'var(--heart-active)' }}>
                <Heart size={26} />
              </div>
              <div>
                <div className="stat-number">{stats.totalFavourites}</div>
                <div className="stat-label">Favourite Recipes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BROWSE BY CATEGORY SECTION */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <h2 className="section-title">Browse by Category</h2>
              <p className="section-subtitle">Choose your meal time and find healthy inspiration tailored to you.</p>
            </div>
            <Link to="/recipes" className="btn btn-secondary btn-sm">
              <span>View All</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="categories-grid">
            {categories.map((category) => {
              const count = stats.categoryCounts[category.name] || 0;
              return (
                <div
                  key={category.name}
                  className="category-card"
                  onClick={() => navigate(`/recipes?category=${category.name}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') navigate(`/recipes?category=${category.name}`);
                  }}
                >
                  <div className="category-img-wrap">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="category-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="category-name">{category.name}</div>
                  <span className="category-count">{count} {count === 1 ? 'recipe' : 'recipes'}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. POPULAR HEALTHY RECIPES */}
      <section className="popular-section" style={{ padding: '2rem 0 4rem' }}>
        <div className="container">
          <div className="section-header">
            <div className="section-title-wrap">
              <h2 className="section-title">Popular Healthy Recipes</h2>
              <p className="section-subtitle">Top curated dishes loved for their balanced nutrition and simplicity.</p>
            </div>
            <Link to="/recipes" className="btn btn-primary btn-sm">
              <span>Explore All ({recipes.length})</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="recipes-grid">
            {popularRecipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onDeleteRequest={handleDeleteRequest}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. HEALTHY HABITS CALLOUT BANNER */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            color: 'white',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.2)', padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.85rem' }}>
                <ShieldCheck size={16} />
                <span>Healthy Living Pledge</span>
              </div>
              <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '0.6rem' }}>
                Cook with Fresh, Wholesome Food
              </h3>
              <p style={{ opacity: 0.9, fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '440px' }}>
                Each recipe in HealthyBite is designed with clean ingredients, accurate calorie approximations, and balanced macronutrients.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.1)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-lg)' }}>
                <Apple size={24} color="#FFD54F" />
                <div>
                  <h4 style={{ color: 'white', fontSize: '0.95rem' }}>Nutrient-Dense Meals</h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.85 }}>Rich in vitamins, minerals and essential fiber</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.1)', padding: '0.85rem 1.25rem', borderRadius: 'var(--radius-lg)' }}>
                <Flame size={24} color="#FF8A65" />
                <div>
                  <h4 style={{ color: 'white', fontSize: '0.95rem' }}>Calorie Aware</h4>
                  <p style={{ fontSize: '0.8rem', opacity: 0.85 }}>Clear portion sizing and energy calculations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={!!recipeToDelete}
        title="Delete Custom Recipe"
        message={`Are you sure you want to delete "${recipeToDelete?.name}"? This will permanently remove it from your recipe book.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setRecipeToDelete(null)}
      />
    </div>
  );
}
