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
      targetSelector: '.gifting_list', // TODO: specify targetSelector
      mutationObserverInit: {
        childList: true,
      }
    });
  }

  /**
   * Parse gifts from the element and add them to the state.
   * @param element element to parse gifts from
   */
  onChange(element: HTMLElement): void {
    const itemNodes = element.querySelectorAll('.list-item');
    const gifts = Array.from(itemNodes)
      .reverse()
      .map((itemNode, index) => {
        // Skip if the item is already loaded
        if (itemNode.getAttribute('data-loaded') === 'true') {
          return null;
        }
        itemNode.setAttribute('data-loaded', 'true');

        const nameAndCount = itemNode.querySelector('.count');
        if (!nameAndCount) {
          return null;
        }
        return this.splitGiftText(nameAndCount.textContent ?? '');
      })
      .filter(item => item !== null) as Gift[];

    store.dispatch(giftAction.add(gifts));
  }

  /**
   * Split gift text into name and count.
   * @param text gift text to split
   */
  splitGiftText(text: string): { name: string, count: number } | null {
    const name = text.split('×')[0]?.trim() ?? '';
    const count = parseInt(text.split('×')[1]?.trim() ?? '0');
    if (name && count) {
      return {name, count};
    } else {
      return null;
    }
  }
}
