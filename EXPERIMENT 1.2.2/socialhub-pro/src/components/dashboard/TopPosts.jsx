import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectTopEngagedPosts } from '../../features/posts/postsSelectors';
import { selectAllPlatforms } from '../../features/platforms/platformsSelectors';
import Badge from '../Common/Badge';

function TopPosts() {
  const posts = useAppSelector(selectTopEngagedPosts);
  const platforms = useAppSelector(selectAllPlatforms);
  const platformName = (id) => platforms.find((p) => p.id === id)?.name ?? 'Unknown';

  return (
    <div className="panel px-6 py-6">
      <p className="font-mono text-[11px] uppercase tracking-widest text-mist-400">Leaderboard</p>
      <p className="mb-4 font-display text-base font-semibold text-mist-100">Top performing posts</p>

      <ul className="flex flex-col divide-y divide-ink-700">
        {posts.map((post, i) => (
          <li key={post.id} className="flex items-center gap-4 py-3">
            <span className="font-mono text-sm text-mist-500">{String(i + 1).padStart(2, '0')}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-mist-100">{post.title}</p>
              <p className="text-xs text-mist-400">{platformName(post.platformId)}</p>
            </div>
            <Badge status={post.status} />
            <span className="w-14 text-right font-mono text-sm text-violet-soft">
              {post.engagement?.likes ?? 0}♥
            </span>
          </li>
        ))}
        {posts.length === 0 && <p className="py-6 text-center text-sm text-mist-400">No posts yet.</p>}
      </ul>
    </div>
  );
}

export default TopPosts;
