import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectToasts, toastDismissed } from '../../features/ui/uiSlice';

const TYPE_STYLES = {
  success: 'border-teal/40 text-teal',
  error: 'border-rose/40 text-rose',
  info: 'border-violet/40 text-violet-soft',
};

function ToastItem({ toast }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => dispatch(toastDismissed(toast.id)), 4200);
    return () => clearTimeout(timer);
  }, [toast.id, dispatch]);

  return (
    <div
      className={`panel animate-toastIn flex items-center gap-3 border px-4 py-3 text-sm ${TYPE_STYLES[toast.type] ?? TYPE_STYLES.info}`}
    >
      <span className="flex-1 text-mist-100">{toast.message}</span>
      <button
        onClick={() => dispatch(toastDismissed(toast.id))}
        className="text-mist-400 transition hover:text-mist-100"
        aria-label="Dismiss notification"
      >
        ✕
      </button>
    </div>
  );
}

function ToastStack() {
  const toasts = useAppSelector(selectToasts);
  if (!toasts.length) return null;
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex w-80 flex-col gap-2">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  );
}

export default ToastStack;
