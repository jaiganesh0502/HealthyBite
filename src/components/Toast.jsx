import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';

export default function Toast() {
  const { toast, hideToast } = useRecipes();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, hideToast]);

  if (!toast) return null;

  const renderIcon = () => {
    if (toast.type === 'error') return <AlertCircle size={18} />;
    if (toast.type === 'info') return <Info size={18} />;
    return <CheckCircle2 size={18} />;
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className={`toast ${toast.type || 'success'}`}>
        {renderIcon()}
        <span>{toast.message}</span>
        <button 
          onClick={hideToast} 
          style={{ background: 'none', border: 'none', color: 'inherit', marginLeft: '0.5rem', opacity: 0.8, cursor: 'pointer' }}
          aria-label="Close notification"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
