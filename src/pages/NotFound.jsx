import React from 'react';
import EmptyState from '../components/EmptyState';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <EmptyState
        icon="search"
        title="Page Not Found"
        message="The page you are looking for doesn't exist or has been moved."
        actionText="Back to Recipes"
        actionLink="/recipes"
      />
    </div>
  );
}
