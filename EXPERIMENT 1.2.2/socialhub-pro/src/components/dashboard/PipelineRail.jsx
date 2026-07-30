import React from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectPostStats, selectPublishingIds } from '../../features/posts/postsSelectors';
import { STATUS_PIPELINE, STATUS_META, POST_STATUS } from '../../utils/constants';

/**
 * The one bold, structural idea on this page: posts genuinely move through
 * draft → scheduled → published in that order, so a numbered rail encodes
 * something true about the data rather than decorating it.
 */
function PipelineRail() {
  const stats = useAppSelector(selectPostStats);
  const publishingIds = useAppSelector(selectPublishingIds);

  return (
    <div className="panel px-6 py-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-mist-400">Publishing pipeline</p>
          <p className="font-display text-base font-semibold text-mist-100">Where every post stands right now</p>
        </div>
        {publishingIds.length > 0 && (
          <span className="flex items-center gap-2 rounded-full border border-amber/40 bg-amber/10 px-3 py-1 text-xs font-mono text-amber">
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-amber" />
            {publishingIds.length} publishing…
          </span>
        )}
      </div>

      <div className="flex items-center">
        {STATUS_PIPELINE.map((status, i) => {
          const meta = STATUS_META[status];
          const count = stats[status] ?? 0;
          const isLast = i === STATUS_PIPELINE.length - 1;
          return (
            <React.Fragment key={status}>
              <div className="flex flex-col items-center gap-3">
                <div
                  className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border font-display text-xl font-semibold"
                  style={{ borderColor: `${meta.color}55`, color: meta.color, backgroundColor: `${meta.color}14` }}
                >
                  {count}
                </div>
                <div className="text-center">
                  <p className="font-mono text-[10px] text-mist-500">0{i + 1}</p>
                  <p className="text-sm font-medium text-mist-100">{meta.label}</p>
                </div>
              </div>
              {!isLast && (
                <div className="mx-3 h-px flex-1 bg-gradient-to-r from-ink-600 via-ink-500 to-ink-600 md:mx-6" />
              )}
            </React.Fragment>
          );
        })}
        {stats[POST_STATUS.FAILED] > 0 && (
          <div className="ml-6 flex flex-col items-center gap-3 border-l border-ink-700 pl-6">
            <div
              className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border font-display text-xl font-semibold"
              style={{
                borderColor: `${STATUS_META[POST_STATUS.FAILED].color}55`,
                color: STATUS_META[POST_STATUS.FAILED].color,
                backgroundColor: `${STATUS_META[POST_STATUS.FAILED].color}14`,
              }}
            >
              {stats[POST_STATUS.FAILED]}
            </div>
            <p className="text-sm font-medium text-mist-100">Failed</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PipelineRail;
