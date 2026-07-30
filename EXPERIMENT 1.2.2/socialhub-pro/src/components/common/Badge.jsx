import React from 'react';
import { STATUS_META } from '../../utils/constants';

function Badge({ status }) {
  const meta = STATUS_META[status] ?? { label: status, color: '#8B93A8' };
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-mono uppercase tracking-wide"
      style={{ color: meta.color, backgroundColor: `${meta.color}1A`, border: `1px solid ${meta.color}40` }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
      {meta.label}
    </span>
  );
}

export default React.memo(Badge);
