import React from 'react';
import {GiftTable} from '../features/gift-counter/gift-table/GiftTable';
import {GiftObserver} from '../observer/gift/gift-observer';
import {store} from '../store';
import {Provider} from 'react-redux';


export const App: React.FC = () => {
  const observer = new GiftObserver();
  observer.start();

  return (
    <Provider store={store}>
      <GiftTable/>
    </Provider>
  )
};
