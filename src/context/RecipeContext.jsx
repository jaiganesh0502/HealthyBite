import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialRecipes, fallbackCategoryImages } from '../data/recipes';

const RecipeContext = createContext();

const STORAGE_CUSTOM_KEY = 'healthy_recipe_book_custom_recipes';
const STORAGE_FAVOURITES_KEY = 'healthy_recipe_book_favourites';
const STORAGE_OVERWRITES_KEY = 'healthy_recipe_book_edits';

export function RecipeProvider({ children }) {
  // 1. Initialize custom recipes from LocalStorage
  const [customRecipes, setCustomRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CUSTOM_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error reading custom recipes from localStorage:', error);
      return [];
    }
  });

  // 2. Initialize favourites from LocalStorage
  const [favourites, setFavourites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_FAVOURITES_KEY);
      return stored ? JSON.parse(stored) : ["1", "5", "9"]; // default sample favourites
    } catch (error) {
      console.error('Error reading favourites from localStorage:', error);
      return ["1", "5", "9"];
    }
  });

  // 3. Initialize custom edits for custom recipes
  const [recipeEdits, setRecipeEdits] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_OVERWRITES_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error reading recipe edits from localStorage:', error);
      return {};
    }
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  const hideToast = () => {
    setToast(null);
  };

  // Synchronize custom recipes to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CUSTOM_KEY, JSON.stringify(customRecipes));
    } catch (error) {
      console.error('Error saving custom recipes to localStorage:', error);
    }
  }, [customRecipes]);

  // Synchronize favourites to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FAVOURITES_KEY, JSON.stringify(favourites));
    } catch (error) {
      console.error('Error saving favourites to localStorage:', error);
    }
  }, [favourites]);

  // Synchronize edits to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_OVERWRITES_KEY, JSON.stringify(recipeEdits));
    } catch (error) {
      console.error('Error saving recipe edits to localStorage:', error);
    }
  }, [recipeEdits]);

  // Compute merged recipes array (predefined + custom, with any edits applied)
  const allRecipes = React.useMemo(() => {
    const baseWithEdits = initialRecipes.map(recipe => {
      if (recipeEdits[recipe.id]) {
        return { ...recipe, ...recipeEdits[recipe.id] };
      }
      return recipe;
    });

    return [...baseWithEdits, ...customRecipes];
  }, [customRecipes, recipeEdits]);

  // Add a new user-created recipe
  const addRecipe = (recipeData) => {
    const newId = `custom_${Date.now()}`;
    const category = recipeData.category || 'Breakfast';
    
    // Choose provided image or category fallback
    const image = recipeData.image?.trim() 
      ? recipeData.image.trim() 
      : (fallbackCategoryImages[category] || fallbackCategoryImages.default);

    const newRecipe = {
      ...recipeData,
      id: newId,
      image,
      prepTime: Number(recipeData.prepTime) || 15,
      servings: Number(recipeData.servings) || 2,
      calories: Number(recipeData.calories) || 300,
      isCustom: true,
      createdAt: new Date().toISOString(),
      nutrition: recipeData.nutrition || {
        protein: `${Math.round((Number(recipeData.calories) || 300) * 0.04)}g`,
        carbs: `${Math.round((Number(recipeData.calories) || 300) * 0.1)}g`,
        fat: `${Math.round((Number(recipeData.calories) || 300) * 0.03)}g`,
        fiber: '5g'
      },
      tags: recipeData.tags && recipeData.tags.length > 0 
        ? recipeData.tags 
        : ['Custom Recipe', 'Healthy Choice']
    };

    setCustomRecipes(prev => [newRecipe, ...prev]);
    showToast('Recipe added successfully!', 'success');
    return newRecipe;
  };

  // Update an existing user-created recipe
  const updateRecipe = (id, updatedData) => {
    const stringId = String(id);
    const category = updatedData.category || 'Breakfast';
    const image = updatedData.image?.trim() 
      ? updatedData.image.trim() 
      : (fallbackCategoryImages[category] || fallbackCategoryImages.default);

    const isCustom = customRecipes.some(r => String(r.id) === stringId);

    if (isCustom) {
      setCustomRecipes(prev => 
        prev.map(r => {
          if (String(r.id) === stringId) {
            return {
              ...r,
              ...updatedData,
              image,
              prepTime: Number(updatedData.prepTime) || r.prepTime,
              servings: Number(updatedData.servings) || r.servings,
              calories: Number(updatedData.calories) || r.calories,
              isCustom: true
            };
          }
          return r;
        })
      );
      showToast('Recipe updated successfully!', 'success');
      return true;
    } else {
      // Store override if needed
      setRecipeEdits(prev => ({
        ...prev,
        [stringId]: {
          ...updatedData,
          image,
          prepTime: Number(updatedData.prepTime),
          servings: Number(updatedData.servings),
          calories: Number(updatedData.calories)
        }
      }));
      showToast('Recipe updated successfully!', 'success');
      return true;
    }
  };

  // Delete a user-created recipe
  const deleteRecipe = (id) => {
    const stringId = String(id);
    
    // Check if it's custom
    const isCustom = customRecipes.some(r => String(r.id) === stringId);
    if (!isCustom) {
      showToast('Predefined recipes cannot be deleted.', 'error');
      return false;
    }

    setCustomRecipes(prev => prev.filter(r => String(r.id) !== stringId));
    setFavourites(prev => prev.filter(favId => String(favId) !== stringId));
    showToast('Recipe deleted successfully!', 'info');
    return true;
  };

  // Toggle favourite status
  const toggleFavourite = (id) => {
    const stringId = String(id);
    setFavourites(prev => {
      const isFav = prev.includes(stringId);
      if (isFav) {
        showToast('Removed from favourites', 'info');
        return prev.filter(item => item !== stringId);
      } else {
        showToast('Added to favourites ♥', 'success');
        return [...prev, stringId];
      }
    });
  };

  // Helper to check if recipe is favourited
  const isFavourite = (id) => {
    return favourites.includes(String(id));
  };

  // Helper to get recipe by ID
  const getRecipeById = (id) => {
    return allRecipes.find(r => String(r.id) === String(id)) || null;
  };

  // Dynamic statistics
  const stats = React.useMemo(() => {
    const totalRecipes = allRecipes.length;
    const totalFavourites = favourites.length;
    
    const categoryCounts = allRecipes.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});

    const uniqueCategories = Object.keys(categoryCounts).length;

    return {
      totalRecipes,
      totalFavourites,
      uniqueCategories,
      categoryCounts
    };
  }, [allRecipes, favourites]);

  const value = {
    recipes: allRecipes,
    customRecipes,
    favourites,
    stats,
    toast,
    showToast,
    hideToast,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavourite,
    isFavourite,
    getRecipeById
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
}
