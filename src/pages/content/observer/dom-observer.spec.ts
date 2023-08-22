import {DomObserver} from './dom-observer';

class DomObserverInstance extends DomObserver {

  constructor() {
    super({targetSelector: '.target', mutationObserverInit: {childList: true}});
  }

  onChange(element: HTMLElement) {
    super.onChange(element);
  }

  onAdd(elements: HTMLElement[]) {
    super.onAdd(elements);
  }

  onRemove(elements: HTMLElement[]) {
    super.onRemove(elements);
  }
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

  it('should be called onChange() / onAdd() when startObserve() is called', async () => {
    // Arrange
    const onChangeSpy = jest.spyOn(domObserver, 'onChange');
    const onAddSpy = jest.spyOn(domObserver, 'onAdd');
    document.body.innerHTML = `
       <div class="target">
         <div class="list-item">item 1</div>
         <div class="list-item">item 2</div>
         <div class="list-item">item 3</div>
       </div>
    `;

    // Act
    await domObserver.startObserve();

    // Assert
    expect(onChangeSpy).toBeCalledWith(document.querySelector('.target'));
    expect(onAddSpy).toBeCalledWith(
      expect.arrayContaining(Array.from(document.querySelectorAll('.list-item')))
    );
  });

  it('should be called onChange() / onAdd() when child is added', async () => {
    // Arrange
    document.body.innerHTML = `
       <div class="target">
         <div class="list-item">item 1</div>
         <div class="list-item">item 2</div>
         <div class="list-item">item 3</div>
       </div>
    `;
    const appendElement = document.createElement('div');
    appendElement.classList.add('list-item');
    appendElement.textContent = 'item 4';
    await domObserver.startObserve();
    const onChangeSpy = jest.spyOn(domObserver, 'onChange');
    const onAddSpy = jest.spyOn(domObserver, 'onAdd');
    const onRemoveSpy = jest.spyOn(domObserver, 'onRemove');

    // Act
    document.querySelector('.target')!.appendChild(appendElement);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Assert
    expect(onChangeSpy).toBeCalledWith(document.querySelector('.target'));
    expect(onAddSpy).toBeCalledWith([appendElement]);
    expect(onRemoveSpy).toBeCalledWith([]);
  });

  it('should be called onChange() / onAdd() when child is removed', async () => {
    // Arrange
    document.body.innerHTML = `
       <div class="target">
         <div class="list-item">item 1</div>
         <div class="list-item">item 2</div>
         <div class="list-item">item 3</div>
       </div>
    `;
    const beforeChange = Array.from(document.querySelectorAll('.list-item'));
    await domObserver.startObserve();
    const onChangeSpy = jest.spyOn(domObserver, 'onChange');
    const onAddSpy = jest.spyOn(domObserver, 'onAdd');
    const onRemoveSpy = jest.spyOn(domObserver, 'onRemove');

    // Act
    document.querySelector('.target')!.removeChild(document.querySelectorAll('.list-item')![0]);
    await new Promise(resolve => setTimeout(resolve, 100));

    // Assert
    expect(onChangeSpy).toBeCalledWith(document.querySelector('.target'));
    expect(onAddSpy).toBeCalledWith([]);
    expect(onRemoveSpy).toBeCalledWith([beforeChange[0]]);
  });
});
