# Pipeline — Redux Toolkit Content Suite

A combined implementation of **Experiment 1.2.1** (centralized state management with Redux Toolkit)
and **Experiment 1.2.2** (memoized selectors & rendering performance), built as one polished
React app for managing social posts, platforms, and drafts.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. Build for production with `npm run build`.

## Where each experiment lives

### Experiment 1.2.1 — Centralized state management
- `src/store/store.js` — `configureStore` wiring every slice into one global store.
- `src/features/posts/postsSlice.js` — posts stored **normalized** via `createEntityAdapter`
  (`{ ids, entities }`), plus `createAsyncThunk`s (`fetchPosts`, `addNewPost`, `editPost`,
  `removePost`, `publishPost`) that talk to `postsAPI.js`, a mock API with simulated latency
  and a simulated failure case.
- `src/features/platforms/platformsSlice.js` — same normalized pattern for platforms.
- `src/features/drafts/draftsSlice.js` — a separate normalized slice for in-progress,
  client-only composer state (distinct from a "draft" *post* that's already been saved).
- `src/features/ui/uiSlice.js` — cross-cutting UI state: active view, filters, composer,
  toast notifications.

### Experiment 1.2.2 — Memoized selectors & performance
- `src/features/posts/postsSelectors.js` — `createSelector`-based derived state:
  `selectFilteredPosts`, `selectPostsGroupedByPlatform`, `selectPostStats`,
  `selectTopEngagedPosts`, and a selector **factory** (`makeSelectPostsForPlatform`) for
  per-instance memoization.
- `src/features/platforms/platformsSelectors.js` — a **cross-slice** memoized selector,
  `selectPlatformsWithPostCounts`, that merges platform data with post counts and only
  recomputes when either input actually changes.
- `React.memo` is applied to `PostCard`, `PlatformCard`, `DraftCard`, `Badge`, and `Loader`
  so that editing one entity in a normalized list never re-renders its siblings.
- `useMemo` is used in `StatsPanel` and `ActivityChart` to avoid recomputing derived
  formatting/geometry on unrelated re-renders.

## Folder structure

```
src/
  store/store.js            # combined Redux store
  features/
    posts/                  # slice, selectors, mock API
    platforms/               # slice, selectors, mock API
    drafts/                  # slice + selectors
    ui/                      # filters, view routing, toasts
  components/
    Layout/                  # Sidebar, Topbar
    Dashboard/                # StatsPanel, PipelineRail, ActivityChart, TopPosts
    Posts/                    # PostList, PostCard, PostForm, PostFilters
    Platforms/                 # PlatformGrid, PlatformCard
    Drafts/                    # DraftList, DraftCard
    Common/                    # Badge, Loader, Modal, Toast
  hooks/                      # useAppDispatch, useAppSelector
  utils/                      # constants, id generator, date formatting
```

## Design notes

Dark "ink" palette with a violet accent, `Space Grotesk` for display type and `Inter` for
body copy. The signature UI element is the **publishing pipeline rail** on the dashboard —
draft → scheduled → published counts rendered as a literal staged flow, because that
staging is real: it's the exact path a post travels through the state machine implemented
in `postsSlice.js`.
