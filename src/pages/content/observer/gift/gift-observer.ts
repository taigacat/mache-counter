import {Gift} from '../../../../models/Gift';
import {store} from '../../store';
import {update} from '../../features/gift-counter/gift-counter.slice';
import {DomObserver} from '../dom-observer';

export class GiftObserver extends DomObserver {

  constructor() {
    super({
      targetSelector: '.gifting_list',
      mutationObserverInit: {
        childList: true,
      }
    });
  }

  onChange(element: HTMLElement): void {
    const itemNodes = element.querySelectorAll('.list-item');
    const gifts = Array.from(itemNodes).map(itemNode => {
      const nameAndCount = itemNode.querySelector('.count');
      if (!nameAndCount) {
        return null;
      }
      return this.splitGiftText(nameAndCount.textContent ?? '');
    }).filter(item => item !== null) as Gift[];

    store.dispatch(update(gifts));
  }

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
