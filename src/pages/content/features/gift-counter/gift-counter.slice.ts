import { createSlice } from '@reduxjs/toolkit';
import { EventSender } from '../../../../events/event-sender';
import { Gift } from '../../../../models/Gift';

type State = {
  gifts: { [key: string]: number };
  allGifts: Gift[];
};

const initialState: State = {
  gifts: {},
  allGifts: [],
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

      state.allGifts = [...state.allGifts, ...payload];

      broadcastGift(state.allGifts, payload);
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

      state.allGifts = [...payload];

      broadcastGift(state.allGifts, payload);
    },
  },
});

const broadcastGift = (all: Gift[], diff: Gift[]) => {
  const sender = new EventSender();
  sender.sendEvent(
    {
      broadcasterId: 'id', // TODO 取得できるか確認
      broadcasterName: 'name', // 画面から取得する
      roomId: 'roomId', // TODO URLから取得する
      liveId: 'liveId', // 取得できるか確認
    },
    'gift',
    { all, diff },
  );
};

export const giftAction = giftCounterSlice.actions;

export default giftCounterSlice;
