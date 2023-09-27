import appSlice, { appAction } from './app.slice';

describe('AppSlice', () => {
  it('should update app metadata', () => {
    // Arrange
    const initialState = {
      metadata: {
        userId: '',
        userName: '',
        liveId: '',
      },
    };
    const action = appAction.setMetadata({
      userId: 'userId',
      userName: 'userName',
      liveId: 'liveId',
    });

    // Act
    const state = appSlice.reducer(initialState, action);

    // Assert
    expect(state.metadata.userId).toEqual('userId');
    expect(state.metadata.userName).toEqual('userName');
    expect(state.metadata.liveId).toEqual('liveId');
  });
});
