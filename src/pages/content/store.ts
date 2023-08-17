import {configureStore} from '@reduxjs/toolkit';
import giftCounterSlice from './features/gift-counter/gift-counter.slice';

export const store = configureStore({
  reducer: giftCounterSlice.reducer
});
