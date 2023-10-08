import { Gift } from '../../../../models/Gift';
import {
  giftAction,
  sendGiftAsync,
} from '../../features/gift-counter/gift-counter.slice';
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
      .map((element) => this.toGift(element))
      .filter((item) => item !== null)
      .reverse() as Gift[];

    store.dispatch(giftAction.add(gifts));
    store.dispatch(sendGiftAsync(gifts));
  }

  /**
   * Split gift text into name and count.
   * @param element gift element
   */
  toGift(
    element: Element,
  ): { name: string; count: number; sender: string; icon?: string } | null {
    const giftCountElement = element.querySelector('.count');
    const senderElement = element.querySelector('.name');
    if (!giftCountElement || !senderElement) {
      return null;
    }

    const giftCount = giftCountElement.textContent;
    const sender = senderElement.textContent;
    if (!giftCount || !sender) {
      return null;
    }

    const name = giftCount.split('×')[0].trim();
    const count = parseInt(giftCount.split('×')[1]?.trim() ?? '0');
    if (!name || !count || !sender) {
      return null;
    }

    const iconElement = element.querySelector('.icon');
    const iconUrl = iconElement?.querySelector('img')?.getAttribute('src');

    return { name, count, sender, icon: iconUrl ?? undefined };
  }
}
