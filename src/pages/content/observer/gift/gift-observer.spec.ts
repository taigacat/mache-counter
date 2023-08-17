import {store} from '../../store';
import {GiftObserver} from './gift-observer';

describe('GiftObserver', () => {
  let giftObserver: GiftObserver;

  beforeEach(() => {
    giftObserver = new GiftObserver();
  });

  it('should be defined', () => {
    // Assert
    expect(giftObserver).toBeTruthy();
  });

  it('should initialize observer with options', async () => {
    // Arrange
    const spy = jest.spyOn(MutationObserver.prototype, 'observe');
    document.body.innerHTML = `
        <div class="gifting_list"></div>
    `;

    // Act
    giftObserver.start();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Assert
    expect(spy).toBeCalledWith(
      expect.any(HTMLElement),
      {
        childList: true,
      }
    );
  });

  it('should dispatch update action when the target is changed', async () => {
    // Arrange
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    document.body.innerHTML = `
        <div class="gifting_list">
            <div class="list-item">
                <div class="count">gift1 × 1</div>
            </div>
            <div class="list-item">
                <div class="count">gift2 × 2</div>
            </div>
            <div class="list-item">
                <div class="count">gift1 × 3</div>
            </div>
        </div>
    `;

    // Act
    giftObserver.start();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Assert
    expect(dispatchSpy).toBeCalledWith({
      payload: [
        {name: 'gift1', count: 1},
        {name: 'gift2', count: 2},
        {name: 'gift1', count: 3},
      ],
      type: 'gifts/update',
    });
  });

  it('should not gift be included when the count element is not found', async () => {
    // Arrange
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    document.body.innerHTML = `
        <div class="gifting_list">
            <div class="list-item dummy" />
        </div>
    `;

    // Act
    giftObserver.start();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Assert
    expect(dispatchSpy).toBeCalledWith({
      payload: [],
      type: 'gifts/update',
    });
  });


  it('should not gift be included when the count text is empty', async () => {
    // Arrange
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    document.body.innerHTML = `
        <div class="gifting_list">
            <div class="list-item">
                <div class="count">
                    <span/>
                </div>
            </div>
        </div>
    `;

    // Act
    giftObserver.start();
    await new Promise(resolve => setTimeout(resolve, 100));

    // Assert
    expect(dispatchSpy).toBeCalledWith({
      payload: [],
      type: 'gifts/update',
    });
  });

  it('should split gift text', () => {
    // Arrange
    const text = 'gift1 × 1';

    // Act
    const result = giftObserver.splitGiftText(text);

    // Assert
    expect(result).toEqual({name: 'gift1', count: 1});
  });

  it('should be null when the count is 0', () => {
    // Arrange
    const text = 'gift1 × 0';

    // Act
    const result = giftObserver.splitGiftText(text);

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the name is not found', () => {
    // Arrange
    const text = '× 1';

    // Act
    const result = giftObserver.splitGiftText(text);

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the count is not found', () => {
    // Arrange
    const text = 'gift1';

    // Act
    const result = giftObserver.splitGiftText(text);

    // Assert
    expect(result).toBeNull();
  });

});
