import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, title = "Delete Recipe", message, onConfirm, onCancel, confirmText = "Delete Recipe", cancelText = "Cancel" }) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-icon-danger">
            <AlertTriangle size={22} />
          </div>
          <h3 id="modal-title">{title}</h3>
        </div>

        <div className="modal-body">
          <p>{message || "Are you sure you want to delete this recipe?"}</p>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn btn-outline btn-sm" onClick={onCancel}>
            {cancelText}
          </button>
          <button type="button" className="btn btn-danger btn-sm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
