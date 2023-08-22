import {useDispatch} from 'react-redux';

export abstract class DomObserver {

  targetSelector: string;
  mutationObserverInit?: MutationObserverInit;

  protected constructor({targetSelector, mutationObserverInit}: {
    targetSelector: string,
    mutationObserverInit?: MutationObserverInit
  }) {
    this.targetSelector = targetSelector;
    this.mutationObserverInit = mutationObserverInit;
  }

  public start() {
    this.startObserve().then(_ => {
      return;
    });
  }

  /**
   * Called when the target is changed.
   * @param element
   */
  onChange(element: HTMLElement): void {
  };

  /**
   * Called when the target is added.
   * @param elements
   */
  onAdd(elements: HTMLElement[]): void {
  };

  /**
   * Called when the target is removed.
   * @param elements
   */
  onRemove(elements: HTMLElement[]): void {
  };

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
      this.onAdd(
        mutations.flatMap(mutation => Array.from(mutation.addedNodes)) as HTMLElement[]
      );
      this.onRemove(
        mutations.flatMap(mutation => Array.from(mutation.removedNodes)) as HTMLElement[]
      );
    });
    const target = await this.waitTargetDisplayed();
    this.onChange(target);
    this.onAdd(Array.from(target.children) as HTMLElement[]);
    observer?.observe(target, {
      ...this.mutationObserverInit
    });
  }
}
