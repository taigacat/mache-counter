import { RootState } from '../../rootState.type';
import { giftSummerySelector } from './gift-counter.selector';
import { GiftState } from './gift-counter.slice';

describe('GiftCounterSelector', () => {
  it('create gift summary', () => {
    // Arrange
    const state: RootState = {
      gift: {
        gifts: {
          gift1: 1,
          gift2: 2,
          gift3: 3,
        },
        allGifts: [
          { name: 'gift1', count: 1, sender: 'sender 1', index: 0 },
          { name: 'gift2', count: 2, sender: 'sender 2', index: 1 },
          { name: 'gift1', count: 3, sender: 'sender 3', index: 2 },
        ],
      } as GiftState,
    } as any;

    // Act
    const result = giftSummerySelector(state);

    // Assert
    expect(result).toEqual([
      { name: 'gift3', count: 3 },
      { name: 'gift2', count: 2 },
      { name: 'gift1', count: 1 },
    ]);
  });

  it('create gift summary with empty state', () => {
    // Arrange
    const state = {
      gift: {
        gifts: {},
        allGifts: [],
      } as GiftState,
    } as any;

    // Act
    const result = giftSummerySelector(state);

    // Assert
    expect(result).toEqual([]);
  });
});
