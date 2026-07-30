import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchPlatforms } from '../../features/platforms/platformsSlice';
import { selectPlatformsWithPostCounts } from '../../features/platforms/platformsSelectors';
import { selectPlatformsLoadingStatus } from '../../features/platforms/platformsSelectors';
import { REQUEST_STATUS } from '../../utils/constants';
import PlatformCard from './PlatformCard';
import Loader from '../Common/Loader';

function PlatformGrid() {
  const dispatch = useAppDispatch();
  const platforms = useAppSelector(selectPlatformsWithPostCounts);
  const status = useAppSelector(selectPlatformsLoadingStatus);

  useEffect(() => {
    if (status === REQUEST_STATUS.IDLE) dispatch(fetchPlatforms());
  }, [status, dispatch]);

  if (status === REQUEST_STATUS.LOADING) {
    return (
      <div className="panel flex items-center justify-center py-16">
        <Loader label="Fetching platforms…" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {platforms.map((platform) => (
        <PlatformCard key={platform.id} platform={platform} />
      ))}
    </div>
  );
}

export default PlatformGrid;
