import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectFilters, statusFilterChanged, platformFilterChanged, filtersReset } from '../../features/ui/uiSlice';
import { selectAllPlatforms } from '../../features/platforms/platformsSelectors';
import { STATUS_META } from '../../utils/constants';

function PostFilters() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const platforms = useAppSelector(selectAllPlatforms);

  const isDirty = filters.status !== 'all' || filters.platformId !== 'all' || filters.search !== '';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={filters.status}
        onChange={(e) => dispatch(statusFilterChanged(e.target.value))}
        className="rounded-xl border border-ink-700 bg-ink-800 px-3 py-2 text-sm text-mist-100 outline-none transition focus:border-violet"
      >
        <option value="all">All statuses</option>
        {Object.entries(STATUS_META).map(([key, meta]) => (
          <option key={key} value={key}>
            {meta.label}
          </option>
        ))}
      </select>

      <select
        value={filters.platformId}
        onChange={(e) => dispatch(platformFilterChanged(e.target.value))}
        className="rounded-xl border border-ink-700 bg-ink-800 px-3 py-2 text-sm text-mist-100 outline-none transition focus:border-violet"
      >
        <option value="all">All platforms</option>
        {platforms.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      {isDirty && (
        <button
          onClick={() => dispatch(filtersReset())}
          className="rounded-xl px-3 py-2 text-sm text-mist-400 transition hover:text-mist-100"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}

export default PostFilters;
