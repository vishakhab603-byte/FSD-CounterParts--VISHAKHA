import { createSlice, createAsyncThunk, createEntityAdapter, nanoid } from '@reduxjs/toolkit';
import * as api from './postsAPI';
import { POST_STATUS, REQUEST_STATUS } from '../../utils/constants';

/**
 * NORMALIZATION (Experiment 1.2.1)
 * ---------------------------------
 * Rather than storing posts as an array, createEntityAdapter keeps them as:
 *   { ids: [...], entities: { [id]: post } }
 * This mirrors a relational table: O(1) lookups by id, no duplicate objects,
 * and updates to one post never require scanning/copying the whole array.
 */
const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
});

const initialState = postsAdapter.getInitialState({
  status: REQUEST_STATUS.IDLE, // fetch lifecycle
  error: null,
  mutationStatus: REQUEST_STATUS.IDLE, // create/update/delete lifecycle
  publishingIds: [], // ids currently mid-publish, for per-card spinners
});

// ---------- Async thunks (Experiment 1.2.1: async data flow via mock API) ----------

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const posts = await api.fetchPostsRequest();
  return posts;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (payload) => {
  const post = await api.createPostRequest(payload);
  return post;
});

export const editPost = createAsyncThunk('posts/editPost', async ({ id, changes }) => {
  return api.updatePostRequest(id, changes);
});

export const removePost = createAsyncThunk('posts/removePost', async (id) => {
  await api.deletePostRequest(id);
  return id;
});

export const publishPost = createAsyncThunk(
  'posts/publishPost',
  async (id, { rejectWithValue }) => {
    try {
      return await api.publishPostRequest(id);
    } catch (err) {
      return rejectWithValue({ id, message: err.message });
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Synchronous CRUD kept for instant, optimistic-feeling local edits
    // (e.g. quick tag toggles) that don't need a round trip.
    postUpdatedLocally: postsAdapter.updateOne,
    postAddedLocally: {
      reducer: postsAdapter.addOne,
      prepare: (post) => ({
        payload: { ...post, id: post.id ?? nanoid(), createdAt: new Date().toISOString() },
      }),
    },
    postStatusChanged(state, action) {
      const { id, status } = action.payload;
      postsAdapter.updateOne(state, { id, changes: { status } });
    },
    allPostsCleared: postsAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder
      // fetchPosts lifecycle
      .addCase(fetchPosts.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.error.message;
      })
      // addNewPost lifecycle
      .addCase(addNewPost.pending, (state) => {
        state.mutationStatus = REQUEST_STATUS.LOADING;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.mutationStatus = REQUEST_STATUS.SUCCEEDED;
        postsAdapter.addOne(state, action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.mutationStatus = REQUEST_STATUS.FAILED;
        state.error = action.error.message;
      })
      // editPost lifecycle
      .addCase(editPost.fulfilled, (state, action) => {
        const { id, changes } = action.payload;
        postsAdapter.updateOne(state, { id, changes });
      })
      // removePost lifecycle
      .addCase(removePost.fulfilled, (state, action) => {
        postsAdapter.removeOne(state, action.payload);
      })
      // publishPost lifecycle
      .addCase(publishPost.pending, (state, action) => {
        state.publishingIds.push(action.meta.arg);
      })
      .addCase(publishPost.fulfilled, (state, action) => {
        const { id, publishedAt } = action.payload;
        state.publishingIds = state.publishingIds.filter((pid) => pid !== id);
        postsAdapter.updateOne(state, {
          id,
          changes: { status: POST_STATUS.PUBLISHED, scheduledAt: publishedAt },
        });
      })
      .addCase(publishPost.rejected, (state, action) => {
        const id = action.meta.arg;
        state.publishingIds = state.publishingIds.filter((pid) => pid !== id);
        if (id) {
          postsAdapter.updateOne(state, { id, changes: { status: POST_STATUS.FAILED } });
        }
        state.error = action.payload?.message ?? action.error.message;
      });
  },
});

export const { postUpdatedLocally, postAddedLocally, postStatusChanged, allPostsCleared } =
  postsSlice.actions;

// Entity adapter ships selectors for free — exported for postsSelectors.js to
// re-derive from, keeping raw state access in one place.
export const postsAdapterSelectors = postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;
