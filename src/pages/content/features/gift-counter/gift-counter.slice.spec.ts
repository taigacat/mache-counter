import giftCounterSlice, { giftAction } from './gift-counter.slice';

describe('GiftCounterSlice', () => {
  beforeEach(() => {
    // @ts-ignore
    global.chrome = {
      runtime: {
        sendMessage: () => new Promise(() => {}),
      } as any,
    };
  });

  it('add gifts when no gifts exist', () => {
    // Arrange
    const initialState = {
      gifts: {},
      allGifts: [],
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
    expect(currentGifts['gift1']).toEqual(4);
    expect(currentGifts['gift2']).toEqual(2);
  });

  it('add gifts when gifts already exist', () => {
    // Arrange
    const initialState = {
      gifts: {
        gift1: 1,
        gift2: 2,
        gift3: 3,
      },
      allGifts: [],
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
    expect(currentGifts['gift1']).toEqual(8);
    expect(currentGifts['gift2']).toEqual(4);
    expect(currentGifts['gift3']).toEqual(3);
  });

  it('update gifts', () => {
    // Arrange
    const initialState = {
      gifts: {},
      allGifts: [],
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
    expect(currentGifts['gift1']).toEqual(4);
    expect(currentGifts['gift2']).toEqual(2);
  });

  it('update gifts when gift already exists', () => {
    // Arrange
    const initialState = {
      gifts: {
        gift1: 1,
        gift2: 2,
        gift3: 3,
      },
      allGifts: [],
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
    expect(currentGifts['gift1']).toEqual(7);
    expect(currentGifts['gift2']).toEqual(2);
  });

  it('update gifts with empty array', () => {
    // Arrange
    const initialState = {
      gifts: {
        gift1: 1,
        gift2: 2,
        gift3: 3,
      },
      allGifts: [],
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
        gift1: 1,
        gift2: 2,
        gift3: 3,
      },
      allGifts: [],
    };
    const action = giftAction.update(undefined);

    // Act
    const state = giftCounterSlice.reducer(initialState, action);

    // Assert
    const currentGifts = state.gifts;
    expect(Object.keys(currentGifts).length).toEqual(0);
  });
});
