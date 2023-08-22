import {createSlice} from '@reduxjs/toolkit';
import {Gift} from '../../../../models/Gift';

type State = {
  gifts: {[key: string]: Gift}
}

const initialState: State = {
  gifts: {}
}

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
      state.gifts = (action.payload as Gift[]).reduce((prev: { [name: string]: Gift }, gift: Gift) => {
        const current_gift = prev[gift.name];
        return {
          ...prev,
          [gift.name]: {
            ...gift,
            count: current_gift ? current_gift.count + gift.count : gift.count,
          }
        };
      }, state.gifts);
    },
    /**
     * Update gifts in the state
     * @param state current state
     * @param action action with gifts to update
     * @deprecated use add instead
     */
    update(state, action) {
      state.gifts = (action.payload as Gift[]).reduce((prev: { [name: string]: Gift }, gift: Gift) => {
        const current_gift = prev[gift.name];
        return {
          ...prev,
          [gift.name]: {
            ...gift,
            count: current_gift ? current_gift.count + gift.count : gift.count,
          }
        }
      }, {});
    },
  },
})

export const giftAction = giftCounterSlice.actions;

export default giftCounterSlice;
