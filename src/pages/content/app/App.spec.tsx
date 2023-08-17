import {render} from '@testing-library/react';
import React from 'react';
import {App} from './App';
import {GiftObserver} from '../observer/gift/gift-observer';

describe("App", () => {

  it('should be initialized', () => {
    // Arrange
    const observerSpy = jest.spyOn(GiftObserver.prototype, 'start');

    // Act
    const {container} = render(
      <App/>
    );

    // Assert
    expect(container).toBeInTheDocument();
    expect(observerSpy).toHaveBeenCalled();
  });
});
