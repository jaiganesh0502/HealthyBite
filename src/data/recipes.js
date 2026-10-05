// Initial Predefined Recipe Dataset for Healthy Recipe Book
// High quality, realistic healthy recipes across 6 core categories

export const initialRecipes = [
  {
    id: "1",
    name: "Avocado Egg Toast",
    category: "Breakfast",
    description: "Crispy whole-grain toast topped with creamy mashed avocado, perfectly soft-boiled eggs, and a pinch of red pepper flakes for a nutritious morning start.",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    prepTime: 15,
    servings: 2,
    difficulty: "Easy",
    calories: 320,
    ingredients: [
      "2 slices whole-grain sourdough bread",
      "1 large ripe Hass avocado",
      "2 large pasture-raised eggs",
      "1 tbsp extra virgin olive oil",
      "1/2 lemon (juiced)",
      "1/4 tsp red pepper chili flakes",
      "Pinch of sea salt and black pepper",
      "Fresh microgreens or cilantro for garnish"
    ],
    steps: [
      "Toast the whole-grain bread slices in a toaster until golden and crispy.",
      "Cut the avocado in half, scoop out the flesh into a small bowl, and mash with lemon juice, salt, and black pepper using a fork.",
      "In a small skillet, heat olive oil over medium heat and fry or soft-boil the eggs to your preferred doneness.",
      "Spread the mashed avocado generously over both toasted bread slices.",
      "Carefully top each toast with a cooked egg.",
      "Garnish with red pepper flakes, microgreens, and an extra pinch of freshly ground black pepper. Serve immediately."
    ],
    nutrition: {
      protein: "14g",
      carbs: "28g",
      fat: "18g",
      fiber: "7g"
    },
    tags: ["High Protein", "Vegetarian", "Heart Healthy", "Under 20 Mins"],
    isCustom: false,
    featured: true
  },
  {
    id: "2",
    name: "Berry Oatmeal Bowl",
    category: "Breakfast",
    description: "Warm, slow-cooked rolled oats infused with chia seeds, topped with fresh mixed berries, sliced almonds, and a drizzle of pure maple syrup.",
    image: "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=800&q=80",
    prepTime: 12,
    servings: 1,
    difficulty: "Easy",
    calories: 290,
    ingredients: [
      "1/2 cup rolled oats (gluten-free if needed)",
      "1 cup unsweetened almond milk or oat milk",
      "1 tbsp chia seeds",
      "1/2 cup fresh mixed berries (blueberries, raspberries, strawberries)",
      "1 tbsp sliced raw almonds",
      "1 tsp pure maple syrup or honey",
      "1/4 tsp ground cinnamon"
    ],
    steps: [
      "In a small saucepan, combine rolled oats, almond milk, and ground cinnamon over medium heat.",
      "Bring to a gentle boil, then lower the heat and simmer for 4–5 minutes, stirring occasionally until thick and creamy.",
      "Stir in the chia seeds and remove from heat.",
      "Transfer the cooked oatmeal to a serving bowl.",
      "Arrange the fresh berries and sliced almonds neatly on top.",
      "Drizzle with maple syrup and enjoy warm."
    ],
    nutrition: {
      protein: "9g",
      carbs: "45g",
      fat: "8g",
      fiber: "9g"
    },
    tags: ["Vegetarian", "High Fiber", "Dairy-Free", "Heart Healthy"],
    isCustom: false,
    featured: false
  },
  {
    id: "3",
    name: "Grilled Chicken Quinoa Bowl",
    category: "Lunch",
    description: "Tender herb-marinated grilled chicken breast served over fluffy tri-color quinoa, roasted sweet potatoes, and steamed broccoli with a lemon tahini dressing.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    prepTime: 25,
    servings: 2,
    difficulty: "Medium",
    calories: 450,
    ingredients: [
      "250g skinless chicken breast fillets",
      "1 cup cooked tri-color quinoa",
      "1 cup roasted sweet potato cubes",
      "1 cup steamed broccoli florets",
      "1 tbsp olive oil",
      "1 tsp dried oregano and garlic powder",
      "2 tbsp lemon tahini dressing",
      "Salt and black pepper to taste"
    ],
    steps: [
      "Season the chicken breast with olive oil, oregano, garlic powder, salt, and pepper.",
      "Grill or pan-sear the chicken over medium-high heat for 6–7 minutes per side until fully cooked (internal temp 165°F/74°C). Let rest, then slice.",
      "Cook the quinoa according to package directions using water or vegetable broth.",
      "Steam broccoli florets until bright green and tender-crisp.",
      "Assemble bowls: place quinoa at the base, arrange sliced chicken, sweet potatoes, and broccoli in sections.",
      "Drizzle with lemon tahini dressing and serve warm."
    ],
    nutrition: {
      protein: "38g",
      carbs: "42g",
      fat: "14g",
      fiber: "8g"
    },
    tags: ["High Protein", "Gluten-Free", "Meal Prep", "Balanced"],
    isCustom: false,
    featured: true
  },
  {
    id: "4",
    name: "Chickpea Veggie Wrap",
    category: "Lunch",
    description: "Crunchy, colorful Mediterranean whole-wheat wrap packed with smashed seasoned chickpeas, crisp cucumbers, shredded carrots, and creamy hummus.",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80",
    prepTime: 15,
    servings: 2,
    difficulty: "Easy",
    calories: 380,
    ingredients: [
      "2 large whole-wheat tortilla wraps",
      "1 can (400g) chickpeas, rinsed and drained",
      "3 tbsp classic hummus",
      "1/2 English cucumber, thinly sliced",
      "1 medium carrot, grated",
      "1 cup baby spinach leaves",
      "1 tbsp lemon juice",
      "1/2 tsp cumin and smoked paprika"
    ],
    steps: [
      "In a bowl, coarsely mash the drained chickpeas with lemon juice, cumin, smoked paprika, and a pinch of salt.",
      "Lay whole-wheat tortillas flat on a clean cutting board.",
      "Spread 1.5 tbsp of hummus down the center of each wrap.",
      "Layer baby spinach, mashed spiced chickpeas, sliced cucumber, and grated carrot.",
      "Tightly fold in the sides and roll up the tortillas from bottom to top.",
      "Slice in half diagonally and serve fresh."
    ],
    nutrition: {
      protein: "15g",
      carbs: "52g",
      fat: "11g",
      fiber: "12g"
    },
    tags: ["Vegetarian", "High Fiber", "Plant-Based", "Quick Lunch"],
    isCustom: false,
    featured: false
  },
  {
    id: "5",
    name: "Baked Salmon with Vegetables",
    category: "Dinner",
    description: "Oven-baked Atlantic salmon fillet seasoned with garlic, dill, and lemon slices, served alongside roasted asparagus spears and cherry tomatoes.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    prepTime: 30,
    servings: 2,
    difficulty: "Medium",
    calories: 480,
    ingredients: [
      "2 fresh salmon fillets (approx 150g each)",
      "1 bunch fresh asparagus, trimmed",
      "1 cup cherry tomatoes on the vine",
      "2 tbsp extra virgin olive oil",
      "2 cloves garlic, minced",
      "1 lemon (sliced into rounds)",
      "1 tbsp fresh chopped dill",
      "Sea salt and cracked black pepper"
    ],
    steps: [
      "Preheat your oven to 400°F (200°C) and line a large baking sheet with parchment paper.",
      "Arrange asparagus spears and cherry tomatoes around the sheet. Drizzle with 1 tbsp olive oil and season with salt and pepper.",
      "Place the salmon fillets in the center of the baking tray.",
      "Rub salmon with remaining olive oil, minced garlic, chopped dill, salt, and pepper. Top with lemon rounds.",
      "Bake for 15–18 minutes until the salmon is flaky and the vegetables are tender with lightly charred edges.",
      "Garnish with extra fresh dill and serve hot."
    ],
    nutrition: {
      protein: "40g",
      carbs: "12g",
      fat: "29g",
      fiber: "5g"
    },
    tags: ["High Protein", "Omega-3 Rich", "Keto Friendly", "Gluten-Free"],
    isCustom: false,
    featured: true
  },
  {
    id: "6",
    name: "Lentil Vegetable Bowl",
    category: "Dinner",
    description: "Hearty, nourishing brown lentil stew simmered in rich tomato broth with carrots, celery, kale, and fragrant Mediterranean herbs.",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80",
    prepTime: 40,
    servings: 4,
    difficulty: "Medium",
    calories: 340,
    ingredients: [
      "1 cup dry brown or green lentils, rinsed",
      "1 medium yellow onion, diced",
      "2 medium carrots, sliced",
      "2 stalks celery, chopped",
      "3 cloves garlic, minced",
      "1 can (400g) crushed tomatoes",
      "4 cups low-sodium vegetable stock",
      "2 cups chopped Tuscan kale",
      "1 tsp dried thyme and rosemary",
      "1 tbsp olive oil",
      "Salt and pepper to taste"
    ],
    steps: [
      "Heat olive oil in a large pot over medium heat. Sauté onion, carrots, and celery for 5 minutes until softened.",
      "Add minced garlic, thyme, and rosemary; cook for 1 minute until aromatic.",
      "Stir in rinsed lentils, crushed tomatoes, and vegetable stock. Season with salt and pepper.",
      "Bring soup to a boil, then reduce heat to low, cover with lid, and simmer for 25–30 minutes until lentils are tender.",
      "Stir in chopped kale and simmer uncovered for 3–4 minutes until wilted.",
      "Ladle into bowls and serve with a squeeze of fresh lemon juice."
    ],
    nutrition: {
      protein: "18g",
      carbs: "54g",
      fat: "5g",
      fiber: "15g"
    },
    tags: ["Vegetarian", "High Fiber", "Comfort Food", "Plant-Based"],
    isCustom: false,
    featured: false
  },
  {
    id: "7",
    name: "Peanut Butter Banana Bites",
    category: "Snacks",
    description: "Quick 3-ingredient frozen snack made with sliced ripe bananas sandwiched with creamy natural peanut butter and dipped in dark chocolate.",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80",
    prepTime: 10,
    servings: 4,
    difficulty: "Easy",
    calories: 160,
    ingredients: [
      "2 medium firm bananas, sliced into 1/2 inch rounds",
      "3 tbsp all-natural creamy peanut butter",
      "50g dark chocolate (70%+ cacao), melted",
      "1 tsp coconut oil (optional, for smooth chocolate)",
      "Coarse sea salt for sprinkling"
    ],
    steps: [
      "Line a baking sheet or plate with parchment paper.",
      "Spread a small dollop of peanut butter onto half of the banana slices, then top with remaining slices to make mini sandwiches.",
      "Place on the prepared tray and freeze for 30 minutes until firm.",
      "Melt the dark chocolate with coconut oil in 20-second microwave bursts.",
      "Dip half of each frozen banana bite into melted dark chocolate.",
      "Place back on parchment, sprinkle lightly with coarse sea salt, and freeze for 10 more minutes until set."
    ],
    nutrition: {
      protein: "5g",
      carbs: "20g",
      fat: "9g",
      fiber: "3g"
    },
    tags: ["Vegetarian", "Quick Snack", "Under 15 Mins", "No-Bake"],
    isCustom: false,
    featured: false
  },
  {
    id: "8",
    name: "Crispy Roasted Chickpeas",
    category: "Snacks",
    description: "Crunchy oven-roasted chickpeas tossed in olive oil, smoked paprika, garlic powder, and cumin. The ultimate healthy high-protein crunchy snack.",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80",
    prepTime: 35,
    servings: 3,
    difficulty: "Easy",
    calories: 190,
    ingredients: [
      "1 can (400g) organic chickpeas, drained and rinsed",
      "1.5 tbsp extra virgin olive oil",
      "1 tsp smoked paprika",
      "1/2 tsp garlic powder",
      "1/2 tsp ground cumin",
      "1/4 tsp cayenne pepper (optional)",
      "1/2 tsp sea salt"
    ],
    steps: [
      "Preheat your oven to 400°F (200°C).",
      "Thoroughly dry the chickpeas using clean kitchen towels or paper towels (removing moisture is the secret to ultimate crunch).",
      "Spread chickpeas on a rimmed baking sheet and roast for 15 minutes with no oil to dry them out further.",
      "Remove from oven, drizzle with olive oil, and toss with smoked paprika, garlic powder, cumin, cayenne, and sea salt until evenly coated.",
      "Return to the oven and roast for another 18–20 minutes, shaking the pan halfway through, until deeply golden and crispy.",
      "Allow to cool completely before serving for maximum crispiness."
    ],
    nutrition: {
      protein: "8g",
      carbs: "24g",
      fat: "7g",
      fiber: "6g"
    },
    tags: ["Vegetarian", "High Fiber", "Gluten-Free", "Low Calorie"],
    isCustom: false,
    featured: false
  },
  {
    id: "9",
    name: "Mediterranean Chickpea Salad",
    category: "Salads",
    description: "A vibrant, refreshing salad featuring crisp cucumbers, juicy cherry tomatoes, Kalamata olives, diced red onion, and crumbled feta tossed in Greek vinaigrette.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    prepTime: 15,
    servings: 3,
    difficulty: "Easy",
    calories: 310,
    ingredients: [
      "1 can (400g) chickpeas, rinsed and drained",
      "1 English cucumber, diced",
      "1.5 cups cherry tomatoes, halved",
      "1/2 medium red onion, finely chopped",
      "1/3 cup pitted Kalamata olives, sliced",
      "1/2 cup crumbled feta cheese",
      "1/4 cup fresh flat-leaf parsley, chopped",
      "3 tbsp extra virgin olive oil",
      "1.5 tbsp red wine vinegar",
      "1/2 tsp dried oregano, salt, and pepper"
    ],
    steps: [
      "In a large salad bowl, combine drained chickpeas, diced cucumber, halved cherry tomatoes, chopped red onion, and Kalamata olives.",
      "In a small mason jar or bowl, whisk together extra virgin olive oil, red wine vinegar, dried oregano, salt, and black pepper.",
      "Pour the dressing over the salad and toss gently to coat all ingredients.",
      "Fold in the crumbled feta cheese and chopped fresh parsley.",
      "Serve chilled or at room temperature as a main meal or fresh side dish."
    ],
    nutrition: {
      protein: "11g",
      carbs: "29g",
      fat: "17g",
      fiber: "8g"
    },
    tags: ["Vegetarian", "Mediterranean", "Heart Healthy", "No Cook"],
    isCustom: false,
    featured: true
  },
  {
    id: "10",
    name: "Grilled Chicken Salad",
    category: "Salads",
    description: "Crisp romaine and mixed spring greens loaded with juicy grilled lemon-herb chicken, sliced avocado, shaved Parmesan, and a light balsamic vinaigrette.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    prepTime: 20,
    servings: 2,
    difficulty: "Easy",
    calories: 390,
    ingredients: [
      "200g grilled chicken breast, sliced",
      "4 cups mixed salad greens (romaine, baby arugula, spinach)",
      "1/2 ripe avocado, diced",
      "1 cup cherry tomatoes, halved",
      "1/4 cup shaved Parmesan cheese",
      "2 tbsp pumpkin seeds or toasted walnuts",
      "2 tbsp balsamic vinegar",
      "2 tbsp extra virgin olive oil",
      "Salt and pepper to taste"
    ],
    steps: [
      "Wash and dry mixed salad greens thoroughly, then place in a wide serving bowl.",
      "Top greens with halved cherry tomatoes, diced avocado, and sliced warm grilled chicken breast.",
      "Whisk together balsamic vinegar, olive oil, salt, and pepper in a small bowl.",
      "Drizzle dressing evenly across the salad.",
      "Garnish with shaved Parmesan cheese and toasted pumpkin seeds for crunch.",
      "Toss lightly before serving."
    ],
    nutrition: {
      protein: "34g",
      carbs: "11g",
      fat: "24g",
      fiber: "6g"
    },
    tags: ["High Protein", "Low Carb", "Gluten-Free", "Quick Meal"],
    isCustom: false,
    featured: false
  },
  {
    id: "11",
    name: "Green Energy Smoothie",
    category: "Smoothies",
    description: "Invigorating detox green smoothie packed with baby spinach, crisp green apple, fresh cucumber, ginger root, chia seeds, and coconut water.",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80",
    prepTime: 8,
    servings: 1,
    difficulty: "Easy",
    calories: 180,
    ingredients: [
      "2 cups fresh baby spinach leaves",
      "1 green Granny Smith apple, cored and chopped",
      "1/2 medium cucumber, sliced",
      "1/2 frozen banana",
      "1/2 inch fresh ginger root, peeled",
      "1 tbsp chia seeds",
      "1 cup pure coconut water or cold water",
      "1 tbsp fresh lime juice",
      "Ice cubes as needed"
    ],
    steps: [
      "Add coconut water, lime juice, and baby spinach into a high-speed blender first.",
      "Add chopped green apple, cucumber slices, frozen banana, ginger, and chia seeds.",
      "Blend on high speed for 60–90 seconds until completely silky and smooth with no leafy flecks.",
      "Add ice cubes and blend for another 15 seconds if you prefer it frostier.",
      "Pour into a tall glass and enjoy immediately for a clean morning energy boost."
    ],
    nutrition: {
      protein: "4g",
      carbs: "38g",
      fat: "3g",
      fiber: "8g"
    },
    tags: ["Vegetarian", "Dairy-Free", "Under 10 Mins", "Immunity Boost"],
    isCustom: false,
    featured: false
  },
  {
    id: "12",
    name: "Berry Protein Smoothie",
    category: "Smoothies",
    description: "Creamy antioxidant-rich post-workout shake blending frozen wild blueberries, strawberries, plant protein powder, Greek yogurt, and almond milk.",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
    prepTime: 5,
    servings: 1,
    difficulty: "Easy",
    calories: 280,
    ingredients: [
      "1 cup frozen mixed berries (blueberries, strawberries, raspberries)",
      "1/2 cup plain non-fat Greek yogurt (or plant yogurt)",
      "1 scoop vanilla plant or whey protein powder (approx 25g)",
      "1 cup unsweetened almond milk",
      "1 tbsp ground flaxseed",
      "1 tsp honey or pure maple syrup (optional)"
    ],
    steps: [
      "Pour almond milk and Greek yogurt into the blender container.",
      "Add frozen mixed berries, vanilla protein powder, and ground flaxseed.",
      "Blend on medium, then increase to high for 45–60 seconds until rich, creamy, and uniform.",
      "Taste and add honey if extra sweetness is desired.",
      "Pour into your favorite shaker or glass and drink after workouts or as a fast breakfast."
    ],
    nutrition: {
      protein: "26g",
      carbs: "32g",
      fat: "4g",
      fiber: "7g"
    },
    tags: ["High Protein", "Post-Workout", "Vegetarian", "Antioxidant Rich"],
    isCustom: false,
    featured: true
  }
];

export const categories = [
  {
    name: "Breakfast",
    icon: "Sunrise",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80",
    description: "Energizing morning meals & bowls"
  },
  {
    name: "Lunch",
    icon: "UtensilsCrossed",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    description: "Balanced bowls, wraps & plates"
  },
  {
    name: "Dinner",
    icon: "Moon",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80",
    description: "Nutritious & wholesome evening dishes"
  },
  {
    name: "Snacks",
    icon: "Cookie",
    image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=600&q=80",
    description: "Clean bites & guilt-free treats"
  },
  {
    name: "Salads",
    icon: "Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80",
    description: "Fresh greens & Mediterranean bowls"
  },
  {
    name: "Smoothies",
    icon: "CupSoda",
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80",
    description: "Vibrant drinks, juices & protein shakes"
  }
];

export const fallbackCategoryImages = {
  Breakfast: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
  Lunch: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
  Dinner: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
  Snacks: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=800&q=80",
  Salads: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  Smoothies: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80",
  default: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80"
};
