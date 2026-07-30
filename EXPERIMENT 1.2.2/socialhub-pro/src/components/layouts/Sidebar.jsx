import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectActiveView, viewChanged } from '../../features/ui/uiSlice';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '◈' },
  { id: 'posts', label: 'Posts', icon: '▤' },
  { id: 'platforms', label: 'Platforms', icon: '⬡' },
  { id: 'drafts', label: 'Drafts', icon: '✎' },
];

function Sidebar() {
  const activeView = useAppSelector(selectActiveView);
  const dispatch = useAppDispatch();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-ink-700 bg-ink-900/60 px-4 py-6">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet shadow-glow">
          <span className="font-display text-sm font-bold text-white">P</span>
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-mist-100">Pipeline</p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-mist-400">Redux Toolkit</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => dispatch(viewChanged(item.id))}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                active
                  ? 'bg-violet/15 text-violet-soft shadow-glow'
                  : 'text-mist-300 hover:bg-ink-700/60 hover:text-mist-100'
              }`}
            >
              <span className="w-4 text-center text-base">{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-ink-700 bg-ink-800/60 p-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-mist-400">Experiment</p>
        <p className="mt-1 text-xs leading-relaxed text-mist-300">
          1.2.1 Centralized state · 1.2.2 Memoized selectors
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
