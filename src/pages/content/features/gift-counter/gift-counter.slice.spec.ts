import giftCounterSlice, { giftAction } from './gift-counter.slice';

describe('GiftCounterSlice', () => {
  it('add gifts when no gifts exist', () => {
    // Arrange
    const initialState = {
      gifts: {},
    };
    const action = giftAction.add([
      { name: 'gift1', count: 1 },
      { name: 'gift2', count: 2 },
      { name: 'gift1', count: 3 },
    ]);

    // Act
    const state = giftCounterSlice.reducer(initialState, action);

    // Assert
    const currentGifts = state.gifts;
    expect(Object.keys(currentGifts).length).toEqual(2);
    expect(currentGifts['gift1']).toEqual({ name: 'gift1', count: 4 });
    expect(currentGifts['gift2']).toEqual({ name: 'gift2', count: 2 });
  });

  it('add gifts when gifts already exist', () => {
    // Arrange
    const initialState = {
      gifts: {
        gift1: { name: 'gift1', count: 1 },
        gift2: { name: 'gift2', count: 2 },
        gift3: { name: 'gift3', count: 3 },
      },
    };
    const action = giftAction.add([
      { name: 'gift1', count: 6 },
      { name: 'gift2', count: 2 },
      { name: 'gift1', count: 1 },
    ]);

    // Act
    const state = giftCounterSlice.reducer(initialState, action);

    // Assert
    const currentGifts = state.gifts;
    expect(Object.keys(currentGifts).length).toEqual(3);
    expect(currentGifts['gift1']).toEqual({ name: 'gift1', count: 8 });
    expect(currentGifts['gift2']).toEqual({ name: 'gift2', count: 4 });
    expect(currentGifts['gift3']).toEqual({ name: 'gift3', count: 3 });
  });

  it('update gifts', () => {
    // Arrange
    const initialState = {
      gifts: {},
    };
    const action = giftAction.update([
      { name: 'gift1', count: 1 },
      { name: 'gift2', count: 2 },
      { name: 'gift1', count: 3 },
    ]);

    // Act
    const state = giftCounterSlice.reducer(initialState, action);

    // Assert
    const currentGifts = state.gifts;
    expect(Object.keys(currentGifts).length).toEqual(2);
    expect(currentGifts['gift1']).toEqual({ name: 'gift1', count: 4 });
    expect(currentGifts['gift2']).toEqual({ name: 'gift2', count: 2 });
  });

  it('update gifts when gift already exists', () => {
    // Arrange
    const initialState = {
      gifts: {
        gift1: { name: 'gift1', count: 1 },
        gift2: { name: 'gift2', count: 2 },
        gift3: { name: 'gift3', count: 3 },
      },
    };
    const action = giftAction.update([
      { name: 'gift1', count: 6 },
      { name: 'gift2', count: 2 },
      { name: 'gift1', count: 1 },
    ]);

    // Act
    const state = giftCounterSlice.reducer(initialState, action);

    // Assert
    const currentGifts = state.gifts;
    expect(Object.keys(currentGifts).length).toEqual(2);
    expect(currentGifts['gift1']).toEqual({ name: 'gift1', count: 7 });
    expect(currentGifts['gift2']).toEqual({ name: 'gift2', count: 2 });
  });

  it('update gifts with empty array', () => {
    // Arrange
    const initialState = {
      gifts: {
        gift1: { name: 'gift1', count: 1 },
        gift2: { name: 'gift2', count: 2 },
        gift3: { name: 'gift3', count: 3 },
      },
    };
    const action = giftAction.update([]);

    // Act
    const state = giftCounterSlice.reducer(initialState, action);

    // Assert
    const currentGifts = state.gifts;
    expect(Object.keys(currentGifts).length).toEqual(0);
  });

  it('update gift with undefined', () => {
    // Arrange
    const initialState = {
      gifts: {
        gift1: { name: 'gift1', count: 1 },
        gift2: { name: 'gift2', count: 2 },
        gift3: { name: 'gift3', count: 3 },
      },
    };
    const action = giftAction.update(undefined);

    // Act
    const state = giftCounterSlice.reducer(initialState, action);

    // Assert
    const currentGifts = state.gifts;
    expect(Object.keys(currentGifts).length).toEqual(0);
  });
});
