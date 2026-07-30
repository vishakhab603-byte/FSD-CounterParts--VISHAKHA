import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { draftUpdated, draftDiscarded } from '../../features/drafts/draftsSlice';
import { addNewPost } from '../../features/posts/postsSlice';
import { toastPushed } from '../../features/ui/uiSlice';
import { selectAllPlatforms } from '../../features/platforms/platformsSelectors';
import { POST_STATUS } from '../../utils/constants';
import { formatRelative } from '../../utils/formatDate';

function DraftCard({ draft }) {
  const dispatch = useAppDispatch();
  const platforms = useAppSelector(selectAllPlatforms);

  const handlePromote = async () => {
    if (!draft.title.trim() || !draft.body.trim() || !draft.platformId) {
      dispatch(toastPushed('Add a title, body, and platform before promoting.', 'error'));
      return;
    }
    const result = await dispatch(
      addNewPost({
        title: draft.title,
        body: draft.body,
        platformId: draft.platformId,
        status: POST_STATUS.DRAFT,
        scheduledAt: null,
        tags: draft.tags,
      })
    );
    if (addNewPost.fulfilled.match(result)) {
      dispatch(draftDiscarded(draft.id));
      dispatch(toastPushed('Draft promoted to Posts.', 'success'));
    }
  };

  return (
    <div className="panel animate-rise flex flex-col gap-3 px-5 py-4">
      <input
        value={draft.title}
        onChange={(e) => dispatch(draftUpdated({ id: draft.id, changes: { title: e.target.value } }))}
        placeholder="Untitled draft"
        className="bg-transparent font-display text-base font-semibold text-mist-100 outline-none placeholder:text-mist-500"
      />
      <textarea
        value={draft.body}
        onChange={(e) => dispatch(draftUpdated({ id: draft.id, changes: { body: e.target.value } }))}
        placeholder="Start writing…"
        rows={3}
        className="resize-none bg-transparent text-sm text-mist-300 outline-none placeholder:text-mist-500"
      />

      <div className="flex items-center justify-between border-t border-ink-700 pt-3">
        <select
          value={draft.platformId ?? ''}
          onChange={(e) => dispatch(draftUpdated({ id: draft.id, changes: { platformId: e.target.value } }))}
          className="rounded-lg border border-ink-700 bg-ink-900 px-2 py-1.5 text-xs text-mist-300 outline-none focus:border-violet"
        >
          <option value="">No platform</option>
          {platforms.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <span className="font-mono text-[11px] text-mist-500">edited {formatRelative(draft.updatedAt)}</span>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePromote}
            className="rounded-lg bg-violet/15 px-2.5 py-1.5 text-xs font-semibold text-violet-soft transition hover:bg-violet/25"
          >
            Promote
          </button>
          <button
            onClick={() => dispatch(draftDiscarded(draft.id))}
            className="rounded-lg px-2.5 py-1.5 text-xs text-mist-400 transition hover:bg-rose/10 hover:text-rose"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DraftCard);
