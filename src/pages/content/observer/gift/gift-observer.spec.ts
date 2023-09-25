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
        { name: 'gift1', count: 3, sender: 'sender' },
        { name: 'gift2', count: 2, sender: 'sender' },
        { name: 'gift1', count: 1, sender: 'sender' },
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
    document.body.innerHTML = `
        <div class="list-item">
                <div class="name">sender</div>
                <div class="count">gift1 × 1</div>
        </div>`;
    const element = document.querySelector('.list-item')!;

    // Act
    const result = giftObserver.toGift(element);

    // Assert
    expect(result).toEqual({ name: 'gift1', count: 1, sender: 'sender' });
  });

  it('should be null when the count is 0', () => {
    // Arrange
    document.body.innerHTML = `
        <div class="list-item">
                <div class="name">sender</div>
                <div class="count">gift1 × 0</div>
        </div>`;
    const element = document.querySelector('.list-item')!;

    // Act
    const result = giftObserver.toGift(element);

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the name is not found', () => {
    // Arrange
    document.body.innerHTML = `
        <div class="list-item">
                <div class="name">sender</div>
                <div class="count">× 1</div>
        </div>`;
    const element = document.querySelector('.list-item')!;

    // Act
    const result = giftObserver.toGift(element);

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the count is not found', () => {
    // Arrange
    document.body.innerHTML = `
        <div class="list-item">
                <div class="name">sender</div>
                <div class="count">gift1</div>
        </div>`;
    const element = document.querySelector('.list-item')!;

    // Act
    const result = giftObserver.toGift(element);

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the count is not number', () => {
    // Arrange
    document.body.innerHTML = `
        <div class="list-item">
                <div class="name">sender</div>
                <div class="count">gift1 × a</div>
        </div>`;
    const element = document.querySelector('.list-item')!;

    // Act
    const result = giftObserver.toGift(element);

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the text is empty', () => {
    // Arrange
    document.body.innerHTML = `
        <div class="list-item">
                <div class="name">sender</div>
                <div class="count">×</div>
        </div>`;
    const element = document.querySelector('.list-item')!;

    // Act
    const result = giftObserver.toGift(element);

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the text is "×"', () => {
    // Arrange
    document.body.innerHTML = `
        <div class="list-item">
                <div class="name">sender</div>
                <div class="count">gift1 × a</div>
        </div>`;
    const element = document.querySelector('.list-item')!;

    // Act
    const result = giftObserver.toGift(element);

    // Assert
    expect(result).toBeNull();
  });

  it('should not be thrown error when the sender is empty', () => {
    // Arrange
    document.body.innerHTML = `
        <div class="list-item">
                <div class="name"></div>
                <div class="count">gift1 × a</div>
        </div>`;
    const element = document.querySelector('.list-item')!;

    // Act
    const result = giftObserver.toGift(element);

    // Assert
    expect(result).toBeNull();
  });
});
