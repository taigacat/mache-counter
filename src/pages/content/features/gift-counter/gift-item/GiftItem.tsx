import React from 'react';
import { Gift } from '../../../../../models/Gift';
import styles from './GiftItem.module.scss';

/**
 * Represents a Prop object.
 * @interface
 */
interface Prop {
  gift: Gift;
}

/**
 * GiftItem component.
 *
 * @component
 *
 * @param {Object} props - The component props.
 * @param {Object} props.gift - Information about the gift.
 *
 * @returns {JSX.Element} The rendered GiftItem component.
 */
export const GiftItem: React.FC<Prop> = ({ gift }) => {
  return (
    <div className={styles['gift-item']}>
      <div>{gift.name}</div>
      <div>{gift.count}</div>
    </div>
  );
};
