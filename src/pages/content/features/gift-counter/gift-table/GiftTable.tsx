import React from 'react';
import {useSelector} from 'react-redux';
import {giftSummerySelector} from '../gift-counter.selector';
import {GiftItem} from '../gift-item/GiftItem';
import styles from './GiftTable.module.scss';

export const GiftTable: React.FC = () => {
  const gifts = useSelector(giftSummerySelector)

  return (
    <div className={styles['gift-table']}>
      {gifts.map(gift => (
        <GiftItem gift={gift} key={gift.name}/>
      ))}
    </div>
  )
}
