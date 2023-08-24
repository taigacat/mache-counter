import {Gift} from '../../../../models/Gift';
import {giftAction} from "../../features/gift-counter/gift-counter.slice";
import {store} from '../../store';
import {DomObserver} from '../dom-observer';

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
      }
    });
  }

  /**
   * Dispatch add action when gifts are added.
   * @param elements gift elements
   */
  onAdd(elements: HTMLElement[]) {
    const gifts = elements
      .map(element => {
        const nameAndCount = element.querySelector('.count');
        if (!nameAndCount) {
          return null;
        }
        return this.splitGiftText(nameAndCount.textContent);
      })
      .filter(item => item !== null) as Gift[];

    store.dispatch(giftAction.add(gifts));
  }

  /**
   * Split gift text into name and count.
   * @param text gift text to split
   */
  splitGiftText(text: string | undefined | null): { name: string, count: number } | null {
    if (!text) {
      return null;
    }

    const name = text.split('×')[0].trim();
    const count = parseInt(text.split('×')[1]?.trim() ?? '0');
    if (name && count) {
      return {name, count};
    } else {
      return null;
    }
  }
}
