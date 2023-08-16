import {Gift} from '../../../../models/Gift';
import {createSlice} from '@reduxjs/toolkit';

type State = {
  gifts: Gift[]
}

const initialState: State = {
  gifts: []
}

const giftCounterSlice = createSlice({
  name: 'gifts',
  initialState,
  reducers: {
    update(state, action) {
      state.gifts = [...action.payload];
    },
  },
})

export const {update} = giftCounterSlice.actions;

export default giftCounterSlice;
