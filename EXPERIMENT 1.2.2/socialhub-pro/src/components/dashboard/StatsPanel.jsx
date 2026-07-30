import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectPostStats } from '../../features/posts/postsSelectors';
import { selectTotalFollowers, selectConnectedPlatforms } from '../../features/platforms/platformsSelectors';
import { POST_STATUS } from '../../utils/constants';

function StatCard({ label, value, accent, sub }) {
  return (
    <div className="panel animate-rise flex flex-col gap-1 px-5 py-4">
      <p className="font-mono text-[11px] uppercase tracking-widest text-mist-400">{label}</p>
      <p className="font-display text-3xl font-semibold" style={{ color: accent }}>
        {value}
      </p>
      {sub && <p className="text-xs text-mist-400">{sub}</p>}
    </div>
  );
}

function StatsPanel() {
  const stats = useAppSelector(selectPostStats);
  const totalFollowers = useAppSelector(selectTotalFollowers);
  const connected = useAppSelector(selectConnectedPlatforms);

  // useMemo guards against recomputing the formatted string on renders that
  // don't change followers (e.g. filter changes elsewhere in the tree).
  const followerLabel = useMemo(
    () => (totalFollowers >= 1000 ? `${(totalFollowers / 1000).toFixed(1)}k` : `${totalFollowers}`),
    [totalFollowers]
  );

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      <StatCard label="Total posts" value={stats.total} accent="#E7E9F3" sub="All time" />
      <StatCard label="Drafts" value={stats[POST_STATUS.DRAFT]} accent="#8B93A8" sub="Not yet scheduled" />
      <StatCard label="Scheduled" value={stats[POST_STATUS.SCHEDULED]} accent="#F5A623" sub="Queued to publish" />
      <StatCard label="Published" value={stats[POST_STATUS.PUBLISHED]} accent="#2DD4BF" sub="Live" />
      <StatCard label="Reach" value={followerLabel} accent="#9B82FF" sub={`${connected.length} platforms connected`} />
    </div>
  );
}

export default StatsPanel;
