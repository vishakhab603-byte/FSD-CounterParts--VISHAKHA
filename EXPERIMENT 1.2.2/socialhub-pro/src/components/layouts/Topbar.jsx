import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  selectActiveView,
  selectFilters,
  searchChanged,
  composerOpened,
} from '../../features/ui/uiSlice';

const VIEW_TITLES = {
  dashboard: ['Dashboard', 'A live read on everything moving through the pipeline.'],
  posts: ['Posts', 'Every post, normalized in one store, filterable in real time.'],
  platforms: ['Platforms', 'Connected accounts and their reach.'],
  drafts: ['Drafts', 'Work in progress, autosaved as you type.'],
};

function Topbar() {
  const dispatch = useAppDispatch();
  const activeView = useAppSelector(selectActiveView);
  const filters = useAppSelector(selectFilters);
  const [title, subtitle] = VIEW_TITLES[activeView] ?? VIEW_TITLES.dashboard;

  return (
    <header className="flex items-center justify-between gap-4 border-b border-ink-700 bg-ink-950/60 px-8 py-5">
      <div>
        <h1 className="font-display text-xl font-semibold text-mist-100">{title}</h1>
        <p className="text-sm text-mist-400">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {activeView === 'posts' && (
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-mist-400">⌕</span>
            <input
              value={filters.search}
              onChange={(e) => dispatch(searchChanged(e.target.value))}
              placeholder="Search posts…"
              className="w-56 rounded-xl border border-ink-700 bg-ink-800 py-2 pl-9 pr-3 text-sm text-mist-100 outline-none transition placeholder:text-mist-400 focus:border-violet"
            />
          </div>
        )}
        <button
          onClick={() => dispatch(composerOpened())}
          className="rounded-xl bg-violet px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-violet-soft active:scale-[0.98]"
        >
          + New post
        </button>
      </div>
    </header>
  );
}

export default Topbar;
