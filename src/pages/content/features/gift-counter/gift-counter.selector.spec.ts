import { giftSummerySelector } from './gift-counter.selector';

describe('GiftCounterSelector', () => {
  it('create gift summary', () => {
    // Arrange
    const state = {
      gifts: {
        gift1: 1,
        gift2: 2,
        gift3: 3,
      },
    };

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
      gifts: {},
    };

    // Act
    const result = giftSummerySelector(state);

    // Assert
    expect(result).toEqual([]);
  });
});
