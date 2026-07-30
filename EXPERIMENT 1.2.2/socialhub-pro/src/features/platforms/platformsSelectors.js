import { createSelector } from '@reduxjs/toolkit';
import { platformsAdapterSelectors } from './platformsSlice';
import { selectPostsGroupedByPlatform } from '../posts/postsSelectors';

export const selectAllPlatforms = platformsAdapterSelectors.selectAll;
export const selectPlatformsLoadingStatus = (state) => state.platforms.status;
export const selectPlatformById = (state, id) => state.platforms.entities[id];

/**
 * Cross-slice derived state: merges platform metadata with post counts from
 * the posts slice. Because both inputs are themselves memoized selectors,
 * this only recomputes when posts OR platforms actually change.
 */
export const selectPlatformsWithPostCounts = createSelector(
  [selectAllPlatforms, selectPostsGroupedByPlatform],
  (platforms, grouped) =>
    platforms.map((platform) => ({
      ...platform,
      postCount: grouped[platform.id]?.length ?? 0,
    }))
);

export const selectConnectedPlatforms = createSelector([selectAllPlatforms], (platforms) =>
  platforms.filter((p) => p.connected)
);

export const selectTotalFollowers = createSelector([selectAllPlatforms], (platforms) =>
  platforms.reduce((sum, p) => sum + p.followers, 0)
);
