import React, { useEffect } from 'react';

function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm animate-rise"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="panel relative w-full max-w-lg animate-rise"
      >
        <div className="flex items-center justify-between border-b border-ink-700 px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-mist-100">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-mist-300 transition hover:bg-ink-700 hover:text-mist-100"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-2 border-t border-ink-700 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}

export default Modal;
