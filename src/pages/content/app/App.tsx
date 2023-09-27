import React from 'react';
import { Provider } from 'react-redux';
import { GiftTable } from '../features/gift-counter/gift-table/GiftTable';
import { GiftObserver } from '../observer/gift/gift-observer';
import { MetadataObserver } from '../observer/metadata/metadata-observer';
import { store } from '../store';

export const App: React.FC = () => {
  // Start metadata observer
  const metadataObserver = new MetadataObserver();
  metadataObserver.start();

  // Start gift observer
  const observer = new GiftObserver();
  observer.start();

  return (
    <Provider store={store}>
      <GiftTable />
    </Provider>
  );
};
