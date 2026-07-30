import React, { useMemo } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAllPlatforms } from '../../features/platforms/platformsSelectors';
import { selectPostsGroupedByPlatform } from '../../features/posts/postsSelectors';

const WIDTH = 560;
const HEIGHT = 220;
const PADDING = 32;

function ActivityChart() {
  const platforms = useAppSelector(selectAllPlatforms);
  const grouped = useAppSelector(selectPostsGroupedByPlatform);

  // Derived purely from two memoized selectors — useMemo here avoids
  // rebuilding the bar geometry unless platforms or grouped posts change.
  const bars = useMemo(() => {
    const rows = platforms.map((platform) => {
      const posts = grouped[platform.id] ?? [];
      const likes = posts.reduce((sum, p) => sum + (p.engagement?.likes ?? 0), 0);
      return { id: platform.id, name: platform.name, color: platform.color, likes };
    });
    const max = Math.max(1, ...rows.map((r) => r.likes));
    return rows.map((r) => ({ ...r, pct: r.likes / max }));
  }, [platforms, grouped]);

  const barWidth = (WIDTH - PADDING * 2) / bars.length - 20;

  return (
    <div className="panel px-6 py-6">
      <p className="font-mono text-[11px] uppercase tracking-widest text-mist-400">Engagement</p>
      <p className="mb-5 font-display text-base font-semibold text-mist-100">Likes by platform</p>

      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Likes by platform bar chart">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <line
            key={t}
            x1={PADDING}
            x2={WIDTH - PADDING}
            y1={HEIGHT - PADDING - t * (HEIGHT - PADDING * 2)}
            y2={HEIGHT - PADDING - t * (HEIGHT - PADDING * 2)}
            stroke="#1E2637"
            strokeWidth="1"
          />
        ))}
        {bars.map((bar, i) => {
          const x = PADDING + i * ((WIDTH - PADDING * 2) / bars.length) + 10;
          const barHeight = bar.pct * (HEIGHT - PADDING * 2);
          const y = HEIGHT - PADDING - barHeight;
          return (
            <g key={bar.id}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={8}
                fill={bar.color}
                opacity={0.85}
              />
              <text
                x={x + barWidth / 2}
                y={HEIGHT - PADDING + 16}
                textAnchor="middle"
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
                fill="#8B93A8"
              >
                {bar.name.split(' ')[0]}
              </text>
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                fontSize="11"
                fontFamily="'JetBrains Mono', monospace"
                fill="#E7E9F3"
              >
                {bar.likes}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default ActivityChart;
