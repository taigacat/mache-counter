import React from 'react';
import {Gift} from '../../../../../models/Gift';
import styles from './GiftItem.module.scss';

interface Prop {
  gift: Gift;
}

export const GiftItem: React.FC<Prop> = ({gift}) => {
  return (
    <div className={styles['gift-item']}>
      <div>{gift.name}</div>
      <div>{gift.count}</div>
    </div>
  );
}
