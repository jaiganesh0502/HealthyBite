import React, { useState } from 'react';
import { Sparkles, Image, Check, AlertCircle } from 'lucide-react';
import { fallbackCategoryImages } from '../data/recipes';

const CATEGORIES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Salads',
  'Smoothies'
];

const PRESET_TAGS = [
  'High Protein',
  'Vegetarian',
  'High Fiber',
  'Gluten-Free',
  'Low Carb',
  'Heart Healthy',
  'Quick & Easy',
  'Dairy-Free'
];

export default function RecipeForm({ initialData = {}, onSubmit, submitButtonText = "Save Recipe", isEditing = false }) {
  // Form State
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    category: initialData.category || 'Breakfast',
    description: initialData.description || '',
    image: initialData.image || '',
    prepTime: initialData.prepTime !== undefined ? String(initialData.prepTime) : '',
    servings: initialData.servings !== undefined ? String(initialData.servings) : '',
    difficulty: initialData.difficulty || 'Easy',
    calories: initialData.calories !== undefined ? String(initialData.calories) : '',
    ingredientsText: Array.isArray(initialData.ingredients) 
      ? initialData.ingredients.join('\n') 
      : '',
    stepsText: Array.isArray(initialData.steps) 
      ? initialData.steps.join('\n') 
      : '',
    tags: initialData.tags || ['High Protein', 'Vegetarian']
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for field if user modifies it
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  // Toggle health tag
  const toggleTag = (tag) => {
    setFormData(prev => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
      };
    });
  };

  // Validate single field
  const validateField = (name, value) => {
    let error = '';

    if (name === 'name') {
      if (!value || value.trim().length === 0) {
        error = 'Recipe name is required';
      } else if (value.trim().length < 3) {
        error = 'Recipe name must be at least 3 characters';
      }
    }

    if (name === 'category') {
      if (!value) {
        error = 'Category is required';
      }
    }

    if (name === 'description') {
      if (!value || value.trim().length === 0) {
        error = 'Description is required';
      } else if (value.trim().length < 10) {
        error = 'Description must be at least 10 characters';
      }
    }

    if (name === 'prepTime') {
      if (!value || String(value).trim() === '') {
        error = 'Preparation time is required';
      } else if (Number(value) <= 0 || isNaN(Number(value))) {
        error = 'Preparation time must be greater than 0';
      }
    }

    if (name === 'servings') {
      if (!value || String(value).trim() === '') {
        error = 'Servings is required';
      } else if (Number(value) <= 0 || isNaN(Number(value))) {
        error = 'Servings must be greater than 0';
      }
    }

    if (name === 'calories') {
      if (!value || String(value).trim() === '') {
        error = 'Calories is required';
      } else if (Number(value) <= 0 || isNaN(Number(value))) {
        error = 'Calories must be a positive number';
      }
    }

    if (name === 'ingredientsText') {
      const lines = (value || '').split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length < 2) {
        error = 'Please enter at least 2 ingredients (one per line)';
      }
    }

    if (name === 'stepsText') {
      const lines = (value || '').split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length < 2) {
        error = 'Please enter at least 2 preparation steps (one per line)';
      }
    }

    return error;
  };

  // Validate entire form on submit
  const validateForm = () => {
    const newErrors = {};

    const fieldsToValidate = [
      'name',
      'category',
      'description',
      'prepTime',
      'servings',
      'calories',
      'ingredientsText',
      'stepsText'
    ];

    fieldsToValidate.forEach(field => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      name: true,
      category: true,
      description: true,
      prepTime: true,
      servings: true,
      calories: true,
      ingredientsText: true,
      stepsText: true
    });

    if (!validateForm()) {
      return;
    }

    // Process ingredients & steps into clean arrays
    const ingredients = formData.ingredientsText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const steps = formData.stepsText
      .split('\n')
      .map(line => line.trim().replace(/^\d+[\.\)]\s*/, '')) // remove manual "1. " if typed
      .filter(line => line.length > 0);

    const submissionData = {
      name: formData.name.trim(),
      category: formData.category,
      description: formData.description.trim(),
      image: formData.image.trim() || (fallbackCategoryImages[formData.category] || fallbackCategoryImages.default),
      prepTime: Number(formData.prepTime),
      servings: Number(formData.servings),
      difficulty: formData.difficulty,
      calories: Number(formData.calories),
      ingredients,
      steps,
      tags: formData.tags.length > 0 ? formData.tags : ['Healthy Choice', 'Custom Recipe']
    };

    onSubmit(submissionData);
  };

  const previewImage = formData.image?.trim() 
    ? formData.image.trim() 
    : fallbackCategoryImages[formData.category];

  const ingredientCount = formData.ingredientsText.split('\n').filter(l => l.trim().length > 0).length;
  const stepCount = formData.stepsText.split('\n').filter(l => l.trim().length > 0).length;

  return (
    <form className="recipe-form" onSubmit={handleSubmit} noValidate>
      {/* Recipe Name */}
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Recipe Name <span className="required-star">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          onBlur={() => handleBlur('name')}
          placeholder="e.g. Avocado Egg Toast"
          className={`form-input ${errors.name ? 'error' : ''}`}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      {/* Category & Difficulty Grid */}
      <div className="form-grid-2">
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category <span className="required-star">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={() => handleBlur('category')}
            className={`form-select ${errors.category ? 'error' : ''}`}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="form-error">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="difficulty" className="form-label">
            Difficulty <span className="required-star">*</span>
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="form-select"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description" className="form-label">
          Description <span className="required-star">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          onBlur={() => handleBlur('description')}
          placeholder="Write a short, appetizing summary of this healthy recipe..."
          className={`form-textarea ${errors.description ? 'error' : ''}`}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {errors.description ? (
            <span className="form-error">{errors.description}</span>
          ) : (
            <span className="form-hint">At least 10 characters</span>
          )}
          <span className="form-hint">{formData.description.length} chars</span>
        </div>
      </div>

      {/* Metrics Row: Prep Time, Servings, Calories */}
      <div className="form-grid-3">
        <div className="form-group">
          <label htmlFor="prepTime" className="form-label">
            Prep Time (mins) <span className="required-star">*</span>
          </label>
          <input
            id="prepTime"
            name="prepTime"
            type="number"
            min="1"
            value={formData.prepTime}
            onChange={handleChange}
            onBlur={() => handleBlur('prepTime')}
            placeholder="e.g. 15"
            className={`form-input ${errors.prepTime ? 'error' : ''}`}
          />
          {errors.prepTime && <span className="form-error">{errors.prepTime}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="servings" className="form-label">
            Servings <span className="required-star">*</span>
          </label>
          <input
            id="servings"
            name="servings"
            type="number"
            min="1"
            value={formData.servings}
            onChange={handleChange}
            onBlur={() => handleBlur('servings')}
            placeholder="e.g. 2"
            className={`form-input ${errors.servings ? 'error' : ''}`}
          />
          {errors.servings && <span className="form-error">{errors.servings}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="calories" className="form-label">
            Calories (kcal) <span className="required-star">*</span>
          </label>
          <input
            id="calories"
            name="calories"
            type="number"
            min="1"
            value={formData.calories}
            onChange={handleChange}
            onBlur={() => handleBlur('calories')}
            placeholder="e.g. 350"
            className={`form-input ${errors.calories ? 'error' : ''}`}
          />
          {errors.calories && <span className="form-error">{errors.calories}</span>}
        </div>
      </div>

      {/* Image URL with Preview */}
      <div className="form-group">
        <label htmlFor="image" className="form-label">
          Image URL <span className="form-hint" style={{ fontWeight: 400 }}>(Optional - default healthy food photo applied if blank)</span>
        </label>
        <input
          id="image"
          name="image"
          type="url"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://images.unsplash.com/..."
          className="form-input"
        />
        
        {/* Preview box */}
        <div className="image-preview-box">
          <img 
            src={previewImage} 
            alt="Recipe preview" 
            onError={(e) => {
              e.target.src = fallbackCategoryImages[formData.category] || fallbackCategoryImages.default;
            }} 
          />
        </div>
      </div>

      {/* Ingredients (one per line) */}
      <div className="form-group">
        <label htmlFor="ingredientsText" className="form-label">
          Ingredients <span className="required-star">*</span>
          <span className="form-hint" style={{ fontWeight: 'normal' }}>(One ingredient per line)</span>
        </label>
        <textarea
          id="ingredientsText"
          name="ingredientsText"
          rows={5}
          value={formData.ingredientsText}
          onChange={handleChange}
          onBlur={() => handleBlur('ingredientsText')}
          placeholder={`2 slices whole-grain bread\n1 ripe avocado\n2 organic eggs\nPinch of salt & pepper`}
          className={`form-textarea ${errors.ingredientsText ? 'error' : ''}`}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {errors.ingredientsText ? (
            <span className="form-error">{errors.ingredientsText}</span>
          ) : (
            <span className="form-hint">At least 2 ingredients required</span>
          )}
          <span className="form-hint">{ingredientCount} item{ingredientCount !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Preparation Steps (one per line) */}
      <div className="form-group">
        <label htmlFor="stepsText" className="form-label">
          Preparation Steps <span className="required-star">*</span>
          <span className="form-hint" style={{ fontWeight: 'normal' }}>(One step per line)</span>
        </label>
        <textarea
          id="stepsText"
          name="stepsText"
          rows={5}
          value={formData.stepsText}
          onChange={handleChange}
          onBlur={() => handleBlur('stepsText')}
          placeholder={`Toast the bread until golden.\nMash the avocado with lemon juice and salt.\nFry the eggs sunny-side up.\nAssemble toast with avocado and eggs.`}
          className={`form-textarea ${errors.stepsText ? 'error' : ''}`}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {errors.stepsText ? (
            <span className="form-error">{errors.stepsText}</span>
          ) : (
            <span className="form-hint">At least 2 steps required</span>
          )}
          <span className="form-hint">{stepCount} step{stepCount !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Health Tags Selector */}
      <div className="form-group">
        <label className="form-label">Health & Dietary Tags</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
          {PRESET_TAGS.map(tag => {
            const isSelected = formData.tags.includes(tag);
            return (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`btn btn-sm ${isSelected ? 'btn-secondary' : 'btn-outline'}`}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                {isSelected && <Check size={14} />}
                <span>{tag}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="form-buttons-row">
        <button type="submit" className="btn btn-primary btn-lg">
          <Sparkles size={18} />
          <span>{submitButtonText}</span>
        </button>
      </div>
    </form>
  );
}
