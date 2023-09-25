import React from 'react';
import { Gift } from '../../../../../models/Gift';
import styles from './GiftItem.module.scss';

/**
 * Represents a Prop object.
 * @interface
 */
interface Prop {
  gift: { name: string; count: number };
}

/**
 * GiftItem component.
 *
 * @returns The rendered GiftItem component.
 */
export const GiftItem: React.FC<Prop> = ({ gift }) => {
  return (
    <div className={styles['gift-item']}>
      <div>{gift.name}</div>
      <div>{gift.count}</div>
    </div>
  );
};
