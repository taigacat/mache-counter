import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appSlice from './app/app.slice';
import giftCounterSlice from './features/gift-counter/gift-counter.slice';

const reducer = combineReducers({
  app: appSlice.reducer,
  gift: giftCounterSlice.reducer,
});

export const store = configureStore({
  reducer,
});
