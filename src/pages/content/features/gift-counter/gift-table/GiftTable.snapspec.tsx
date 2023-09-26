import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { GiftTable } from './GiftTable';

describe('GiftTable snapshot', () => {
  it('should match snapshot', () => {
    // Arrange
    const gift = {
      name: 'Test Gift 1',
      count: 4,
      sender: 'Test Sender',
    };
    jest.spyOn(store, 'getState').mockReturnValue({
      gifts: {
        [gift.name]: 4,
      },
      allGifts: [{ ...gift, index: 0 }],
    });

    // Act
    const { container } = render(
      <Provider store={store}>
        <GiftTable />
      </Provider>,
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
