import { createSlice } from '@reduxjs/toolkit';
import { AppMetadata } from '../../../models/app-metadata';

export type AppState = {
  metadata: AppMetadata;
};

const initialState: AppState = {
  metadata: {
    userId: '',
    userName: '',
    liveId: '',
  },
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    /**
     * Sets the metadata of the state based on the provided action.
     *
     * @param state current state object.
     * @param action action object containing the payload.
     */
    setMetadata(state, action) {
      const { userId, userName, liveId } = action.payload;
      state.metadata.userId = userId;
      state.metadata.userName = userName;
      state.metadata.liveId = liveId;
    },
  },
});

export const appAction = appSlice.actions;

export default appSlice;
