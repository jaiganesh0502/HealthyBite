# Healthy Recipe Book ( https://healthyybitee.netlify.app/ )


An interactive, responsive, and modern ReactJS web application designed to help individuals discover, filter, save, and contribute nutritious and delicious healthy recipes. Built as an individual assignment for the Full Stack Web Development course.

---

## Project Description

**HealthyBite — Healthy Recipe Book** is a student-built Single Page Application (SPA) that promotes nutritious eating habits by providing a clean, distraction-free catalog of wholesome recipes across categories like Breakfast, Lunch, Dinner, Snacks, Salads, and Smoothies. 

The application provides instant client-side search, multi-criteria filtering, step-by-step interactive preparation instructions with live ingredient checklists, dynamic recipe creation/editing with client-side validation, favourite recipe bookmarking, and continuous data persistence using browser `LocalStorage`.

---

## Features

- 🥗 **Browse Healthy Recipes**: Explore a curated collection of wholesome, balanced meals with detailed macronutrient approximations and cooking metrics.
- 🏷️ **Category Explorer**: Direct navigation and filtering across 6 dedicated categories: Breakfast, Lunch, Dinner, Snacks, Salads, and Smoothies.
- 🔍 **Live Real-Time Search**: Instant dynamic searching by recipe title or ingredient names with instant results.
- ⏱️ **Multi-Filter Capabilities**: Seamlessly combine keyword searches with Category, Preparation Time (<15 min, 15–30 min, 30–45 min, >45 min), and Difficulty levels (Easy, Medium).
- 📝 **Interactive Ingredient Checklist**: Dynamic checkboxes that allow users to strike through ingredients as they prep their kitchen counter.
- ➕ **Add Custom Recipes**: Intuitive form with client-side field validation to publish your own healthy recipes.
- ✏️ **Edit & Update Recipes**: Modify user-created recipes with changes saved immediately to persistent storage.
- 🗑️ **Delete with Confirmation Modal**: Securely remove user-created dishes with a confirmation dialogue to prevent accidental deletion.
- ❤️ **Favourites & Bookmark System**: Save your preferred dishes and view them in a dedicated Favourites page.
- 📊 **Dynamic Statistics Dashboard**: Live counts of total recipes, categories, and saved favourites calculated dynamically from state.
- 📱 **Fully Responsive Layout**: Fluid interface adapting gracefully from 375px mobile screens up to 1440px desktop displays.

---

## Technologies Used

- **ReactJS (v18+)** — Functional components, Hooks, Context API
- **JavaScript (ES6+)** — Modules, arrow functions, destructuring, array methods (`map`, `filter`, `find`, `reduce`)
- **React Router (v6)** — Client-side SPA routing (`BrowserRouter`, `Routes`, `Route`, `useNavigate`, `useLocation`, `useSearchParams`)
- **HTML5 & CSS3** — Semantic structure, CSS variables, CSS Grid, Flexbox, custom animations
- **Lucide React** — Modern, lightweight, accessible UI icons
- **LocalStorage API** — Persistent client-side storage for custom recipes, edits, and favourite bookmarks
- **Vite** — High-performance frontend build tooling and local dev server

---

## React Concepts Used

1. **Functional Components & JSX**: Modular, declarative component architecture (`Navbar`, `RecipeCard`, `RecipeForm`, `SearchBar`, `CategoryFilter`, `ConfirmModal`, `EmptyState`, `Toast`).
2. **State Management (`useState`)**: Handling search inputs, active category tabs, multi-criteria dropdowns, form fields, modal toggles, mobile menu drawers, and interactive checklists.
3. **Side Effects (`useEffect`)**: Synchronizing data with browser `LocalStorage` on state mutations and handling window scroll transitions.
4. **Context API (`createContext`, `useContext`)**: Global state orchestration via `RecipeProvider` to share recipe datasets, favourite IDs, dynamic statistics, and toast notifications across all pages without prop drilling.
5. **Array Manipulation**: Efficient utilization of `.filter()`, `.map()`, `.find()`, and `.reduce()` for live searching, category filtering, and calculating dynamic statistics.
6. **Controlled Forms & Client-Side Validation**: State-driven form inputs with custom regex/length validation rules, real-time error messages, and submission handling (`e.preventDefault()`).
7. **Conditional Rendering**: Dynamic displays for empty search states, favourite badges, difficulty pills, custom recipe actions (edit/delete), and error banners.
8. **Client-Side Routing**: Parameterized routes (`/recipe/:id`, `/edit-recipe/:id`) with automatic scroll-to-top on route changes.

---

## Installation & Setup

1. **Clone the repository or extract the project files:**
   ```bash
   cd "fullsatck task 2"
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:5173
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## Project Structure

```
fullstack-task-2/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── CategoryFilter.jsx   # Category pill selector
│   │   ├── ConfirmModal.jsx     # Delete confirmation popup modal
│   │   ├── EmptyState.jsx       # Empty search/favourites fallback UI
│   │   ├── Footer.jsx           # Global application footer
│   │   ├── Navbar.jsx           # Responsive navigation header
│   │   ├── RecipeCard.jsx       # Reusable recipe card with image & stats
│   │   ├── RecipeForm.jsx       # Validated form for add/edit operations
│   │   ├── SearchBar.jsx        # Real-time search input with clear button
│   │   └── Toast.jsx            # Action feedback notification toast
│   ├── context/
│   │   └── RecipeContext.jsx    # Global state & LocalStorage sync
│   ├── data/
│   │   └── recipes.js           # 12 initial predefined recipes & categories
│   ├── pages/
│   │   ├── AddRecipe.jsx        # Page to create a custom recipe
│   │   ├── EditRecipe.jsx       # Page to modify an existing custom recipe
│   │   ├── Favourites.jsx       # Saved favourite recipes collection
│   │   ├── Home.jsx             # Hero, category cards, stats, featured recipes
│   │   ├── NotFound.jsx         # 404 error page with navigation fallback
│   │   ├── RecipeDetails.jsx    # Detailed recipe view with checklist & steps
│   │   └── Recipes.jsx          # Recipe explorer with live search & filters
│   ├── styles/
│   │   └── global.css           # Global design system & responsive styling
│   ├── App.jsx                  # Main router and layout composition
│   ├── index.css                # Style entry point
│   └── main.jsx                 # React root DOM rendering
├── index.html                   # HTML template with Google Fonts
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite configuration
└── README.md                    # Project documentation
```

---

## Application Workflow

1. **Explore Catalog**: Users arrive at the Home page with dynamic stats, hero CTA, category cards, and popular recipes.
2. **Search & Filter**: Navigating to the Recipes page, users can type in the search bar or combine category pills and prep time filters to dynamically narrow down dishes.
3. **Cook & Prep**: Clicking on any recipe opens its detailed view containing high-resolution images, nutrition breakdown, calorie information, an interactive checklist of ingredients, and numbered cooking steps.
4. **Bookmark Favourites**: Clicking the heart icon on any card or details page saves the recipe in `LocalStorage` and updates the navbar badge count in real time.
5. **Add Custom Dish**: Users can submit custom recipes via the Add Recipe form with client-side field validation. Newly created recipes immediately appear in the catalog.
6. **Edit / Delete Custom Dishes**: User-created recipes feature distinct badges and offer one-click editing and secure modal-confirmed deletion. Predefined recipes remain protected.

---

## Screenshots

*(Screenshots can be captured during local execution and placed here)*

- **Home Page Hero & Categories**
- **Recipe Catalog & Dynamic Filter Bar**
- **Recipe Details & Interactive Ingredient Checklist**
- **Add Recipe Form with Validation Feedback**
- **My Favourites Collection**

---

## Author

**Jai Ganesh R**  
**Registration Number:** RA2411003050171  
*Full Stack Web Development — Course Assignment*
