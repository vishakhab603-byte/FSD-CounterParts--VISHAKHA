import { createSlice } from '@reduxjs/toolkit';
import { generateId } from '../../utils/idGenerator';

const initialState = {
  activeView: 'dashboard', // dashboard | posts | platforms | drafts
  filters: {
    status: 'all',
    platformId: 'all',
    search: '',
  },
  isComposerOpen: false,
  toasts: [], // { id, type, message }
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    viewChanged(state, action) {
      state.activeView = action.payload;
    },
    statusFilterChanged(state, action) {
      state.filters.status = action.payload;
    },
    platformFilterChanged(state, action) {
      state.filters.platformId = action.payload;
    },
    searchChanged(state, action) {
      state.filters.search = action.payload;
    },
    filtersReset(state) {
      state.filters = initialState.filters;
    },
    composerOpened(state) {
      state.isComposerOpen = true;
    },
    composerClosed(state) {
      state.isComposerOpen = false;
    },
    toastPushed: {
      reducer(state, action) {
        state.toasts.push(action.payload);
      },
      prepare(message, type = 'info') {
        return { payload: { id: generateId('toast'), message, type } };
      },
    },
    toastDismissed(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  viewChanged,
  statusFilterChanged,
  platformFilterChanged,
  searchChanged,
  filtersReset,
  composerOpened,
  composerClosed,
  toastPushed,
  toastDismissed,
} = uiSlice.actions;

export const selectActiveView = (state) => state.ui.activeView;
export const selectFilters = (state) => state.ui.filters;
export const selectIsComposerOpen = (state) => state.ui.isComposerOpen;
export const selectToasts = (state) => state.ui.toasts;

export default uiSlice.reducer;
