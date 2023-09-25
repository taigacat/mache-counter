import { Gift } from '../../../../models/Gift';
import { giftAction } from '../../features/gift-counter/gift-counter.slice';
import { store } from '../../store';
import { DomObserver } from '../dom-observer';

/**
 * Observer for gifts.
 */
export class GiftObserver extends DomObserver {
  constructor() {
    super({
      targetSelector: '.gLogs',
      mutationObserverInit: {
        childList: true,
        attributes: false,
      },
    });
  }

  /**
   * Dispatch add action when gifts are added.
   * @param elements gift elements
   */
  onAdd(elements: HTMLElement[]) {
    const gifts = elements
      .map((element) => {
        const nameAndCount = element.querySelector('.count');
        const sender = element.querySelector('.name');
        if (!nameAndCount || typeof sender === 'undefined') {
          return null;
        }
        return this.toGift(nameAndCount.textContent, sender?.textContent);
      })
      .filter((item) => item !== null) as Gift[];

    store.dispatch(giftAction.add(gifts));
  }

  /**
   * Split gift text into name and count.
   * @param text gift text to split
   * @param sender gift sender
   */
  toGift(
    text: string | undefined | null,
    sender: string | undefined | null,
  ): { name: string; count: number; sender: string } | null {
    if (!text || !sender) {
      return null;
    }

    const name = text.split('×')[0].trim();
    const count = parseInt(text.split('×')[1]?.trim() ?? '0');
    if (name && count) {
      return { name, count, sender };
    } else {
      return null;
    }
  }
}
