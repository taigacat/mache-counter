import {render} from '@testing-library/react';
import React from 'react';
import {GiftObserver} from '../observer/gift/gift-observer';
import {App} from './App';

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
