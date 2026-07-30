import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import platformsReducer from '../features/platforms/platformsSlice';
import draftsReducer from '../features/drafts/draftsSlice';
import uiReducer from '../features/ui/uiSlice';

/**
 * STORE CONFIGURATION (Experiment 1.2.1)
 * ----------------------------------------
 * configureStore wires every slice into one global store, giving the app a
 * single source of truth. Redux Toolkit's default middleware (thunk +
 * dev-only serializability/immutability checks) is included automatically —
 * no manual middleware wiring, no combineReducers boilerplate.
 */
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    platforms: platformsReducer,
    drafts: draftsReducer,
    ui: uiReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
