import React from 'react';
import { Provider } from 'react-redux';
import { GiftTable } from '../features/gift-counter/gift-table/GiftTable';
import { GiftObserver } from '../observer/gift/gift-observer';
import { store } from '../store';

export const App: React.FC = () => {
  const observer = new GiftObserver();
  observer.start();

  return (
    <Provider store={store}>
      <GiftTable />
    </Provider>
  );
};
