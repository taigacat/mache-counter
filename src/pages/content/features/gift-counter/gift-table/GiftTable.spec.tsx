import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../../store';
import { GiftTable } from './GiftTable';

describe('GiftTable', () => {
  it('should be initialized with no gifts', () => {
    // Act
    const { container } = render(
      <Provider store={store}>
        <GiftTable />
      </Provider>,
    );

    // Assert
    const giftTable = container.getElementsByClassName('gift-table')[0];
    expect(giftTable).toBeInTheDocument();
    expect(giftTable.childElementCount).toBe(0);
  });

  it('should display the given gifts', () => {
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
    });

    // Act
    const { container } = render(
      <Provider store={store}>
        <GiftTable />
      </Provider>,
    );

    // Assert
    const giftTable = container.getElementsByClassName('gift-table')[0];
    expect(giftTable).toBeInTheDocument();
    expect(giftTable.childElementCount).toBe(1);
    expect(screen.getByText(gift.name)).toBeInTheDocument();
    expect(screen.getByText(String(gift.count))).toBeInTheDocument();
  });
});
