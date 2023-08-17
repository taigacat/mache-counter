import {DomObserver} from './dom-observer';

class DomObserverInstance extends DomObserver {

  constructor() {
    super({targetSelector: '.target', mutationObserverInit: {childList: true}});
  }

  public onChange(element: HTMLElement): void {}
}

describe('DomObserver', () => {
  let domObserver: DomObserver;

  beforeEach(() => {
    domObserver = new DomObserverInstance();
  })

  it('should be defined', () => {
    // Assert
    expect(domObserver).toBeDefined();
  });

  it('should be called startObserve', () => {
    // Arrange
    const spy = jest.spyOn(domObserver, 'startObserve');

    // Act
    domObserver.start();

    // Assert
    expect(spy).toBeCalled();
  });

  it('should wait until the target is displayed', async () => {
    // Arrange
    document.body.innerHTML = `
       <div class="no_target"></div>
    `;

    // Act
    const promise = domObserver.waitTargetDisplayed();
    document.body.innerHTML = `
        <div class="no_target"></div>
        <div class="target"></div>
    `;

    // Assert
    const target = await promise;
    expect(target).toBeDefined();
    expect(target.classList.contains('target')).toBeTruthy();
  });

  it('should wait until the target is displayed (after 500ms)', async () => {
    // Arrange
    document.body.innerHTML = `
       <div class="no_target"></div>
    `;

    // Act
    const promise = domObserver.waitTargetDisplayed();
    setTimeout(() => {
      document.body.innerHTML = `
        <div class="no_target"></div>
        <div class="target"></div>
    `;
    }, 500);

    // Assert
    const target = await promise;
    expect(target).toBeDefined();
    expect(target.classList.contains('target')).toBeTruthy();
  });

  it('should be called onChange() when startObserve() is called', async () => {
    // Arrange
    const spy = jest.spyOn(domObserver, 'onChange');
    document.body.innerHTML = `
       <div class="target"></div>
    `;

    // Act
    await domObserver.startObserve();

    // Assert
    expect(spy).toBeCalled();
  });
});
