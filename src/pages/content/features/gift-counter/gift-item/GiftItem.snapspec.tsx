import {GiftItem} from './GiftItem';
import {render} from '@testing-library/react';

describe('GiftItem snapshot', () => {
  it('should match snapshot', () => {
    // Arrange
    const gift = {
      name: 'Test Gift',
      count: 4,
    };

    // Act
    const {container} = render(
      <GiftItem gift={gift}/>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
