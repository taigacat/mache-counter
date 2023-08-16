import React from 'react';
import {GiftTable} from '../features/gift-counter/gift-table/GiftTable';
import {GiftObserver} from '../observer/gift-observer';


export const App: React.FC = () => {
  const observer = new GiftObserver();
  observer.start();

  return (
    <GiftTable />
  )
};
