import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { generateId } from '../../utils/idGenerator';

/**
 * Drafts are intentionally a separate slice from posts: a draft is
 * "in-progress composer state" that hasn't been committed yet, while a post
 * with status === 'draft' has already been saved through the posts API.
 * Keeping them apart avoids conflating client-only scratch state with
 * server-confirmed entities.
 */
const draftsAdapter = createEntityAdapter({
  sortComparer: (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
});

const initialState = draftsAdapter.getInitialState({
  activeDraftId: null,
});

const draftsSlice = createSlice({
  name: 'drafts',
  initialState,
  reducers: {
    draftStarted: {
      reducer: (state, action) => {
        draftsAdapter.addOne(state, action.payload);
        state.activeDraftId = action.payload.id;
      },
      prepare: (partial = {}) => {
        const now = new Date().toISOString();
        return {
          payload: {
            id: generateId('sd'),
            title: '',
            body: '',
            platformId: null,
            tags: [],
            createdAt: now,
            updatedAt: now,
            ...partial,
          },
        };
      },
    },
    draftUpdated(state, action) {
      const { id, changes } = action.payload;
      draftsAdapter.updateOne(state, {
        id,
        changes: { ...changes, updatedAt: new Date().toISOString() },
      });
    },
    draftDiscarded(state, action) {
      draftsAdapter.removeOne(state, action.payload);
      if (state.activeDraftId === action.payload) state.activeDraftId = null;
    },
    activeDraftCleared(state) {
      state.activeDraftId = null;
    },
  },
});

export const { draftStarted, draftUpdated, draftDiscarded, activeDraftCleared } =
  draftsSlice.actions;

export const draftsAdapterSelectors = draftsAdapter.getSelectors((state) => state.drafts);

export const selectAllDrafts = draftsAdapterSelectors.selectAll;
export const selectActiveDraftId = (state) => state.drafts.activeDraftId;
export const selectActiveDraft = (state) =>
  state.drafts.activeDraftId ? state.drafts.entities[state.drafts.activeDraftId] : null;

export default draftsSlice.reducer;
