import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import {store} from '../../../store';
import {GiftTable} from './GiftTable';

describe('GiftTable snapshot', () => {
  it('should match snapshot', () => {
    // Arrange
    jest.spyOn(store, 'getState').mockReturnValue({
      gifts: [
        {name: 'Test Gift 1', count: 4},
      ],
    });

    // Act
    const {container} = render(
      <Provider store={store}>
        <GiftTable/>
      </Provider>
    );

    // Assert
    expect(container).toMatchSnapshot();
  });
});
