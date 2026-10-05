import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX, Heart, BookOpen, Utensils } from 'lucide-react';

export default function EmptyState({ 
  icon = 'search', 
  title = "No recipes found", 
  message = "We couldn't find any recipes matching your current search or filter criteria.", 
  actionText, 
  actionLink, 
  onActionClick 
}) {
  const renderIcon = () => {
    switch (icon) {
      case 'heart':
        return <Heart size={32} />;
      case 'book':
        return <BookOpen size={32} />;
      case 'utensils':
        return <Utensils size={32} />;
      case 'search':
      default:
        return <SearchX size={32} />;
    }
  };

  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {renderIcon()}
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      
      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary btn-sm">
          {actionText}
        </Link>
      )}

      {actionText && onActionClick && !actionLink && (
        <button type="button" onClick={onActionClick} className="btn btn-secondary btn-sm">
          {actionText}
        </button>
      )}
    </div>
  );
}
