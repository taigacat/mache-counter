import { appMetadataSelector } from './app.selector';
import { AppState } from './app.slice';

describe('AppSelector', () => {
  it('should select app metadata', () => {
    // Arrange
    const state = {
      app: {
        metadata: {
          userId: 'userId',
          userName: 'userName',
          liveId: 'liveId',
        },
      } as AppState,
    } as any;

    // Act
    const result = appMetadataSelector(state);

    // Assert
    expect(result).toEqual({
      userId: 'userId',
      userName: 'userName',
      liveId: 'liveId',
    });
  });
});
