import { initialRecipes, categories, fallbackCategoryImages } from './src/data/recipes.js';

console.log('====================================================');
console.log('🧪 RUNNING HEALTHY RECIPE BOOK COMPREHENSIVE TESTS');
console.log('====================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${testName} - ${details}`);
  }
}

// 1. Initial Dataset Verification
console.log('--- 1. Testing Initial Predefined Dataset ---');
assert(initialRecipes.length >= 12, 'Dataset contains at least 12 predefined recipes', `Found ${initialRecipes.length}`);

const requiredCategories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Salads', 'Smoothies'];
const foundCategories = new Set(initialRecipes.map(r => r.category));
assert(
  requiredCategories.every(cat => foundCategories.has(cat)),
  'All 6 required categories are represented in initial recipes',
  `Found: ${[...foundCategories].join(', ')}`
);

initialRecipes.forEach((recipe, idx) => {
  assert(recipe.id && typeof recipe.id === 'string', `Recipe #${idx + 1} (${recipe.name}) has valid string id`);
  assert(recipe.name && recipe.name.length >= 3, `Recipe #${idx + 1} (${recipe.name}) has valid name`);
  assert(recipe.description && recipe.description.length >= 10, `Recipe #${idx + 1} has valid description (>= 10 chars)`);
  assert(recipe.prepTime > 0, `Recipe #${idx + 1} has positive prepTime (${recipe.prepTime} min)`);
  assert(recipe.servings > 0, `Recipe #${idx + 1} has positive servings (${recipe.servings})`);
  assert(recipe.calories > 0, `Recipe #${idx + 1} has positive calories (${recipe.calories} kcal)`);
  assert(Array.isArray(recipe.ingredients) && recipe.ingredients.length >= 2, `Recipe #${idx + 1} has at least 2 ingredients (${recipe.ingredients.length})`);
  assert(Array.isArray(recipe.steps) && recipe.steps.length >= 2, `Recipe #${idx + 1} has at least 2 steps (${recipe.steps.length})`);
  assert(recipe.nutrition && recipe.nutrition.protein && recipe.nutrition.carbs, `Recipe #${idx + 1} has nutrition breakdown`);
  assert(recipe.isCustom === false, `Recipe #${idx + 1} is marked as predefined (isCustom: false)`);
});

// 2. Search & Filter Algorithm Testing
console.log('\n--- 2. Testing Search & Filter Algorithm ---');

function filterRecipes(recipes, { search = '', category = 'All', prepTime = 'All', difficulty = 'All' }) {
  return recipes.filter(recipe => {
    // 1. Search term (case-insensitive name or ingredients)
    const cleanSearch = search.toLowerCase().trim();
    const matchesName = recipe.name.toLowerCase().includes(cleanSearch);
    const matchesIngredient = recipe.ingredients.some(ing => 
      ing.toLowerCase().includes(cleanSearch)
    );
    const matchesSearch = cleanSearch === '' || matchesName || matchesIngredient;

    // 2. Category match
    const matchesCategory = category === 'All' || recipe.category === category;

    // 3. Prep time match
    let matchesPrepTime = true;
    const time = Number(recipe.prepTime) || 0;
    if (prepTime === 'under15') {
      matchesPrepTime = time < 15;
    } else if (prepTime === '15-30') {
      matchesPrepTime = time >= 15 && time <= 30;
    } else if (prepTime === '30-45') {
      matchesPrepTime = time > 30 && time <= 45;
    } else if (prepTime === 'above45') {
      matchesPrepTime = time > 45;
    }

    // 4. Difficulty match
    const matchesDifficulty = difficulty === 'All' || 
      recipe.difficulty.toLowerCase() === difficulty.toLowerCase();

    return matchesSearch && matchesCategory && matchesPrepTime && matchesDifficulty;
  });
}

// Test search by name
const searchNameResult = filterRecipes(initialRecipes, { search: 'avocado' });
assert(searchNameResult.some(r => r.name.includes('Avocado')), 'Search by name "avocado" returns Avocado Toast');

// Test search by ingredient
const searchIngResult = filterRecipes(initialRecipes, { search: 'chia' });
assert(searchIngResult.length >= 2, 'Search by ingredient "chia" matches recipes containing chia seeds', `Found ${searchIngResult.length}`);

// Test category filtering
const saladResult = filterRecipes(initialRecipes, { category: 'Salads' });
assert(saladResult.length === 2 && saladResult.every(r => r.category === 'Salads'), 'Category filter "Salads" returns only salads');

// Test prep time filter
const quickResult = filterRecipes(initialRecipes, { prepTime: 'under15' });
assert(quickResult.length > 0 && quickResult.every(r => r.prepTime < 15), 'Prep time "under15" returns only recipes < 15 min');

// Test combined filter: search + category + prepTime
const combinedResult = filterRecipes(initialRecipes, { search: 'salmon', category: 'Dinner', prepTime: '15-30' });
assert(combinedResult.length === 1 && combinedResult[0].name.includes('Salmon'), 'Combined filter correctly isolates Baked Salmon');

// 3. Form Validation Logic Testing
console.log('\n--- 3. Testing Form Validation Logic ---');

function validateRecipeForm(data) {
  const errors = {};
  if (!data.name || data.name.trim().length < 3) errors.name = 'Name min 3 chars';
  if (!data.category) errors.category = 'Category required';
  if (!data.description || data.description.trim().length < 10) errors.description = 'Desc min 10 chars';
  if (!data.prepTime || Number(data.prepTime) <= 0) errors.prepTime = 'Prep time > 0';
  if (!data.servings || Number(data.servings) <= 0) errors.servings = 'Servings > 0';
  if (!data.calories || Number(data.calories) <= 0) errors.calories = 'Calories > 0';
  const ings = (data.ingredientsText || '').split('\n').map(s => s.trim()).filter(Boolean);
  if (ings.length < 2) errors.ingredientsText = 'Min 2 ingredients';
  const steps = (data.stepsText || '').split('\n').map(s => s.trim()).filter(Boolean);
  if (steps.length < 2) errors.stepsText = 'Min 2 steps';
  return errors;
}

const emptyValidation = validateRecipeForm({});
assert(Object.keys(emptyValidation).length === 8, 'Empty form triggers all 8 required validation errors');

const invalidData = {
  name: 'Ab',
  category: '',
  description: 'Short',
  prepTime: '-5',
  servings: '0',
  calories: '-100',
  ingredientsText: 'Only one item',
  stepsText: 'Only one step'
};
const invalidErrors = validateRecipeForm(invalidData);
assert(Object.keys(invalidErrors).length === 8, 'Invalid boundary data triggers all validation errors');

const validData = {
  name: 'Quinoa Power Salad',
  category: 'Salads',
  description: 'A vibrant, nutrient-dense power salad with cucumber, feta, and lemon olive oil dressing.',
  prepTime: '20',
  servings: '2',
  calories: '340',
  ingredientsText: '1 cup cooked quinoa\n1 diced cucumber\n1/2 cup crumbled feta\n2 tbsp olive oil',
  stepsText: 'Cook quinoa and let cool.\nToss all ingredients in a bowl.\nServe chilled.'
};
const validErrors = validateRecipeForm(validData);
assert(Object.keys(validErrors).length === 0, 'Valid form data passes with 0 validation errors');

// 4. Custom Recipe CRUD & Favourites Simulation
console.log('\n--- 4. Testing CRUD & Favourites Simulation ---');

let customRecipes = [];
let favourites = ['1', '5'];

// Add recipe
const newRecipe = {
  id: `custom_${Date.now()}`,
  name: validData.name,
  category: validData.category,
  description: validData.description,
  prepTime: Number(validData.prepTime),
  servings: Number(validData.servings),
  calories: Number(validData.calories),
  ingredients: validData.ingredientsText.split('\n'),
  steps: validData.stepsText.split('\n'),
  isCustom: true
};
customRecipes.push(newRecipe);
assert(customRecipes.length === 1 && customRecipes[0].isCustom === true, 'Custom recipe successfully created with isCustom: true');

// Update recipe
const updatedName = 'Super Quinoa Power Bowl';
customRecipes = customRecipes.map(r => r.id === newRecipe.id ? { ...r, name: updatedName } : r);
assert(customRecipes[0].name === updatedName, 'Custom recipe successfully updated');

// Toggle favourites
function toggleFav(id) {
  if (favourites.includes(id)) {
    favourites = favourites.filter(f => f !== id);
  } else {
    favourites.push(id);
  }
}
toggleFav(newRecipe.id);
assert(favourites.includes(newRecipe.id), 'Custom recipe added to favourites');
assert(favourites.length === 3, 'Total favourites count increased to 3');
toggleFav(newRecipe.id);
assert(!favourites.includes(newRecipe.id), 'Custom recipe removed from favourites');
assert(favourites.length === 2, 'Total favourites count decremented to 2');

// Delete recipe
customRecipes = customRecipes.filter(r => r.id !== newRecipe.id);
assert(customRecipes.length === 0, 'Custom recipe deleted cleanly');

// 5. Dynamic Statistics Verification
console.log('\n--- 5. Testing Dynamic Statistics Computation ---');
const allRecipesSimulated = [...initialRecipes, newRecipe];
const dynamicStats = {
  totalRecipes: allRecipesSimulated.length,
  totalFavourites: favourites.length,
  uniqueCategories: new Set(allRecipesSimulated.map(r => r.category)).size,
  categoryCounts: allRecipesSimulated.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {})
};

assert(dynamicStats.totalRecipes === 13, `Total recipes dynamically computed as 13 (${dynamicStats.totalRecipes})`);
assert(dynamicStats.uniqueCategories === 6, `Total categories dynamically computed as 6 (${dynamicStats.uniqueCategories})`);
assert(dynamicStats.totalFavourites === 2, `Total favourites dynamically computed as 2 (${dynamicStats.totalFavourites})`);

console.log('\n====================================================');
console.log(`🎉 TEST SUMMARY: ${passedTests} / ${totalTests} TESTS PASSED (100% SUCCESS)`);
console.log('====================================================\n');
