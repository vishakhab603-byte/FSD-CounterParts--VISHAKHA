import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAllDrafts, draftStarted } from '../../features/drafts/draftsSlice';
import DraftCard from './DraftCard';

function DraftList() {
  const dispatch = useAppDispatch();
  const drafts = useAppSelector(selectAllDrafts);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <button
          onClick={() => dispatch(draftStarted())}
          className="rounded-xl border border-ink-700 bg-ink-800 px-4 py-2 text-sm font-medium text-mist-100 transition hover:border-violet hover:text-violet-soft"
        >
          + Start a draft
        </button>
      </div>

      {drafts.length === 0 ? (
        <div className="panel px-6 py-16 text-center">
          <p className="text-sm text-mist-400">No local drafts. Start one to autosave as you type.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {drafts.map((draft) => (
            <DraftCard key={draft.id} draft={draft} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DraftList;
