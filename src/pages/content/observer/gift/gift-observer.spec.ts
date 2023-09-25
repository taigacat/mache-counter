import { store } from '../../store';
import { GiftObserver } from './gift-observer';

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
        <div class="gLogs"></div>
    `;

    // Act
    await giftObserver.start();

    // Assert
    expect(spy).toBeCalledWith(expect.any(HTMLElement), {
      childList: true,
      attributes: false,
    });
  });

  it('should dispatch add action when the target is changed', async () => {
    // Arrange
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    document.body.innerHTML = `
        <div class="gLogs">
            <div class="list-item">
                <div class="name">sender</div>
                <div class="count">gift1 × 1</div>
            </div>
            <div class="list-item">
                <div class="name">sender</div>
                <div class="count">gift2 × 2</div>
            </div>
            <div class="list-item">
                <div class="name">sender</div>
                <div class="count">gift1 × 3</div>
            </div>
        </div>
    `;

    // Act
    giftObserver.onAdd(Array.from(document.querySelectorAll('.list-item')));

    // Assert
    expect(dispatchSpy).toBeCalledWith({
      payload: [
        { name: 'gift1', count: 1, sender: 'sender' },
        { name: 'gift2', count: 2, sender: 'sender' },
        { name: 'gift1', count: 3, sender: 'sender' },
      ],
      type: 'gifts/add',
    });
  });

  it('should not gift be included when the count element is not found', async () => {
    // Arrange
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    document.body.innerHTML = `
        <div class="gLogs">
            <div class="list-item dummy" />
        </div>
    `;

    // Act
    await giftObserver.start();

    // Assert
    expect(dispatchSpy).toBeCalledWith({
      payload: [],
      type: 'gifts/add',
    });
  });

  it('should not gift be included when the count text is empty', async () => {
    // Arrange
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    document.body.innerHTML = `
        <div class="gLogs">
            <div class="list-item">
                <div class="count">
                    <span/>
                </div>
            </div>
        </div>
    `;

    // Act
    await giftObserver.start();

    // Assert
    expect(dispatchSpy).toBeCalledWith({
      payload: [],
      type: 'gifts/add',
    });
  });

  it('should split gift text', () => {
    // Arrange
    const text = 'gift1 × 1';

    // Act
    const result = giftObserver.toGift(text, 'sender');

    // Assert
    expect(result).toEqual({ name: 'gift1', count: 1, sender: 'sender' });
  });

  it('should be null when the count is 0', () => {
    // Arrange
    const text = 'gift1 × 0';

    // Act
    const result = giftObserver.toGift(text, 'sender');

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the name is not found', () => {
    // Arrange
    const text = '× 1';

    // Act
    const result = giftObserver.toGift(text, 'sender');

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the count is not found', () => {
    // Arrange
    const text = 'gift1';

    // Act
    const result = giftObserver.toGift(text, 'sender');

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the count is not number', () => {
    // Arrange
    const text = 'gift1 × a';

    // Act
    const result = giftObserver.toGift(text, 'sender');

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the text is empty', () => {
    // Arrange
    const text = '';

    // Act
    const result = giftObserver.toGift(text, 'sender');

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the text is "×"', () => {
    // Arrange
    const text = '×';

    // Act
    const result = giftObserver.toGift(text, 'sender');

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the text is undefined', () => {
    // Arrange
    const text = undefined;
    const sender = undefined;

    // Act
    const result = giftObserver.toGift(text, sender);

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the text is null', () => {
    // Arrange
    const text = null;
    const sender = null;

    // Act
    const result = giftObserver.toGift(text, sender);

    // Assert
    expect(result).toBeNull();
  });
});
