import {useDispatch} from 'react-redux';
import {store} from '../../store';
import giftCounterSlice, {update} from './gift-counter.slice';

describe('GiftCounterSlice', () => {

  const initialState = {
    gifts: []
  }

  it('update gifts', () => {
    // Arrange
    const action = update([
      {name: 'gift1', count: 1},
      {name: 'gift2', count: 2},
      {name: 'gift1', count: 3},
    ]);

    // Act
    const state = giftCounterSlice.reducer(initialState, action);

    // Assert
    const currentGifts = state.gifts;
    expect(currentGifts.length).toEqual(3);
    expect(currentGifts[0]).toEqual({name: 'gift1', count: 1});
    expect(currentGifts[1]).toEqual({name: 'gift2', count: 2});
    expect(currentGifts[2]).toEqual({name: 'gift1', count: 3});
  });
});
