import React from 'react';
import Draggable from 'react-draggable';
import {useSelector} from 'react-redux';
import {giftSummerySelector} from '../gift-counter.selector';
import {GiftItem} from '../gift-item/GiftItem';
import styles from './GiftTable.module.scss';

export const GiftTable: React.FC = () => {
  const gifts = useSelector(giftSummerySelector)
  const windowHeight = window.innerHeight;
  return (
    <Draggable defaultPosition={{x: 10, y: windowHeight - 210}}>
      <div className={styles['gift-box']}>
        <div className={styles['gift-header']}></div>
        <div className={styles['gift-table']}>
          {gifts.map(gift => (
            <GiftItem gift={gift} key={gift.name}/>
          ))}
        </div>
      </div>
    </Draggable>
  );
}
