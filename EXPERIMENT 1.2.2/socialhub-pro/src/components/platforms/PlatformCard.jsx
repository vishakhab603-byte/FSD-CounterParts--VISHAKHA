import React from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { toggleConnection } from '../../features/platforms/platformsSlice';
import { toastPushed } from '../../features/ui/uiSlice';

function PlatformCard({ platform }) {
  const dispatch = useAppDispatch();

  const handleToggle = async () => {
    await dispatch(toggleConnection(platform.id));
    dispatch(
      toastPushed(
        `${platform.name} ${platform.connected ? 'disconnected' : 'connected'}.`,
        platform.connected ? 'info' : 'success'
      )
    );
  };

  return (
    <div className="panel animate-rise flex flex-col gap-4 px-5 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-bold text-white"
            style={{ backgroundColor: platform.color }}
          >
            {platform.name[0]}
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-mist-100">{platform.name}</p>
            <p className="text-xs text-mist-400">{platform.handle}</p>
          </div>
        </div>
        <span
          className={`h-2.5 w-2.5 rounded-full ${platform.connected ? 'bg-teal shadow-glow' : 'bg-ink-600'}`}
          title={platform.connected ? 'Connected' : 'Disconnected'}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-ink-700 pt-4 font-mono text-sm">
        <div>
          <p className="text-mist-400">Followers</p>
          <p className="text-mist-100">{platform.followers.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-mist-400">Posts</p>
          <p className="text-mist-100">{platform.postCount}</p>
        </div>
      </div>

      <button
        onClick={handleToggle}
        className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
          platform.connected
            ? 'bg-ink-700 text-mist-300 hover:bg-rose/15 hover:text-rose'
            : 'bg-violet text-white shadow-glow hover:bg-violet-soft'
        }`}
      >
        {platform.connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
}

export default React.memo(PlatformCard);
