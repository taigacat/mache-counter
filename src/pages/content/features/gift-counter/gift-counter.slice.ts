import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ChromeExtensionMessage } from '../../../../events/chrome-extension-message';
import { Gift, IndexedGift } from '../../../../models/Gift';
import { RootState } from '../../rootState.type';

export type GiftState = {
  gifts: { [key: string]: number };
  allGifts: IndexedGift[];
  sent?: boolean;
};

const initialState: GiftState = {
  gifts: {},
  allGifts: [],
  sent: false,
};

const giftCounterSlice = createSlice({
  name: 'gifts',
  initialState,
  reducers: {
    /**
     * Add gifts to the state
     * @param state current state
     * @param action action with gifts to add
     */
    add(state, action) {
      const payload = action.payload as Gift[];
      if (!payload || payload.length === 0) {
        return;
      }

      state.gifts = payload.reduce(
        (prev: { [name: string]: number }, gift: Gift) => {
          const current_gift = prev[gift.name];
          return {
            ...prev,
            [gift.name]: current_gift ? current_gift + gift.count : gift.count,
          };
        },
        state.gifts,
      );

      const count = state.allGifts.length;
      const indexedGifts = payload.map((gift, index) => ({
        ...gift,
        index: count + index,
      }));
      state.allGifts = [...state.allGifts, ...indexedGifts];
    },
    /**
     * Update gifts in the state
     * @param state current state
     * @param action action with gifts to update
     * @deprecated use add instead for performance reasons
     */
    update(state, action) {
      const payload = (action.payload || []) as Gift[];
      state.gifts = payload.reduce(
        (prev: { [name: string]: number }, gift: Gift) => {
          const current_gift = prev[gift.name];
          return {
            ...prev,
            [gift.name]: current_gift ? current_gift + gift.count : gift.count,
          };
        },
        {},
      );

      const indexedGifts = payload.map((gift, index) => ({ ...gift, index }));
      state.allGifts = [...indexedGifts];
    },
    /**
     * Set sent flag to true
     */
    sent(state, action) {
      state.sent = true;
    },
  },
});

export const sendGiftAsync = createAsyncThunk(
  'gifts/sendGiftAsync',
  async (diff: Gift[], thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const metadata = state.app.metadata;
    const { allGifts, sent } = state.gift;
    ChromeExtensionMessage.sendEvent({
      metadata,
      event: 'gift',
      data: {
        ...(sent ? {} : { all: allGifts }),
        diff: diff.map((gift, index) => ({
          ...gift,
          index: allGifts.length - diff.length + index,
        })),
      },
    }).then((response) => {
      console.log(response);
      if (response.status === 'success') {
        thunkAPI.dispatch(giftAction.sent(undefined));
      }
    });
  },
);

export const giftAction = giftCounterSlice.actions;

export default giftCounterSlice;
