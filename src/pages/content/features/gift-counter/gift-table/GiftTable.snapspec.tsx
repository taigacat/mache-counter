import {GiftTable} from './GiftTable';
import {render} from '@testing-library/react';
import {store} from '../../../store';
import {Provider} from 'react-redux';

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
