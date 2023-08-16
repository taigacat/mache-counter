import {DomObserver} from './dom-observer';
import {Gift} from '../../../models/Gift';
import {update} from '../features/gift-counter/gift-counter.slice';

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
      const name = nameAndCount.textContent?.split('×')[0]?.trim() ?? '';
      const count = parseInt(nameAndCount.textContent?.split('×')[1]?.trim() ?? '0');
      if (name && count) {
        return {name, count};
      } else {
        return null;
      }
    }).filter(item => item !== null) as Gift[];

    this.dispatch(update(gifts))
  }
}
