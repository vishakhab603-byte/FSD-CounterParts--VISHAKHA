import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import * as api from './platformsAPI';
import { REQUEST_STATUS } from '../../utils/constants';

const platformsAdapter = createEntityAdapter();

const initialState = platformsAdapter.getInitialState({
  status: REQUEST_STATUS.IDLE,
  error: null,
});

export const fetchPlatforms = createAsyncThunk('platforms/fetchPlatforms', async () => {
  return api.fetchPlatformsRequest();
});

export const toggleConnection = createAsyncThunk(
  'platforms/toggleConnection',
  async (id) => api.toggleConnectionRequest(id)
);

const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    followersAdjustedLocally(state, action) {
      const { id, delta } = action.payload;
      const platform = state.entities[id];
      if (platform) platform.followers += delta;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlatforms.pending, (state) => {
        state.status = REQUEST_STATUS.LOADING;
      })
      .addCase(fetchPlatforms.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        platformsAdapter.setAll(state, action.payload);
      })
      .addCase(fetchPlatforms.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(toggleConnection.fulfilled, (state, action) => {
        const platform = state.entities[action.payload];
        if (platform) platform.connected = !platform.connected;
      });
  },
});

export const { followersAdjustedLocally } = platformsSlice.actions;

export const platformsAdapterSelectors = platformsAdapter.getSelectors((state) => state.platforms);

export default platformsSlice.reducer;
