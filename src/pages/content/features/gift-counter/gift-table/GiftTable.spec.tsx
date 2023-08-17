import React from 'react';
import {render, screen} from '@testing-library/react';
import {GiftTable} from './GiftTable';
import {Provider} from 'react-redux';
import {store} from '../../../store';

describe("GiftTable", () => {
  it('should be initialized with no gifts', () => {
    // Act
    const {container} = render(
      <Provider store={store}>
        <GiftTable/>
      </Provider>
    );

    // Assert
    const giftTable = container.getElementsByClassName('gift-table')[0];
    expect(giftTable).toBeInTheDocument();
    expect(giftTable.childElementCount).toBe(0);
  });

  it('should display the given gifts', () => {
    // Arrange
    const gift = {
      name: 'Test Gift',
      count: 4,
    };
    jest.spyOn(store, 'getState').mockReturnValue({
      gifts: [gift],
    });

    // Act
    const {container} = render(
      <Provider store={store}>
        <GiftTable/>
      </Provider>
    );

    // Assert
    const giftTable = container.getElementsByClassName('gift-table')[0];
    expect(giftTable).toBeInTheDocument();
    expect(giftTable.childElementCount).toBe(1);
    expect(screen.getByText(gift.name)).toBeInTheDocument();
    expect(screen.getByText(String(gift.count))).toBeInTheDocument();
  });
});
