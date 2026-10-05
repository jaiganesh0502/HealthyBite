import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Leaf, Heart, PlusCircle, BookOpen, Home, Menu, X } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';

export default function Navbar() {
  const { favourites } = useRecipes();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container nav-container">
        {/* Brand Logo */}
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <div className="nav-logo-icon">
            <Leaf size={20} />
          </div>
          <span>HealthyBite</span>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="nav-mobile-toggle" 
          onClick={toggleMenu}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Links */}
        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <Home size={17} />
            <span>Home</span>
          </NavLink>

          <NavLink 
            to="/recipes" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <BookOpen size={17} />
            <span>Recipes</span>
          </NavLink>

          <NavLink 
            to="/add-recipe" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <PlusCircle size={17} />
            <span>Add Recipe</span>
          </NavLink>

          <NavLink 
            to="/favourites" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={closeMenu}
          >
            <Heart size={17} className={favourites.length > 0 ? "text-rose-500" : ""} />
            <span>Favourites</span>
            {favourites.length > 0 && (
              <span className="nav-badge">{favourites.length}</span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
