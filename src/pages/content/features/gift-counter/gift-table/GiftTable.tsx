import styles from './GiftTable.module.scss';
import {GiftItem} from '../gift-item/GiftItem';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../rootState.type';
import {giftSummerySelector} from '../gift-counter.selector';

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
