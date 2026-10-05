import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="nav-logo">
              <div className="nav-logo-icon">
                <Leaf size={18} />
              </div>
              <span>HealthyBite</span>
            </Link>
            <p className="footer-desc">
              Simple recipes for healthier everyday choices. Discover, cook, and share wholesome dishes made with love and fresh ingredients.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-nav-list">
              <li><Link to="/" className="footer-nav-link">Home</Link></li>
              <li><Link to="/recipes" className="footer-nav-link">Browse Recipes</Link></li>
              <li><Link to="/add-recipe" className="footer-nav-link">Add Your Recipe</Link></li>
              <li><Link to="/favourites" className="footer-nav-link">My Favourites</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-col">
            <h4>Categories</h4>
            <ul className="footer-nav-list">
              <li><Link to="/recipes?category=Breakfast" className="footer-nav-link">Breakfast Bowls</Link></li>
              <li><Link to="/recipes?category=Lunch" className="footer-nav-link">Energizing Lunches</Link></li>
              <li><Link to="/recipes?category=Dinner" className="footer-nav-link">Nutritious Dinners</Link></li>
              <li><Link to="/recipes?category=Smoothies" className="footer-nav-link">Clean Smoothies</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2026 HealthyBite. Full Stack Web Development Project.</p>
          <p>
            Developed by <span className="footer-author">Jai Ganesh R (RA2411003050171)</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
