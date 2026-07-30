import { createSelector } from '@reduxjs/toolkit';
import { postsAdapterSelectors } from './postsSlice';
import { POST_STATUS } from '../../utils/constants';

/**
 * MEMOIZED SELECTORS (Experiment 1.2.2)
 * --------------------------------------
 * Each selector below is built with createSelector, which caches its result
 * and only recomputes when one of its input selectors' outputs changes by
 * reference. Components that read `selectPostStats` re-render only when the
 * underlying post collection actually changes — not on every store update.
 */

export const selectAllPosts = postsAdapterSelectors.selectAll;
export const selectPostsById = postsAdapterSelectors.selectEntities;
export const selectPostsLoadingStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectPublishingIds = (state) => state.posts.publishingIds;
export const selectMutationStatus = (state) => state.posts.mutationStatus;

// ---- UI-driven filter inputs (owned by the ui slice) ----
const selectStatusFilter = (state) => state.ui.filters.status;
const selectPlatformFilter = (state) => state.ui.filters.platformId;
const selectSearchTerm = (state) => state.ui.filters.search;

/** Derived state: posts filtered by status + platform + search, memoized. */
export const selectFilteredPosts = createSelector(
  [selectAllPosts, selectStatusFilter, selectPlatformFilter, selectSearchTerm],
  (posts, status, platformId, search) => {
    const term = search.trim().toLowerCase();
    return posts.filter((post) => {
      if (status !== 'all' && post.status !== status) return false;
      if (platformId !== 'all' && post.platformId !== platformId) return false;
      if (term && !post.title.toLowerCase().includes(term) && !post.body.toLowerCase().includes(term)) {
        return false;
      }
      return true;
    });
  }
);

/** Derived state: posts grouped by platformId — a normalized-friendly reduce. */
export const selectPostsGroupedByPlatform = createSelector([selectAllPosts], (posts) => {
  return posts.reduce((groups, post) => {
    (groups[post.platformId] ||= []).push(post);
    return groups;
  }, {});
});

/** Derived state: counts per status, used for the pipeline rail + stat cards. */
export const selectPostStats = createSelector([selectAllPosts], (posts) => {
  const base = {
    total: posts.length,
    [POST_STATUS.DRAFT]: 0,
    [POST_STATUS.SCHEDULED]: 0,
    [POST_STATUS.PUBLISHED]: 0,
    [POST_STATUS.FAILED]: 0,
    totalLikes: 0,
    totalShares: 0,
    totalComments: 0,
  };
  for (const post of posts) {
    base[post.status] = (base[post.status] ?? 0) + 1;
    base.totalLikes += post.engagement?.likes ?? 0;
    base.totalShares += post.engagement?.shares ?? 0;
    base.totalComments += post.engagement?.comments ?? 0;
  }
  return base;
});

/** Derived state: engagement leaderboard, top 5, recomputed only when posts change. */
export const selectTopEngagedPosts = createSelector([selectAllPosts], (posts) =>
  [...posts]
    .sort((a, b) => (b.engagement?.likes ?? 0) - (a.engagement?.likes ?? 0))
    .slice(0, 5)
);

/** Selector factory: memoized-per-platform lookup (avoids one giant recompute). */
export const makeSelectPostsForPlatform = () =>
  createSelector(
    [selectAllPosts, (_, platformId) => platformId],
    (posts, platformId) => posts.filter((p) => p.platformId === platformId)
  );
