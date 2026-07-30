import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { publishPost, removePost } from '../../features/posts/postsSlice';
import { selectPublishingIds } from '../../features/posts/postsSelectors';
import { selectPlatformById } from '../../features/platforms/platformsSelectors';
import { toastPushed } from '../../features/ui/uiSlice';
import { formatDateTime, formatRelative } from '../../utils/formatDate';
import { POST_STATUS } from '../../utils/constants';
import Badge from '../Common/Badge';
import Loader from '../Common/Loader';

function PostCard({ post }) {
  const dispatch = useAppDispatch();
  const platform = useAppSelector((state) => selectPlatformById(state, post.platformId));
  const publishingIds = useAppSelector(selectPublishingIds);
  const isPublishing = publishingIds.includes(post.id);

  const canPublish = post.status === POST_STATUS.DRAFT || post.status === POST_STATUS.SCHEDULED || post.status === POST_STATUS.FAILED;

  const handlePublish = async () => {
    const result = await dispatch(publishPost(post.id));
    if (publishPost.fulfilled.match(result)) {
      dispatch(toastPushed(`"${post.title}" published.`, 'success'));
    } else {
      dispatch(toastPushed(result.payload?.message ?? 'Publish failed.', 'error'));
    }
  };

  const handleDelete = () => {
    dispatch(removePost(post.id));
    dispatch(toastPushed(`"${post.title}" deleted.`, 'info'));
  };

  return (
    <div className="panel animate-rise flex flex-col gap-3 px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1 flex items-center gap-2">
            {platform && (
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: platform.color }}
                title={platform.name}
              />
            )}
            <span className="text-xs text-mist-400">{platform?.name ?? 'Unknown platform'}</span>
          </div>
          <h3 className="truncate font-display text-base font-semibold text-mist-100">{post.title}</h3>
        </div>
        <Badge status={post.status} />
      </div>

      <p className="line-clamp-2 text-sm text-mist-300">{post.body}</p>

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-md bg-ink-700 px-2 py-0.5 text-[11px] text-mist-300">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-ink-700 pt-3">
        <div className="flex items-center gap-4 font-mono text-xs text-mist-400">
          <span title={formatDateTime(post.scheduledAt)}>{formatRelative(post.scheduledAt)}</span>
          {post.status === POST_STATUS.PUBLISHED && (
            <span className="flex items-center gap-3 text-mist-300">
              <span>♥ {post.engagement?.likes ?? 0}</span>
              <span>↻ {post.engagement?.shares ?? 0}</span>
              <span>◈ {post.engagement?.comments ?? 0}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isPublishing ? (
            <Loader label="Publishing" size="sm" />
          ) : (
            <>
              {canPublish && (
                <button
                  onClick={handlePublish}
                  className="rounded-lg bg-violet/15 px-3 py-1.5 text-xs font-semibold text-violet-soft transition hover:bg-violet/25"
                >
                  Publish now
                </button>
              )}
              <button
                onClick={handleDelete}
                className="rounded-lg px-3 py-1.5 text-xs text-mist-400 transition hover:bg-rose/10 hover:text-rose"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Memoized: with a normalized store, only the card whose entity actually
// changed re-renders — editing one post never re-renders its siblings.
export default React.memo(PostCard);
