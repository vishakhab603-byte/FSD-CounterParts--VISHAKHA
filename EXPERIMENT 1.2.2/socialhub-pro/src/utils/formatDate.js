export function formatRelative(iso) {
  if (!iso) return '—';
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = then - now;
  const diffMin = Math.round(diffMs / 60000);
  const abs = Math.abs(diffMin);

  if (abs < 1) return 'just now';
  if (abs < 60) return diffMin > 0 ? `in ${abs}m` : `${abs}m ago`;
  const diffH = Math.round(diffMin / 60);
  if (Math.abs(diffH) < 24) return diffH > 0 ? `in ${diffH}h` : `${Math.abs(diffH)}h ago`;
  const diffD = Math.round(diffH / 24);
  return diffD > 0 ? `in ${diffD}d` : `${Math.abs(diffD)}d ago`;
}

export function formatDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
