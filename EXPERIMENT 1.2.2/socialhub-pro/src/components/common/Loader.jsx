import React from 'react';

function Loader({ label = 'Loading', size = 'md' }) {
  const dim = size === 'sm' ? 'h-3.5 w-3.5 border-2' : 'h-6 w-6 border-2';
  return (
    <div className="flex items-center gap-2 text-mist-300">
      <span
        className={`${dim} animate-spin rounded-full border-violet/30 border-t-violet`}
        role="status"
        aria-label={label}
      />
      <span className="text-sm font-mono">{label}</span>
    </div>
  );
}

export default React.memo(Loader);
