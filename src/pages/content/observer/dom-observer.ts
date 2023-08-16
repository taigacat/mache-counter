import {useDispatch} from 'react-redux';

export abstract class DomObserver {

  targetSelector: string;
  mutationObserverInit?: MutationObserverInit;
  dispatch = useDispatch();

  protected constructor({targetSelector, mutationObserverInit}: {
    targetSelector: string,
    mutationObserverInit?: MutationObserverInit
  }) {
    this.targetSelector = targetSelector;
    this.mutationObserverInit = mutationObserverInit;
  }

  public start() {
    this.startObserve().then(r => console.log('startObserve resolved'));
  }

  abstract onChange(element: HTMLElement): void;

  async waitTargetDisplayed(): Promise<HTMLElement> {
    return new Promise((resolve, reject) => {
      const intervalId = setInterval(() => {
        const target = document.querySelector(this.targetSelector);
        if (target) {
          clearInterval(intervalId);
          resolve(target as HTMLElement);
        }
      }, 100);
    });
  }

  async startObserve() {
    const observer = new MutationObserver((mutations) => {
      this.onChange(mutations[mutations.length - 1].target as HTMLElement);
    });
    const target = await this.waitTargetDisplayed();
    this.onChange(target);
    observer?.observe(target, {
      ...this.mutationObserverInit
    });
  }

}
